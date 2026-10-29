import Form from '../form/form';

export default class StepsForm {
  constructor(component) {
    this.component = component;
    this.abortController = new AbortController();
    
    this.sections = Array.from(this.component.querySelectorAll('[data-steps-section]'));
    if (this.sections.length === 0) return;

    this.indicators = Array.from(this.component.querySelectorAll('[data-step-item]'));
    this.btnBack = this.component.querySelector('[data-steps-back]');
    this.btnForward = this.component.querySelector('[data-steps-forward]');
    
    this.btnForwardDefaultText = this.btnForward?.textContent || 'Вперед';
    this.btnForwardSubmitText = this.btnForward?.getAttribute('data-text-submit') || 'Отправить';

    this.currentStepIndex = 0;
    this.formValidator = new Form(this.component);
    
    this.init();
  }

  init() {
    this.goToStep(this.currentStepIndex);
    this.bindEvents();
  }

  goToStep(index) {
    this.sections.forEach((section, idx) => {
      const isActive = idx === index;
      section.classList.toggle('is-active', isActive);
      
      if (isActive) {
        section.removeAttribute('inert');
      } else {
        section.setAttribute('inert', '');
      }
    });

    this.indicators.forEach((indicator, idx) => {
      if (idx === index) {
        indicator.setAttribute('aria-current', 'step');
        this.component.querySelector('[data-steps-live-status]').textContent = `Шаг ${index + 1}`;
      } else {
        indicator.removeAttribute('aria-current')
      };
      indicator.classList.toggle('is-active', idx === index);
      indicator.classList.toggle('is-completed', idx < index);
    });

    this.currentStepIndex = index;
    this.updateButtonsState();
  }

  updateButtonsState() {
    if (!this.btnBack || !this.btnForward) return;

    const isFirstStep = this.currentStepIndex === 0;
    const isLastStep = this.currentStepIndex === this.sections.length - 1;

    this.btnBack.disabled = isFirstStep;
    this.btnBack.toggleAttribute('hidden', isFirstStep);

    this.btnForward.textContent = isLastStep ? this.btnForwardSubmitText : this.btnForwardDefaultText;
  }

  bindEvents() {
    if (!this.btnForward || !this.btnBack) return;
    
    const { signal } = this.abortController;

    this.btnForward.addEventListener('click', () => this.handleForward(), { signal });
    this.btnBack.addEventListener('click', () => this.handleBack(), { signal });
  }

  handleForward() {
    const isCurrentStepValid = this.validateStepFields(this.currentStepIndex);
    if (!isCurrentStepValid) return;

    if (this.currentStepIndex === this.sections.length - 1) {
      this.submitForm();
      return;
    }

    this.goToStep(this.currentStepIndex + 1);
  }

  handleBack() {
    if (this.currentStepIndex > 0) {
      this.goToStep(this.currentStepIndex - 1);
    }
  }

  validateStepFields(stepIndex) {
    const currentSection = this.sections[stepIndex];
    if (!currentSection) return true;

    const fieldsInSection = currentSection.querySelectorAll('input, textarea, select');
    
    const { isValid } = this.formValidator.validateSilent(fieldsInSection);

    if (!isValid) {
      const firstError = currentSection.querySelector('.is-invalid');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  submitForm() {
    const form = this.component.querySelector('form');
    if (!form) return;

    const { isValid } = this.formValidator.validationAll(form.elements);

    if (isValid) {
      form.dispatchEvent(new CustomEvent('form-valid', { detail: { form } }));
      console.log('Многошаговая форма успешно валидирована и готова к отправке!');
    }
  }

  destroy() {
    this.abortController.abort();
    this.formValidator.destroy();
  }
}