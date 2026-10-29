import OrderStep from './order-step';

export const initOrderStep = () => {
  document.querySelectorAll('[data-order-step]').forEach((item) => {
    new OrderStep(item);       
  });  
};