export default class ButtonTop {
  #btn;
  #offset;
  #abortController;
  #ticking = false;

  constructor(component, options = {}) {
    if (!component) return;
    this.#btn = component;
    
    this.#offset = options.offset ?? 300;
    this.#abortController = new AbortController();

    this.init();
  }

  init() {
    const { signal } = this.#abortController;
    this.#toggleVisibility();

    window.addEventListener('scroll', this.#onScroll, { signal, passive: true });
    this.#btn.addEventListener('click', this.#onButtonClick, { signal });
  }

  #onScroll = () => {
    if (!this.#ticking) {
      window.requestAnimationFrame(() => {
        this.#toggleVisibility();
        this.#ticking = false;
      });
      this.#ticking = true;
    }
  };

  #toggleVisibility() {
    if (!this.#btn) return;

    const isVisible = window.scrollY > this.#offset;
    
    if (this.#btn.classList.contains('show') !== isVisible) {
      this.#btn.classList.toggle('show', isVisible);
      
      this.#btn.hidden = !isVisible;
    }
  }

  #onButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  destroy() {
    this.#abortController.abort();
    
    if (this.#btn) {
      this.#btn.classList.remove('show');
      this.#btn.hidden = false;
      this.#btn = null;
    }
  }
}
