import MenuHover from './menu-hover';

export const initMenuHover = () => {
  document.querySelectorAll('[data-menu-hover]').forEach((item) => {
    new MenuHover(item)
  });
};
