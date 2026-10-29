export default class Select {
  #select;
  #isMulti;
  #form;
  #abortController;
  #selectButton;
  #selectText;
  #selectClear;
  #selectList;
  #selectItems;
  #selectNative;
  #isOpen;

  constructor(component) {
    this.#select = component;
    this.#isMulti = 'multiple' in this.#select.dataset;
    this.#form = this.#select.closest('form');
    this.#abortController = new AbortController();
    this.#selectButton = this.#select.querySelector('[data-select-button]');
    this.#selectText = this.#select.querySelector('[data-select-text]');
    this.#selectClear = this.#select.querySelector('[data-select-clear]');
    this.#selectList = this.#select.querySelector('[data-select-list]');
    this.#selectItems = Array.from(this.#select.querySelectorAll('[data-select-item]'));
    
    this.#selectNative = null;
    this.#isOpen = this.#selectButton.getAttribute('aria-expanded') === "true" || false;
    
    this.#init();
  }

  #init() {
    const { signal } = this.#abortController;
    this.#setSelectedTextInButton();
    
    if (this.#selectItems.length) {
      this.#createHiddenNativeSelect();
    }
    
    this.#selectButton.addEventListener('click', () => this.#onSelectToggle(), { signal });
    document.addEventListener('click', (e) => this.#onDocumentClick(e), { signal });
    this.#selectList?.addEventListener('click', (e) => this.#onSelectListClick(e), { signal });
    this.#selectClear?.addEventListener('click', (e) => this.#onSelectClearClick(e), { signal });
    this.#select.addEventListener('keydown', (e) => this.#onKeyDown(e), { signal });
    this.#select.addEventListener('focusout', (e) => this.#onFocusOut(e), { signal });
    
    if (this.#form) {
      if ('customFilter' in this.#select.dataset) this.#setupFiltersAction(signal);
      this.#form.addEventListener('reset', (e) => this.#onSelectClearClick(e), { signal });
    }
  }

  #createHiddenNativeSelect() {
    const { id, name, required, multiple, disabled } = this.#select.dataset;
    const nativeSelect = document.createElement('select');
    
    Object.assign(nativeSelect, {
      id: id || '',
      hidden: true,
      name: name || '',
      required: required !== undefined,
      multiple: multiple !== undefined,
      disabled: disabled !== undefined,
    });
    
    let hasActive = false;
    const options = this.#selectItems.map(item => {
      const isActive = item.getAttribute('aria-selected') === 'true';
      if (isActive) hasActive = true;
      
      const text = item.querySelector('[data-select-item-text]')?.textContent?.trim() || '';
      return new Option(text, item.dataset.selectValue || '', false, isActive);
    });
    
    nativeSelect.append(...options);
    this.#select.append(nativeSelect);
    this.#selectNative = nativeSelect;
    
    if (!hasActive) {
      this.#selectNative.selectedIndex = -1;
    }
  }

  #setSelectedTextInButton() {
    if (!this.#selectText) return;
    const selectedItems = this.#selectItems.filter(item => item.getAttribute('aria-selected') === 'true');
    const count = selectedItems.length;
    
    if (count > 0) {
      this.#selectText.textContent = count > 1 
        ? `Выбрано: ${count}` 
        : selectedItems[0].querySelector('[data-select-item-text]')?.textContent?.trim() || '';
    } else {
      this.#selectText.textContent = '';
    }
  }

  #onSelectToggle(show = !this.#isOpen) {
    this.#isOpen = show;
    this.#selectButton.setAttribute('aria-expanded', show);
  }

  #onDocumentClick(e) {
    if (!this.#select.contains(e.target)) {
      this.#onSelectToggle(false);
    }
  }

  #onSelectListClick(e) {
    const clickedItem = e.target.closest('[data-select-item]');
    if (!clickedItem) return;
    this.#toggleItemState(clickedItem);
  }

  #toggleItemState(item, forceState = null) {
    if (!this.#selectNative) return;
    
    const isSelected = forceState !== null ? forceState : item.getAttribute('aria-selected') !== 'true';
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    
    const nativeOption = Array.from(this.#selectNative.options).find(opt => opt.value === item.dataset.selectValue);
    if (nativeOption) nativeOption.selected = isSelected;
    
    if (isSelected && !this.#isMulti) {
      this.#selectItems.forEach(el => {
        if (el !== item) {
          el.setAttribute('aria-selected', 'false');
          const opt = Array.from(this.#selectNative.options).find((opt) => opt.value === el.dataset.selectValue);
          if (opt) opt.selected = false;
        }
      });
      this.#onSelectToggle(false);
      this.#selectButton.focus();
    }
    
    this.#setSelectedTextInButton();
    
    if (this.#form) {
      this.#onOptionValueChange();
      
      if ('customFilter' in this.#select.dataset) {
        this.#dispatchChangeFilterEvent(item);
      }
    }
  }

  #onOptionValueChange() {
    if (!this.#selectNative) return;
    
    this.#selectNative.dispatchEvent(new Event('change', { bubbles: true }));
    this.#selectNative.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #onSelectClearClick(e) {
    e.stopPropagation();
    this.#selectItems.forEach(item => item.setAttribute('aria-selected', 'false'));
    
    if (this.#selectNative) {
      if (this.#isMulti) {
        Array.from(this.#selectNative.options).forEach(opt => opt.selected = false);
      } else {
        this.#selectNative.selectedIndex = -1;
      }
    }
    
    this.#setSelectedTextInButton();
    this.#onSelectToggle(false);
    this.#selectButton.focus();
    
    if (this.#form) {
      this.#onOptionValueChange();
      if ('customFilter' in this.#select.dataset) {
        this.#dispatchClearFilterEvent();
      }
    }
  }

  #onKeyDown(e) {
    switch (e.key) {
      case 'Escape':
        if (this.#isOpen) {
          e.preventDefault();
          this.#onSelectToggle(false);
          this.#selectButton.focus();
        }
        break;
      case 'Enter':
      case ' ':
        const target = e.target.closest('[data-select-item]');
        if (target) {
          e.preventDefault();
          this.#toggleItemState(target);
        }
        break;
      default:
        break;
    }
  }

  #onFocusOut(event) {
    const target = event.relatedTarget || event.target;
    if (target && this.#select.contains(target)) {
      return;
    }
    this.#onSelectToggle(false);
  }

  #setupFiltersAction(signal) {
    this.#form.addEventListener('filter:init', () => this.#dispatchInitFilterEvent(), { signal });
    this.#form.addEventListener('filter:clear', (e) => this.#onSelectClearClick(e), { signal });
    this.#form.addEventListener('filter:add', (e) => this.#dispatchChangeItemFilterEvent(e, true), { signal });
    this.#select.addEventListener('filter:reset', (e) => this.#dispatchChangeItemFilterEvent(e, false), { signal });
  }

  #getItemData(item) {
    return {
      id: item.id,
      text: item.querySelector('[data-select-item-text]')?.textContent?.trim() || '',
      target: this.#select,
    };
  }

  #filterEvent(action, payload = null) {
    const detail = {
      name: this.#select.dataset.name, 
      action
    };
    if (payload !== null) detail.payload = payload;
    this.#select.dispatchEvent(new CustomEvent('filter:change', { bubbles: true, detail }));
  }

  #dispatchInitFilterEvent() {
    const activeOptions = this.#selectItems
      .filter(item => item.getAttribute('aria-selected') === 'true')
      .map(item => this.#getItemData(item));
    this.#filterEvent('set-group', activeOptions);
  }

  #dispatchChangeFilterEvent(item) {
    const isSelected = item.getAttribute('aria-selected') === 'true';
    const action = isSelected ? 'add' : 'delete';
    
    if (this.#isMulti || !isSelected) {
      this.#filterEvent(action, this.#getItemData(item));
    } else {
      this.#filterEvent('replace-group', this.#getItemData(item));
    }
  }

  #dispatchChangeItemFilterEvent(e, isAdd = false) {
    const targetId = e.detail?.id;
    const targetItem = this.#selectItems.find((item) => item.id === targetId);
    if (!targetItem) return;
    this.#toggleItemState(targetItem, isAdd);
  }

  #dispatchClearFilterEvent() {
    this.#filterEvent('delete-group');
  }

  destroy() {
    this.#abortController.abort();
  }
}
