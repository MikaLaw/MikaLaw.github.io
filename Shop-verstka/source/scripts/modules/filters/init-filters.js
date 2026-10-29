import Filters from './filters';

export const initFilters = () => {
  document.querySelectorAll('[data-filters]').forEach((item) => {
    new Filters(item)
  });
};