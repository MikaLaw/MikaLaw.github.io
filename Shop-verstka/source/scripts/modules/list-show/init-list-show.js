import ListShow from './list-show';

export const initListShow= () => {
  document.querySelectorAll('[data-list-show]').forEach((item) => {
    new ListShow(item)
  });
};