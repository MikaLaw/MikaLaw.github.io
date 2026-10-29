import ResponsiveManager from '../../utils/responsive-manager.js';

export default class MenuNested {
  #component;
  #responsiveController = null;
  #desktopEventsController = null;
  #hasMouse = false;

  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.init();
  }

  init() {
    this.#responsiveController = ResponsiveManager.watch(
      'min-width: 1024px',
      () => this.#initDesktopMode(),
      () => this.#destroyDesktopMode()
    );
  }

  #initDesktopMode() {
    if (this.#desktopEventsController) return;

    this.#desktopEventsController = new AbortController();
    const { signal } = this.#desktopEventsController;
    
    this.#hasMouse = window.matchMedia('(hover: hover)').matches;

    if (this.#hasMouse) {
      this.#component.addEventListener('mouseover', this.#onMouseOver, { signal });
      this.#component.addEventListener('mouseleave', this.#onMouseLeave, { signal });
      this.#component.addEventListener('focusin', this.#onFocusIn, { signal });
    } else {
      this.#component.addEventListener('click', this.#onCustomClick, { signal });
      document.addEventListener('click', this.#onDocumentClick, { signal });
    }

    this.#component.addEventListener('focusout', this.#onFocusOut, { signal });
    this.#component.addEventListener('keydown', this.#onKeydown, { signal });
  }

  #destroyDesktopMode() {
    this.#desktopEventsController?.abort();
    this.#desktopEventsController = null;
    this.#resetActiveItems(this.#component);
  }

  #closeSiblings(targetItem) {
    const siblings = targetItem.parentElement.children;
    
    for (const sibling of siblings) {
      if (sibling !== targetItem && sibling.hasAttribute('data-menu-item')) {
        const trigger = sibling.querySelector('[data-slider-panel-show]');
        if (trigger && trigger.getAttribute('aria-expanded') === 'true') {
          trigger.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }

  #onMouseOver = (e) => {
    const targetItem = e.target.closest('[data-menu-item]');
    if (!targetItem) return;

    this.#closeSiblings(targetItem);

    const trigger = targetItem.querySelector('[data-slider-panel-show]');
    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'true');
    }
  };

  #onFocusIn = (e) => {
    if (!e.target.matches(':focus-visible')) return;

    const targetItem = e.target.closest('[data-menu-item]');
    if (!targetItem) return;

    this.#closeSiblings(targetItem);

    const trigger = targetItem.querySelector('[data-slider-panel-show]');
    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'true');
    }
  };

  #onCustomClick = (e) => {
    const trigger = e.target.closest('[data-slider-panel-show]');
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const targetItem = trigger.closest('[data-menu-item]');
    if (!targetItem) return;

    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    this.#closeSiblings(targetItem);
    trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  };

  #onMouseLeave = () => {
    this.#resetActiveItems(this.#component);
  };

  #onFocusOut = (e) => {
    if (!this.#component.contains(e.relatedTarget)) {
      this.#resetActiveItems(this.#component);
    }
  };

  #onDocumentClick = (e) => {
    if (!this.#component.contains(e.target)) {
      this.#resetActiveItems(this.#component);
    }
  };

  #onKeydown = (e) => {
    if (e.key !== 'Escape') return;

    const openTriggers = this.#component.querySelectorAll('[data-slider-panel-show][aria-expanded="true"]');
    if (openTriggers.length === 0) return;

    e.stopPropagation();
    
    const deepestTrigger = openTriggers[openTriggers.length - 1];
    deepestTrigger.setAttribute('aria-expanded', 'false');
    deepestTrigger.focus();
  };

  #resetActiveItems(parent) {
    if (!parent) return;
    const activeElements = parent.querySelectorAll('[data-slider-panel-show][aria-expanded="true"]');
    activeElements.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  destroy() {
    this.#responsiveController?.abort();
    this.#responsiveController = null;
    this.#destroyDesktopMode();
  }
}
