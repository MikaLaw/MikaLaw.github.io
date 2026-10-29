import EventEmitter from '../../utils/event-emiter';
import PriorityTags from '../priority-tags/priority-tags.js';
import ScrollBlock from '../scroll-block/scroll-block.js';

class StandardInputAdapter {
  #form; 
  #signal; 
  #inputsMap = new Map(); 
  #idMap = new Map();  
  #inputs = [];

  constructor(form, signal) {
    if (!form) return;
    this.#form = form;
    this.#signal = signal;
    this.#init();
  }

  get inputs() { return this.#inputs; }

  #init() {
    const opt = { signal: this.#signal };
    
    this.#inputs = Array.from(this.#form.querySelectorAll('input:not([data-custom-filter] *), textarea:not([data-custom-filter] *)'));
    
    this.#idMap = new Map(this.#inputs.filter(el => el.id).map(el => [el.id, el]));
    this.#inputsMap = Map.groupBy(this.#inputs, el => el.name);

    this.#form.addEventListener('filter:init', () => this.#onInit(), opt);
    this.#form.addEventListener('filter:clear', () => this.#onClear(), opt);
    this.#form.addEventListener('change', (e) => this.#onChange(e.target), opt);
    this.#form.addEventListener('filter:add', (e) => this.#onToggle(e.detail, true), opt);
    this.#form.addEventListener('filter:reset', (e) => this.#onToggle(e.detail, false), opt);
  }

  #isCheckable = el => el.type === 'checkbox' || el.type === 'radio';
  #hasValue = el => this.#isCheckable(el) ? el.checked : el.value.trim() !== '';
  #setValue = (el, val) => this.#isCheckable(el) ? el.checked = !!val : el.value = val || '';

  #onInit() {
    this.#inputsMap.forEach((elements, name) => {
      if (!name) return;
      const payload = this.#getFieldPayload(elements, name);
      if (payload.length) this.#emit('filter:change', { name, action: 'set-group', payload });
    });
  }

  #onClear() {
    this.#inputs.forEach(el => {
      this.#setValue(el, false);
      this.#emit('filter:change', { name: el.name, action: 'delete-group' });
    });
  }

  #onChange(input) {
    if (input.closest('[data-custom-filter]') || !input.name || input.tagName === 'SELECT') return;
    
    if (input.type === 'radio') {
      this.#emit('filter:change', { name: input.name, action: 'delete-group' }, input);
    }
    
    const isActive = this.#hasValue(input);

    const filterId = input.id || `${input.name}|${input.value}`;
    
    this.#emit('filter:change', {
      name: input.name,
      action: isActive ? 'add' : 'delete',
      payload: {
        id: filterId,
        text: this.#getLabel(input),
        target: input
      }
    }, input);
  }

  #onToggle(detail, isAdd) {
    let el = this.#idMap.get(detail?.id);
    if (!el) {
      el = this.#inputs.find(input => `${input.name}|${input.value}` === detail?.id);
    }
    
    if (!el) return;
    this.#setValue(el, isAdd ? (detail.value ?? true) : false);
    
    this.#emit('filter:change', {
      name: el.name,
      action: isAdd ? 'add' : 'delete',
      payload: {
        id: detail.id,
        text: this.#getLabel(el),
        target: el
      }
    }, el);
  }

  #getFieldPayload(elements, name) {
    const first = elements[0];
    if (!first) return [];

    if (first.type === 'radio') {
      const active = elements.find(el => el.checked);
      return active ? [{ id: active.id || `${name}|${active.value}`, text: this.#getLabel(active), target: active }] : [];
    }

    if (first.type === 'checkbox') {
      return elements.filter(el => el.checked).map(el => ({ id: el.id || `${name}|${el.value}`, text: this.#getLabel(el), target: el }));
    }
    
    return this.#hasValue(first) ? [{ id: name, text: first.value.trim(), target: first }] : [];
  }

  #getLabel = el => this.#form.querySelector(`label[for="${el.id}"]`)?.textContent.trim() || el.closest('label')?.textContent?.trim() || el.value;
  #emit = (type, detail, target = this.#form) => target.dispatchEvent(new CustomEvent(type, { bubbles: true, detail }));
}

class FilterState {
  #filters = new Map();
  #buffer = new Map();
  onChange = new EventEmitter();

  #getMap = (isBuf) => (isBuf ? this.#buffer : this.#filters);

  add(name, item, isBuf = false) {
    if (!item?.id || !item?.target) return;
    const map = this.#getMap(isBuf);
    if (!map.has(name)) map.set(name, []);
    const list = map.get(name);
    const existing = list.find(el => el.id === item.id);
    
    if (!existing) {
      list.push({ ...item });
    } else if (existing.text !== item.text) {
      existing.text = item.text;
    } else {
      return;
    }
    if (!isBuf) this.onChange.emit();
  }

  delete(name, id, isBuf = false) {
    const map = this.#getMap(isBuf);
    if (!map.has(name)) return;
    const updated = map.get(name).filter(item => item.id !== id);
    updated.length ? map.set(name, updated) : map.delete(name);
    if (!isBuf) this.onChange.emit();
  }

  setGroup(name, items, isBuf = false) {
    items?.length ? this.#getMap(isBuf).set(name, items.map(item => ({ ...item}))) : this.#getMap(isBuf).delete(name);
    if (!isBuf) this.onChange.emit();
  }

  deleteGroup(name, isBuf = false) {
    this.#getMap(isBuf).delete(name);
    if (!isBuf) this.onChange.emit();
  }

  clear(isBuf = false) {
    this.#buffer.clear();
    if (!isBuf) { 
      this.#filters.clear(); 
      this.onChange.emit();
    }
  }

  get items() { return this.#group(this.#filters); }
  get flatItems() { return [...this.#filters.entries()].flatMap(([name, list]) => list.map(filter => ({ name, ...filter }))); }
  get flatBuffers() { return [...this.#buffer.entries()].flatMap(([name, list]) => list.map(filter => ({ name, ...filter }))); }

  initBufferFromFilters() { 
    this.#buffer = new Map(Array.from(this.#filters, ([key, values]) => [key, values.map(filter => ({ ...filter }))])); 
  }
  
  commitMobileChanges() { 
    this.#filters = new Map(this.#buffer); 
    this.clear(true); 
    this.onChange.emit();
  }

  get(id) {
    return [this.#filters, this.#buffer]
      .flatMap(map => [...map.values()].flat())
      .find(item => item.id === id) || null;
  }

  #group(map) {
    const groups = new Map();
    map.forEach((list, name) => list.forEach(item => {
      if (!item || !item.target) return; 
      const root = item.target?.closest('[data-filters-slider]') || item.target.closest('[data-custom-filter]') || item.target;
      if (!groups.has(root)) groups.set(root, { target: root, name, count: 0, elements: [] });
      const groupElement = groups.get(root);
      groupElement.elements.push({ id: item.id, text: item.text, target: item.target });
      groupElement.count = groupElement.elements.length;
    }));
    return [...groups.values()];
  }
}

class FilterTagsModule {
  #template = document.createElement('template');

  constructor() {
    this.#template.innerHTML = `
      <li class="filter-tags__item">
        <div class="filter-tags__tag">
          <span data-tag-text></span>
          <button class="button" type="button" data-tag-id="">
            <span class="visually-hidden">Удалить</span>
            <span class="button filter-tags__tag-close" aria-hidden="true">
              <svg width=12 height=12 aria-hidden="true" focusable="false"><use href="./img/sprite.svg#icon-close" /></svg>
            </span>
          </button>
        </div>
      </li>
    `;
  }

  render(groupedFilters, wrapper) {
    if (!wrapper) return;
    const activeFilters = groupedFilters.flatMap(group => group.elements);
    const activeKeys = new Set(activeFilters.map(activeFilter => `${activeFilter.id}|${activeFilter.text?.trim()}`));
    
    wrapper.querySelectorAll('[data-tag-id]').forEach(btn => {
      const tagText = btn.closest('.filter-tags__tag').querySelector('[data-tag-text]').textContent.trim();
      if (!activeKeys.has(`${btn.dataset.tagId}|${tagText}`)) {
        btn.closest('.filter-tags__item').remove();
      }
    });

    const currentKeys = new Set(Array.from(wrapper.querySelectorAll('[data-tag-id]'), btn => 
      `${btn.dataset.tagId}|${btn.closest('.filter-tags__tag')?.querySelector('[data-tag-text]')?.textContent.trim()}`
    ));

    const fragment = document.createDocumentFragment();
    activeFilters.forEach(activeFilter => {
      if (currentKeys.has(`${activeFilter.id}|${activeFilter.text?.trim()}`)) return;
      const clone = this.#template.content.cloneNode(true);
      const btn = clone.querySelector('[data-tag-id]');
      clone.querySelector('[data-tag-text]').textContent = activeFilter.text;
      
      btn.dataset.tagId = activeFilter.id;
      btn.setAttribute('aria-label', `Удалить фильтр ${activeFilter.text}`);
      fragment.appendChild(clone);
    });

    const btnControls = wrapper.querySelector('[data-priority-tags-button-container]');
    if (btnControls) {
      fragment.childNodes.length > 0 ? wrapper.insertBefore(fragment, btnControls) : btnControls.hidden = true;
    } else { 
      wrapper.appendChild(fragment);
    }
  }
}

class MobileSlideModule {
  #component;
  #state;
  #isPanelOpen = false;
  #abortController;
  #sliderPanels;
  #applyBtns;

  constructor(component, state) {
    this.#component = component;
    this.#state = state;
    this.#abortController = new AbortController();
    this.#sliderPanels = this.#component.querySelectorAll('[data-slider-panel]');
    this.#applyBtns = this.#component.querySelectorAll('[data-filters-apply]');
    this.init();
  }

  get panelOpen() { return this.#isPanelOpen; }

  init() {
    const { signal } = this.#abortController;
    this.#sliderPanels.forEach((slider) => {
      slider.addEventListener('slider:toggle', (e) => {
        const { open } = e.detail;
        open ? this.openPanel() : this.closePanel();
      }, { signal });
    });
    
    this.#applyBtns.forEach((btn) => btn.addEventListener('click', (e) => this.applyFilters(e), { signal }));
  }

  openPanel() {
    this.#isPanelOpen = true;this.#state.initBufferFromFilters();
  }

  closePanel() {
    this.#isPanelOpen = false;
    const itemIds = new Set(this.#state.flatItems.map(item => item.id));
    const bufferIds = new Set(this.#state.flatBuffers.map(item => item.id));
    [...this.#state.flatBuffers].forEach((filter) => {
      if (filter.target && !itemIds.has(filter.id)) {
        filter.target.dispatchEvent(new CustomEvent('filter:reset', { bubbles: true, detail: { id: filter.id } }));
      }
    });

    [...this.#state.flatItems].forEach((filter) => {
      if (filter.target && !bufferIds.has(filter.id)) {
        filter.target.dispatchEvent(new CustomEvent('filter:add', { bubbles: true, detail: { id: filter.id } }));
      }
    });
    
    this.#state.clear(true);
  }
  
  applyFilters(e) {
    e.preventDefault();
    this.#state.commitMobileChanges();
  }
  
  destroy() {
    this.#abortController.abort();
    this.#component = null;
    this.#state = null;
  }
}

export default class Filters {
  #component;
  #form;
  #componentName;
  #tagWrapper;
  #tagsModule;
  #statusElement;
  #counterElements;
  #mediaQuery;
  #isMobile;
  #isMobileSlide;
  #mobileDialogInstance = null;
  #tagsOverflowInstance = null;
  #abortController;
  #adapter;
  #state;
  #disposables = new Set();
  
  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.#form = component.querySelector('form');
    if (!this.#form) return;
    this.#componentName = this.#component.dataset?.filters || null;
    this.#tagWrapper = this.#componentName ? document.querySelector(`[data-filters-tags=${this.#componentName}]`) : null;
    this.#tagsModule = this.#tagWrapper ? new FilterTagsModule() : null;
    this.#statusElement = document.querySelector(`[data-filter-tags-status=${this.#componentName}]`);
    this.#counterElements = this.#component.querySelectorAll('[data-filter-counter]');
    this.#mediaQuery = window.matchMedia('(max-width: 767px)');
    this.#isMobile = this.#mediaQuery.matches;
    this.#isMobileSlide = 'slide' in this.#component.dataset;
    this.#abortController = new AbortController();
    this.#adapter = new StandardInputAdapter(this.#form, this.#abortController.signal);
    this.#state = new FilterState();
    this.init();
  }
  
  init() {
    const { signal } = this.#abortController;
    const unsubState = this.#state.onChange.subscribe(() => {
      this.#tagsModule?.render(this.#state.items, this.#tagWrapper);
      this.updateCounters();
    });
    
    this.#disposables.add(unsubState);
    this.#tagWrapper?.addEventListener('click', (e) => {
      if (this.#isMobile) e.stopPropagation();
      this.handleTagClick(e);
    }, { signal });
    
    this.#form.addEventListener('filter:change', (e) => this.handleFilterChange(e), { signal });
    this.#form.addEventListener('reset', (e) => this.handleFullReset(e), { signal });
    this.#form.addEventListener('submit', (e) => this.handleSubmit(e), { signal });
    this.#form.dispatchEvent(new CustomEvent('filter:init'));
    this.#mediaQuery.addEventListener('change', (e) => this.handleScreenChange(e.matches), { signal });
    this.handleScreenChange(this.#isMobile);
  }
  
  handleFilterChange(e) {
    const { name, action, payload } = e.detail ?? {};
    if (!name || !action) return;
    const isBuf = this.#isMobile && this.#mobileDialogInstance?.panelOpen;
    if (action === 'set-group' || action === 'replace-group') {
      this.#state.setGroup(name, action === 'set-group' ? payload : [payload], isBuf);
    }
    if (action === 'add') this.#state.add(name, payload, isBuf);
    if (action === 'delete') this.#state.delete(name, payload.id, isBuf);
    if (action === 'delete-group') this.#state.deleteGroup(name, isBuf);
  }
  
  handleFullReset(e) {
    e.preventDefault();
    this.#form.dispatchEvent(new CustomEvent('filter:clear'));
    this.#state.clear();
    if (!this.#isMobile) this.#dispatchRefresh({});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.#isMobile && this.#mobileDialogInstance) {
      const sliderPanel = this.#component.closest('[data-slider-panel]');
      if (sliderPanel) sliderPanel.removeAttribute('open');
    }
    
    this.#dispatchRefresh(Object.fromEntries(new FormData(this.#form).entries()));
  }
  
  updateCounters() {
    this.#counterElements.forEach(counter => {counter.textContent = ''; counter.hidden = true;});
    this.#state.items.forEach(filter => {
      if (!filter.target) return;
      filter.target.querySelectorAll('[data-filter-counter]').forEach(counter => {
        if (filter.count > 0) {
          counter.innerHTML = `<span class="visually-hidden">Выбрано значений</span>${filter.count}`;
          counter.hidden = false;
        }
      });
    });
  }
  
  handleTagClick(e) {
    const btnTagRemove = e.target.closest('[data-tag-id]');
    const filter = btnTagRemove ? this.#state.get(btnTagRemove.dataset.tagId) : null;
    if (!filter?.target) return;
    filter.target.dispatchEvent(new CustomEvent('filter:reset', { bubbles: true, detail: { id: btnTagRemove.dataset.tagId } }));
    if (this.#statusElement) {
      this.#statusElement.textContent = `Удален фильтр: ${filter.text}`;
    }
    if (!this.#isMobile) {
      this.#dispatchRefresh(Object.fromEntries(new FormData(this.#form).entries()));
    }
  }
  
  handleScreenChange(isMobile) {
    this.#isMobile = isMobile;
    if (isMobile) {
      if (this.#isMobileSlide && !this.#mobileDialogInstance) {
        this.#mobileDialogInstance = new MobileSlideModule(this.#component, this.#state);
      }
      if (this.#tagWrapper) {
        this.#tagsOverflowInstance?.destroy();
        this.#tagWrapper.setAttribute('data-scroll-block', '');
        this.#tagWrapper.removeAttribute('data-priority-tags');
        this.#tagsOverflowInstance = new ScrollBlock(this.#tagWrapper);
      }
    } else {
      if (this.#tagWrapper) {
        this.#tagsOverflowInstance?.destroy();
        this.#tagWrapper.setAttribute('data-priority-tags', '');
        this.#tagWrapper.removeAttribute('data-scroll-block');
        this.#tagsOverflowInstance = new PriorityTags(this.#tagWrapper);
      }
      if (this.#isMobileSlide && this.#mobileDialogInstance) {
        this.#mobileDialogInstance.destroy();this.#mobileDialogInstance = null;
      }
    }
  }
  
  #dispatchRefresh = (filters) => this.#component.dispatchEvent(new CustomEvent('catalog:refresh', { bubbles: true, detail: { filters } }));
  
  destroy() {
    this.#abortController?.abort();
    this.#disposables.forEach(unsub => unsub());
    this.#disposables.clear();
    if (this.#mobileDialogInstance) {
      this.#mobileDialogInstance.destroy();
      this.#mobileDialogInstance = null;
    }
    if (this.#tagsOverflowInstance) {
      this.#tagsOverflowInstance.destroy();
      this.#tagsOverflowInstance = null;
    }
    this.#state.clear();
    this.#component = null;
    this.#form = null;
    this.#tagWrapper = null;
    this.#statusElement = null;
    this.#counterElements = null;
    this.#state = null;
    this.#adapter = null;
    this.#tagsModule = null;
  }
}

