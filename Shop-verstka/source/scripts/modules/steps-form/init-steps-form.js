import StepsForm from './steps-form';

export const initStepsForm = () => {
  document.querySelectorAll('[data-steps-form]').forEach((item) => {    
    new StepsForm(item);
  });  
}; 