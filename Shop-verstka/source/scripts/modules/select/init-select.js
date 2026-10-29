import Select from './select';

export const initSelect = () => {
  document.querySelectorAll('[data-select]:not([data-lazy])').forEach((item) => {
    new Select(item);       
  });  
};