import PriorityTags from './priority-tags';

export const initPriorityTags = () => {
  document.querySelectorAll('[data-priority-tags]:not([data-lazy])').forEach((item) => {
    new PriorityTags(item);       
  });  
};