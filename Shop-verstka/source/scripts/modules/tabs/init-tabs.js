import Tabs from './tabs';

export const initTabs = () => {  
  document.querySelectorAll('[data-tabs="init"]:not([data-lazy])').forEach((el) => {
    new Tabs(el);    
  });
};