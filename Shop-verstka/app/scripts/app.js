'use strict';

// великий и ужасный jq
// window.$ = window.jQuery = require('jquery');

// Слайдер slick
// require('slick-carousel');

// require('@fancyapps/fancybox');

// буллет-навигация
// require('jquery-scroll-indicator-bullets');

// маски для полей на чистом js
// var VMasker = require('vanilla-masker'); window.VMasker = VMasker;

// адаптивный lazyload для изображений https://www.npmjs.com/package/lazysizes
// window.lazysizes = require('lazysizes');

// адаптивный lazyload фон для изображений
// var lazyBgrAdaptive = require('./components/lazyBgrAdaptive.js'); lazyBgrAdaptive();

//Ленивая загрузка изображений
const LazyLoad = require('vanilla-lazyload');
window.LazyLoad = LazyLoad;

// полифил для свойства object-fit у изображений
// var objectFitImages = require('object-fit-images'); objectFitImages();

// первый экран — splashScreen
// var splashScreen = require('./components/splashScreen.js'); splashScreen();

// компонент для меню components/menuList.html
// var menuList = require('./components/menuList.js'); menuList();

// выезжающие панели
// var swipePanel = require('./components/swipePanel.js'); swipePanel();

// карточка, показывающая содержимое по клику на заголовок /components/collapseCard.html
// var collapseCard = require('./components/collapseCard.js'); collapseCard();

// Инициализация роллера
// var calcRollerInit = require('./components/calcRollerInit.js');

// табы
// var tabs = require('./components/tabs.js'); tabs();

// Селекты красивые
var dropdown = require('./components/disDropdown.js');
dropdown();

// Селекты красивые
var CheckboxToSelect = require('./components/CheckboxToSelect.js').CheckboxToSelect;
var RefreshCheckboxToSelect = require('./components/CheckboxToSelect.js').refreshDisplay;
CheckboxToSelect();

// Datepicker
var datepicker = require('air-datepicker');
window.datepicker = datepicker;

// window.lightSlider = require('lightslider');
// window.remodal = require('remodal');

$(document).ready(function () {
    /**
     * ленивая подгрузка изображений
     */
    const lazyloadInited = new LazyLoad({
        threshold: 500,
        elements_selector: 'img, figure img, img.js-lazyload',
        callback_enter: (e) => {
            $(e).addClass('_enter');
        },
        callback_loaded: (el) => {
            el.style.display = 'none';
            el.offsetHeight;
            el.style.display = '';
            $(el).trigger('lazyload:load');

        },
    });
    window.lazyloadInited = lazyloadInited;

})