import Upload from './input-upload';

export const initUpload = () => {
  document.querySelectorAll('[data-upload]').forEach((item) => {
    new Upload(item)
  });
};