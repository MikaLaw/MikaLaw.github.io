export default class InputPassword {
  #component;
  #input;
  #button;
  #isPasswordVisible = false;

  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.#input = this.#component.querySelector('input');
    this.#button = this.#component.querySelector('button');

    if (!this.#input || !this.#button) return;
    this.init();
  }

  init() {
    this.#button.addEventListener('click', this.#handleToggleVisibility);
  }

  #handleToggleVisibility = () => {
    this.#isPasswordVisible = !this.#isPasswordVisible;
    this.#input.setAttribute('type', this.#isPasswordVisible ? 'text' : 'password');
    this.#button.setAttribute('aria-label', this.#isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль');
  };

  destroy() {
    if (this.#button) {
      this.#button.removeEventListener('click', this.#handleToggleVisibility);
    }
    
    this.#component = null;
    this.#input = null;
    this.#button = null;
  }
}