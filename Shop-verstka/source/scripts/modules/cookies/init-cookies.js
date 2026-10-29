import Cookies from './cookies';

export const initCookies = () => {
  new Cookies(document.querySelector('[data-cookie]'));
};