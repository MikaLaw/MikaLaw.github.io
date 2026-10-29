import Form from '../form/form';

export default class OrderStep {
  constructor(component) {
    this.component = component;
    this.abortController = new AbortController();
      
    this.sections = Array.from(this.component.querySelectorAll('[data-steps-section]'));
    this.btnSubmit = this.component.querySelector('[data-steps-submit]') || null;
    if (this.sections.length === 0) return;
  
    this.currentStepIndex = 0;
    this.formValidator = new Form(this.component, {
      validateOnInput: true,
      validateOnBlur: true,
      validateOnChange: true,
    });
      
    this.init();
  }

  init() {
    const { signal } = this.abortController;
    this.goToStep(this.currentStepIndex);

    this.btnSubmit.addEventListener('click', () => {
      this.submitForm();
    }, { signal })
    this.watchRequiredFields();
  }

  goToStep(index) {
    this.sections.forEach((section, idx) => {
      const isActive = idx === index;

      if (isActive) {
        section.classList.add('is-active');
        section.removeAttribute('inert');
        if (index !== 0) section.querySelectorAll('input, textarea, select')[0].focus()
      } else if(idx > index){
        section.classList.remove('is-active');
        section.setAttribute('inert', '');
      }
    });

    this.currentStepIndex = index;
    
  }

  watchRequiredFields() {
    this.formValidator.form.addEventListener('input', (e) =>  {
      const isValidStep = this.validateStepFields(this.currentStepIndex);
      const { isValid } =  this.formValidator.validateSilent(this.component.querySelector('form').elements);
      if (isValidStep) {
        this.goToStep(this.currentStepIndex + 1);
      }
      this.btnSubmit.toggleAttribute('disabled', !isValid)
    });
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
