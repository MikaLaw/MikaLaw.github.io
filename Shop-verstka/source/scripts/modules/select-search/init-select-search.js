import SelectSearch from './select-search';

export const initSelectSearch = () => {
  document.querySelectorAll('[data-select-search]:not([data-lazy])').forEach((item) => {
    new SelectSearch(item);       
  });  
};