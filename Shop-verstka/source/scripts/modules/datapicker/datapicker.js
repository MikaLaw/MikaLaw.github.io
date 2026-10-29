import { Datepicker } from 'vanillajs-datepicker';
import ru from 'vanillajs-datepicker/locales/ru';

Object.assign(Datepicker.locales, ru);

export default class DatePicker {
  #component;
  #input;
  #datepickerInstance = null;
  #onDateChangeHandler = null; 

  constructor(component) {
    if (!component) return;
    this.#component = component;
    this.#input = this.#component.querySelector('input');
    
    if (!this.#input) return;
    this.#init();
  }

  #init() {
    const minOffset = Number(this.#component.getAttribute('data-datepicker-min')) || 0;
    const maxOffset = Number(this.#component.getAttribute('data-datepicker-max')) || 365;
    const disabledAttr = this.#component.getAttribute('data-datepicker-disabled-days');
    
    const disabledDays = disabledAttr
      ? disabledAttr.split(',').map(day => Number(day.trim())).filter(val => !isNaN(val))
      : [];

    let initialDate;
    if (this.#input.value) {
      const [day, month, year] = this.#input.value.split('.');
      initialDate = new Date(year, month - 1, day);
    }
    const today = initialDate || new Date();

    const minDate = new Date(today.getTime());
    const maxDate = new Date(today.getTime());
    
    minDate.setDate(today.getDate() + minOffset);
    maxDate.setDate(today.getDate() + maxOffset);

    const finalMinDate = new Date(minDate.getTime());
    while (disabledDays.includes(finalMinDate.getDay())) {
      finalMinDate.setDate(finalMinDate.getDate() + 1);
    }

    const resultMin = finalMinDate > maxDate ? maxDate : finalMinDate;

    this.#datepickerInstance = new Datepicker(this.#input, {
      // 🛠 Базовые настройки и ограничения (уже были в вашем коде)
      language: 'ru',
      format: 'dd.mm.yyyy',
      minDate: resultMin,
      maxDate: maxDate,
      defaultViewDate: resultMin,
      daysOfWeekDisabled: disabledDays,
      autohide: true,
      enableOnReadonly: true,
      // Поведение ввода и клавиатуры
      disableTouchKeyboard: true, // Скрывать клавиатуру на смартфонах
      showOnClick: true,          // Открывать по клику
      showOnFocus: true,          // Открывать по Tab-фокусу
      // Визуальное отображение и структура
      daysOfWeekHighlighted: [],  // Массив дней недели для подсветки (например: [0, 6])
      calendarWeeks: false,       // Показывать номера недель (true/false)
      showDaysOfWeek: true,       // Показывать названия дней недели
      title: '',                  // Текст заголовка (строка)
      orientation: 'auto',        // Позиционирование (например: 'bottom left')
      container: this.#component, // Селектор или HTMLElement для рендера
      prevArrow: '«',             // Стрелка назад (строка или HTML)
      nextArrow: '»',             // Стрелка вперед (строка или HTML)
      // Управление режимами отображения (Вью)
      startView: 0,               // 0-дни, 1-месяцы, 2-годы, 3-десятилетия
      maxView: 3,                 // Максимальный масштаб
      pickLevel: 0,               // Глубина выбора (0-конкретный день)
      // Функциональные кнопки
      todayBtn: false,            // Кнопка «Сегодня»
      todayBtnMode: 0,            // Режим кнопки «Сегодня» (0-фокус, 1-выбор)
      clearBtn: false,            // Кнопка очистки поля
      // Мульти-выбор дат
      maxNumberOfDates: 1,        // Лимит количества выбираемых дат
      dateDelimiter: ', ',        // Разделитель дат для строки вывода
      weekStart: 1,               // Начало недели (1 — понедельник)
      shortcutKeys: {             // Горячие клавиши
        select: 'Enter',
        close: 'Escape',
      },
      beforeShowDay: function(date) {
        return { enabled: true };
      },
      beforeShowMonth: function(date) {
        return { enabled: true };
      },
      beforeShowYear: function(date) {
        return { enabled: true };
      },
      beforeShowDecade: function(date) {
        return { enabled: true };
      }
    });

    this.#onDateChangeHandler = () => {
      this.#input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    this.#input.addEventListener('changeDate', this.#onDateChangeHandler);
  }

  destroy() {
    if (this.#datepickerInstance) {
      this.#datepickerInstance.destroy();
      this.#datepickerInstance = null;
      if (this.#onDateChangeHandler) {
        this.#input.removeEventListener('changeDate', this.#onDateChangeHandler);
      }
    }
    this.#component = null;
    this.#input = null;
  }
}