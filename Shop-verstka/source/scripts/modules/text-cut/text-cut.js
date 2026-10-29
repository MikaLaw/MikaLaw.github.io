export default class TextCut {
  #block;
  #wrapper;
  #text;
  #button;
  #abortController;
  #resizeObserver = null;
  #resizeAnimationFrameId = null;

  #fullHeight = 0;
  #clampedHeight = 0;
  #previousWidth = 0;
  #isOpen = false;
  #animation = null;

  constructor(element) {
    if (!element) return;
    this.#block = element;
    this.#wrapper = this.#block.querySelector('[data-text-cut-wrapper]');
    this.#text = this.#block.querySelector('[data-text-cut-text]');
    this.#button = this.#block.querySelector('[data-text-cut-button]');
    
    this.#abortController = new AbortController();
    this.init();
  }

  init() {
    const { signal } = this.#abortController;

    this.#updateHeights();
    this.#updateUiBtn();
        
    this.#button.addEventListener('click', () => this.toggle(), { signal });

    this.#resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const currentWidth = entry ? entry.contentRect.width : this.#block.offsetWidth;
            
      if (this.#previousWidth === currentWidth) return;
      this.#previousWidth = currentWidth;

      cancelAnimationFrame(this.#resizeAnimationFrameId);
      this.#resizeAnimationFrameId = requestAnimationFrame(() => {
        if (this.#isOpen) {
          this.toggle(false, false);
        }
        this.#updateHeights();
        this.#updateUiBtn();
      });
    });

    this.#resizeObserver.observe(this.#block);
  }

  async toggle(show = !this.#isOpen, animate = true) {
    if (this.#isOpen === show) return;
    this.#isOpen = show;

    this.#button.setAttribute('aria-expanded', String(this.#isOpen));
    this.#button.querySelector('.button__text').textContent = this.#isOpen ? 'Скрыть' : 'Подробнее';

    if (!animate) {
      this.#text.classList.toggle('is-clamp', !this.#isOpen);
      return;
    }

    if (this.#animation) this.#animation.cancel();

    const startHeight = this.#isOpen ? this.#clampedHeight : this.#fullHeight;
    const endHeight = this.#isOpen ? this.#fullHeight : this.#clampedHeight;
        
    if (this.#isOpen) this.#text.classList.remove('is-clamp');

    this.#animation = this.#wrapper.animate(
      [
        { maxHeight: `${startHeight}px` },
        { maxHeight: `${endHeight}px` }
      ], 
      {
        duration: 400,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    );

    if (!this.#isOpen) {
      try {
        await this.#animation.finished;
        if (!this.#isOpen) {
          this.#text.classList.add('is-clamp');
          this.#animation = null;
        }
      } catch (e) {
      }
    }
  }

  #updateUiBtn() { 
     this.#button.hidden = this.#fullHeight <= this.#clampedHeight;
  }

  #updateHeights() {
    this.#text.classList.add('is-clamp');
    this.#clampedHeight = this.#wrapper.offsetHeight;
    this.#text.classList.remove('is-clamp');
    this.#fullHeight = this.#wrapper.scrollHeight;
    if (!this.#isOpen) this.#text.classList.add('is-clamp');
  }

  destroy() {
    cancelAnimationFrame(this.#resizeAnimationFrameId);
    this.#resizeObserver?.disconnect();
    this.#abortController?.abort();
    
    if (this.#animation) {
      this.#animation.cancel();
      this.#animation = null;
    }

    this.#text.classList.add('is-clamp');
    this.#button.setAttribute('aria-expanded', 'false');
    this.#button.querySelector('.button__text').textContent = 'Подробнее';
    this.#button.hidden = false;

    this.#block = null;
    this.#wrapper = null;
    this.#text = null;
    this.#button = null;
  }
}