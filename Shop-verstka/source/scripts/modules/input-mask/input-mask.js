import IMask from 'imask';

export default class InputMask {
  constructor(component) {
    this.component = component;
    this.type = component.dataset.maska;
    this.defaultoptions = {
      lazy: true,           // Маска со всеми "_" видна СРАЗУ, даже без фокуса
      eager: true,          // Форматирует поле моментально при инициализации
      placeholderChar: '_'  // Символ заполнителя
    };

    this.init()
  }

  init(){
    let mask;

    switch (this.type) {
      case 'phone':
        mask = IMask(this.component, {
          mask: '+{7} (000) 000-00-00',
          ...this.defaultoptions,
        });
        this.makeVisible(mask, 5, 5);
        this.checkValue(mask);
      break;
      
      case 'card':
        mask = IMask(this.component, {
          mask: '0000 0000 0000 0000',
          ...this.defaultoptions,
        });
        this.makeVisible(mask, 0, 0)
        this.checkValue(mask)
        break;
    }

    mask.on('accept', () => this.syncValidity(mask));
  }

  syncValidity(maskInstance) {
    const isRequired = this.component.hasAttribute('required');
    const isEmpty = maskInstance.unmaskedValue === '';
    const isComplete = maskInstance.masked.isComplete;

    if (isRequired && isEmpty) {
      this.component.setCustomValidity(''); 
    } else if (!isEmpty && !isComplete) {
      this.component.setCustomValidity('Неверный формат'); 
    } else {
      this.component.setCustomValidity('');
    }
  }

  checkValue(maskInstance) {
    this.component.addEventListener('blur', () => {
      if (!maskInstance.masked.isComplete) {
        maskInstance.value = '';
        maskInstance.updateOptions({ lazy: true });
      }      
      this.syncValidity(maskInstance);      
      this.component.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  makeVisible(maskInstance, posStart, posEnd) {
    this.component.addEventListener('mousedown', (e) => {
      if (maskInstance.unmaskedValue === '') {
        e.preventDefault();
        maskInstance.updateOptions({ lazy: false });
        this.component.focus();
        this.component.setSelectionRange(posStart, posEnd);
        this.syncValidity(maskInstance);
      }
    });
  }
} 