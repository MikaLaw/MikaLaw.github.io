import ResponsiveManager from '../../utils/responsive-manager.js';
import FocusLock from '../../utils/focus-lock.js';

class SliderPanelManager {
  static #instances = new Set();
  static #activeCount = 0;

  static register(instance) { this.#instances.add(instance); }
  static unregister(instance) { this.#instances.delete(instance); }

  static trackOpen() {
    this.#activeCount++;
    if (this.#activeCount === 1) this.#toggleStyles(true);
  }

  static trackClose() {
    this.#activeCount = Math.max(0, this.#activeCount - 1);
    if (this.#activeCount === 0) this.#toggleStyles(false);
  }

  static #toggleStyles(shouldLock) {
    const scrollbarWidth = shouldLock ? `${window.innerWidth - document.documentElement.clientWidth}px` : '';
    document.body.style.setProperty('--scrollbar-width', shouldLock ? scrollbarWidth : '');
    shouldLock ? document.body.classList.add('overflow') : document.body.classList.remove('overflow');
  }

  static closeAll() {
    this.#instances.forEach(instance => {
      if (instance.isOpen) instance.close();
    });
  }
}

class SliderPanel {
  constructor(component) {
    this.component = component;
    this.slide = this.component.querySelector('[data-slider-slide]');
    this.id = this.component.dataset.sliderPanel || null;
    
    this.trigger = document.querySelector(`[data-slider-panel-show="${this.id}"]`);
    this.closeBtns = document.querySelectorAll(`[data-slider-panel-close="${this.id}"]`);
    
    this.isOpen = false;
    this.abortController = new AbortController();
    this.focusLockInstance = new FocusLock();

    SliderPanelManager.register(this);
    this.#initEvents();
  }

  #initEvents() {
    const { signal } = this.abortController;

    this.trigger?.addEventListener('click', () => this.toggle(), { signal });
    this.closeBtns.forEach(btn => btn.addEventListener('click', () => this.close(), { signal }));
    
    document.addEventListener('keydown', (e) => this.#handleKeydown(e), { signal });
    document.addEventListener('click', (e) => this.#handleDocumentClick(e), { signal });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.isOpen) return;
    SliderPanelManager.trackOpen();
    this.isOpen = true;
    this.#updateDOMState(true);
    this.focusLockInstance.lock(this.slide);    
  }

  close() {
    if (!this.isOpen) return;
    SliderPanelManager.trackClose();
    this.isOpen = false;
    this.#updateDOMState(false);
    this.focusLockInstance.unlock();    
  }

  #updateDOMState(isOpen) {
    this.trigger?.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      this.component?.setAttribute('open', '');
    } else {
      this.component?.removeAttribute('open');
    }
    this.component?.dispatchEvent(new CustomEvent('slider:toggle', { 
      bubbles: true, 
      detail: { open: isOpen } 
    }));
  }

  #handleKeydown(e) {
    if (e.key === "Escape" && this.isOpen) {
      SliderPanelManager.closeAll();
      this.trigger?.focus(); 
    }
  }

  #handleDocumentClick(e) {
    if (!this.isOpen) return;
    const isClickInside = this.slide?.contains(e.target) || this.trigger?.contains(e.target);
    if (!isClickInside) {
      this.close()
    }
  }

  destroy() {
    this.close();
    this.abortController?.abort();
    SliderPanelManager.unregister(this);
  }
}

export default class ResponsiveSliderController {
  #element;
  #query;
  #sliderInstance = null;

  constructor(element) {
    this.#element = element;
    this.#query = element.dataset.responsive;
    this.#init();
  }

  #init() {
    if (!this.#query) {
      this.#createInstance();
      return;
    }

    ResponsiveManager.watch(
      this.#query,
      () => this.#createInstance(),
      () => this.#destroyInstance()
    );
  }

  #createInstance() {
    if (!this.#sliderInstance) {
      this.#sliderInstance = new SliderPanel(this.#element);
    }
  }

  #destroyInstance() {
    if (this.#sliderInstance) {
      this.#sliderInstance.destroy();
      this.#sliderInstance = null;
    }
  }
}
