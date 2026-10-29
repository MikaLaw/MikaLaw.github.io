export default class Fieldset {
  constructor(component) {
    if (!component) return;
    this.component = component;
    this.inputs = Array.from(this.component.querySelectorAll('input'));
    this.name = this.component.dataset.name;
    this.form = this.component.closest('form');
    this.abortController = new AbortController();
    
    this.init();
  }

  init() {
    const { signal } = this.abortController;

    this.component.addEventListener('change', (e) => this.dispatchChangeFilterEvent(e), { signal });
    this.component.addEventListener('filter:reset', (e) => this.dispatchResetFilterEvent(e), { signal });

    if (this.form) {
      this.form.addEventListener('filter:init', () => this.dispatchInitFilterEvent(), { signal });
      this.form.addEventListener('filter:clear', () => this.dispatchClearFilterEvent(), { signal });
      this.form.addEventListener('filter:add', (e) => this.dispatchAddFilterEvent(e), { signal });
    }
  }

  dispatchChangeFilterEvent(e) {
    const target = e.target;
    if (!target || target.tagName !== 'INPUT') return;

    if (target.type === 'radio') {
      this.filterEvent('replace-group', this.getItemData(target));
    } else {
      const action = target.checked ? 'add' : 'delete';
      this.filterEvent(action, this.getItemData(target));
    }
  }

  dispatchInitFilterEvent() {
    const activeOptions = this.inputs
      .filter(input => input.checked)
      .map(input => this.getItemData(input));
    
    this.filterEvent('set-group', activeOptions);
  }

  dispatchClearFilterEvent() {
    this.inputs.forEach((input) => {
      input.checked = false;
    });
    this.filterEvent('delete-group');
  }

  dispatchAddFilterEvent(e) {
    const targetId = e.detail?.id;
    const addItem = this.inputs.find((input) => input.id === targetId);
    if (!addItem) return;

    addItem.checked = true;
    
    // Если это радиокнопка, добавление должно вытеснить прошлые значения группы
    const action = addItem.type === 'radio' ? 'replace-group' : 'add';
    this.filterEvent(action, this.getItemData(addItem));
  }

  dispatchResetFilterEvent(e) {
    const targetId = e.detail?.id;
    const resetedItem = this.inputs.find((input) => input.id === targetId);
    if (!resetedItem) return;

    resetedItem.checked = false;
    this.filterEvent('delete', this.getItemData(resetedItem));
  }

  getItemData(input) {
    return {
      id: input.id,
      value: input.value,
      text: this.getLabelText(input),
      target: this.component,
    };
  }

  getLabelText(input) {
    if (input.id && this.form) {
      const label = this.form.querySelector(`label[for="${input.id}"]`);
      if (label) return label.textContent.trim();
    }
    return input.closest('label')?.textContent?.trim() || input.value;
  }

  filterEvent(action, payload = null) {
    const detail = {
      name: this.name,
      action
    };
    if (payload !== null) detail.payload = payload;

    this.component.dispatchEvent(new CustomEvent('filter:change', {
      bubbles: true,
      cancelable: true,
      detail
    }));
  }

  destroy() {
    this.abortController.abort();
    this.component = null;
    this.form = null;
    this.inputs = [];
  }
}