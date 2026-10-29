class RowsStrategy {
  #ctx;
  constructor(ctx) { 
    this.#ctx = ctx; 
  }

  render(toMain, toHide) {
    toMain.forEach(item => item.el.classList.remove('to-hide')); 
    toHide.forEach(item => item.el.classList.add('to-hide'));     
  }

  getToggleBtnText(count, isOpen) {
    return isOpen ? 'Скрыть' : `Еще +${count}`;
  }
}

class DropdownStrategy {
  #ctx;
  constructor(ctx, signal) { 
    this.#ctx = ctx; 
    document.addEventListener('click', (e) => this.#handleOutsideClick(e), { signal });
    document.addEventListener('keydown', (e) => this.#handleKeyDown(e), { signal });
  }

  render(toMain, toHide) {
    const dropdown = this.#ctx.toggleDropdown;
    const component = this.#ctx.component;
    const btnContainer = this.#ctx.toggleBtnContainer;

    toHide.forEach(item => {
      if (item.el.parentElement !== dropdown) {
        dropdown.prepend(item.el);
      }
    });

    toMain.forEach(item => {
      if (item.el.parentElement !== component) {
        component.insertBefore(item.el, btnContainer);
      }
    });
  }
  
  getToggleBtnText(count, isOpen) {
    return `Еще +${count}`;    
  }

  #handleOutsideClick(e) {
    if (!this.#ctx.component.contains(e.target) && this.#ctx.isOpen) {
      this.#ctx.onToggleBtnClick(false);
    }
  }

  #handleKeyDown(e) {
    if (e.key === 'Escape' && this.#ctx.isOpen) {
      this.#ctx.onToggleBtnClick(false);
      this.#ctx.toggleBtn?.focus();
    }
  }
}

export default class PriorityTags {
  #previousWidth = 0;
  #abortController = new AbortController();
  #resizeAnimationFrameId = null;
  #resizeObserver = null;
  #mutationObserver = null;
  #itemsCache = new Map();

  constructor(component) {
    this.component = component;
    this.toggleBtnContainer = null;
    this.toggleBtn = null;
    this.toggleDropdown = null;
    this.isOpen = false;
    this.mode = this.component.dataset.mode || 'rows';
    this.strategy = this.mode === 'rows' ? new RowsStrategy(this) : new DropdownStrategy(this, this.#abortController.signal);
    this.items = [];
    this.toHideItems = [];
    
    this.init();
  }

  init() {
    this.createMoreBtn();
    this.updateItemsCache(true);
    this.setupObservers();

    this.toggleBtn?.addEventListener('click', () => this.onToggleBtnClick(), { signal: this.#abortController.signal });
    
    if (this.mode === "dropdown") {
      this.toggleBtnContainer.addEventListener('focusout', (event) => {
        if (!event.relatedTarget || !this.toggleBtnContainer.contains(event.relatedTarget)) {
          this.onToggleBtnClick(false);
        }
      });      
    }
    this.render();
  }

  updateItemsCache(isInitial = false) {
    const elements = [...this.component.children, ...this.toggleDropdown?.children || []]
      .filter(el => el !== this.toggleBtnContainer);

    this.items = elements.map(el => {
      el.classList.remove('to-hide');
      
      if (isInitial || !this.#itemsCache.has(el) || el.getBoundingClientRect().width > 0) {
        this.#itemsCache.set(el, el.getBoundingClientRect().width);
      }

      return {
        el,
        width: this.#itemsCache.get(el)
      };
    });
  }

  createMoreBtn() {
    const isDropdown = this.mode === 'dropdown';
    const li = document.createElement('li');
    const uid = `pr-tags-${Math.random().toString(36).substring(2, 7)}`;
    
    li.hidden = true;
    li.setAttribute('data-priority-tags-button-container', '');
    
    const ariaControls = isDropdown ? `aria-controls="${uid}-drop"` : '';
    const ariaHasPopup = isDropdown ? 'aria-haspopup="true"' : 'aria-haspopup="false"';
    
    li.innerHTML = `
      <button class="button button--outline button--small"
        type="button"
        id="${uid}-btn"
        data-priority-tags-button
        aria-expanded="false"
        ${ariaHasPopup}
        ${ariaControls}>
        Еще +__
      </button>
      ${isDropdown ? `<ul id="${uid}-drop" data-priority-tags-dropdown hidden aria-labelledby="${uid}-btn"></ul>` : ''}
    `;

    this.toggleBtnContainer = li;
    this.toggleBtn = li.querySelector('[data-priority-tags-button]');
    if (isDropdown) this.toggleDropdown = li.querySelector('[data-priority-tags-dropdown]');
    
    this.component.append(li);
  }

  setupObservers() {
    this.#resizeObserver = new ResizeObserver(() => {
      const currentWidth = this.component.offsetWidth;
      if (this.#previousWidth === currentWidth) return;
      this.#previousWidth = currentWidth;
      cancelAnimationFrame(this.#resizeAnimationFrameId);
      this.#resizeAnimationFrameId = requestAnimationFrame(() => this.render());
    });

    this.#resizeObserver.observe(this.component);

    this.#mutationObserver = new MutationObserver(() => {
      this.updateItemsCache(false);
      this.render();
    });

    this.#mutationObserver.observe(this.component, { childList: true });
    if (this.mode === "dropdown") this.#mutationObserver.observe(this.toggleDropdown, { childList: true });
  }

  render() {
    if (!this.items.length) return;
    if (this.#mutationObserver) this.#mutationObserver.disconnect();
    
    this.toggleBtnContainer.hidden = false; 
    const { toMain, toHide } = this.calculate(this.component.getBoundingClientRect().width);
    this.toHideItems = toHide;
    this.strategy.render(toMain, toHide);  
    
    this.toggleBtnContainer.hidden = toHide.length === 0;
    this.toggleBtn.textContent = this.strategy.getToggleBtnText(this.toHideItems.length, this.isOpen);

    if (this.#mutationObserver) {
      this.#mutationObserver.observe(this.component, { childList: true });
      if (this.mode === "dropdown") this.#mutationObserver.observe(this.toggleDropdown, { childList: true }); 
    }
  }

  calculate(containerWidth) {
    let currentTotalWidth = 0;
    let splitIndex = this.items.length;
    const moreBtnWidth = this.toggleBtnContainer?.getBoundingClientRect().width || 0;
    const containerGap = parseFloat(window.getComputedStyle(this.component).gap) || 0;

    for (let i = 0; i < this.items.length; i++) {
      const itemWidth = this.items[i].width + containerGap;
      const limit = (i === this.items.length - 1) ? containerWidth : (containerWidth - moreBtnWidth - containerGap);

      if ((currentTotalWidth + itemWidth) > limit) {
        splitIndex = i;
        break;
      }
      currentTotalWidth += itemWidth;
    }

    return {
      toMain: this.items.slice(0, splitIndex),
      toHide: this.items.slice(splitIndex).reverse(),
    };
  }

  onToggleBtnClick(show = !this.isOpen) {
    this.isOpen = show;
    this.toggleBtn.setAttribute('aria-expanded', this.isOpen);
    this.toggleBtn.textContent = this.strategy.getToggleBtnText(this.toHideItems.length, this.isOpen);
    
    if (this.toggleDropdown) {
      this.toggleDropdown.hidden = !this.isOpen;
    }
  }

  destroy() {
    cancelAnimationFrame(this.#resizeAnimationFrameId);
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this.#abortController.abort();
    this.#itemsCache.clear();

  if (this.mode === 'rows') {
      this.component.querySelectorAll('.to-hide').forEach((item) => item.classList.remove('to-hide'));
    } else if (this.toggleDropdown) {
      Array.from(this.toggleDropdown.children).forEach(item => this.component.append(item));
    }    

    this.toggleBtnContainer.remove();
  }
}
