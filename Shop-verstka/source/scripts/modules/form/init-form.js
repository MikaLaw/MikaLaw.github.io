import Form from './form';

export const initForm = () => {
  document.querySelectorAll('[data-form]').forEach((item) => {
    new Form(item)
  });
};