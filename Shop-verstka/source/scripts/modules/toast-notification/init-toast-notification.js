import ToastNotification from './toast-notification';

export const initToastNotification = () => {
  document.querySelectorAll('[data-toast-notification]').forEach((el) => {
    new ToastNotification(el);
  });
} 