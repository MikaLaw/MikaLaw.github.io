import Map from './map';

export const initMap= () => {
  document.querySelectorAll('[data-map]').forEach((item) => {
    new Map(item)
  });
};