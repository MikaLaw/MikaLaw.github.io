import EventEmitter from '../../utils/event-emiter';
import Accordion from '../accordion/accordion.js'; 
import ScrollBlock from '../scroll-block/scroll-block.js';
import ResponsiveManager from '../../utils/responsive-manager.js';

class TabsLevelModel {
  #currentIndex;
  #items;
  onChange = new EventEmitter();

  constructor(size, initialIndex = 0) {
    this.#currentIndex = Math.max(0, initialIndex);
    this.#items = Array.from({ length: size }, () => ({ nested: null }));
  }

  get items() { return this.#items; }
  get currentIndex() { return this.#currentIndex; }

  setIndex(index) {
    if (index < 0 || index >= this.#items.length) return;
    this.#currentIndex = index;
    this.onChange.emit();
  }

  getActiveChain() {
    const chain = [this.#currentIndex];
    const nestedModel = this.#items[this.#currentIndex]?.nested;
    if (nestedModel) {
      chain.push(...nestedModel.getActiveChain());
    }
    return chain;
  }

  openByChain(chain) {
    if (!Array.isArray(chain) || chain.length === 0) return;
    const [currentIdx, ...rest] = chain;
    this.setIndex(currentIdx);
    const nestedModel = this.#items[currentIdx]?.nested;
    if (rest.length > 0 && nestedModel) {
      nestedModel.openByChain(rest);
    }
  }
}

export class TabsComponent {
  #container;
  #levelModel;
  #controlsContainer;
  #controls;
  #contentElements;
  #uniqueId;
  #scrollBlockInstance;
  #nestedInstances = [];
  #disposables = new Set();

  constructor(container, options = {}) {
    if (!container) return;
    this.#container = container;
    this.#controlsContainer = this.#container.querySelector('[data-tabs-controls]');
    
    this.#controls = Array.from(this.#controlsContainer.querySelectorAll('[data-tabs-control]'))
      .filter(el => el.closest('[data-tabs]') === this.#container);
      
    this.#contentElements = Array.from(this.#container.querySelectorAll('[data-tabs-element]'))
      .filter(el => el.closest('[data-tabs]') === this.#container);
      
    this.#uniqueId = this.#container.id || `tabs-${Math.random().toString(36).substring(2, 9)}`;
    const initialIndex = options.initialIndex ?? this.#controls.findIndex(el => el.classList.contains('is-active'));
    
    this.#levelModel = options.existingModel || new TabsLevelModel(this.#contentElements.length, initialIndex);
    
    this.#setupAccessibility();

    this.#contentElements.forEach((itemEl, idx) => {
      const nestedContainer = itemEl.querySelector('[data-tabs="inner"]');
      if (nestedContainer) {
        const existingNestedModel = this.#levelModel.items[idx].nested;
        const nestedComponent = new TabsComponent(nestedContainer, {
          _isNested: true,
          existingModel: existingNestedModel,
          scroll: options.scroll,
        });
        this.#nestedInstances.push(nestedComponent);
        this.#levelModel.items[idx].nested = nestedComponent.model;
      }
    });

    const unsubscribe = this.#levelModel.onChange.subscribe(() => this.#render());
    this.#disposables.add(unsubscribe);

    this.#controlsContainer.addEventListener('click', this.#onControlClick);
    this.#controlsContainer.addEventListener('keydown', this.#onControlKeyDown);

    if (!options.existingModel && options.indexChain?.length > 0) {
      this.#levelModel.openByChain(options.indexChain);
    } else {
      this.#render();
    }

    if (options.scroll) {
      this.#controlsContainer.setAttribute('data-scroll-block', '');
      this.#scrollBlockInstance = new ScrollBlock(this.#controlsContainer);
    }
  }

  get model() { return this.#levelModel; }
  get activeChain() { return this.#levelModel.getActiveChain(); }

  #setupAccessibility() {
    if (!this.#controlsContainer) return;
    const label = this.#controlsContainer.dataset.ariaLabel;
    if (label) this.#controlsContainer.setAttribute('aria-label', label);
    this.#controlsContainer.setAttribute('role', 'tablist');

    this.#controls.forEach((control, idx) => {
      const panel = this.#contentElements[idx];
      const controlId = `${this.#uniqueId}-ctrl-${idx}`;
      const panelId = `${this.#uniqueId}-panel-${idx}`;

      control.id = controlId;
      control.setAttribute('role', 'tab');
      control.setAttribute('aria-controls', panelId);

      if (panel) {
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', controlId);
        panel.querySelector('.tabs__content')?.setAttribute('tabindex', '0');
      }
    });
  }

  #clearAccessibility() {
    if (!this.#controlsContainer) return;
    this.#controlsContainer.removeAttribute('role');
    this.#controlsContainer.removeAttribute('aria-label');

    this.#controls.forEach((control) => {
      control.removeAttribute('role');
      control.removeAttribute('aria-selected');
      control.removeAttribute('aria-controls');
      control.removeAttribute('tabindex');
      if (control.id.startsWith(this.#uniqueId)) control.removeAttribute('id');
    });

    this.#contentElements.forEach((panel) => {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-labelledby');
      panel.removeAttribute('hidden');
      panel.querySelector('.tabs__content')?.removeAttribute('tabindex');
      if (panel.id.startsWith(this.#uniqueId)) panel.removeAttribute('id');
    });
  }

  #render() {
    const activeIdx = this.#levelModel.currentIndex;

    this.#controls.forEach((control, idx) => {
      const isActive = idx === activeIdx;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-selected', String(isActive));
      control.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    this.#contentElements.forEach((panel, idx) => {
      const isActive = idx === activeIdx;
      panel.classList.toggle('is-active', isActive);
      
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  #onControlClick = (e) => {
    const control = e.target.closest('[data-tabs-control]');
    if (!control) return;
    const index = this.#controls.indexOf(control);
    if (index !== -1) {
      this.#levelModel.setIndex(index);
      this.#controls[index].focus();
    }
  }

  #onControlKeyDown = (e) => {
    const index = this.#controls.indexOf(e.target);
    if (index === -1) return;
    const { length } = this.#controls;
    let newIndex = null;

    if (e.key === 'ArrowRight') newIndex = (index + 1) % length;
    if (e.key === 'ArrowLeft') newIndex = (index - 1 + length) % length;
    if (e.key === 'Home') newIndex = 0;
    if (e.key === 'End') newIndex = length - 1;

    if (newIndex !== null) {
      e.preventDefault();
      this.#levelModel.setIndex(newIndex);
      this.#controls[newIndex].focus();
    }
  }

  destroy() {
    this.#clearAccessibility();
    
    this.#disposables.forEach(unsub => unsub());
    this.#disposables.clear();

    this.#nestedInstances.forEach(instance => instance.destroy());
    this.#nestedInstances = [];

    this.#controlsContainer.removeEventListener('click', this.#onControlClick);
    this.#controlsContainer.removeEventListener('keydown', this.#onControlKeyDown);
    
    this.#contentElements.forEach((el) => el.classList.remove('is-active'));
    this.#controlsContainer.removeAttribute('data-scroll-block');

    if (this.#scrollBlockInstance?.destroy) {
      this.#scrollBlockInstance.destroy();
      this.#scrollBlockInstance = null;
    }

    this.#container = null;
    this.#controlsContainer = null;
    this.#controls = [];
    this.#contentElements = [];
    this.#levelModel = null;
  }
}

export default class TabsResponsive {
  #container;
  #mode;
  #activeChain = 0;
  #scroll = true;
  #currentInstance = null;
  #responsiveController = null;

  constructor(container) {
    if (!container) return;
    this.#container = container;
    this.#mode = this.#container.dataset.mode || 'default';
    this.init();
  }

  init() {
    if (this.#mode === 'accordion') {
      this.#responsiveController = ResponsiveManager.watch(
        'max-width: 767px',
        () => this.#switchComponent('accordion'), 
        () => this.#switchComponent('tabs')
      );
    } else {
      this.#switchComponent('tabs');
    }
  }

  #switchComponent(targetType) {
    if (this.#currentInstance) {
      this.#activeChain = this.#currentInstance.activeChain || this.#activeChain;
      this.#currentInstance.destroy();
      this.#currentInstance = null;
    }

    if (targetType === 'accordion') {
      const accordionEl = this.#container.querySelector('[data-accordion="init"]');
      if (accordionEl) {
        this.#currentInstance = new Accordion(accordionEl, { indexChain: this.#activeChain });
      }
    } else {
      this.#currentInstance = new TabsComponent(this.#container, {
        indexChain: this.#activeChain,
        scroll: this.#scroll
      });
    }
  }

  destroy() {
    if (this.#currentInstance) {
      this.#currentInstance.destroy();
      this.#currentInstance = null;
    }
    
    this.#responsiveController?.abort();
    this.#responsiveController = null;
    this.#container = null;
  }
}