import ResponsiveSliderController from './slider-panel.js';

export const initSliderPanel = () => {
  document.querySelectorAll('[data-slider-panel]').forEach((item) => {
    new ResponsiveSliderController(item);
  });
};