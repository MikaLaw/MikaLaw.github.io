import {SELECTORS} from '../../utils/utils';

export default class Popup {
  #popup;
  #content;
  #abortController;

  constructor(component) {
    if (!component) return;
    this.#popup = component;
    this.#content = this.#popup.querySelector('[data-popup-content]');
    this.#abortController = new AbortController();
    this.init();
  }

  init() {
    const { signal } = this.#abortController;

    this.#popup.addEventListener('animationend', () => {
      this.#handleAutoClose();
    }, { signal });

    this.#content.addEventListener('mouseleave', () => this.#handleAutoClose(), { signal });
    this.#content.addEventListener('focusout', () => this.#handleAutoClose(), { signal });

    this.#popup.addEventListener('toggle', (event) => {
      if (event.newState === 'open') {
        this.#content.querySelector(SELECTORS.join(',')).focus();
      }
    }, { signal });
  }

  #handleAutoClose() {
    if (this.#content.matches(':hover') || this.#content.matches(':focus-within')) {
      return;
    }

    if (typeof this.#popup.hidePopover === 'function') {
      this.#popup.hidePopover();
    }
  }

  destroy() {
    this.#abortController.abort();
    this.#popup = null;
  }
}