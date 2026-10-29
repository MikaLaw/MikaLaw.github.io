import {initDynamicAdaptive} from './modules/dynamic-adaptive/init-dynamic-adaptive.js';
import {initDialogController} from './modules/dialog/init-dialog.js';
import {initScrollBlock} from './modules/scroll-block/init-scroll-block.js';
import {initAccordion} from './modules/accordion/init-accordion.js';
import {initInputMask} from './modules/input-mask/init-input-mask.js';
import {initInputCounter} from './modules/input-counter/init-input-counter.js';
import {initDatePicker} from './modules/datapicker/input-datapicker.js';
import {initInputPassword} from './modules/input-password/init-input-password.js';
import {initInputSearch} from './modules/input-search/init-input-search.js';
import {initRange} from './modules/range/init-range.js';
import {initTabs} from './modules/tabs/init-tabs.js';
import {initSelect} from './modules/select/init-select.js';
import {initSelectSearch} from './modules/select-search/init-select-search.js';
import {initFieldset} from './modules/fieldset/init-fieldset.js';
import {initFilters} from './modules/filters/init-filters.js';
import {initPriorityTags} from './modules/priority-tags/init-priority-tags.js';
import {initSlider} from './modules/sliders';
import {initUpload} from './modules/input-upload/init-input-upload.js';
import {initForm} from './modules/form/init-form.js';
import {initStepsForm} from './modules/steps-form/init-steps-form.js';
import {initMap} from './modules/map/init-map.js';
import {initMenuNested} from './modules/menu-nested/init-menu-nested.js';
import {initMenuHover} from './modules/menu-hover/init-menu-hover.js';
import {initPopup} from './modules/popup/init-popup.js';
import {initCookies} from './modules/cookies/init-cookies.js';
import {initTooltip} from './modules/tooltip/init-tooltip.js';
import {initBgVideo} from './modules/bg-video/init-bg-video.js';
import {initTextCut} from './modules/text-cut/init-text-cut.js';
import {initListShow} from './modules/list-show/init-list-show.js';
import {initOrderStep} from './modules/order-step/init-order-step.js';
import {initSliderPanel} from './modules/slider-panel/init-slider-panel.js';
import {initButtonTop} from './modules/button-top/init-button-top.js';
import {initToastNotification} from './modules/toast-notification/init-toast-notification.js';

window.addEventListener('DOMContentLoaded', () => {
  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initDynamicAdaptive();
    initDialogController();
    initPopup();
    initScrollBlock();
    initInputCounter();
    initDatePicker();
    initInputPassword();
    initInputSearch();
    initSelect();
    initSelectSearch();
    initAccordion();
    initInputMask();
    initRange();
    initTabs();
    initFieldset();
    initFilters();
    initPriorityTags();
    initBgVideo();
    initSlider();
    initUpload();
    initForm();
    initStepsForm();
    initMap();
    initMenuNested();
    initMenuHover();
    initCookies();
    initTooltip();
    initTextCut();
    initListShow();
    initOrderStep();
    initSliderPanel();
    initButtonTop();
    initToastNotification();
  });
});
