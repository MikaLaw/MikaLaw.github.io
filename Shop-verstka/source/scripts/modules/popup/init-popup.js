import Popup from './popup';

export const initPopup = () => {
  document.querySelectorAll('[data-popup]').forEach((item) => {
    new Popup(item)
  });
};
