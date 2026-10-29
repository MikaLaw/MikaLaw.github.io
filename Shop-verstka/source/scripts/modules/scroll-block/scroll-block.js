export default class ScrollBlock {
  #component;
  #abortController;
  #resizeObserver = null;
  #mutationObserver = null;
  #dragController = null;
  #state = {
    isDown: false,
    startX: 0,
    scrollLeft: 0
  };
  
  #isOverflowing = false;

  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.#abortController = new AbortController();
    
    this.init();
  }

  init() {
    const { signal } = this.#abortController;

    this.updateScrollState();

    this.#component.addEventListener('mousedown', this.#startDragging, { signal });
    this.#component.addEventListener('dragstart', this.#handleDragStart, { signal });
    this.#component.addEventListener('wheel', this.#handleWheel, { signal, passive: false });
    this.#component.addEventListener('scroll', () => this.#handleScroll(), { signal, passive: true });

    this.#resizeObserver = new ResizeObserver(() => {
      this.updateScrollState();
      if (this.#component && this.#component.clientWidth >= this.#component.scrollWidth) {
        this.#component.scrollLeft = 0;
      }
    });
    this.#resizeObserver.observe(this.#component);

    this.#mutationObserver = new MutationObserver(() => this.updateScrollState());
    this.#mutationObserver.observe(this.#component, { childList: true });
  }

  updateScrollState() {
    if (!this.#component) return;
    
    this.#isOverflowing = this.#component.scrollWidth > this.#component.clientWidth;
    this.#handleScroll();
  }

  #handleScroll() {
    if (!this.#component || !this.#isOverflowing) {
      this.#component?.style.setProperty('--mask-left', '0%');
      this.#component?.style.setProperty('--mask-right', '0%');
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = this.#component;
    
    const leftMask = Math.min(scrollLeft / 50, 1) * 8;
    const rightMask = Math.min((scrollWidth - clientWidth - scrollLeft) / 50, 1) * 8;

    this.#component.style.setProperty('--mask-left', `${leftMask}%`);
    this.#component.style.setProperty('--mask-right', `${rightMask}%`);
  }

  #startDragging = (e) => {
    // Активируем перетаскивание только левой кнопкой мыши и только при наличии оверлоу
    if (e.button !== 0 || !this.#isOverflowing) return;

    this.#state.isDown = true;
    this.#component.classList.add('is-grabbing');
    
    this.#state.startX = e.clientX;
    this.#state.scrollLeft = this.#component.scrollLeft;

    this.#dragController = new AbortController();
    window.addEventListener('mouseup', this.#stopDragging, { signal: this.#dragController.signal });
    window.addEventListener('mousemove', this.#moveDragging, { signal: this.#dragController.signal });
  };

  #stopDragging = () => {
    if (!this.#state.isDown) return;
    
    this.#state.isDown = false;
    this.#component.classList.remove('is-grabbing');
    
    this.#dragController?.abort();
    this.#dragController = null;
  };

  #moveDragging = (e) => {
    if (!this.#state.isDown) return;

    const x = e.clientX;
    const walk = (x - this.#state.startX) * 1.5; // 1.5 — коэффициент ускорения прокрутки
    this.#component.scrollLeft = this.#state.scrollLeft - walk;
  };

  #handleWheel = (e) => {
    if (e.deltaY === 0 || !this.#isOverflowing) return;

    const { scrollLeft, scrollWidth, clientWidth } = this.#component;
    const isScrollAtStart = scrollLeft === 0;
    const isScrollAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

    if ((e.deltaY < 0 && !isScrollAtStart) || (e.deltaY > 0 && !isScrollAtEnd)) {
      e.preventDefault();
      this.#component.scrollLeft += e.deltaY;
    }
  };

  #handleDragStart = (e) => e.preventDefault();

  destroy() {
    this.#resizeObserver?.disconnect();
    this.#mutationObserver?.disconnect();
    this.#dragController?.abort();
    this.#abortController.abort();

    if (this.#component) {
      this.#component.classList.remove('is-grabbing');
      this.#component.style.removeProperty('--mask-left');
      this.#component.style.removeProperty('--mask-right');
      this.#component = null;
    }
  }
}
