import InputSearch from './input-search';

export const initInputSearch = () => {
  document.querySelectorAll('[data-input-search]:not([data-lazy])').forEach((item) => {
    new InputSearch(item)
  });
};