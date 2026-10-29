import DatePicker from './datapicker';

export const initDatePicker = () => {
  document.querySelectorAll('[data-datepicker]').forEach((el) => {
    new DatePicker(el);
  });
};
