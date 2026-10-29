class DialogManager {
  static #instances = new Set();
  static #activeCount = 0;

  static register(instance) { this.#instances.add(instance); }
  static unregister(instance) { this.#instances.delete(instance); }

  static trackOpen() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }
  }

  static trackClose() {
    this.#activeCount = Math.max(0, this.#activeCount - 1);
    if (this.#activeCount === 0) {
      document.body.style.removeProperty('--scrollbar-width');
    }
  }

  static closeAll() {
    this.#instances.forEach(instance => {
      if (instance.isOpen) instance.closeModal();
    });
  }
}

export default class DialogController {
  constructor(component) {
    if (!component) return;

    this.dialog = component;
    this.dialogId = this.dialog.dataset.modal;
    
    this.openBtns = document.querySelectorAll(`[data-modal-show="${this.dialogId}"]`);
    this.closeBtns = document.querySelectorAll(`[data-modal-close="${this.dialogId}"]`);

    this.abortController = new AbortController();

    DialogManager.register(this);
    this.init();
  }

  get isOpen() {
    return this.dialog.open;
  }

  init() {
    const { signal } = this.abortController;

    this.openBtns.forEach(btn => {
      btn.addEventListener('click', () => this.openModal(), { signal });
    });

    this.closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal(), { signal });
    });

    this.dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeModal();
    }, { signal });

    this.dialog.addEventListener('click', (e) => {
      if (e.target.nodeName === 'DIALOG') {
        this.closeModal();
      }
    }, { signal });
  }

  openModal() {
    if (this.isOpen) return;
    DialogManager.trackOpen();
    this.openBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'true'));
    this.dialog.showModal();    
  }

  closeModal() {
    if (!this.isOpen) return;
    DialogManager.trackClose();
    this.openBtns.forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
    this.dialog.close();    
  }

  closeModalAll() {
    DialogManager.closeAll();
  }

  destroy() {
    this.closeModal();
    DialogManager.unregister(this);
    this.abortController.abort();
  }
}
