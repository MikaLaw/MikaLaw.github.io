import ButtonTop from './button-top';

export const initButtonTop = () => {
  document.querySelectorAll('[data-button-top]').forEach((item) => {
    new ButtonTop(item);
  });  
};