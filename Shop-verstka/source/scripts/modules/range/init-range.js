import Range from './range';

export const initRange = () => {  
  document.querySelectorAll('[data-range]').forEach((el) => {
    new Range(el);
  });
};