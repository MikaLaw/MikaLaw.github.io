import EventEmitter from '../../utils/event-emiter';

class AccordionModel {
  #isOpen = false;
  #nestedAccordion = null;
  #disposables = new Set();
  onChange = new EventEmitter();

  constructor(initialOpen = false) {
    this.#isOpen = initialOpen;
  }

  get isOpen() { return this.#isOpen; }
  get nested() { return this.#nestedAccordion; }

  setOpen(value) {
    if (this.#isOpen === value) return;
    this.#isOpen = value;
    this.onChange.emit();
  }

  setNested(nestedModel) {
    this.#nestedAccordion = nestedModel;
    const unsubscribe = this.#nestedAccordion.onChange.subscribe(() => this.onChange.emit());
    this.#disposables.add(unsubscribe);
  }

  destroy() {
    this.#disposables.forEach(unsub => unsub());
    this.#disposables.clear();
    this.#nestedAccordion = null;
  }
}

class AccordionLevelModel {
  #items = [];
  #isMulti = false;
  #disposables = new Set();
  onChange = new EventEmitter();

  constructor(size, isMulti = false) {
    this.#isMulti = isMulti;
    this.#items = Array.from({ length: size }, () => {
      const model = new AccordionModel();
      const unsub = model.onChange.subscribe(() => this.onChange.emit());
      this.#disposables.add(unsub);
      return { model };
    });
  }

  get items() { return this.#items; }

  toggle(index, forceOpen) {
    const target = this.#items[index]?.model;
    if (!target) return;
    const shouldOpen = forceOpen ?? !target.isOpen;
    if (shouldOpen && !this.#isMulti) {
      this.#items.forEach(item => {
        if (item.model !== target) item.model.setOpen(false);
      });
    }
    target.setOpen(shouldOpen);
  }

  getActiveChain() {
    for (let i = 0; i < this.#items.length; i++) {
      const item = this.#items[i].model;
      if (item.isOpen) {
        const chain = [i];
        if (item.nested) {
          chain.push(...item.nested.getActiveChain());
        }
        return chain;
      }
    }
    return [];
  }

  openByChain(chain) {
    if (!Array.isArray(chain) || chain.length === 0) return;
    const [currentIdx, ...rest] = chain;
    this.toggle(currentIdx, true);
    if (rest.length > 0 && this.#items[currentIdx].model.nested) {
      this.#items[currentIdx].model.nested.openByChain(rest);
    }
  }

  destroy() {
    this.#disposables.forEach(unsub => unsub());
    this.#disposables.clear();
    this.#items.forEach(item => item.model.destroy());
    this.#items = [];
  }
}

export default class Accordion {
  #container;
  #levelModel;
  #uniqueId;
  #domItems = [];
  #nestedInstances = [];

  constructor(container, options = {}) {
    if (!container) return;
    this.#container = container;

    this.#uniqueId = this.#container.id || `acc-${Math.random().toString(36).substring(2, 9)}`;

    const isMulti = 'multi' in container.dataset;
    this.#domItems = this.#getCurrentLevelItems(container);
    
    this.#levelModel = new AccordionLevelModel(this.#domItems.length, isMulti);

    this.#domItems.forEach((itemEl, idx) => {
      const currentItemModel = this.#levelModel.items[idx].model;
      const contentEl = itemEl.querySelector(':scope > [data-accordion-content]');
      const triggerEl = itemEl.querySelector('[data-accordion-trigger]');
      
      this.#setupAccessibility(triggerEl, contentEl, idx, currentItemModel.isOpen);

      const nestedContainer = contentEl?.querySelector('[data-accordion="inner"]');
      if (nestedContainer) {
        const nestedComponent = new Accordion(nestedContainer, { _isNested: true });
        this.#nestedInstances.push(nestedComponent); // Сохраняем экземпляр, чтобы потом уничтожить
        currentItemModel.setNested(nestedComponent.model);
      }

      currentItemModel.onChange.subscribe(() => this.#renderItem(itemEl, currentItemModel));
    });

    this.#container.addEventListener('click', this.#onClick);

    if (!options._isNested) {
      const indexChain = container.dataset.indexChain ? JSON.parse(container.dataset.indexChain) : null;
      const indexNumber = 'index' in container.dataset ? [Number(container.dataset.index)] : null;
      const initialChain = options.indexChain || indexChain || indexNumber;

      if (initialChain) {
        this.#levelModel.openByChain(initialChain);
      } else {
        this.#domItems.forEach((itemEl, idx) => this.#renderItem(itemEl, this.#levelModel.items[idx].model));
      }
    }
  }

  get model() { return this.#levelModel; }
  get activeChain() { return this.#levelModel.getActiveChain(); }

  #getCurrentLevelItems(container) {
    return Array.from(container.querySelectorAll('[data-accordion-item]'))
      .filter(item => item.closest('[data-accordion]') === container);
  }

  #setupAccessibility(trigger, content, idx, isOpen) {
    if (!trigger || !content) return;

    const triggerId = `${this.#uniqueId}-trg-${idx}`;
    const contentId = `${this.#uniqueId}-cnt-${idx}`;

    if (!trigger.id) trigger.id = triggerId;
    if (!content.id) content.id = contentId;

    trigger.setAttribute('aria-expanded', String(isOpen));
    trigger.setAttribute('aria-controls', content.id);

    content.setAttribute('role', 'region');
    content.setAttribute('aria-labelledby', trigger.id);
    
    content.inert = !isOpen;
  }

  #clearAccessibility(trigger, content) {
    if (!trigger || !content) return;

    trigger.removeAttribute('aria-expanded');
    trigger.removeAttribute('aria-controls');

    content.removeAttribute('role');
    content.removeAttribute('aria-labelledby');
    content.inert = false; 

    if (trigger.id.startsWith(this.#uniqueId)) trigger.removeAttribute('id');
    if (content.id.startsWith(this.#uniqueId)) content.removeAttribute('id');
  }

  #renderItem(itemEl, itemModel) {
    const trigger = itemEl.querySelector('[data-accordion-trigger]');
    const content = itemEl.querySelector(':scope > [data-accordion-content]');
    if (!trigger || !content) return;

    trigger.setAttribute('aria-expanded', String(itemModel.isOpen));
    content.inert = !itemModel.isOpen;
    itemEl.classList.toggle('is-active', itemModel.isOpen);
  }

  #onClick = (e) => {
    const trigger = e.target.closest('[data-accordion-trigger]');
    if (!trigger) return;
    const currentAccordion = trigger.closest('[data-accordion]');
    if (currentAccordion !== this.#container) return;

    e.preventDefault();
    const itemEl = trigger.closest('[data-accordion-item]');
    const domItems = this.#getCurrentLevelItems(this.#container);
    const targetIdx = domItems.indexOf(itemEl);

    if (targetIdx !== -1) {
      this.#levelModel.toggle(targetIdx);
    }
  }

  destroy() {
    if (!this.#container) return;

    this.#container.removeEventListener('click', this.#onClick);

    this.#nestedInstances.forEach(instance => instance.destroy());
    this.#nestedInstances = [];

    Array.from(this.#container.querySelectorAll('[data-accordion-item]')).forEach((itemEl) => {
      const trigger = itemEl.querySelector('[data-accordion-trigger]');
      const content = itemEl.querySelector(':scope > [data-accordion-content]');
      this.#clearAccessibility(trigger, content);
      itemEl.classList.remove('is-active');
    });

    this.#levelModel.destroy();
    this.#container = null;
    this.#levelModel = null;
    this.#domItems = [];
  }
}
