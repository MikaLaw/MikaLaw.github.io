import { DynamicAdaptive } from '../../utils/dynamic-adaptive.js';

export const initDynamicAdaptive = () => {
  new DynamicAdaptive(document.querySelectorAll('[data-da]:not([data-da-type="min"])'),'max');
  new DynamicAdaptive(document.querySelectorAll('[data-da-type="min"]'),'min');  
};

