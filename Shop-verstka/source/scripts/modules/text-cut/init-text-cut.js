import TextCut from './text-cut';

export const initTextCut = () => {  
  document.querySelectorAll('[data-text-cut]').forEach((el) => {
    new TextCut(el);    
  });
};