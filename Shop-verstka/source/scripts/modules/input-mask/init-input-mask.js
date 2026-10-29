import InputMask from './input-mask';

export const initInputMask = () => {
  document.querySelectorAll('[data-maska]').forEach((item) => {
    new InputMask(item)
  });
};