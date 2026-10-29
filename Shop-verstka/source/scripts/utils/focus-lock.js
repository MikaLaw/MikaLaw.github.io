import {SELECTORS} from './utils';

export default class FocusLock {
  constructor() {
    this.container = null;
    this.lastFocusedElement = null;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  lock(containerElement) {
    if (!containerElement) return;

    if (this.container) this.unlock();

    this.container = containerElement;
    this.lastFocusedElement = document.activeElement;

    const focusable = this.getFocusableElements();
    if (focusable.length > 0) focusable[0].focus();

    document.addEventListener('keydown', this.handleKeydown);
  }

  unlock() {
    document.removeEventListener('keydown', this.handleKeydown);
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
    }

    this.container = null;
    this.lastFocusedElement = null;
  }

  getFocusableElements() {
    if (!this.container) return [];
    return Array.from(this.container.querySelectorAll(SELECTORS));
  }

  handleKeydown(e) {
    if (e.key !== 'Tab') return;

    const focusable = this.getFocusableElements();
    if (focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}