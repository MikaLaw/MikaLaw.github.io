export default class Range {
  #abortController = new AbortController();
  #config;
  #component;
  #form;
  #name;
  #el;

  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.#form = this.#component.closest('form');
    this.#name = this.#component.dataset.range || 'range';
    
    this.#config = this.#parseConfig();
    this.#el = {
      slider: this.#component.querySelector('[data-range-bar]'),
      inputMin: this.#component.querySelector('[data-range-min]'),
      inputMax: this.#component.querySelector('[data-range-max]'),
      inputLabelMin: this.#component.querySelector('[data-range-min-label]')?.textContent || 'Дешевле',
      inputLabelMax: this.#component.querySelector('[data-range-max-label]')?.textContent || 'Дороже',
    };
    
    this.init();
  }

  #parseConfig() {
    const { min, max, startMin, startMax, margin } = this.#component.dataset;
    const parsedMin = Number.parseInt(min, 10) || 0;
    const parsedMax = Number.parseInt(max, 10) || 1000;

    return {
      min: parsedMin,
      max: parsedMax,
      startMin: Number.parseInt(startMin, 10) || parsedMin,
      startMax: Number.parseInt(startMax, 10) || parsedMax,
      margin: Number.parseInt(margin, 10) || 0,
    };
  }

  init() {
    this.#createSlider();
    this.#bindEvents();
    this.#setInputAttributes();
    if (this.#form) this.setupFiltersAction();
  }

  #createSlider() {
    if (!this.#el.slider) return;

    noUiSlider.create(this.#el.slider, {
      start: [this.#config.startMin, this.#config.startMax],
      connect: true,
      step: 1,
      margin: this.#config.margin,
      handleAttributes: [{ 'aria-label': this.#el.inputLabelMin }, { 'aria-label': this.#el.inputLabelMax }],
      range: { min: this.#config.min, max: this.#config.max },
      format: {
        to: (val) => Range.formatNumber(val),
        from: (val) => Range.parseNumber(val),
      },
    });

    this.#el.slider.noUiSlider.on('update', (values, handle) => this.#onSliderUpdate(values, handle));
  }

  #bindEvents() {
    const { signal } = this.#abortController;
    const inputs = [this.#el.inputMin, this.#el.inputMax];

    inputs.forEach((input, index) => {
      if (!input) return;

      input.addEventListener('change', (e) => this.#handleInputChange(e), { signal });
      input.addEventListener('blur', (e) => this.#syncInputWithSlider(e.target, index), { signal });
      input.addEventListener('keydown', (e) => this.#handleKeydown(e, index), { signal });
    });
  }

  #setInputAttributes() {
    [this.#el.inputMin, this.#el.inputMax].forEach(input => {
      input?.setAttribute('inputmode', 'numeric');
    });
  }

  #onSliderUpdate(values, handle) {
    const targetInput = handle === 0 ? this.#el.inputMin : this.#el.inputMax;
    if (!targetInput) return;

    targetInput.value = values[handle];
  }

  #handleInputChange(e) {
    e.stopPropagation();
    const input = e.target;
    const val = Range.parseNumber(input.value);
    input.value = Range.formatNumber(val);
  }

  #handleKeydown(e, handle) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const step = e.key === 'ArrowUp' ? 1 : -1;
      const currentVal = Range.parseNumber(e.target.value);
      this.#syncInputWithSlider(e.target, handle, currentVal + step);
    }
  }

  #syncInputWithSlider(input, handle, forcedValue = null) {
    const sliderInstance = this.#el.slider?.noUiSlider;
    if (!sliderInstance) return;

    let val = forcedValue !== null ? forcedValue : Range.parseNumber(input.value);
    const isMin = handle === 0;

    if (isMin) {
      const currentMax = Range.parseNumber(this.#el.inputMax?.value ?? this.#config.max);
      val = Math.max(this.#config.min, Math.min(val, currentMax - this.#config.margin));
    } else {
      const currentMin = Range.parseNumber(this.#el.inputMin?.value ?? this.#config.min);
      val = Math.max(currentMin + this.#config.margin, Math.min(val, this.#config.max));
    }

    const currentValues = sliderInstance.get(true);
    const nextValues = isMin ? [val, Range.formatNumber(currentValues[1])] : [Range.formatNumber(currentValues[0]), val];

    sliderInstance.set(nextValues);
  }

  static formatNumber(val) {
    return Math.round(Number(val));
  }

  static parseNumber(str) {
    return Number.parseInt(String(str).replace(/\D/g, ''), 10) || 0;
  }

  setupFiltersAction() {   
    const { signal } = this.#abortController;
    const sliderInstance = this.#el.slider?.noUiSlider;
    this.#form.addEventListener('filter:init', () => this.dispatchChangeFilterEvent(), { signal });
    this.#form.addEventListener('filter:clear', () => sliderInstance?.set([this.#config.min, this.#config.max]), { signal });
    this.#form.addEventListener('filter:add', (e) => this.dispatchAddFilterEvent(e), { signal });    
    this.#component.addEventListener('filter:reset', (e) => sliderInstance?.set([this.#config.min, this.#config.max]), { signal });
    if (sliderInstance) {
      sliderInstance.on('set', () => this.dispatchChangeFilterEvent());
    }

    this.#form.addEventListener('formdata', (e) => this.handleFormData(e), { signal });
  }

  dispatchAddFilterEvent(e) {
    const sliderInstance = this.#el.slider?.noUiSlider;
    if (!sliderInstance) return;
    const changedVal = e.detail?.value;
    if (!changedVal) return;
    const [valMin, valMax] = changedVal.split(' — ').map((val) => parseInt(val));
    sliderInstance?.set([valMin, valMax]);
  }

  dispatchChangeFilterEvent() {
    const sliderInstance = this.#el.slider?.noUiSlider;
    if (!sliderInstance) return;

    const [currentMin, currentMax] = sliderInstance.get(true).map(Math.round);
    const isChanged = currentMin !== this.#config.min || currentMax !== this.#config.max;
    
    const textMin = Range.formatNumber(currentMin);
    const textMax = Range.formatNumber(currentMax);

    this.#component.dispatchEvent(new CustomEvent('filter:change', {
      bubbles: true,
      detail: {
        name: this.#name,
        action: isChanged ? 'add' : 'delete',
        payload: { id: `range-${this.#name}`, text: `${textMin} — ${textMax}`, target: this.#component }
      }
    }));
  }

  handleFormData(e) {
    const sliderInstance = this.#el.slider?.noUiSlider;
    if (!sliderInstance) return;

    const [currentMin, currentMax] = sliderInstance.get(true).map(Math.round);
    const isChanged = currentMin !== this.#config.min || currentMax !== this.#config.max;

    const nativeMin = this.#el.inputMin.name;
    const nativeMax = this.#el.inputMax.name;
    e.formData.delete(nativeMin); 
    e.formData.delete(nativeMax); 

    if (isChanged) {
      const payload = JSON.stringify({ min: currentMin, max: currentMax });
      e.formData.append(this.#name, payload);
    }
  }

  destroy() {
    this.#abortController.abort();
    if (this.#el?.slider?.noUiSlider) {
      this.#el.slider.noUiSlider.destroy();
    }
    this.#el = null;
    this.#component = null;
    this.#form = null;
  }
}