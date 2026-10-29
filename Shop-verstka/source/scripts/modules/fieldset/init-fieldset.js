import Fieldset from './fieldset';

export const initFieldset = () => {
  document.querySelectorAll('[data-fieldset]').forEach((item) => {
    new Fieldset(item)
  });
};