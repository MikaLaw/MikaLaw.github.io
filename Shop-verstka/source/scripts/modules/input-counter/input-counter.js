export default class InputCounter {
  #container; #input; #btnMinus; #btnPlus; #announcer;
  #min; #max; #step;
  #destroyController;

  constructor(element) {
    if (!element) return;

    this.#input = element.querySelector('input');
    this.#btnMinus = element.querySelector('[data-btn-minus]');
    this.#btnPlus = element.querySelector('[data-btn-plus]');

    if (!this.#input || !this.#btnMinus || !this.#btnPlus) return;

    this.#container = element;
    this.#announcer = element.querySelector('[data-counter-announcer]');

    // Исправлено: корректный парсинг значений по умолчанию
    this.#min = this.#input.hasAttribute('min') ? Number(this.#input.min) : 0;
    this.#max = this.#input.hasAttribute('max') ? Number(this.#input.max) : Infinity;
    this.#step = Number(this.#input.step) || 1;
    
    this.#destroyController = new AbortController();
    this.#init();
  }

  #init() {
    const { signal } = this.#destroyController;

    this.#btnMinus.addEventListener('click', () => this.#handleStep(-this.#step), { signal });
    this.#btnPlus.addEventListener('click', () => this.#handleStep(this.#step), { signal });
    this.#input.addEventListener('input', (e) => this.#handleInput(e), { signal });
    this.#input.addEventListener('blur', () => this.#validateFinalValue(), { signal });

    this.#render(Number(this.#input.value) || this.#min, true);
  }

  #handleStep(stepDelta) {
    if (this.#isBtnDisabled(stepDelta)) return;
    const currentValue = Number(this.#input.value) || 0;
    this.#render(currentValue + stepDelta, false);
  }

  #isBtnDisabled(stepDelta) {
    const btn = stepDelta > 0 ? this.#btnPlus : this.#btnMinus;
    return btn.getAttribute('aria-disabled') === 'true';
  }

  #handleInput(e) {
    const cleanValue = e.target.value.replace(/[^0-9.-]/g, '');
    if (this.#input.value !== cleanValue) {
      this.#input.value = cleanValue;
    }
    
    const numericValue = Number(cleanValue);
    if (cleanValue !== '' && !isNaN(numericValue)) {
      this.#render(numericValue);
    }
  }

  #validateFinalValue() {
    this.#render(Number(this.#input.value) || this.#min);
  }

  #render(newValue, isSilent = true) {
    const clampedValue = Math.max(this.#min, Math.min(newValue, this.#max));    
    const isValueChanged = Number(this.#input.value) !== clampedValue;

    if (isValueChanged) {
      this.#input.value = clampedValue;
    }

    const isMin = clampedValue <= this.#min;
    const isMax = clampedValue >= this.#max;
    
    this.#btnMinus.setAttribute('aria-disabled', String(isMin));
    this.#btnPlus.setAttribute('aria-disabled', String(isMax));
    if (this.#announcer && (!isSilent || isMin || isMax)) {
      this.#announce(clampedValue, isMin, isMax);
    }
   
    if (isValueChanged) {
      this.#container.dispatchEvent(new CustomEvent('counter:change', {
        detail: { value: clampedValue },
        bubbles: true
      }));
    }
  }

  #announce(value, isMin, isMax) {
    let text = String(value);
    if (isMax) text = `Максимум достигнут: ${this.#max}`;
    if (isMin) text = `Минимум достигнут: ${this.#min}`;

    if (this.#announcer.textContent !== text) {
      this.#announcer.textContent = text;
    }
  }

  destroy() {
    this.#destroyController.abort();
  }
}