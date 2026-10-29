import InputCounter from './input-counter';

export const initInputCounter = () => {
  document.querySelectorAll('[data-counter]').forEach((item) => {
    new InputCounter(item)
  });
};