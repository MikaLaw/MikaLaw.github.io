import DialogController from '../../utils/dialog.js';

export const initDialogController = () => {
  document.querySelectorAll('[data-modal]:not([data-lazy])').forEach((item) => {
    new DialogController(item)
  });
};
