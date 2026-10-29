import ScrollBlock from './scroll-block';

export const initScrollBlock = () => {  
  document.querySelectorAll('[data-scroll-block]:not([data-lazy]').forEach((el) => {
    new ScrollBlock(el);
  });
};