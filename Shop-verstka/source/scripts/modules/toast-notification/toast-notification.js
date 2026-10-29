class ToastItem {
  #toastElement;
  #container;
  #duration;
  #lifeCycleAnimation;
  #triggerBtn;

  constructor({ template, container, duration, triggerBtn }) {
    this.#container = container;
    this.#duration = duration;
    this.#triggerBtn = triggerBtn;
    const templateContent = template.content.cloneNode(true);
    this.#toastElement = templateContent.firstElementChild;

    this.#initElements();
    this.#initEvents();
  }

  #initElements() {
    this.#container.appendChild(this.#toastElement);
    requestAnimationFrame(() => this.#toastElement.classList.add('is-active'));
  }

  #initEvents() {
    this.#lifeCycleAnimation = this.#toastElement.animate(
      [{ opacity: 1 }, { opacity: 1 }], 
      { duration: this.#duration }
    );
    this.#lifeCycleAnimation.onfinish = () => this.destroy();

    const closeBtn = this.#toastElement.querySelector('[data-toast-notification-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.destroy(), { once: true });
      closeBtn.focus();
    }

    this.#toastElement.addEventListener('mouseenter', () => this.#lifeCycleAnimation.pause());
    this.#toastElement.addEventListener('mouseleave', () => this.#lifeCycleAnimation.play());
    this.#toastElement.addEventListener('focusin', () => this.#lifeCycleAnimation.pause());
    this.#toastElement.addEventListener('focusout', (e) => {
      if (!this.#toastElement.contains(e.relatedTarget)) {
        this.#lifeCycleAnimation.play();
        this.#triggerBtn?.focus(); 
      };
    });

    this.#toastElement.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.destroy();
      }
    });
  }

  destroy() {
    if (!this.#toastElement.classList.contains('is-active')) return;
    this.#toastElement.classList.remove('is-active');
    this.#lifeCycleAnimation.cancel();

    const fadeOut = this.#toastElement.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.93)' }
      ],
      { duration: 200, easing: 'ease-out', fill: 'forwards' }
    );

    fadeOut.onfinish = () => {
      const computedStyle = window.getComputedStyle(this.#toastElement);
      const currentHeight = this.#toastElement.offsetHeight;      
      
      this.#toastElement.style.overflow = 'hidden';
      
      const collapse = this.#toastElement.animate(
        [
          { 
            height: `${currentHeight}px`,
            marginTop: computedStyle.marginTop,
            marginBottom: computedStyle.marginBottom,
            paddingTop: computedStyle.paddingTop,
            paddingBottom: computedStyle.paddingBottom
          },
          { 
            height: '0px', marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px', borderTopWidth: '0px', borderBottomWidth: '0px' 
          }
        ],
        { duration: 220, easing: 'ease-in-out' }
      );

      collapse.onfinish = () => {
        this.#toastElement.remove();
        this.#triggerBtn?.focus(); 
      };
    };
  }
}

export default class ToastNotification {
  #container;
  #template;
  #triggerBtns;
  #duration;

  constructor(component, options = {}) {
    this.#template = component;
    this.#container = document.querySelector('.toast-container');
    
    if (!this.#template || !this.#container) return;

    this.#duration = options.duration || 4000; 
    this.#triggerBtns = document.body.querySelectorAll(
      `[data-toast-notification-show="${this.#template.dataset.toastNotification}"]`
    );
    
    this.#init();
  }

  #init() {    
    if (!this.#triggerBtns) return;
    this.#triggerBtns.forEach((triggerBtn) => {
      triggerBtn.addEventListener('click', () => this.show());
    })    
  }

  show() {
    new ToastItem({
      template: this.#template,
      container: this.#container,
      duration: this.#duration,
      triggerBtn: this.#triggerBtns
    });
  }
}
