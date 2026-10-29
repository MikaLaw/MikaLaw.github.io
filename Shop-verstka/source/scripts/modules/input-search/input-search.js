export default class InputSearch {
  #component;
  #searchInput;
  #searchBtn;
  #abortController;

  constructor(component) {
    if (!component) return;

    this.#component = component;
    this.#searchInput = this.#component.querySelector('[data-input-search-field]');
    this.#searchBtn = this.#component.querySelector('[data-input-search-button]');

    if (!this.#searchInput) return;

    this.#abortController = new AbortController();
    this.init();
  }

  init() {
    const { signal } = this.#abortController;

    this.#searchInput.addEventListener('input', (e) => this.#handleSearchInput(e), { signal });
    
    if (this.#searchBtn) {
      this.#searchBtn.addEventListener('click', () => this.handleSearchButtonClick(), { signal });
    }

    this.#checkInitialState();
  }

  #handleSearchInput(e) {
    const value = e.target.value;
    const isNotEmpty = value.length > 0;
    this.#component.classList.toggle('is-not-empty', isNotEmpty);
  }

  handleSearchButtonClick() {
    if (this.#searchInput.value.length === 0) return;

    this.#searchInput.value = '';
    this.#component.classList.remove('is-not-empty');
    this.#searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    this.#searchInput.focus();
  }

  #checkInitialState() {
    if (this.#searchInput.value.length > 0) {
      this.#component.classList.add('is-not-empty');
    }
  }

  destroy() {
    this.#abortController.abort();
    this.#component = null;
    this.#searchInput = null;
    this.#searchBtn = null;
  }
}