import MenuNested from './menu-nested';

export const initMenuNested = () => {
  document.querySelectorAll('[data-menu-nested]').forEach((item) => {
    new MenuNested(item)
  });
};
