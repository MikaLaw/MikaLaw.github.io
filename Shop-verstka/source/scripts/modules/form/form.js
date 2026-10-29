import { bytesToSize } from '../../utils/utils';

const NATIVE_ERROR_MESSAGES = {
  valueMissing: 'Поле обязательно для заполнения',
  customError: 'Поле заполнено некорректно',
  typeMismatch: 'Введите корректный формат данных',
  patternMismatch: 'Некорректный формат',
  tooShort: (field) => `Минимальная длина: ${field.getAttribute('minlength')} симв. (сейчас: ${field.value.length})`,
  rangeOverflow: (field) => `Максимальное значение: ${field.getAttribute('max')}`,
  rangeUnderflow: (field) => `Минимальное значение: ${field.getAttribute('min')}`,
};

const FIELD_NAME_ERRORS = {
  'url': 'Введите корректный адрес сайта',
  'name': 'Введите имя и фамилию через пробел',
  'cyrillic': 'Разрешена только кириллица',
  'latin': 'Разрешена только латиница',
  'digit': 'Допустимы только цифры',
  'symbols': 'Допустимы только буквы',
  'letters-and-digit': 'Спецсимволы запрещены'
};

const IGNORED_TYPES = new Set(['submit', 'button', 'reset']);
const INTERACTIVE_TYPES = new Set([...IGNORED_TYPES, 'checkbox', 'radio', 'file']);

export class DOMRenderer {
  static #toFieldArray(fieldOrGroup) {
    if (fieldOrGroup instanceof NodeList || Array.isArray(fieldOrGroup)) {
      return Array.from(fieldOrGroup);
    }
    return fieldOrGroup ? [fieldOrGroup] : [];
  }
  
  static getContainer(element) {
    return element.closest('.field') || element.parentElement;
  }
  
  static showError(fieldOrGroup, message, container) {
    container.classList.add('is-invalid');
    this.#toFieldArray(fieldOrGroup).forEach(field => {
      if (typeof field.setAttribute === 'function') field.setAttribute('aria-invalid', 'true');
    });
    const errorDiv = container.querySelector('.field__message-info');
    if (errorDiv) errorDiv.textContent = message;
  }
  
  static clearError(fieldOrGroup, container) {
    container.classList.remove('is-invalid');
    const errorDiv = container.querySelector('.field__message-info');
    if (errorDiv) errorDiv.textContent = '';
    this.#toFieldArray(fieldOrGroup).forEach(field => {
      if (typeof field.removeAttribute === 'function') field.removeAttribute('aria-invalid');
    });
  }
}

class ValidationRule {
  resolveMessage(field, container) {
    const { validity } = field;
    if (validity.valid) return '';
    
    const errorType = Object.keys(NATIVE_ERROR_MESSAGES).find(key => validity[key]);
    if (!errorType) return field.validationMessage;

    const validationType = container?.dataset.validationType;
    if (errorType === 'patternMismatch' && FIELD_NAME_ERRORS[validationType]) {
      return FIELD_NAME_ERRORS[validationType];
    }

    const nativeMessage = NATIVE_ERROR_MESSAGES[errorType];
    return typeof nativeMessage === 'function' ? nativeMessage(field) : nativeMessage;
  }
}

class DefaultRule extends ValidationRule {
  validate(validator, field, container) {
    const isValid = field.validity.valid;

    return { 
      isValid, 
      message: this.resolveMessage(field, container) 
    };
  }
}

class ToggleGroupRule extends ValidationRule {
  validate(validator, field, container) {
    const fieldset = field.closest('fieldset');
    if (!fieldset || !('required' in fieldset.dataset)) return { isValid: true };

    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);

    return {
      isValid: isAnyChecked,
      message: isAnyChecked ? '' : 'Выберите хотя бы один вариант из списка',
      errorField: checkboxes
    };
  }
}

class MediaRule extends ValidationRule {
  validate(validator, field, container) {
    if (!field.validity.valid) {
      return { 
        isValid: false, 
        message: this.resolveMessage(field, container) 
      };
    }
    const maxSize = Number(field.dataset.maxSize) || 0;
    const fileFullSize = [...field.files].reduce((acc, item) => acc + item.size, 0);
    const isValid = fileFullSize <= maxSize;
    
    return {
      isValid,
      message: isValid ? '' : `Максимальный размер файла не должен превышать ${bytesToSize(maxSize)}`
    };
  }
}

class MatchRule extends ValidationRule {
  #isSyncing = false;

  validate(validator, field, container, silent = false) {
    if (!field.validity.valid) {
      return { isValid: false, message: this.resolveMessage(field, container) };
    }

    const matchName = container?.dataset.matchName;
    if (!matchName) return { isValid: true };

    const pairContainer = Array.from(validator.form.querySelectorAll(`[data-match-name="${matchName}"]`))
      .find(item => item !== container);
    const pairInput = pairContainer?.querySelector('input');
    
    if (!pairInput) return { isValid: true };

    const isValid = !(field.value && pairInput.value && field.value !== pairInput.value);

    // 👇 Синхронизируем соседа без участия центрального класса FormValidator
    if (!this.#isSyncing) {
      this.#isSyncing = true;
      // Вызываем валидацию зависимого инпута (например, подтверждения пароля)
      validator.executeValidation(pairInput, silent);
      this.#isSyncing = false;
    }

    const labelText = container.querySelector('label')?.textContent?.trim() || '';

    return {
      isValid,
      message: isValid ? '' : `${labelText} не совпадают`
    };
  }
}

class DependentInputRule extends ValidationRule {
  #isSyncing = false; // Защита от бесконечного зацикливания (Stack Overflow)

  validate(validator, field, container, silent = false) {
    const dependencySelector = container?.dataset.dependencySelector;    
    // Запускаем синхронизацию соседа "снизу вверх"
    if (dependencySelector && !this.#isSyncing) {
      this.#isSyncing = true;
      
      const dependencyField = validator.form.querySelector(dependencySelector);
      if (dependencyField) {
        // Если изменилось текущее поле, тихо просим ведущее поле обновиться,
        // чтобы пересчитать состояние формы
        validator.executeValidation(dependencyField, true);
      }
      
      this.#isSyncing = false;
    }

    // Дальше идет стандартная логика проверки (как в предыдущем ответе)
    const dependencyField = container?.dataset.dependencySelector 
      ? validator.form.querySelector(container.dataset.dependencySelector) 
      : null;

    if (!dependencyField) return { isValid: true };

    const isDependencyActive = ['checkbox', 'radio'].includes(dependencyField.type)
      ? dependencyField.checked
      : dependencyField.value.trim().length > 0;
      
    isDependencyActive ? field.removeAttribute('disabled') : field.setAttribute('disabled', '');

    if (!isDependencyActive) return { isValid: true };
    

    const isValid = field.value.trim().length > 0 && field.validity.valid;

    return {
      isValid,
      message: isValid ? '' : 'Это поле обязательно для заполнения'
    };
  }
}

export default class FormValidator {
  #abortController = new AbortController();
  #rules = new Map();

  constructor(component, options = {}) {
    this.component = component;
    this.form = this.component.querySelector('form');
    this.outerModal = this.component.closest('dialog');
    this.status = this.component.querySelector('[data-form-status]');
    this.options = {
      validateOnInput: 'validateOnInput' in this.component.dataset || options.validateOnInput,
      validateOnBlur: 'validateOnBlur' in this.component.dataset || options.validateOnBlur,
      validateOnChange: 'validateOnChange' in this.component.dataset || options.validateOnChange,
    };
    if (this.form) {
      this.#registerRules();
      this.init();
    }
  }

  #registerRules() {
    this.#rules.set('default', new DefaultRule());
    this.#rules.set('toggle-group', new ToggleGroupRule());
    this.#rules.set('file', new MediaRule());
    this.#rules.set('match', new MatchRule());
    this.#rules.set('dependent-input', new DependentInputRule());
  }

  init() {
    const { signal } = this.#abortController;
    this.form.setAttribute('novalidate', '');
    if (this.options.validateOnBlur) {
      this.form.addEventListener('blur', (e) => this.#handleBlur(e), { capture: true, signal });
    }

    if (this.options.validateOnInput) {
      this.form.addEventListener('input', (e) => this.#handleInput(e), { capture: true, signal });
    }

    if (this.options.validateOnChange) {
      this.form.addEventListener('change', (e) => this.#handleChange(e), { capture: true, signal });
      this.form.addEventListener('file:reset', (e) => this.#handleChange(e), { capture: true, signal });
    }
    
    if (this.outerModal) {
      this.outerModal.addEventListener('toggle', (e) => {
        if (e.newState === "closed") this.resetForm();
      }, { signal });
    }
    
    this.form.addEventListener('submit', (e) => this.#handleSubmit(e), { signal });
    this.form.addEventListener('reset', () => this.resetForm(), { signal });
  }

  #getRuleKey(field, container) {
    if (field.type === 'file') return 'file';
    return container?.dataset.validationType || 'default';
  }

  executeValidation(field, silent = false) {
    const container = DOMRenderer.getContainer(field);
    const key = this.#getRuleKey(field, container);
    const rule = this.#rules.get(key) || this.#rules.get('default');
    const { isValid, message, errorField = field } = rule.validate(this, field, container, silent);
    if (!silent) {
      if (isValid) {
        DOMRenderer.clearError(errorField, container);
      } else {
        DOMRenderer.showError(errorField, message, container);
      }
    }
    return isValid;
  }

  #handleBlur(e) {
    const field = e.target;
    if (INTERACTIVE_TYPES.has(field.type) || !field.willValidate) return;

    const currentContainer = DOMRenderer.getContainer(field);
    const nextContainer = e.relatedTarget ? DOMRenderer.getContainer(e.relatedTarget) : e.target ? DOMRenderer.getContainer(e.target) : null;

    if (currentContainer && currentContainer === nextContainer) return;
    this.executeValidation(field);
  }

  #handleInput(e) {
    const field = e.target;
    if (INTERACTIVE_TYPES.has(field.type) || !field.willValidate || !field.hasAttribute('aria-invalid')) return;

    this.executeValidation(field);
  }

  #handleChange(e) {
    const field = e.target;
    if (IGNORED_TYPES.has(field.type) || ['password', 'text'].includes(field.type)) return;

    this.executeValidation(field);
  }

  validateAll(elements, silent = false) {
    let isFormValid = true;
    const validatedContainers = new Set();    
    for (const field of elements) {
      if (IGNORED_TYPES.has(field.type)) continue;

      const container = DOMRenderer.getContainer(field);
      if (!container || validatedContainers.has(container)) continue;
      const isFieldValid = this.executeValidation(field, silent);
      if (!isFieldValid) {
        isFormValid = false;
      }
      validatedContainers.add(container);
    }
    return { 
      isValid: isFormValid, 
      errorsSet: validatedContainers 
    };
  }

  validateSilent(elements) {
    return { isValid: this.validateAll(elements, true).isValid };
  }

  #handleSubmit(e) {
    e.preventDefault();
    const { isValid } = this.validateAll(this.form.elements);
    if (!isValid) {
      this.form.querySelector('.is-invalid')?.querySelector('input, select, textarea, [tabindex="0"]')?.focus();
      return;
    }
    
    for (const [key, value] of new FormData(this.form).entries()) {console.log(key, value);}
    if (this.status) this.status.textContent = 'Форма успешно валидирована!';
    if (this.outerModal?.open) this.outerModal.close();
  }

  resetForm() {
    this.form.reset();
    this.form.querySelectorAll('.is-invalid').forEach(container => {
      const inputs = container.querySelectorAll('input, select, textarea');
      DOMRenderer.clearError(inputs, container);
    });
    if (this.outerModal?.open) this.outerModal.close();
  }

  destroy() {
    this.#abortController.abort();
  }
}