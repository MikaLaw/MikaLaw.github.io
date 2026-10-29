import InputSearch from '../input-search/input-search';

export default class SelectSearch {
  #component;
  #searchInput;
  #searchList;
  #mode;
  #inputSearchInstance;
  #debounceTimer;
  #abortController;
  #isOpen;
  #activeIndex;

  constructor(component) {
    if (!component) return;
        
    this.#component = component;
    this.#searchInput = component.querySelector('[data-input-search-field]');
    this.#searchList = component.querySelector('[data-select-search-list]');
    this.#mode = this.#component.dataset.mode || 'default';
    this.#inputSearchInstance = new InputSearch(this.#component.querySelector('[data-input-search]'));
    
    this.#debounceTimer = null;
    this.#abortController = null;
    this.#isOpen = false;
    this.#activeIndex = -1;
        
    this.#init();
  }

  #init() {
    if (!this.#searchInput || !this.#searchList) return;
        
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    
    this.#searchInput.addEventListener('input', (e) => { 
      this.#debounce(() => this.#handleSearchInput(e));
    }, { signal });
    
    this.#searchInput.addEventListener('focus', (e) => this.#handleSearchInput(e), { signal });
    this.#searchList.addEventListener('click', (e) => this.#onSearchListClick(e), { signal });
    this.#component.addEventListener('focusout', (e) => this.#onFocusOut(e), { signal });
    document.addEventListener('click', (e) => this.#onDocumentClick(e), { signal });
    document.addEventListener('keydown', (e) => this.#onEscapePress(e), { signal });
    
    if (this.#mode !== 'component') {
      this.#component.addEventListener('keydown', (e) => this.#onKeyDown(e), { signal });
    }
  }

  #debounce(callback) {
    cancelAnimationFrame(this.#debounceTimer);
    this.#debounceTimer = requestAnimationFrame(callback);
  }

  #handleSearchInput(e) {
    const value = e.target.value.trim();
    this.#updateActiveOption(-1);
    this.#onSearchToggle(!!value);
  }

  #onSearchToggle(show) {
    this.#isOpen = show;
    this.#component.setAttribute('aria-expanded', show);
    if (!show) {
      this.#updateActiveOption(-1);
    }
  }

  #onDocumentClick(e) {
    if (!this.#component.contains(e.target)) {
      this.#onSearchToggle(false);
    }
  }

  #onFocusOut(event) {
    if (event.relatedTarget && this.#component.contains(event.relatedTarget)) {
      return;
    }
    this.#onSearchToggle(false);
  }

  #onEscapePress(e) {
    if (e.key === "Escape" && this.#isOpen) {
      this.#onSearchToggle(false);
      this.#searchInput.focus();
    }
  }

  #onSearchListClick(e) {
    const clickedItem = e.target.closest('[data-select-search-item]');
    if (!clickedItem) return;
    this.#toggleItemState(clickedItem);
  }

  #toggleItemState(targetItem) {
    const textEl = targetItem.querySelector('[data-select-search-text]');
    this.#searchInput.value = textEl?.textContent.trim() || '';
        
    this.#clearAllSelections();
    targetItem.setAttribute('aria-selected', 'true');
    this.#onSearchToggle(false);
  }

  #clearAllSelections() {
    Array.from(this.#searchList.children).forEach(el => 
      el.setAttribute('aria-selected', 'false')
    );
  }

  #onKeyDown(e) {
    const itemsCount = this.#searchList.children.length;
    
    switch (e.key) {
      case 'Tab':
        if (this.#isOpen) this.#onSearchToggle(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.#isOpen) {
          this.#onSearchToggle(true);
        } else if (itemsCount > 0) {
          const nextIndex = (this.#activeIndex + 1) % itemsCount;
          this.#updateActiveOption(nextIndex);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.#isOpen) {
          this.#onSearchToggle(true);
        } else if (itemsCount > 0) {
          const prevIndex = (this.#activeIndex - 1 + itemsCount) % itemsCount;
          this.#updateActiveOption(prevIndex);
        }
        break;
      case 'Enter':
        if (this.#isOpen) {
          if (this.#activeIndex >= 0 && this.#searchList.children[this.#activeIndex]) {
            this.#toggleItemState(this.#searchList.children[this.#activeIndex]);
          }
        }
        break;
      default:
        break;
    }
  }

  #updateActiveOption(index) {
    this.#activeIndex = index;
    const items = Array.from(this.#searchList.children);
    
    items.forEach((item, idx) => {
      const isActive = idx === this.#activeIndex;
      item.classList.toggle('is-active', isActive);
            
      if (isActive) {
        this.#component.setAttribute('aria-activedescendant', item.id || `opt-${idx}`);
        item.scrollIntoView({ block: 'nearest' });
      }
    });
    
    if (this.#activeIndex < 0) {
      this.#component.removeAttribute('aria-activedescendant');
    }
  }

  destroy() {
    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }
    this.#inputSearchInstance?.destroy()
  }
}
