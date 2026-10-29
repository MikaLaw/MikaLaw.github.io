import Accordion from './accordion';

export const initAccordion = () => {  
  document.querySelectorAll('[data-accordion="init"]:not([data-lazy])').forEach((el) => {
    new Accordion(el);  
  });
};