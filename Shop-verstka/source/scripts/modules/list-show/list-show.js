export default class ListShow{
  constructor(component) {
    this.component = component;
    this.trigger = this.component.querySelector('[data-list-show-trigger]');

    if(!this.trigger) return;

    this.abortController = null;
    this.isOpen = this.trigger.getAttribute('aria-expanded', 'true') === 'true';

    this.init();
  }

  init(){
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    this.trigger.addEventListener('click', () => this.toggleState(), { signal });
  }

  toggleState() {
    this.isOpen = !this.isOpen;
    this.trigger.setAttribute('aria-expanded', this.isOpen);
  }

  destroy() {
    this.abortController?.abort();
    this.abortController = null
  }
}