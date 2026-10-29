import InputPassword from './input-password';
 
export const initInputPassword = () => {
  document.querySelectorAll('[data-input-password]').forEach((item) => {
    new InputPassword(item)
  });
};
