"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()({
  1: [function (require, module, exports) {
    'use strict';








    var LazyLoad = require('vanilla-lazyload');
    window.LazyLoad = LazyLoad;








    var dropdown = require('./components/disDropdown.js');
    dropdown();

    var CheckboxToSelect = require('./components/CheckboxToSelect.js').CheckboxToSelect;
    var RefreshCheckboxToSelect = require('./components/CheckboxToSelect.js').refreshDisplay;
    CheckboxToSelect();

    var datepicker = require('air-datepicker');
    window.datepicker = datepicker;


    $(document).ready(function () {
      /**
       * ленивая подгрузка изображений
       */
      var lazyloadInited = new LazyLoad({
        threshold: 500,
        elements_selector: 'img, figure img, img.js-lazyload',
        callback_enter: function callback_enter(e) {
          $(e).addClass('_enter');
        },
        callback_loaded: function callback_loaded(el) {
          el.style.display = 'none';
          el.offsetHeight;
          el.style.display = '';
          $(el).trigger('lazyload:load');
        }
      });
      window.lazyloadInited = lazyloadInited;
    });
  }, {
    "./components/CheckboxToSelect.js": 2,
    "./components/disDropdown.js": 3,
    "air-datepicker": 4,
    "vanilla-lazyload": 10
  }],
  2: [function (require, module, exports) {
    'use strict';

    function setDisplay($select) {
      var display = [];
      var $display = $select.find('[data-display]');
      var $checked = $select.find('[data-inputs] input:checked');
      var $input = $select.find('[data-inputs] input');
      var placeholder = $display.attr('data-placeholder');
      if ($display.prop("tagName") === 'INPUT') {
        if (placeholder === undefined) {
          placeholder = $display.text();
          $display.attr('data-placeholder', placeholder);
        }
        $checked.each(function () {
          display.push($(this).attr('data-value') || $(this).parent().find('.select__title').html());
        });
        $input.siblings('label').removeClass('is-active');
        $checked.siblings('label').addClass('is-active');
        if (display.length > 0) {
          $display.val(display.join(', ')).removeClass('placeholder').removeClass('is-multiple');
        } else {
          $display.val(placeholder).addClass('placeholder').removeClass('is-multiple');
        }
      } else {
        if (placeholder === undefined) {
          placeholder = $display.text();
          $display.attr('data-placeholder', placeholder);
        }
        $checked.each(function () {
          display.push($(this).attr('data-value') || $(this).parent().find('label').html());
        });
        if (display.length > 0) {
          if (display.length > 1) {
            $display.html('Выбрано ' + display.length).addClass('is-multiple');
          } else {
            $display.html(display.join(', ')).removeClass('placeholder').removeClass('is-multiple');
          }
        } else {
          $display.html(placeholder).addClass('placeholder').removeClass('is-multiple');
        }
      }
    }
    function refreshDisplay(selector) {
      $(selector).each(function () {
        setDisplay($(this));
      });
    }
    module.exports.CheckboxToSelect = function () {
      function CheckboxToSelect(selector) {
        $(document).on('click.cts', selector + ' [data-inputs]', function (e) {
          if (!$(e.target).parent().find('input:radio').length) {
            e.stopPropagation();
          }
        });
        $(document).on('click.cts', selector + ' [data-data-js-tabselect-clear]', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var $select = $(e.target).parents('[data-data-js-tabselect]');
          $select.find('[data-inputs] input[type="checkbox"]').prop('checked', false);
          setDisplay($select);
        });
        $(document).on('change.cts', selector + ' [data-inputs] input', function (e) {
          setDisplay($(this).closest(selector));
        });
        $(document).on('click.cts', selector + ' [data-data-js-tabselect-range]', function (e) {
          var $display = $(this).closest(selector).find('[data-display]');
          var leftVal = $(this).parent().find('[data-data-js-tabselect-range-left]').val();
          var rightVal = $(this).parent().find('[data-data-js-tabselect-range-right]').val();
          $display.html(leftVal + ' - ' + rightVal).removeClass('placeholder');
          $(this).closest(selector).removeClass('open');
        });





        refreshDisplay(selector);
        return {
          refreshDisplay: refreshDisplay
        };
      }
      ;
      CheckboxToSelect('[data-data-js-tabselect]');
    };
    module.exports.refreshDisplay = refreshDisplay;
  }, {}],
  3: [function (require, module, exports) {

    /**
     Пример 1:
     <div style="position: relative; display: inline-block;">
     <button data-dsdd>Кнопка</button>
     <ul class="dsdd-menu">
     <li><a href="#" class="item" data-icon>Пункт 1</a></li>
     <li><a href="#" class="item" data-icon>Пункт 2</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
     <li class="sep"></li>
     <li class="title">Заголовок</li>
     <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
     <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
     <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
     </ul>
     </div>
     */
    /**
     Пример 2:
     <div style="position: relative; display: inline-block;" data-dsdd="this">
     Кнопка
     <ul class="dsdd-menu">
     <li><a href="#" class="item" data-icon>Пункт 1</a></li>
     <li><a href="#" class="item" data-icon>Пункт 2</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
     <li class="sep"></li>
     <li class="title">Заголовок</li>
     <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
     <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
     <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
     </ul>
     </div>
     */
    /**
     Пример 3:
     <div data-dsdd="#container">
     Кнопка
     </div>

         <div style="position: relative;" id="container">
     <ul class="dsdd-menu">
     <li><a href="#" class="item" data-icon>Пункт 1</a></li>
     <li><a href="#" class="item" data-icon>Пункт 2</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
     <li class="sep"></li>
     <li class="title">Заголовок</li>
     <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
     <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
     <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
     <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
     </ul>
     </div>
     */
    /**
     Пример 4:
     <div style="position: relative;">
     <button data-dsdd>Кнопка</button>

         <div class="vashe-menu">
     Ваше меню, которое отображаетя по классу .open .vashe-menu {display: block;}
     </div>
     </div>
     */

    'use strict';

    var $ = require('jquery');
    module.exports = function () {
      var toggle = '[data-dsdd]';
      var toggle_text = '[data-dsdd-content]:not([data-dsdd])';
      function dropdown(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled')) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus(e);
        if (!isActive) {
          if (e.isDefaultPrevented()) return;
          $parent.addClass('open');
          var $popup = $parent.find(".dsdd-menu");
          if ($popup.length) {
            if (!$('.angle:first', $popup).length) $popup.append('<div class="angle"></div>');
            $popup.resetVerticalPosition = function () {
              this.removeClass('pos-t').removeClass('pos-b');
            };
            $popup.resetHorizontalPosition = function () {
              this.css('margin-left', 0);
              this.find('.angle:first').css('margin-left', 0);
            };

            $popup.setOffsetHorisontal = function (extra_length) {
              this.resetHorizontalPosition();
              var popup_width = this.outerWidth(true);
              var offset_lenght = 0;
              extra_length = parseInt(extra_length);
              if (this.offset().left < 0) {
                offset_lenght = this.offset().left * -1 + 5;
              } else if (this.offset().left + popup_width > $(window).width()) {
                offset_lenght = (this.offset().left + popup_width - $(window).width() + 5) * -1;
                if (extra_length > 0) offset_lenght = offset_lenght + extra_length + 5;
              }
              if (offset_lenght !== 0) {
                this.css('margin-left', offset_lenght);
                this.find('.angle:first').css('margin-left', offset_lenght * -1);
              }
              if (!extra_length && this.offset().left < 0) this.setOffsetHorisontal(this.offset().left * -1);
            };
            $popup.setOffsetHorisontal();

            $popup.resetVerticalPosition();
            $popup.addClass('pos-b');
            if ($popup.offset().top + $popup.outerHeight(true) > $(document).scrollTop() + $(window).height()) {
              $popup.resetVerticalPosition();
              $popup.addClass('pos-t');
              if ($popup.offset().top + $popup.outerHeight(true) / 4 < $(document).scrollTop()) {
                $popup.resetVerticalPosition();
                $popup.addClass('pos-b');
              }
            }
          }
          $this.focus();
        }
        return false;
      }
      function clearMenus(e) {
        var $target = $(e.target);
        $(toggle).each(function (_, item) {
          var $parent = getParent($(this));
          if (!$parent.hasClass('open')) return;
          if ($target.parents('.dsdd-menu').siblings(toggle).is($(item))) return;
          $parent.removeClass('open');
        });
      }
      function getParent($this) {
        var selector = $this.attr('data-dsdd');
        var $parent;
        if (selector && selector !== "undefined") {
          $parent = selector === "this" ? $this : $(selector);
        }
        return $parent && $parent.length ? $parent : $this.parent();
      }
      function printContent() {
        var $this = $(this);
        var content = $this.data('dsdd-content');
        var tpl = '<div class="dsdd-menu v--content">' + content + '</div>';
        $this.append(tpl);
        $this.attr('data-dsdd', 'this');
        setTimeout(function () {
          $this.trigger('click.dis.dropdown');
        }, 50);
      }
      function selectInput(e) {}
      $(document).on('click.dis.dropdown', clearMenus).on('click.dis.dropdown', toggle, dropdown).on('click.dis.dropdown', toggle_text, printContent);
    };
  }, {
    "jquery": 9
  }],
  4: [function (require, module, exports) {
    require('./datepicker');
    require('./body');
    require('./navigation');
    require('./timepicker');
  }, {
    "./body": 5,
    "./datepicker": 6,
    "./navigation": 7,
    "./timepicker": 8
  }],
  5: [function (require, module, exports) {
    ;
    (function () {
      var templates = {
          days: '' + '<div class="datepicker--days datepicker--body">' + '<div class="datepicker--days-names"></div>' + '<div class="datepicker--cells datepicker--cells-days"></div>' + '</div>',
          months: '' + '<div class="datepicker--months datepicker--body">' + '<div class="datepicker--cells datepicker--cells-months"></div>' + '</div>',
          years: '' + '<div class="datepicker--years datepicker--body">' + '<div class="datepicker--cells datepicker--cells-years"></div>' + '</div>'
        },
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;
      datepicker.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;
        this.$el = $('');
        if (this.opts.onlyTimepicker) return;
        this.init();
      };
      datepicker.Body.prototype = {
        init: function init() {
          this._buildBaseHtml();
          this._render();
          this._bindEvents();
        },
        _bindEvents: function _bindEvents() {
          this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
        },
        _buildBaseHtml: function _buildBaseHtml() {
          this.$el = $(templates[this.type]).appendTo(this.d.$content);
          this.$names = $('.datepicker--days-names', this.$el);
          this.$cells = $('.datepicker--cells', this.$el);
        },
        _getDayNamesHtml: function _getDayNamesHtml(firstDay, curDay, html, i) {
          curDay = curDay != undefined ? curDay : firstDay;
          html = html ? html : '';
          i = i != undefined ? i : 0;
          if (i > 7) return html;
          if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);
          html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';
          return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },
        _getCellContents: function _getCellContents(date, type) {
          var classes = "datepicker--cell datepicker--cell-" + type,
            currentDate = new Date(),
            parent = this.d,
            minRange = dp.resetTime(parent.minRange),
            maxRange = dp.resetTime(parent.maxRange),
            opts = parent.opts,
            d = dp.getParsedDate(date),
            render = {},
            html = d.date;
          switch (type) {
            case 'day':
              if (parent.isWeekend(d.day)) classes += " -weekend-";
              if (d.month != this.d.parsedDate.month) {
                classes += " -other-month-";
                if (!opts.selectOtherMonths) {
                  classes += " -disabled-";
                }
                if (!opts.showOtherMonths) html = '';
              }
              break;
            case 'month':
              html = parent.loc[parent.opts.monthsField][d.month];
              break;
            case 'year':
              var decade = parent.curDecade;
              html = d.year;
              if (d.year < decade[0] || d.year > decade[1]) {
                classes += ' -other-decade-';
                if (!opts.selectOtherYears) {
                  classes += " -disabled-";
                }
                if (!opts.showOtherYears) html = '';
              }
              break;
          }
          if (opts.onRenderCell) {
            render = opts.onRenderCell(date, type) || {};
            html = render.html ? render.html : html;
            classes += render.classes ? ' ' + render.classes : '';
          }
          if (opts.range) {
            if (dp.isSame(minRange, date, type)) classes += ' -range-from-';
            if (dp.isSame(maxRange, date, type)) classes += ' -range-to-';
            if (parent.selectedDates.length == 1 && parent.focused) {
              if (dp.bigger(minRange, date) && dp.less(parent.focused, date) || dp.less(maxRange, date) && dp.bigger(parent.focused, date)) {
                classes += ' -in-range-';
              }
              if (dp.less(maxRange, date) && dp.isSame(parent.focused, date)) {
                classes += ' -range-from-';
              }
              if (dp.bigger(minRange, date) && dp.isSame(parent.focused, date)) {
                classes += ' -range-to-';
              }
            } else if (parent.selectedDates.length == 2) {
              if (dp.bigger(minRange, date) && dp.less(maxRange, date)) {
                classes += ' -in-range-';
              }
            }
          }
          if (dp.isSame(currentDate, date, type)) classes += ' -current-';
          if (parent.focused && dp.isSame(date, parent.focused, type)) classes += ' -focus-';
          if (parent._isSelected(date, type)) classes += ' -selected-';
          if (!parent._isInRange(date, type) || render.disabled) classes += ' -disabled-';
          return {
            html: html,
            classes: classes
          };
        },
        /**
         * Calculates days number to render. Generates days html and returns it.
         * @param {object} date - Date object
         * @returns {string}
         * @private
         */
        _getDaysHtml: function _getDaysHtml(date) {
          var totalMonthDays = dp.getDaysCount(date),
            firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
            lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
            daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
            daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;
          daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
          daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;
          var startDayIndex = -daysFromPevMonth + 1,
            m,
            y,
            html = '';
          for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
            y = date.getFullYear();
            m = date.getMonth();
            html += this._getDayHtml(new Date(y, m, i));
          }
          return html;
        },
        _getDayHtml: function _getDayHtml(date) {
          var content = this._getCellContents(date, 'day');
          return '<div class="' + content.classes + '" ' + 'data-date="' + date.getDate() + '" ' + 'data-month="' + date.getMonth() + '" ' + 'data-year="' + date.getFullYear() + '">' + content.html + '</div>';
        },
        /**
         * Generates months html
         * @param {object} date - date instance
         * @returns {string}
         * @private
         */
        _getMonthsHtml: function _getMonthsHtml(date) {
          var html = '',
            d = dp.getParsedDate(date),
            i = 0;
          while (i < 12) {
            html += this._getMonthHtml(new Date(d.year, i));
            i++;
          }
          return html;
        },
        _getMonthHtml: function _getMonthHtml(date) {
          var content = this._getCellContents(date, 'month');
          return '<div class="' + content.classes + '" data-month="' + date.getMonth() + '">' + content.html + '</div>';
        },
        _getYearsHtml: function _getYearsHtml(date) {
          var d = dp.getParsedDate(date),
            decade = dp.getDecade(date),
            firstYear = decade[0] - 1,
            html = '',
            i = firstYear;
          for (i; i <= decade[1] + 1; i++) {
            html += this._getYearHtml(new Date(i, 0));
          }
          return html;
        },
        _getYearHtml: function _getYearHtml(date) {
          var content = this._getCellContents(date, 'year');
          return '<div class="' + content.classes + '" data-year="' + date.getFullYear() + '">' + content.html + '</div>';
        },
        _renderTypes: {
          days: function days() {
            var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
              days = this._getDaysHtml(this.d.currentDate);
            this.$cells.html(days);
            this.$names.html(dayNames);
          },
          months: function months() {
            var html = this._getMonthsHtml(this.d.currentDate);
            this.$cells.html(html);
          },
          years: function years() {
            var html = this._getYearsHtml(this.d.currentDate);
            this.$cells.html(html);
          }
        },
        _render: function _render() {
          if (this.opts.onlyTimepicker) return;
          this._renderTypes[this.type].bind(this)();
        },
        _update: function _update() {
          var $cells = $('.datepicker--cell', this.$cells),
            _this = this,
            classes,
            $cell,
            date;
          $cells.each(function (cell, i) {
            $cell = $(this);
            date = _this.d._getDateFromCell($(this));
            classes = _this._getCellContents(date, _this.d.cellType);
            $cell.attr('class', classes.classes);
          });
        },
        show: function show() {
          if (this.opts.onlyTimepicker) return;
          this.$el.addClass('active');
          this.acitve = true;
        },
        hide: function hide() {
          this.$el.removeClass('active');
          this.active = false;
        },

        _handleClick: function _handleClick(el) {
          var date = el.data('date') || 1,
            month = el.data('month') || 0,
            year = el.data('year') || this.d.parsedDate.year,
            dp = this.d;
          if (dp.view != this.opts.minView) {
            dp.down(new Date(year, month, date));
            return;
          }
          var selectedDate = new Date(year, month, date),
            alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);
          if (!alreadySelected) {
            dp._trigger('clickCell', selectedDate);
            return;
          }
          dp._handleAlreadySelectedDates.bind(dp, alreadySelected, selectedDate)();
        },
        _onClickCell: function _onClickCell(e) {
          var $el = $(e.target).closest('.datepicker--cell');
          if ($el.hasClass('-disabled-')) return;
          this._handleClick.bind(this)($el);
        }
      };
    })();
  }, {}],
  6: [function (require, module, exports) {
    ;
    (function () {
      var VERSION = '2.2.3',
        pluginName = 'datepicker',
        autoInitSelector = '.datepicker-here',
        $body,
        $datepickersContainer,
        containerBuilt = false,
        baseTemplate = '' + '<div class="datepicker">' + '<i class="datepicker--pointer"></i>' + '<nav class="datepicker--nav"></nav>' + '<div class="datepicker--content"></div>' + '</div>',
        defaults = {
          classes: '',
          inline: false,
          language: 'ru',
          startDate: new Date(),
          firstDay: '',
          weekends: [6, 0],
          dateFormat: '',
          altField: '',
          altFieldDateFormat: '@',
          toggleSelected: true,
          keyboardNav: true,
          position: 'bottom left',
          offset: 12,
          view: 'days',
          minView: 'days',
          showOtherMonths: true,
          selectOtherMonths: true,
          moveToOtherMonthsOnSelect: true,
          showOtherYears: true,
          selectOtherYears: true,
          moveToOtherYearsOnSelect: true,
          minDate: '',
          maxDate: '',
          disableNavWhenOutOfRange: true,
          multipleDates: false,
          multipleDatesSeparator: ',',
          range: false,
          todayButton: false,
          clearButton: false,
          showEvent: 'focus',
          autoClose: false,
          monthsField: 'monthsShort',
          prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
          nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
          navTitles: {
            days: 'MM, <i>yyyy</i>',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
          },
          timepicker: false,
          onlyTimepicker: false,
          dateTimeSeparator: ' ',
          timeFormat: '',
          minHours: 0,
          maxHours: 24,
          minMinutes: 0,
          maxMinutes: 59,
          hoursStep: 1,
          minutesStep: 1,
          onSelect: '',
          onShow: '',
          onHide: '',
          onChangeMonth: '',
          onChangeYear: '',
          onChangeDecade: '',
          onChangeView: '',
          onRenderCell: ''
        },
        hotKeys = {
          'ctrlRight': [17, 39],
          'ctrlUp': [17, 38],
          'ctrlLeft': [17, 37],
          'ctrlDown': [17, 40],
          'shiftRight': [16, 39],
          'shiftUp': [16, 38],
          'shiftLeft': [16, 37],
          'shiftDown': [16, 40],
          'altUp': [18, 38],
          'altRight': [18, 39],
          'altLeft': [18, 37],
          'altDown': [18, 40],
          'ctrlShiftUp': [16, 17, 38]
        },
        datepicker;
      var Datepicker = function Datepicker(el, options) {
        this.el = el;
        this.$el = $(el);
        this.opts = $.extend(true, {}, defaults, options, this.$el.data());
        if ($body == undefined) {
          $body = $('body');
        }
        if (!this.opts.startDate) {
          this.opts.startDate = new Date();
        }
        if (this.el.nodeName == 'INPUT') {
          this.elIsInput = true;
        }
        if (this.opts.altField) {
          this.$altField = typeof this.opts.altField == 'string' ? $(this.opts.altField) : this.opts.altField;
        }
        this.inited = false;
        this.visible = false;
        this.silent = false; 

        this.currentDate = this.opts.startDate;
        this.currentView = this.opts.view;
        this._createShortCuts();
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.minRange = '';
        this.maxRange = '';
        this._prevOnSelectValue = '';
        this.init();
      };
      datepicker = Datepicker;
      datepicker.prototype = {
        VERSION: VERSION,
        viewIndexes: ['days', 'months', 'years'],
        init: function init() {
          if (!containerBuilt && !this.opts.inline && this.elIsInput) {
            this._buildDatepickersContainer();
          }
          this._buildBaseHtml();
          this._defineLocale(this.opts.language);
          this._syncWithMinMaxDates();
          if (this.elIsInput) {
            if (!this.opts.inline) {
              this._setPositionClasses(this.opts.position);
              this._bindEvents();
            }
            if (this.opts.keyboardNav && !this.opts.onlyTimepicker) {
              this._bindKeyboardEvents();
            }
            this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
            this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
          }
          if (this.opts.classes) {
            this.$datepicker.addClass(this.opts.classes);
          }
          if (this.opts.timepicker) {
            this.timepicker = new $.fn.datepicker.Timepicker(this, this.opts);
            this._bindTimepickerEvents();
          }
          if (this.opts.onlyTimepicker) {
            this.$datepicker.addClass('-only-timepicker-');
          }
          this.views[this.currentView] = new $.fn.datepicker.Body(this, this.currentView, this.opts);
          this.views[this.currentView].show();
          this.nav = new $.fn.datepicker.Navigation(this, this.opts);
          this.view = this.currentView;
          this.$el.on('clickCell.adp', this._onClickCell.bind(this));
          this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this));
          this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this));
          this.inited = true;
        },
        _createShortCuts: function _createShortCuts() {
          this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
          this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
        },
        _bindEvents: function _bindEvents() {
          this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
          this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this));
          this.$el.on('blur.adp', this._onBlur.bind(this));
          this.$el.on('keyup.adp', this._onKeyUpGeneral.bind(this));
          $(window).on('resize.adp', this._onResize.bind(this));
          $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
        },
        _bindKeyboardEvents: function _bindKeyboardEvents() {
          this.$el.on('keydown.adp', this._onKeyDown.bind(this));
          this.$el.on('keyup.adp', this._onKeyUp.bind(this));
          this.$el.on('hotKey.adp', this._onHotKey.bind(this));
        },
        _bindTimepickerEvents: function _bindTimepickerEvents() {
          this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
        },
        isWeekend: function isWeekend(day) {
          return this.opts.weekends.indexOf(day) !== -1;
        },
        _defineLocale: function _defineLocale(lang) {
          if (typeof lang == 'string') {
            this.loc = $.fn.datepicker.language[lang];
            if (!this.loc) {
              console.warn('Can\'t find language "' + lang + '" in Datepicker.language, will use "ru" instead');
              this.loc = $.extend(true, {}, $.fn.datepicker.language.ru);
            }
            this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, $.fn.datepicker.language[lang]);
          } else {
            this.loc = $.extend(true, {}, $.fn.datepicker.language.ru, lang);
          }
          if (this.opts.dateFormat) {
            this.loc.dateFormat = this.opts.dateFormat;
          }
          if (this.opts.timeFormat) {
            this.loc.timeFormat = this.opts.timeFormat;
          }
          if (this.opts.firstDay !== '') {
            this.loc.firstDay = this.opts.firstDay;
          }
          if (this.opts.timepicker) {
            this.loc.dateFormat = [this.loc.dateFormat, this.loc.timeFormat].join(this.opts.dateTimeSeparator);
          }
          if (this.opts.onlyTimepicker) {
            this.loc.dateFormat = this.loc.timeFormat;
          }
          var boundary = this._getWordBoundaryRegExp;
          if (this.loc.timeFormat.match(boundary('aa')) || this.loc.timeFormat.match(boundary('AA'))) {
            this.ampm = true;
          }
        },
        _buildDatepickersContainer: function _buildDatepickersContainer() {
          containerBuilt = true;
          $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
          $datepickersContainer = $('#datepickers-container');
        },
        _buildBaseHtml: function _buildBaseHtml() {
          var $appendTarget,
            $inline = $('<div class="datepicker-inline">');
          if (this.el.nodeName == 'INPUT') {
            if (!this.opts.inline) {
              $appendTarget = $datepickersContainer;
            } else {
              $appendTarget = $inline.insertAfter(this.$el);
            }
          } else {
            $appendTarget = $inline.appendTo(this.$el);
          }
          this.$datepicker = $(baseTemplate).appendTo($appendTarget);
          this.$content = $('.datepicker--content', this.$datepicker);
          this.$nav = $('.datepicker--nav', this.$datepicker);
        },
        _triggerOnChange: function _triggerOnChange() {
          if (!this.selectedDates.length) {
            if (this._prevOnSelectValue === '') return;
            this._prevOnSelectValue = '';
            return this.opts.onSelect('', '', this);
          }
          var selectedDates = this.selectedDates,
            parsedSelected = datepicker.getParsedDate(selectedDates[0]),
            formattedDates,
            _this = this,
            dates = new Date(parsedSelected.year, parsedSelected.month, parsedSelected.date, parsedSelected.hours, parsedSelected.minutes);
          formattedDates = selectedDates.map(function (date) {
            return _this.formatDate(_this.loc.dateFormat, date);
          }).join(this.opts.multipleDatesSeparator);

          if (this.opts.multipleDates || this.opts.range) {
            dates = selectedDates.map(function (date) {
              var parsedDate = datepicker.getParsedDate(date);
              return new Date(parsedDate.year, parsedDate.month, parsedDate.date, parsedDate.hours, parsedDate.minutes);
            });
          }
          this._prevOnSelectValue = formattedDates;
          this.opts.onSelect(formattedDates, dates, this);
        },
        next: function next() {
          var d = this.parsedDate,
            o = this.opts;
          switch (this.view) {
            case 'days':
              this.date = new Date(d.year, d.month + 1, 1);
              if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
              break;
            case 'months':
              this.date = new Date(d.year + 1, d.month, 1);
              if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
              break;
            case 'years':
              this.date = new Date(d.year + 10, 0, 1);
              if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
              break;
          }
        },
        prev: function prev() {
          var d = this.parsedDate,
            o = this.opts;
          switch (this.view) {
            case 'days':
              this.date = new Date(d.year, d.month - 1, 1);
              if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
              break;
            case 'months':
              this.date = new Date(d.year - 1, d.month, 1);
              if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
              break;
            case 'years':
              this.date = new Date(d.year - 10, 0, 1);
              if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
              break;
          }
        },
        formatDate: function formatDate(string, date) {
          date = date || this.date;
          var result = string,
            boundary = this._getWordBoundaryRegExp,
            locale = this.loc,
            leadingZero = datepicker.getLeadingZeroNum,
            decade = datepicker.getDecade(date),
            d = datepicker.getParsedDate(date),
            fullHours = d.fullHours,
            hours = d.hours,
            ampm = string.match(boundary('aa')) || string.match(boundary('AA')),
            dayPeriod = 'am',
            replacer = this._replacer,
            validHours;
          if (this.opts.timepicker && this.timepicker && ampm) {
            validHours = this.timepicker._getValidHoursFromDate(date, ampm);
            fullHours = leadingZero(validHours.hours);
            hours = validHours.hours;
            dayPeriod = validHours.dayPeriod;
          }
          switch (true) {
            case /@/.test(result):
              result = result.replace(/@/, date.getTime());
            case /aa/.test(result):
              result = replacer(result, boundary('aa'), dayPeriod);
            case /AA/.test(result):
              result = replacer(result, boundary('AA'), dayPeriod.toUpperCase());
            case /dd/.test(result):
              result = replacer(result, boundary('dd'), d.fullDate);
            case /d/.test(result):
              result = replacer(result, boundary('d'), d.date);
            case /DD/.test(result):
              result = replacer(result, boundary('DD'), locale.days[d.day]);
            case /D/.test(result):
              result = replacer(result, boundary('D'), locale.daysShort[d.day]);
            case /mm/.test(result):
              result = replacer(result, boundary('mm'), d.fullMonth);
            case /m/.test(result):
              result = replacer(result, boundary('m'), d.month + 1);
            case /MM/.test(result):
              result = replacer(result, boundary('MM'), this.loc.months[d.month]);
            case /M/.test(result):
              result = replacer(result, boundary('M'), locale.monthsShort[d.month]);
            case /ii/.test(result):
              result = replacer(result, boundary('ii'), d.fullMinutes);
            case /i/.test(result):
              result = replacer(result, boundary('i'), d.minutes);
            case /hh/.test(result):
              result = replacer(result, boundary('hh'), fullHours);
            case /h/.test(result):
              result = replacer(result, boundary('h'), hours);
            case /yyyy/.test(result):
              result = replacer(result, boundary('yyyy'), d.year);
            case /yyyy1/.test(result):
              result = replacer(result, boundary('yyyy1'), decade[0]);
            case /yyyy2/.test(result):
              result = replacer(result, boundary('yyyy2'), decade[1]);
            case /yy/.test(result):
              result = replacer(result, boundary('yy'), d.year.toString().slice(-2));
          }
          return result;
        },
        _replacer: function _replacer(str, reg, data) {
          return str.replace(reg, function (match, p1, p2, p3) {
            return p1 + data + p3;
          });
        },
        _getWordBoundaryRegExp: function _getWordBoundaryRegExp(sign) {
          var symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
          return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
        },
        selectDate: function selectDate(date) {
          var _this = this,
            opts = _this.opts,
            d = _this.parsedDate,
            selectedDates = _this.selectedDates,
            len = selectedDates.length,
            newDate = '';
          if (Array.isArray(date)) {
            date.forEach(function (d) {
              _this.selectDate(d);
            });
            return;
          }
          if (!(date instanceof Date)) return;
          this.lastSelectedDate = date;

          if (this.timepicker) {
            this.timepicker._setTime(date);
          }

          _this._trigger('selectDate', date);

          if (this.timepicker) {
            date.setHours(this.timepicker.hours);
            date.setMinutes(this.timepicker.minutes);
          }
          if (_this.view == 'days') {
            if (date.getMonth() != d.month && opts.moveToOtherMonthsOnSelect) {
              newDate = new Date(date.getFullYear(), date.getMonth(), 1);
            }
          }
          if (_this.view == 'years') {
            if (date.getFullYear() != d.year && opts.moveToOtherYearsOnSelect) {
              newDate = new Date(date.getFullYear(), 0, 1);
            }
          }
          if (newDate) {
            _this.silent = true;
            _this.date = newDate;
            _this.silent = false;
            _this.nav._render();
          }
          if (opts.multipleDates && !opts.range) {
            if (len === opts.multipleDates) return;
            if (!_this._isSelected(date)) {
              _this.selectedDates.push(date);
            }
          } else if (opts.range) {
            if (len == 2) {
              _this.selectedDates = [date];
              _this.minRange = date;
              _this.maxRange = '';
            } else if (len == 1) {
              _this.selectedDates.push(date);
              if (!_this.maxRange) {
                _this.maxRange = date;
              } else {
                _this.minRange = date;
              }
              if (datepicker.bigger(_this.maxRange, _this.minRange)) {
                _this.maxRange = _this.minRange;
                _this.minRange = date;
              }
              _this.selectedDates = [_this.minRange, _this.maxRange];
            } else {
              _this.selectedDates = [date];
              _this.minRange = date;
            }
          } else {
            _this.selectedDates = [date];
          }
          _this._setInputValue();
          if (opts.onSelect) {
            _this._triggerOnChange();
          }
          if (opts.autoClose && !this.timepickerIsActive) {
            if (!opts.multipleDates && !opts.range) {
              _this.hide();
            } else if (opts.range && _this.selectedDates.length == 2) {
              _this.hide();
            }
          }
          _this.views[this.currentView]._render();
        },
        removeDate: function removeDate(date) {
          var selected = this.selectedDates,
            _this = this;
          if (!(date instanceof Date)) return;
          return selected.some(function (curDate, i) {
            if (datepicker.isSame(curDate, date)) {
              selected.splice(i, 1);
              if (!_this.selectedDates.length) {
                _this.minRange = '';
                _this.maxRange = '';
                _this.lastSelectedDate = '';
              } else {
                _this.lastSelectedDate = _this.selectedDates[_this.selectedDates.length - 1];
              }
              _this.views[_this.currentView]._render();
              _this._setInputValue();
              if (_this.opts.onSelect) {
                _this._triggerOnChange();
              }
              return true;
            }
          });
        },
        today: function today() {
          this.silent = true;
          this.view = this.opts.minView;
          this.silent = false;
          this.date = new Date();
          if (this.opts.todayButton instanceof Date) {
            this.selectDate(this.opts.todayButton);
          }
        },
        clear: function clear() {
          this.selectedDates = [];
          this.minRange = '';
          this.maxRange = '';
          this.views[this.currentView]._render();
          this._setInputValue();
          if (this.opts.onSelect) {
            this._triggerOnChange();
          }
        },
        /**
         * Updates datepicker options
         * @param {String|Object} param - parameter's name to update. If object then it will extend current options
         * @param {String|Number|Object} [value] - new param value
         */
        update: function update(param, value) {
          var len = arguments.length,
            lastSelectedDate = this.lastSelectedDate;
          if (len == 2) {
            this.opts[param] = value;
          } else if (len == 1 && _typeof(param) == 'object') {
            this.opts = $.extend(true, this.opts, param);
          }
          this._createShortCuts();
          this._syncWithMinMaxDates();
          this._defineLocale(this.opts.language);
          this.nav._addButtonsIfNeed();
          if (!this.opts.onlyTimepicker) this.nav._render();
          this.views[this.currentView]._render();
          if (this.elIsInput && !this.opts.inline) {
            this._setPositionClasses(this.opts.position);
            if (this.visible) {
              this.setPosition(this.opts.position);
            }
          }
          if (this.opts.classes) {
            this.$datepicker.addClass(this.opts.classes);
          }
          if (this.opts.onlyTimepicker) {
            this.$datepicker.addClass('-only-timepicker-');
          }
          if (this.opts.timepicker) {
            if (lastSelectedDate) this.timepicker._handleDate(lastSelectedDate);
            this.timepicker._updateRanges();
            this.timepicker._updateCurrentTime();
            if (lastSelectedDate) {
              lastSelectedDate.setHours(this.timepicker.hours);
              lastSelectedDate.setMinutes(this.timepicker.minutes);
            }
          }
          this._setInputValue();
          return this;
        },
        _syncWithMinMaxDates: function _syncWithMinMaxDates() {
          var curTime = this.date.getTime();
          this.silent = true;
          if (this.minTime > curTime) {
            this.date = this.minDate;
          }
          if (this.maxTime < curTime) {
            this.date = this.maxDate;
          }
          this.silent = false;
        },
        _isSelected: function _isSelected(checkDate, cellType) {
          var res = false;
          this.selectedDates.some(function (date) {
            if (datepicker.isSame(date, checkDate, cellType)) {
              res = date;
              return true;
            }
          });
          return res;
        },
        _setInputValue: function _setInputValue() {
          var _this = this,
            opts = _this.opts,
            format = _this.loc.dateFormat,
            altFormat = opts.altFieldDateFormat,
            value = _this.selectedDates.map(function (date) {
              return _this.formatDate(format, date);
            }),
            altValues;
          if (opts.altField && _this.$altField.length) {
            altValues = this.selectedDates.map(function (date) {
              return _this.formatDate(altFormat, date);
            });
            altValues = altValues.join(this.opts.multipleDatesSeparator);
            this.$altField.val(altValues);
          }
          value = value.join(this.opts.multipleDatesSeparator);
          this.$el.val(value);
        },
        /**
         * Check if date is between minDate and maxDate
         * @param date {object} - date object
         * @param type {string} - cell type
         * @returns {boolean}
         * @private
         */
        _isInRange: function _isInRange(date, type) {
          var time = date.getTime(),
            d = datepicker.getParsedDate(date),
            min = datepicker.getParsedDate(this.minDate),
            max = datepicker.getParsedDate(this.maxDate),
            dMinTime = new Date(d.year, d.month, min.date).getTime(),
            dMaxTime = new Date(d.year, d.month, max.date).getTime(),
            types = {
              day: time >= this.minTime && time <= this.maxTime,
              month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
              year: d.year >= min.year && d.year <= max.year
            };
          return type ? types[type] : types.day;
        },
        _getDimensions: function _getDimensions($el) {
          var offset = $el.offset();
          return {
            width: $el.outerWidth(),
            height: $el.outerHeight(),
            left: offset.left,
            top: offset.top
          };
        },
        _getDateFromCell: function _getDateFromCell(cell) {
          var curDate = this.parsedDate,
            year = cell.data('year') || curDate.year,
            month = cell.data('month') == undefined ? curDate.month : cell.data('month'),
            date = cell.data('date') || 1;
          return new Date(year, month, date);
        },
        _setPositionClasses: function _setPositionClasses(pos) {
          pos = pos.split(' ');
          var main = pos[0],
            sec = pos[1],
            classes = 'datepicker -' + main + '-' + sec + '- -from-' + main + '-';
          if (this.visible) classes += ' active';
          this.$datepicker.removeAttr('class').addClass(classes);
        },
        setPosition: function setPosition(position) {
          position = position || this.opts.position;
          var dims = this._getDimensions(this.$el),
            selfDims = this._getDimensions(this.$datepicker),
            pos = position.split(' '),
            top,
            left,
            offset = this.opts.offset,
            main = pos[0],
            secondary = pos[1];
          switch (main) {
            case 'top':
              top = dims.top - selfDims.height - offset;
              break;
            case 'right':
              left = dims.left + dims.width + offset;
              break;
            case 'bottom':
              top = dims.top + dims.height + offset;
              break;
            case 'left':
              left = dims.left - selfDims.width - offset;
              break;
          }
          switch (secondary) {
            case 'top':
              top = dims.top;
              break;
            case 'right':
              left = dims.left + dims.width - selfDims.width;
              break;
            case 'bottom':
              top = dims.top + dims.height - selfDims.height;
              break;
            case 'left':
              left = dims.left;
              break;
            case 'center':
              if (/left|right/.test(main)) {
                top = dims.top + dims.height / 2 - selfDims.height / 2;
              } else {
                left = dims.left + dims.width / 2 - selfDims.width / 2;
              }
          }
          this.$datepicker.css({
            left: left,
            top: top
          });
        },
        show: function show() {
          var onShow = this.opts.onShow;
          this.setPosition(this.opts.position);
          this.$datepicker.addClass('active');
          this.visible = true;
          if (onShow) {
            this._bindVisionEvents(onShow);
          }
        },
        hide: function hide() {
          var onHide = this.opts.onHide;
          this.$datepicker.removeClass('active').css({
            left: '-100000px'
          });
          this.focused = '';
          this.keys = [];
          this.inFocus = false;
          this.visible = false;
          this.$el.blur();
          if (onHide) {
            this._bindVisionEvents(onHide);
          }
        },
        down: function down(date) {
          this._changeView(date, 'down');
        },
        up: function up(date) {
          this._changeView(date, 'up');
        },
        _bindVisionEvents: function _bindVisionEvents(event) {
          this.$datepicker.off('transitionend.dp');
          event(this, false);
          this.$datepicker.one('transitionend.dp', event.bind(this, this, true));
        },
        _changeView: function _changeView(date, dir) {
          date = date || this.focused || this.date;
          var nextView = dir == 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
          if (nextView > 2) nextView = 2;
          if (nextView < 0) nextView = 0;
          this.silent = true;
          this.date = new Date(date.getFullYear(), date.getMonth(), 1);
          this.silent = false;
          this.view = this.viewIndexes[nextView];
        },
        _handleHotKey: function _handleHotKey(key) {
          var date = datepicker.getParsedDate(this._getFocusedDate()),
            focusedParsed,
            o = this.opts,
            newDate,
            totalDaysInNextMonth,
            monthChanged = false,
            yearChanged = false,
            decadeChanged = false,
            y = date.year,
            m = date.month,
            d = date.date;
          switch (key) {
            case 'ctrlRight':
            case 'ctrlUp':
              m += 1;
              monthChanged = true;
              break;
            case 'ctrlLeft':
            case 'ctrlDown':
              m -= 1;
              monthChanged = true;
              break;
            case 'shiftRight':
            case 'shiftUp':
              yearChanged = true;
              y += 1;
              break;
            case 'shiftLeft':
            case 'shiftDown':
              yearChanged = true;
              y -= 1;
              break;
            case 'altRight':
            case 'altUp':
              decadeChanged = true;
              y += 10;
              break;
            case 'altLeft':
            case 'altDown':
              decadeChanged = true;
              y -= 10;
              break;
            case 'ctrlShiftUp':
              this.up();
              break;
          }
          totalDaysInNextMonth = datepicker.getDaysCount(new Date(y, m));
          newDate = new Date(y, m, d);

          if (totalDaysInNextMonth < d) d = totalDaysInNextMonth;

          if (newDate.getTime() < this.minTime) {
            newDate = this.minDate;
          } else if (newDate.getTime() > this.maxTime) {
            newDate = this.maxDate;
          }
          this.focused = newDate;
          focusedParsed = datepicker.getParsedDate(newDate);
          if (monthChanged && o.onChangeMonth) {
            o.onChangeMonth(focusedParsed.month, focusedParsed.year);
          }
          if (yearChanged && o.onChangeYear) {
            o.onChangeYear(focusedParsed.year);
          }
          if (decadeChanged && o.onChangeDecade) {
            o.onChangeDecade(this.curDecade);
          }
        },
        _registerKey: function _registerKey(key) {
          var exists = this.keys.some(function (curKey) {
            return curKey == key;
          });
          if (!exists) {
            this.keys.push(key);
          }
        },
        _unRegisterKey: function _unRegisterKey(key) {
          var index = this.keys.indexOf(key);
          this.keys.splice(index, 1);
        },
        _isHotKeyPressed: function _isHotKeyPressed() {
          var currentHotKey,
            found = false,
            _this = this,
            pressedKeys = this.keys.sort();
          for (var hotKey in hotKeys) {
            currentHotKey = hotKeys[hotKey];
            if (pressedKeys.length != currentHotKey.length) continue;
            if (currentHotKey.every(function (key, i) {
              return key == pressedKeys[i];
            })) {
              _this._trigger('hotKey', hotKey);
              found = true;
            }
          }
          return found;
        },
        _trigger: function _trigger(event, args) {
          this.$el.trigger(event, args);
        },
        _focusNextCell: function _focusNextCell(keyCode, type) {
          type = type || this.cellType;
          var date = datepicker.getParsedDate(this._getFocusedDate()),
            y = date.year,
            m = date.month,
            d = date.date;
          if (this._isHotKeyPressed()) {
            return;
          }
          switch (keyCode) {
            case 37:
              type == 'day' ? d -= 1 : '';
              type == 'month' ? m -= 1 : '';
              type == 'year' ? y -= 1 : '';
              break;
            case 38:
              type == 'day' ? d -= 7 : '';
              type == 'month' ? m -= 3 : '';
              type == 'year' ? y -= 4 : '';
              break;
            case 39:
              type == 'day' ? d += 1 : '';
              type == 'month' ? m += 1 : '';
              type == 'year' ? y += 1 : '';
              break;
            case 40:
              type == 'day' ? d += 7 : '';
              type == 'month' ? m += 3 : '';
              type == 'year' ? y += 4 : '';
              break;
          }
          var nd = new Date(y, m, d);
          if (nd.getTime() < this.minTime) {
            nd = this.minDate;
          } else if (nd.getTime() > this.maxTime) {
            nd = this.maxDate;
          }
          this.focused = nd;
        },
        _getFocusedDate: function _getFocusedDate() {
          var focused = this.focused || this.selectedDates[this.selectedDates.length - 1],
            d = this.parsedDate;
          if (!focused) {
            switch (this.view) {
              case 'days':
                focused = new Date(d.year, d.month, new Date().getDate());
                break;
              case 'months':
                focused = new Date(d.year, d.month, 1);
                break;
              case 'years':
                focused = new Date(d.year, 0, 1);
                break;
            }
          }
          return focused;
        },
        _getCell: function _getCell(date, type) {
          type = type || this.cellType;
          var d = datepicker.getParsedDate(date),
            selector = '.datepicker--cell[data-year="' + d.year + '"]',
            $cell;
          switch (type) {
            case 'month':
              selector = '[data-month="' + d.month + '"]';
              break;
            case 'day':
              selector += '[data-month="' + d.month + '"][data-date="' + d.date + '"]';
              break;
          }
          $cell = this.views[this.currentView].$el.find(selector);
          return $cell.length ? $cell : $('');
        },
        destroy: function destroy() {
          var _this = this;
          _this.$el.off('.adp').data('datepicker', '');
          _this.selectedDates = [];
          _this.focused = '';
          _this.views = {};
          _this.keys = [];
          _this.minRange = '';
          _this.maxRange = '';
          if (_this.opts.inline || !_this.elIsInput) {
            _this.$datepicker.closest('.datepicker-inline').remove();
          } else {
            _this.$datepicker.remove();
          }
        },
        _handleAlreadySelectedDates: function _handleAlreadySelectedDates(alreadySelected, selectedDate) {
          if (this.opts.range) {
            if (!this.opts.toggleSelected) {
              if (this.selectedDates.length != 2) {
                this._trigger('clickCell', selectedDate);
              }
            } else {
              this.removeDate(selectedDate);
            }
          } else if (this.opts.toggleSelected) {
            this.removeDate(selectedDate);
          }

          if (!this.opts.toggleSelected) {
            this.lastSelectedDate = alreadySelected;
            if (this.opts.timepicker) {
              this.timepicker._setTime(alreadySelected);
              this.timepicker.update();
            }
          }
        },
        _onShowEvent: function _onShowEvent(e) {
          if (!this.visible) {
            this.show();
          }
        },
        _onBlur: function _onBlur() {
          if (!this.inFocus && this.visible) {
            this.hide();
          }
        },
        _onMouseDownDatepicker: function _onMouseDownDatepicker(e) {
          this.inFocus = true;
        },
        _onMouseUpDatepicker: function _onMouseUpDatepicker(e) {
          this.inFocus = false;
          e.originalEvent.inFocus = true;
          if (!e.originalEvent.timepickerFocus) this.$el.focus();
        },
        _onKeyUpGeneral: function _onKeyUpGeneral(e) {
          var val = this.$el.val();
          if (!val) {
            this.clear();
          }
        },
        _onResize: function _onResize() {
          if (this.visible) {
            this.setPosition();
          }
        },
        _onMouseUpBody: function _onMouseUpBody(e) {
          if (e.originalEvent.inFocus) return;
          if (this.visible && !this.inFocus) {
            this.hide();
          }
        },
        _onMouseUpEl: function _onMouseUpEl(e) {
          e.originalEvent.inFocus = true;
          setTimeout(this._onKeyUpGeneral.bind(this), 4);
        },
        _onKeyDown: function _onKeyDown(e) {
          var code = e.which;
          this._registerKey(code);

          if (code >= 37 && code <= 40) {
            e.preventDefault();
            this._focusNextCell(code);
          }

          if (code == 13) {
            if (this.focused) {
              if (this._getCell(this.focused).hasClass('-disabled-')) return;
              if (this.view != this.opts.minView) {
                this.down();
              } else {
                var alreadySelected = this._isSelected(this.focused, this.cellType);
                if (!alreadySelected) {
                  if (this.timepicker) {
                    this.focused.setHours(this.timepicker.hours);
                    this.focused.setMinutes(this.timepicker.minutes);
                  }
                  this.selectDate(this.focused);
                  return;
                }
                this._handleAlreadySelectedDates(alreadySelected, this.focused);
              }
            }
          }

          if (code == 27) {
            this.hide();
          }
        },
        _onKeyUp: function _onKeyUp(e) {
          var code = e.which;
          this._unRegisterKey(code);
        },
        _onHotKey: function _onHotKey(e, hotKey) {
          this._handleHotKey(hotKey);
        },
        _onMouseEnterCell: function _onMouseEnterCell(e) {
          var $cell = $(e.target).closest('.datepicker--cell'),
            date = this._getDateFromCell($cell);

          this.silent = true;
          if (this.focused) {
            this.focused = '';
          }
          $cell.addClass('-focus-');
          this.focused = date;
          this.silent = false;
          if (this.opts.range && this.selectedDates.length == 1) {
            this.minRange = this.selectedDates[0];
            this.maxRange = '';
            if (datepicker.less(this.minRange, this.focused)) {
              this.maxRange = this.minRange;
              this.minRange = '';
            }
            this.views[this.currentView]._update();
          }
        },
        _onMouseLeaveCell: function _onMouseLeaveCell(e) {
          var $cell = $(e.target).closest('.datepicker--cell');
          $cell.removeClass('-focus-');
          this.silent = true;
          this.focused = '';
          this.silent = false;
        },
        _onTimeChange: function _onTimeChange(e, h, m) {
          var date = new Date(),
            selectedDates = this.selectedDates,
            selected = false;
          if (selectedDates.length) {
            selected = true;
            date = this.lastSelectedDate;
          }
          date.setHours(h);
          date.setMinutes(m);
          if (!selected && !this._getCell(date).hasClass('-disabled-')) {
            this.selectDate(date);
          } else {
            this._setInputValue();
            if (this.opts.onSelect) {
              this._triggerOnChange();
            }
          }
        },
        _onClickCell: function _onClickCell(e, date) {
          if (this.timepicker) {
            date.setHours(this.timepicker.hours);
            date.setMinutes(this.timepicker.minutes);
          }
          this.selectDate(date);
        },
        set focused(val) {
          if (!val && this.focused) {
            var $cell = this._getCell(this.focused);
            if ($cell.length) {
              $cell.removeClass('-focus-');
            }
          }
          this._focused = val;
          if (this.opts.range && this.selectedDates.length == 1) {
            this.minRange = this.selectedDates[0];
            this.maxRange = '';
            if (datepicker.less(this.minRange, this._focused)) {
              this.maxRange = this.minRange;
              this.minRange = '';
            }
          }
          if (this.silent) return;
          this.date = val;
        },
        get focused() {
          return this._focused;
        },
        get parsedDate() {
          return datepicker.getParsedDate(this.date);
        },
        set date(val) {
          if (!(val instanceof Date)) return;
          this.currentDate = val;
          if (this.inited && !this.silent) {
            this.views[this.view]._render();
            this.nav._render();
            if (this.visible && this.elIsInput) {
              this.setPosition();
            }
          }
          return val;
        },
        get date() {
          return this.currentDate;
        },
        set view(val) {
          this.viewIndex = this.viewIndexes.indexOf(val);
          if (this.viewIndex < 0) {
            return;
          }
          this.prevView = this.currentView;
          this.currentView = val;
          if (this.inited) {
            if (!this.views[val]) {
              this.views[val] = new $.fn.datepicker.Body(this, val, this.opts);
            } else {
              this.views[val]._render();
            }
            this.views[this.prevView].hide();
            this.views[val].show();
            this.nav._render();
            if (this.opts.onChangeView) {
              this.opts.onChangeView(val);
            }
            if (this.elIsInput && this.visible) this.setPosition();
          }
          return val;
        },
        get view() {
          return this.currentView;
        },
        get cellType() {
          return this.view.substring(0, this.view.length - 1);
        },
        get minTime() {
          var min = datepicker.getParsedDate(this.minDate);
          return new Date(min.year, min.month, min.date).getTime();
        },
        get maxTime() {
          var max = datepicker.getParsedDate(this.maxDate);
          return new Date(max.year, max.month, max.date).getTime();
        },
        get curDecade() {
          return datepicker.getDecade(this.date);
        }
      };


      datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      };
      datepicker.getParsedDate = function (date) {
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          fullMonth: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
          date: date.getDate(),
          fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
          day: date.getDay(),
          hours: date.getHours(),
          fullHours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
          minutes: date.getMinutes(),
          fullMinutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        };
      };
      datepicker.getDecade = function (date) {
        var firstYear = Math.floor(date.getFullYear() / 10) * 10;
        return [firstYear, firstYear + 9];
      };
      datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
          if (data[match] || data[match] === 0) {
            return data[match];
          }
        });
      };
      datepicker.isSame = function (date1, date2, type) {
        if (!date1 || !date2) return false;
        var d1 = datepicker.getParsedDate(date1),
          d2 = datepicker.getParsedDate(date2),
          _type = type ? type : 'day',
          conditions = {
            day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
            month: d1.month == d2.month && d1.year == d2.year,
            year: d1.year == d2.year
          };
        return conditions[_type];
      };
      datepicker.less = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() < dateCompareTo.getTime();
      };
      datepicker.bigger = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() > dateCompareTo.getTime();
      };
      datepicker.getLeadingZeroNum = function (num) {
        return parseInt(num) < 10 ? '0' + num : num;
      };

      /**
       * Returns copy of date with hours and minutes equals to 0
       * @param date {Date}
       */
      datepicker.resetTime = function (date) {
        if (_typeof(date) != 'object') return;
        date = datepicker.getParsedDate(date);
        return new Date(date.year, date.month, date.date);
      };
      $.fn.datepicker = function (options) {
        return this.each(function () {
          if (!$.data(this, pluginName)) {
            $.data(this, pluginName, new Datepicker(this, options));
          } else {
            var _this = $.data(this, pluginName);
            _this.opts = $.extend(true, _this.opts, options);
            _this.update();
          }
        });
      };
      $.fn.datepicker.Constructor = Datepicker;
      $.fn.datepicker.language = {
        ru: {
          days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
          daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          today: 'Сегодня',
          clear: 'Очистить',
          dateFormat: 'dd.mm.yyyy',
          timeFormat: 'hh:ii',
          firstDay: 1
        }
      };
      $(function () {
        $(autoInitSelector).datepicker();
      });
    })();
  }, {}],
  7: [function (require, module, exports) {
    ;
    (function () {
      var template = '' + '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' + '<div class="datepicker--nav-title">#{title}</div>' + '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
        button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;
      datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;
        this.$buttonsContainer = '';
        this.init();
      };
      datepicker.Navigation.prototype = {
        init: function init() {
          this._buildBaseHtml();
          this._bindEvents();
        },
        _bindEvents: function _bindEvents() {
          this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
          this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
          this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
        },
        _buildBaseHtml: function _buildBaseHtml() {
          if (!this.opts.onlyTimepicker) {
            this._render();
          }
          this._addButtonsIfNeed();
        },
        _addButtonsIfNeed: function _addButtonsIfNeed() {
          if (this.opts.todayButton) {
            this._addButton('today');
          }
          if (this.opts.clearButton) {
            this._addButton('clear');
          }
        },
        _render: function _render() {
          var title = this._getTitle(this.d.currentDate),
            html = dp.template(template, $.extend({
              title: title
            }, this.opts));
          this.d.$nav.html(html);
          if (this.d.view == 'years') {
            $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
          }
          this.setNavStatus();
        },
        _getTitle: function _getTitle(date) {
          return this.d.formatDate(this.opts.navTitles[this.d.view], date);
        },
        _addButton: function _addButton(type) {
          if (!this.$buttonsContainer.length) {
            this._addButtonsContainer();
          }
          var data = {
              action: type,
              label: this.d.loc[type]
            },
            html = dp.template(button, data);
          if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
          this.$buttonsContainer.append(html);
        },
        _addButtonsContainer: function _addButtonsContainer() {
          this.d.$datepicker.append(buttonsContainerTemplate);
          this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
        },
        setNavStatus: function setNavStatus() {
          if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;
          var date = this.d.parsedDate,
            m = date.month,
            y = date.year,
            d = date.date;
          switch (this.d.view) {
            case 'days':
              if (!this.d._isInRange(new Date(y, m - 1, 1), 'month')) {
                this._disableNav('prev');
              }
              if (!this.d._isInRange(new Date(y, m + 1, 1), 'month')) {
                this._disableNav('next');
              }
              break;
            case 'months':
              if (!this.d._isInRange(new Date(y - 1, m, d), 'year')) {
                this._disableNav('prev');
              }
              if (!this.d._isInRange(new Date(y + 1, m, d), 'year')) {
                this._disableNav('next');
              }
              break;
            case 'years':
              var decade = dp.getDecade(this.d.date);
              if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
                this._disableNav('prev');
              }
              if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
                this._disableNav('next');
              }
              break;
          }
        },
        _disableNav: function _disableNav(nav) {
          $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-');
        },
        _activateNav: function _activateNav(nav) {
          $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-');
        },
        _onClickNavButton: function _onClickNavButton(e) {
          var $el = $(e.target).closest('[data-action]'),
            action = $el.data('action');
          this.d[action]();
        },
        _onClickNavTitle: function _onClickNavTitle(e) {
          if ($(e.target).hasClass('-disabled-')) return;
          if (this.d.view == 'days') {
            return this.d.view = 'months';
          }
          this.d.view = 'years';
        }
      };
    })();
  }, {}],
  8: [function (require, module, exports) {
    ;
    (function () {
      var template = '<div class="datepicker--time">' + '<div class="datepicker--time-current">' + '   <span class="datepicker--time-current-hours">#{hourVisible}</span>' + '   <span class="datepicker--time-current-colon">:</span>' + '   <span class="datepicker--time-current-minutes">#{minValue}</span>' + '</div>' + '<div class="datepicker--time-sliders">' + '   <div class="datepicker--time-row">' + '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' + '   </div>' + '   <div class="datepicker--time-row">' + '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' + '   </div>' + '</div>' + '</div>',
        datepicker = $.fn.datepicker,
        dp = datepicker.Constructor;
      datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;
        this.init();
      };
      datepicker.Timepicker.prototype = {
        init: function init() {
          var input = 'input';
          this._setTime(this.d.date);
          this._buildHTML();
          if (navigator.userAgent.match(/trident/gi)) {
            input = 'change';
          }
          this.d.$el.on('selectDate', this._onSelectDate.bind(this));
          this.$ranges.on(input, this._onChangeRange.bind(this));
          this.$ranges.on('mouseup', this._onMouseUpRange.bind(this));
          this.$ranges.on('mousemove focus ', this._onMouseEnterRange.bind(this));
          this.$ranges.on('mouseout blur', this._onMouseOutRange.bind(this));
        },
        _setTime: function _setTime(date) {
          var _date = dp.getParsedDate(date);
          this._handleDate(date);
          this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
          this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
        },
        /**
         * Sets minHours and minMinutes from date (usually it's a minDate)
         * Also changes minMinutes if current hours are bigger then @date hours
         * @param date {Date}
         * @private
         */
        _setMinTimeFromDate: function _setMinTimeFromDate(date) {
          this.minHours = date.getHours();
          this.minMinutes = date.getMinutes();

          if (this.d.lastSelectedDate) {
            if (this.d.lastSelectedDate.getHours() > date.getHours()) {
              this.minMinutes = this.opts.minMinutes;
            }
          }
        },
        _setMaxTimeFromDate: function _setMaxTimeFromDate(date) {
          this.maxHours = date.getHours();
          this.maxMinutes = date.getMinutes();
          if (this.d.lastSelectedDate) {
            if (this.d.lastSelectedDate.getHours() < date.getHours()) {
              this.maxMinutes = this.opts.maxMinutes;
            }
          }
        },
        _setDefaultMinMaxTime: function _setDefaultMinMaxTime() {
          var maxHours = 23,
            maxMinutes = 59,
            opts = this.opts;
          this.minHours = opts.minHours < 0 || opts.minHours > maxHours ? 0 : opts.minHours;
          this.minMinutes = opts.minMinutes < 0 || opts.minMinutes > maxMinutes ? 0 : opts.minMinutes;
          this.maxHours = opts.maxHours < 0 || opts.maxHours > maxHours ? maxHours : opts.maxHours;
          this.maxMinutes = opts.maxMinutes < 0 || opts.maxMinutes > maxMinutes ? maxMinutes : opts.maxMinutes;
        },
        /**
         * Looks for min/max hours/minutes and if current values
         * are out of range sets valid values.
         * @private
         */
        _validateHoursMinutes: function _validateHoursMinutes(date) {
          if (this.hours < this.minHours) {
            this.hours = this.minHours;
          } else if (this.hours > this.maxHours) {
            this.hours = this.maxHours;
          }
          if (this.minutes < this.minMinutes) {
            this.minutes = this.minMinutes;
          } else if (this.minutes > this.maxMinutes) {
            this.minutes = this.maxMinutes;
          }
        },
        _buildHTML: function _buildHTML() {
          var lz = dp.getLeadingZeroNum,
            data = {
              hourMin: this.minHours,
              hourMax: lz(this.maxHours),
              hourStep: this.opts.hoursStep,
              hourValue: this.hours,
              hourVisible: lz(this.displayHours),
              minMin: this.minMinutes,
              minMax: lz(this.maxMinutes),
              minStep: this.opts.minutesStep,
              minValue: lz(this.minutes)
            },
            _template = dp.template(template, data);
          this.$timepicker = $(_template).appendTo(this.d.$datepicker);
          this.$ranges = $('[type="range"]', this.$timepicker);
          this.$hours = $('[name="hours"]', this.$timepicker);
          this.$minutes = $('[name="minutes"]', this.$timepicker);
          this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
          this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);
          if (this.d.ampm) {
            this.$ampm = $('<span class="datepicker--time-current-ampm">').appendTo($('.datepicker--time-current', this.$timepicker)).html(this.dayPeriod);
            this.$timepicker.addClass('-am-pm-');
          }
        },
        _updateCurrentTime: function _updateCurrentTime() {
          var h = dp.getLeadingZeroNum(this.displayHours),
            m = dp.getLeadingZeroNum(this.minutes);
          this.$hoursText.html(h);
          this.$minutesText.html(m);
          if (this.d.ampm) {
            this.$ampm.html(this.dayPeriod);
          }
        },
        _updateRanges: function _updateRanges() {
          this.$hours.attr({
            min: this.minHours,
            max: this.maxHours
          }).val(this.hours);
          this.$minutes.attr({
            min: this.minMinutes,
            max: this.maxMinutes
          }).val(this.minutes);
        },
        /**
         * Sets minHours, minMinutes etc. from date. If date is not passed, than sets
         * values from options
         * @param [date] {object} - Date object, to get values from
         * @private
         */
        _handleDate: function _handleDate(date) {
          this._setDefaultMinMaxTime();
          if (date) {
            if (dp.isSame(date, this.d.opts.minDate)) {
              this._setMinTimeFromDate(this.d.opts.minDate);
            } else if (dp.isSame(date, this.d.opts.maxDate)) {
              this._setMaxTimeFromDate(this.d.opts.maxDate);
            }
          }
          this._validateHoursMinutes(date);
        },
        update: function update() {
          this._updateRanges();
          this._updateCurrentTime();
        },
        /**
         * Calculates valid hour value to display in text input and datepicker's body.
         * @param date {Date|Number} - date or hours
         * @param [ampm] {Boolean} - 12 hours mode
         * @returns {{hours: *, dayPeriod: string}}
         * @private
         */
        _getValidHoursFromDate: function _getValidHoursFromDate(date, ampm) {
          var d = date,
            hours = date;
          if (date instanceof Date) {
            d = dp.getParsedDate(date);
            hours = d.hours;
          }
          var _ampm = ampm || this.d.ampm,
            dayPeriod = 'am';
          if (_ampm) {
            switch (true) {
              case hours == 0:
                hours = 12;
                break;
              case hours == 12:
                dayPeriod = 'pm';
                break;
              case hours > 11:
                hours = hours - 12;
                dayPeriod = 'pm';
                break;
              default:
                break;
            }
          }
          return {
            hours: hours,
            dayPeriod: dayPeriod
          };
        },
        set hours(val) {
          this._hours = val;
          var displayHours = this._getValidHoursFromDate(val);
          this.displayHours = displayHours.hours;
          this.dayPeriod = displayHours.dayPeriod;
        },
        get hours() {
          return this._hours;
        },

        _onChangeRange: function _onChangeRange(e) {
          var $target = $(e.target),
            name = $target.attr('name');
          this.d.timepickerIsActive = true;
          this[name] = $target.val();
          this._updateCurrentTime();
          this.d._trigger('timeChange', [this.hours, this.minutes]);
          this._handleDate(this.d.lastSelectedDate);
          this.update();
        },
        _onSelectDate: function _onSelectDate(e, data) {
          this._handleDate(data);
          this.update();
        },
        _onMouseEnterRange: function _onMouseEnterRange(e) {
          var name = $(e.target).attr('name');
          $('.datepicker--time-current-' + name, this.$timepicker).addClass('-focus-');
        },
        _onMouseOutRange: function _onMouseOutRange(e) {
          var name = $(e.target).attr('name');
          if (this.d.inFocus) return; 
          $('.datepicker--time-current-' + name, this.$timepicker).removeClass('-focus-');
        },
        _onMouseUpRange: function _onMouseUpRange(e) {
          this.d.timepickerIsActive = false;
        }
      };
    })();
  }, {}],
  9: [function (require, module, exports) {
    (function (global, factory) {
      "use strict";

      if (_typeof(module) === "object" && _typeof(module.exports) === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
      } else {
        factory(global);
      }

    })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
      "use strict";

      var arr = [];
      var getProto = Object.getPrototypeOf;
      var _slice = arr.slice;
      var flat = arr.flat ? function (array) {
        return arr.flat.call(array);
      } : function (array) {
        return arr.concat.apply([], array);
      };
      var push = arr.push;
      var indexOf = arr.indexOf;
      var class2type = {};
      var toString = class2type.toString;
      var hasOwn = class2type.hasOwnProperty;
      var fnToString = hasOwn.toString;
      var ObjectFunctionString = fnToString.call(Object);
      var support = {};
      var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
      };
      var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
      };
      var document = window.document;
      var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
      };
      function DOMEval(code, node, doc) {
        doc = doc || document;
        var i,
          val,
          script = doc.createElement("script");
        script.text = code;
        if (node) {
          for (i in preservedScriptAttributes) {
            val = node[i] || node.getAttribute && node.getAttribute(i);
            if (val) {
              script.setAttribute(i, val);
            }
          }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      }
      function toType(obj) {
        if (obj == null) {
          return obj + "";
        }

        return _typeof(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : _typeof(obj);
      }

      var version = "3.7.1",
        rhtmlSuffix = /HTML$/i,
        jQuery = function jQuery(selector, context) {
          return new jQuery.fn.init(selector, context);
        };
      jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,
        toArray: function toArray() {
          return _slice.call(this);
        },
        get: function get(num) {
          if (num == null) {
            return _slice.call(this);
          }

          return num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function pushStack(elems) {
          var ret = jQuery.merge(this.constructor(), elems);

          ret.prevObject = this;

          return ret;
        },
        each: function each(callback) {
          return jQuery.each(this, callback);
        },
        map: function map(callback) {
          return this.pushStack(jQuery.map(this, function (elem, i) {
            return callback.call(elem, i, elem);
          }));
        },
        slice: function slice() {
          return this.pushStack(_slice.apply(this, arguments));
        },
        first: function first() {
          return this.eq(0);
        },
        last: function last() {
          return this.eq(-1);
        },
        even: function even() {
          return this.pushStack(jQuery.grep(this, function (_elem, i) {
            return (i + 1) % 2;
          }));
        },
        odd: function odd() {
          return this.pushStack(jQuery.grep(this, function (_elem, i) {
            return i % 2;
          }));
        },
        eq: function eq(i) {
          var len = this.length,
            j = +i + (i < 0 ? len : 0);
          return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function end() {
          return this.prevObject || this.constructor();
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
      };
      jQuery.extend = jQuery.fn.extend = function () {
        var options,
          name,
          src,
          copy,
          copyIsArray,
          clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

        if (typeof target === "boolean") {
          deep = target;

          target = arguments[i] || {};
          i++;
        }

        if (_typeof(target) !== "object" && !isFunction(target)) {
          target = {};
        }

        if (i === length) {
          target = this;
          i--;
        }
        for (; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
              copy = options[name];

              if (name === "__proto__" || target === copy) {
                continue;
              }

              if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                src = target[name];

                if (copyIsArray && !Array.isArray(src)) {
                  clone = [];
                } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                  clone = {};
                } else {
                  clone = src;
                }
                copyIsArray = false;

                target[name] = jQuery.extend(deep, clone, copy);

              } else if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }

        return target;
      };
      jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function error(msg) {
          throw new Error(msg);
        },
        noop: function noop() {},
        isPlainObject: function isPlainObject(obj) {
          var proto, Ctor;

          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }
          proto = getProto(obj);

          if (!proto) {
            return true;
          }

          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function isEmptyObject(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        globalEval: function globalEval(code, options, doc) {
          DOMEval(code, {
            nonce: options && options.nonce
          }, doc);
        },
        each: function each(obj, callback) {
          var length,
            i = 0;
          if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          }
          return obj;
        },
        text: function text(elem) {
          var node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;
          if (!nodeType) {
            while (node = elem[i++]) {
              ret += jQuery.text(node);
            }
          }
          if (nodeType === 1 || nodeType === 11) {
            return elem.textContent;
          }
          if (nodeType === 9) {
            return elem.documentElement.textContent;
          }
          if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }


          return ret;
        },
        makeArray: function makeArray(arr, results) {
          var ret = results || [];
          if (arr != null) {
            if (isArrayLike(Object(arr))) {
              jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
            } else {
              push.call(ret, arr);
            }
          }
          return ret;
        },
        inArray: function inArray(elem, arr, i) {
          return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        isXMLDoc: function isXMLDoc(elem) {
          var namespace = elem && elem.namespaceURI,
            docElem = elem && (elem.ownerDocument || elem).documentElement;

          return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
        },
        merge: function merge(first, second) {
          var len = +second.length,
            j = 0,
            i = first.length;
          for (; j < len; j++) {
            first[i++] = second[j];
          }
          first.length = i;
          return first;
        },
        grep: function grep(elems, callback, invert) {
          var callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert;

          for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
              matches.push(elems[i]);
            }
          }
          return matches;
        },
        map: function map(elems, callback, arg) {
          var length,
            value,
            i = 0,
            ret = [];

          if (isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }

          } else {
            for (i in elems) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          }

          return flat(ret);
        },
        guid: 1,
        support: support
      });
      if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
      }

      jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      });
      function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
          type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
          return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
      }
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      var pop = arr.pop;
      var sort = arr.sort;
      var splice = arr.splice;
      var whitespace = "[\\x20\\t\\r\\n\\f]";
      var rtrimCSS = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");

      jQuery.contains = function (a, b) {
        var bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (
        a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      };

      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function fcssescape(ch, asCodePoint) {
        if (asCodePoint) {
          if (ch === "\0") {
            return "\uFFFD";
          }

          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }

        return "\\" + ch;
      }
      jQuery.escapeSelector = function (sel) {
        return (sel + "").replace(rcssescape, fcssescape);
      };
      var preferredDoc = document,
        pushNative = push;
      (function () {
        var i,
          Expr,
          outermostContext,
          sortInput,
          hasDuplicate,
          push = pushNative,
          document,
          documentElement,
          documentIsHTML,
          rbuggyQSA,
          matches,
          expando = jQuery.expando,
          dirruns = 0,
          done = 0,
          classCache = createCache(),
          tokenCache = createCache(),
          compilerCache = createCache(),
          nonnativeSelectorCache = createCache(),
          sortOrder = function sortOrder(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          },
          booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" + "loop|multiple|open|readonly|required|scoped",

          identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
          attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
          "*([*^$|!~]?=)" + whitespace +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
          pseudos = ":(" + identifier + ")(?:\\((" +
          "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
          "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
          ".*" + ")\\)|)",
          rwhitespace = new RegExp(whitespace + "+", "g"),
          rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
          rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
          rdescend = new RegExp(whitespace + "|>"),
          rpseudo = new RegExp(pseudos),
          ridentifier = new RegExp("^" + identifier + "$"),
          matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          },
          rinputs = /^(?:input|select|textarea|button)$/i,
          rheader = /^h\d$/i,
          rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          rsibling = /[+~]/,
          runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
          funescape = function funescape(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 0x10000;
            if (nonHex) {
              return nonHex;
            }

            return high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
          },
          unloadHandler = function unloadHandler() {
            setDocument();
          },
          inDisabledFieldset = addCombinator(function (elem) {
            return elem.disabled === true && nodeName(elem, "fieldset");
          }, {
            dir: "parentNode",
            next: "legend"
          });

        function safeActiveElement() {
          try {
            return document.activeElement;
          } catch (err) {}
        }

        try {
          push.apply(arr = _slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

          arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
          push = {
            apply: function apply(target, els) {
              pushNative.apply(target, _slice.call(els));
            },
            call: function call(target) {
              pushNative.apply(target, _slice.call(arguments, 1));
            }
          };
        }
        function find(selector, context, results, seed) {
          var m,
            i,
            elem,
            nid,
            match,
            groups,
            newSelector,
            newContext = context && context.ownerDocument,
            nodeType = context ? context.nodeType : 9;
          results = results || [];

          if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
            return results;
          }

          if (!seed) {
            setDocument(context);
            context = context || document;
            if (documentIsHTML) {
              if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                if (m = match[1]) {
                  if (nodeType === 9) {
                    if (elem = context.getElementById(m)) {
                      if (elem.id === m) {
                        push.call(results, elem);
                        return results;
                      }
                    } else {
                      return results;
                    }

                  } else {
                    if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                      push.call(results, elem);
                      return results;
                    }
                  }

                } else if (match[2]) {
                  push.apply(results, context.getElementsByTagName(selector));
                  return results;

                } else if ((m = match[3]) && context.getElementsByClassName) {
                  push.apply(results, context.getElementsByClassName(m));
                  return results;
                }
              }

              if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                newSelector = selector;
                newContext = context;

                if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                  newContext = rsibling.test(selector) && testContext(context.parentNode) || context;

                  if (newContext != context || !support.scope) {
                    if (nid = context.getAttribute("id")) {
                      nid = jQuery.escapeSelector(nid);
                    } else {
                      context.setAttribute("id", nid = expando);
                    }
                  }

                  groups = tokenize(selector);
                  i = groups.length;
                  while (i--) {
                    groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
                  }
                  newSelector = groups.join(",");
                }
                try {
                  push.apply(results, newContext.querySelectorAll(newSelector));
                  return results;
                } catch (qsaError) {
                  nonnativeSelectorCache(selector, true);
                } finally {
                  if (nid === expando) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
          }

          return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
        }

        /**
         * Create key-value caches of limited size
         * @returns {function(string, object)} Returns the Object data after storing it on itself with
         *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
         *	deleting the oldest entry
         */
        function createCache() {
          var keys = [];
          function cache(key, value) {
            if (keys.push(key + " ") > Expr.cacheLength) {
              delete cache[keys.shift()];
            }
            return cache[key + " "] = value;
          }
          return cache;
        }

        /**
         * Mark a function for special use by jQuery selector module
         * @param {Function} fn The function to mark
         */
        function markFunction(fn) {
          fn[expando] = true;
          return fn;
        }

        /**
         * Support testing using an element
         * @param {Function} fn Passed the created element and returns a boolean result
         */
        function assert(fn) {
          var el = document.createElement("fieldset");
          try {
            return !!fn(el);
          } catch (e) {
            return false;
          } finally {
            if (el.parentNode) {
              el.parentNode.removeChild(el);
            }

            el = null;
          }
        }

        /**
         * Returns a function to use in pseudos for input types
         * @param {String} type
         */
        function createInputPseudo(type) {
          return function (elem) {
            return nodeName(elem, "input") && elem.type === type;
          };
        }

        /**
         * Returns a function to use in pseudos for buttons
         * @param {String} type
         */
        function createButtonPseudo(type) {
          return function (elem) {
            return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
          };
        }

        /**
         * Returns a function to use in pseudos for :enabled/:disabled
         * @param {Boolean} disabled true for :disabled; false for :enabled
         */
        function createDisabledPseudo(disabled) {
          return function (elem) {
            if ("form" in elem) {
              if (elem.parentNode && elem.disabled === false) {
                if ("label" in elem) {
                  if ("label" in elem.parentNode) {
                    return elem.parentNode.disabled === disabled;
                  } else {
                    return elem.disabled === disabled;
                  }
                }

                return elem.isDisabled === disabled ||
                elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
              }
              return elem.disabled === disabled;

            } else if ("label" in elem) {
              return elem.disabled === disabled;
            }

            return false;
          };
        }

        /**
         * Returns a function to use in pseudos for positionals
         * @param {Function} fn
         */
        function createPositionalPseudo(fn) {
          return markFunction(function (argument) {
            argument = +argument;
            return markFunction(function (seed, matches) {
              var j,
                matchIndexes = fn([], seed.length, argument),
                i = matchIndexes.length;

              while (i--) {
                if (seed[j = matchIndexes[i]]) {
                  seed[j] = !(matches[j] = seed[j]);
                }
              }
            });
          });
        }

        /**
         * Checks a node for validity as a jQuery selector context
         * @param {Element|Object=} context
         * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
         */
        function testContext(context) {
          return context && typeof context.getElementsByTagName !== "undefined" && context;
        }

        /**
         * Sets document-related variables once based on the current document
         * @param {Element|Object} [node] An element or document object to use to set the document
         * @returns {Object} Returns the current document
         */
        function setDocument(node) {
          var subWindow,
            doc = node ? node.ownerDocument || node : preferredDoc;

          if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
            return document;
          }

          document = doc;
          documentElement = document.documentElement;
          documentIsHTML = !jQuery.isXMLDoc(document);

          matches = documentElement.matches || documentElement.webkitMatchesSelector || documentElement.msMatchesSelector;

          if (documentElement.msMatchesSelector &&
          preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
            subWindow.addEventListener("unload", unloadHandler);
          }

          support.getById = assert(function (el) {
            documentElement.appendChild(el).id = jQuery.expando;
            return !document.getElementsByName || !document.getElementsByName(jQuery.expando).length;
          });

          support.disconnectedMatch = assert(function (el) {
            return matches.call(el, "*");
          });

          support.scope = assert(function () {
            return document.querySelectorAll(":scope");
          });

          support.cssHas = assert(function () {
            try {
              document.querySelector(":has(*,:jqfake)");
              return false;
            } catch (e) {
              return true;
            }
          });

          if (support.getById) {
            Expr.filter.ID = function (id) {
              var attrId = id.replace(runescape, funescape);
              return function (elem) {
                return elem.getAttribute("id") === attrId;
              };
            };
            Expr.find.ID = function (id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var elem = context.getElementById(id);
                return elem ? [elem] : [];
              }
            };
          } else {
            Expr.filter.ID = function (id) {
              var attrId = id.replace(runescape, funescape);
              return function (elem) {
                var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return node && node.value === attrId;
              };
            };

            Expr.find.ID = function (id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var node,
                  i,
                  elems,
                  elem = context.getElementById(id);
                if (elem) {
                  node = elem.getAttributeNode("id");
                  if (node && node.value === id) {
                    return [elem];
                  }

                  elems = context.getElementsByName(id);
                  i = 0;
                  while (elem = elems[i++]) {
                    node = elem.getAttributeNode("id");
                    if (node && node.value === id) {
                      return [elem];
                    }
                  }
                }
                return [];
              }
            };
          }

          Expr.find.TAG = function (tag, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
              return context.getElementsByTagName(tag);

            } else {
              return context.querySelectorAll(tag);
            }
          };

          Expr.find.CLASS = function (className, context) {
            if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
              return context.getElementsByClassName(className);
            }
          };



          rbuggyQSA = [];

          assert(function (el) {
            var input;
            documentElement.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a>" + "<select id='" + expando + "-\r\\' disabled='disabled'>" + "<option selected=''></option></select>";

            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }

            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }

            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }

            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }

            input = document.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");

            documentElement.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }

            input = document.createElement("input");
            input.setAttribute("name", "");
            el.appendChild(input);
            if (!el.querySelectorAll("[name='']").length) {
              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
            }
          });
          if (!support.cssHas) {
            rbuggyQSA.push(":has");
          }
          rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));


          sortOrder = function sortOrder(a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }

            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
            if (compare) {
              return compare;
            }

            compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) :
            1;

            if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
              if (a === document || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
                return -1;
              }

              if (b === document || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
                return 1;
              }

              return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
            }
            return compare & 4 ? -1 : 1;
          };
          return document;
        }
        find.matches = function (expr, elements) {
          return find(expr, null, null, elements);
        };
        find.matchesSelector = function (elem, expr) {
          setDocument(elem);
          if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
            try {
              var ret = matches.call(elem, expr);

              if (ret || support.disconnectedMatch ||
              elem.document && elem.document.nodeType !== 11) {
                return ret;
              }
            } catch (e) {
              nonnativeSelectorCache(expr, true);
            }
          }
          return find(expr, document, null, [elem]).length > 0;
        };
        find.contains = function (context, elem) {
          if ((context.ownerDocument || context) != document) {
            setDocument(context);
          }
          return jQuery.contains(context, elem);
        };
        find.attr = function (elem, name) {
          if ((elem.ownerDocument || elem) != document) {
            setDocument(elem);
          }
          var fn = Expr.attrHandle[name.toLowerCase()],
            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
          if (val !== undefined) {
            return val;
          }
          return elem.getAttribute(name);
        };
        find.error = function (msg) {
          throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        /**
         * Document sorting and removing duplicates
         * @param {ArrayLike} results
         */
        jQuery.uniqueSort = function (results) {
          var elem,
            duplicates = [],
            j = 0,
            i = 0;

          hasDuplicate = !support.sortStable;
          sortInput = !support.sortStable && _slice.call(results, 0);
          sort.call(results, sortOrder);
          if (hasDuplicate) {
            while (elem = results[i++]) {
              if (elem === results[i]) {
                j = duplicates.push(i);
              }
            }
            while (j--) {
              splice.call(results, duplicates[j], 1);
            }
          }

          sortInput = null;
          return results;
        };
        jQuery.fn.uniqueSort = function () {
          return this.pushStack(jQuery.uniqueSort(_slice.apply(this)));
        };
        Expr = jQuery.expr = {
          cacheLength: 50,
          createPseudo: markFunction,
          match: matchExpr,
          attrHandle: {},
          find: {},
          relative: {
            ">": {
              dir: "parentNode",
              first: true
            },
            " ": {
              dir: "parentNode"
            },
            "+": {
              dir: "previousSibling",
              first: true
            },
            "~": {
              dir: "previousSibling"
            }
          },
          preFilter: {
            ATTR: function ATTR(match) {
              match[1] = match[1].replace(runescape, funescape);

              match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
              if (match[2] === "~=") {
                match[3] = " " + match[3] + " ";
              }
              return match.slice(0, 4);
            },
            CHILD: function CHILD(match) {
              match[1] = match[1].toLowerCase();
              if (match[1].slice(0, 3) === "nth") {
                if (!match[3]) {
                  find.error(match[0]);
                }

                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                match[5] = +(match[7] + match[8] || match[3] === "odd");

              } else if (match[3]) {
                find.error(match[0]);
              }
              return match;
            },
            PSEUDO: function PSEUDO(match) {
              var excess,
                unquoted = !match[6] && match[2];
              if (matchExpr.CHILD.test(match[0])) {
                return null;
              }

              if (match[3]) {
                match[2] = match[4] || match[5] || "";

              } else if (unquoted && rpseudo.test(unquoted) && (
              excess = tokenize(unquoted, true)) && (
              excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
              }

              return match.slice(0, 3);
            }
          },
          filter: {
            TAG: function TAG(nodeNameSelector) {
              var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
              return nodeNameSelector === "*" ? function () {
                return true;
              } : function (elem) {
                return nodeName(elem, expectedNodeName);
              };
            },
            CLASS: function CLASS(className) {
              var pattern = classCache[className + " "];
              return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
              });
            },
            ATTR: function ATTR(name, operator, check) {
              return function (elem) {
                var result = find.attr(elem, name);
                if (result == null) {
                  return operator === "!=";
                }
                if (!operator) {
                  return true;
                }
                result += "";
                if (operator === "=") {
                  return result === check;
                }
                if (operator === "!=") {
                  return result !== check;
                }
                if (operator === "^=") {
                  return check && result.indexOf(check) === 0;
                }
                if (operator === "*=") {
                  return check && result.indexOf(check) > -1;
                }
                if (operator === "$=") {
                  return check && result.slice(-check.length) === check;
                }
                if (operator === "~=") {
                  return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                }
                if (operator === "|=") {
                  return result === check || result.slice(0, check.length + 1) === check + "-";
                }
                return false;
              };
            },
            CHILD: function CHILD(type, what, _argument, first, last) {
              var simple = type.slice(0, 3) !== "nth",
                forward = type.slice(-4) !== "last",
                ofType = what === "of-type";
              return first === 1 && last === 0 ?
              function (elem) {
                return !!elem.parentNode;
              } : function (elem, _context, xml) {
                var cache,
                  outerCache,
                  node,
                  nodeIndex,
                  start,
                  dir = simple !== forward ? "nextSibling" : "previousSibling",
                  parent = elem.parentNode,
                  name = ofType && elem.nodeName.toLowerCase(),
                  useCache = !xml && !ofType,
                  diff = false;
                if (parent) {
                  if (simple) {
                    while (dir) {
                      node = elem;
                      while (node = node[dir]) {
                        if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                          return false;
                        }
                      }

                      start = dir = type === "only" && !start && "nextSibling";
                    }
                    return true;
                  }
                  start = [forward ? parent.firstChild : parent.lastChild];

                  if (forward && useCache) {
                    outerCache = parent[expando] || (parent[expando] = {});
                    cache = outerCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex && cache[2];
                    node = nodeIndex && parent.childNodes[nodeIndex];
                    while (node = ++nodeIndex && node && node[dir] || (
                    diff = nodeIndex = 0) || start.pop()) {
                      if (node.nodeType === 1 && ++diff && node === elem) {
                        outerCache[type] = [dirruns, nodeIndex, diff];
                        break;
                      }
                    }
                  } else {
                    if (useCache) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex;
                    }

                    if (diff === false) {
                      while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                        if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                          if (useCache) {
                            outerCache = node[expando] || (node[expando] = {});
                            outerCache[type] = [dirruns, diff];
                          }
                          if (node === elem) {
                            break;
                          }
                        }
                      }
                    }
                  }

                  diff -= last;
                  return diff === first || diff % first === 0 && diff / first >= 0;
                }
              };
            },
            PSEUDO: function PSEUDO(pseudo, argument) {
              var args,
                fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);

              if (fn[expando]) {
                return fn(argument);
              }

              if (fn.length > 1) {
                args = [pseudo, pseudo, "", argument];
                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
                  var idx,
                    matched = fn(seed, argument),
                    i = matched.length;
                  while (i--) {
                    idx = indexOf.call(seed, matched[i]);
                    seed[idx] = !(matches[idx] = matched[i]);
                  }
                }) : function (elem) {
                  return fn(elem, 0, args);
                };
              }
              return fn;
            }
          },
          pseudos: {
            not: markFunction(function (selector) {
              var input = [],
                results = [],
                matcher = compile(selector.replace(rtrimCSS, "$1"));
              return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
                var elem,
                  unmatched = matcher(seed, null, xml, []),
                  i = seed.length;

                while (i--) {
                  if (elem = unmatched[i]) {
                    seed[i] = !(matches[i] = elem);
                  }
                }
              }) : function (elem, _context, xml) {
                input[0] = elem;
                matcher(input, null, xml, results);

                input[0] = null;
                return !results.pop();
              };
            }),
            has: markFunction(function (selector) {
              return function (elem) {
                return find(selector, elem).length > 0;
              };
            }),
            contains: markFunction(function (text) {
              text = text.replace(runescape, funescape);
              return function (elem) {
                return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
              };
            }),
            lang: markFunction(function (lang) {
              if (!ridentifier.test(lang || "")) {
                find.error("unsupported lang: " + lang);
              }
              lang = lang.replace(runescape, funescape).toLowerCase();
              return function (elem) {
                var elemLang;
                do {
                  if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                    elemLang = elemLang.toLowerCase();
                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                  }
                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                return false;
              };
            }),
            target: function target(elem) {
              var hash = window.location && window.location.hash;
              return hash && hash.slice(1) === elem.id;
            },
            root: function root(elem) {
              return elem === documentElement;
            },
            focus: function focus(elem) {
              return elem === safeActiveElement() && document.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
            },
            enabled: createDisabledPseudo(false),
            disabled: createDisabledPseudo(true),
            checked: function checked(elem) {
              return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
            },
            selected: function selected(elem) {
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }
              return elem.selected === true;
            },
            empty: function empty(elem) {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },
            parent: function parent(elem) {
              return !Expr.pseudos.empty(elem);
            },
            header: function header(elem) {
              return rheader.test(elem.nodeName);
            },
            input: function input(elem) {
              return rinputs.test(elem.nodeName);
            },
            button: function button(elem) {
              return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
            },
            text: function text(elem) {
              var attr;
              return nodeName(elem, "input") && elem.type === "text" && (
              (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
            },
            first: createPositionalPseudo(function () {
              return [0];
            }),
            last: createPositionalPseudo(function (_matchIndexes, length) {
              return [length - 1];
            }),
            eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
              return [argument < 0 ? argument + length : argument];
            }),
            even: createPositionalPseudo(function (matchIndexes, length) {
              var i = 0;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),
            odd: createPositionalPseudo(function (matchIndexes, length) {
              var i = 1;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),
            lt: createPositionalPseudo(function (matchIndexes, length, argument) {
              var i;
              if (argument < 0) {
                i = argument + length;
              } else if (argument > length) {
                i = length;
              } else {
                i = argument;
              }
              for (; --i >= 0;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),
            gt: createPositionalPseudo(function (matchIndexes, length, argument) {
              var i = argument < 0 ? argument + length : argument;
              for (; ++i < length;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            })
          }
        };
        Expr.pseudos.nth = Expr.pseudos.eq;

        for (i in {
          radio: true,
          checkbox: true,
          file: true,
          password: true,
          image: true
        }) {
          Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
          submit: true,
          reset: true
        }) {
          Expr.pseudos[i] = createButtonPseudo(i);
        }

        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        function tokenize(selector, parseOnly) {
          var matched,
            match,
            tokens,
            type,
            soFar,
            groups,
            preFilters,
            cached = tokenCache[selector + " "];
          if (cached) {
            return parseOnly ? 0 : cached.slice(0);
          }
          soFar = selector;
          groups = [];
          preFilters = Expr.preFilter;
          while (soFar) {
            if (!matched || (match = rcomma.exec(soFar))) {
              if (match) {
                soFar = soFar.slice(match[0].length) || soFar;
              }
              groups.push(tokens = []);
            }
            matched = false;

            if (match = rleadingCombinator.exec(soFar)) {
              matched = match.shift();
              tokens.push({
                value: matched,
                type: match[0].replace(rtrimCSS, " ")
              });
              soFar = soFar.slice(matched.length);
            }

            for (type in Expr.filter) {
              if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type: type,
                  matches: match
                });
                soFar = soFar.slice(matched.length);
              }
            }
            if (!matched) {
              break;
            }
          }

          if (parseOnly) {
            return soFar.length;
          }
          return soFar ? find.error(selector) :
          tokenCache(selector, groups).slice(0);
        }
        function toSelector(tokens) {
          var i = 0,
            len = tokens.length,
            selector = "";
          for (; i < len; i++) {
            selector += tokens[i].value;
          }
          return selector;
        }
        function addCombinator(matcher, combinator, base) {
          var dir = combinator.dir,
            skip = combinator.next,
            key = skip || dir,
            checkNonElements = base && key === "parentNode",
            doneName = done++;
          return combinator.first ?
          function (elem, context, xml) {
            while (elem = elem[dir]) {
              if (elem.nodeType === 1 || checkNonElements) {
                return matcher(elem, context, xml);
              }
            }
            return false;
          } :
          function (elem, context, xml) {
            var oldCache,
              outerCache,
              newCache = [dirruns, doneName];

            if (xml) {
              while (elem = elem[dir]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  if (matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            } else {
              while (elem = elem[dir]) {
                if (elem.nodeType === 1 || checkNonElements) {
                  outerCache = elem[expando] || (elem[expando] = {});
                  if (skip && nodeName(elem, skip)) {
                    elem = elem[dir] || elem;
                  } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                    return newCache[2] = oldCache[2];
                  } else {
                    outerCache[key] = newCache;

                    if (newCache[2] = matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              }
            }
            return false;
          };
        }
        function elementMatcher(matchers) {
          return matchers.length > 1 ? function (elem, context, xml) {
            var i = matchers.length;
            while (i--) {
              if (!matchers[i](elem, context, xml)) {
                return false;
              }
            }
            return true;
          } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
          var i = 0,
            len = contexts.length;
          for (; i < len; i++) {
            find(selector, contexts[i], results);
          }
          return results;
        }
        function condense(unmatched, map, filter, context, xml) {
          var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;
          for (; i < len; i++) {
            if (elem = unmatched[i]) {
              if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) {
                  map.push(i);
                }
              }
            }
          }
          return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
          if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
          }
          if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
          }
          return markFunction(function (seed, results, context, xml) {
            var temp,
              i,
              elem,
              matcherOut,
              preMap = [],
              postMap = [],
              preexisting = results.length,
              elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
              matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
            if (matcher) {
              matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ?
              [] :
              results;

              matcher(matcherIn, matcherOut, context, xml);
            } else {
              matcherOut = matcherIn;
            }

            if (postFilter) {
              temp = condense(matcherOut, postMap);
              postFilter(temp, [], context, xml);

              i = temp.length;
              while (i--) {
                if (elem = temp[i]) {
                  matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                }
              }
            }
            if (seed) {
              if (postFinder || preFilter) {
                if (postFinder) {
                  temp = [];
                  i = matcherOut.length;
                  while (i--) {
                    if (elem = matcherOut[i]) {
                      temp.push(matcherIn[i] = elem);
                    }
                  }
                  postFinder(null, matcherOut = [], temp, xml);
                }

                i = matcherOut.length;
                while (i--) {
                  if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                    seed[temp] = !(results[temp] = elem);
                  }
                }
              }

            } else {
              matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
              if (postFinder) {
                postFinder(null, results, matcherOut, xml);
              } else {
                push.apply(results, matcherOut);
              }
            }
          });
        }
        function matcherFromTokens(tokens) {
          var checkContext,
            matcher,
            j,
            len = tokens.length,
            leadingRelative = Expr.relative[tokens[0].type],
            implicitRelative = leadingRelative || Expr.relative[" "],
            i = leadingRelative ? 1 : 0,
            matchContext = addCombinator(function (elem) {
              return elem === checkContext;
            }, implicitRelative, true),
            matchAnyContext = addCombinator(function (elem) {
              return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true),
            matchers = [function (elem, context, xml) {
              var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

              checkContext = null;
              return ret;
            }];
          for (; i < len; i++) {
            if (matcher = Expr.relative[tokens[i].type]) {
              matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
              matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

              if (matcher[expando]) {
                j = ++i;
                for (; j < len; j++) {
                  if (Expr.relative[tokens[j].type]) {
                    break;
                  }
                }
                return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
                tokens.slice(0, i - 1).concat({
                  value: tokens[i - 2].type === " " ? "*" : ""
                })).replace(rtrimCSS, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
              }
              matchers.push(matcher);
            }
          }
          return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
          var bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function superMatcher(seed, context, xml, results, outermost) {
              var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find.TAG("*", outermost),
                dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
                len = elems.length;
              if (outermost) {
                outermostContext = context == document || context || outermost;
              }

              for (; i !== len && (elem = elems[i]) != null; i++) {
                if (byElement && elem) {
                  j = 0;

                  if (!context && elem.ownerDocument != document) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document, xml)) {
                      push.call(results, elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }

                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }

                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }

              matchedCount += i;

              if (bySet && i !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i--) {
                      if (!(unmatched[i] || setMatched[i])) {
                        setMatched[i] = pop.call(results);
                      }
                    }
                  }

                  setMatched = condense(setMatched);
                }

                push.apply(results, setMatched);

                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  jQuery.uniqueSort(results);
                }
              }

              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
          return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function compile(selector, match ) {
          var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[selector + " "];
          if (!cached) {
            if (!match) {
              match = tokenize(selector);
            }
            i = match.length;
            while (i--) {
              cached = matcherFromTokens(match[i]);
              if (cached[expando]) {
                setMatchers.push(cached);
              } else {
                elementMatchers.push(cached);
              }
            }

            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

            cached.selector = selector;
          }
          return cached;
        }

        /**
         * A low-level selection function that works with jQuery's compiled
         *  selector functions
         * @param {String|Function} selector A selector or a pre-compiled
         *  selector function built with jQuery selector compile
         * @param {Element} context
         * @param {Array} [results]
         * @param {Array} [seed] A set of elements to match against
         */
        function select(selector, context, results, seed) {
          var i,
            tokens,
            token,
            type,
            find,
            compiled = typeof selector === "function" && selector,
            match = !seed && tokenize(selector = compiled.selector || selector);
          results = results || [];

          if (match.length === 1) {
            tokens = match[0] = match[0].slice(0);
            if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
              context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
              if (!context) {
                return results;

              } else if (compiled) {
                context = context.parentNode;
              }
              selector = selector.slice(tokens.shift().value.length);
            }

            i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
            while (i--) {
              token = tokens[i];

              if (Expr.relative[type = token.type]) {
                break;
              }
              if (find = Expr.find[type]) {
                if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                  tokens.splice(i, 1);
                  selector = seed.length && toSelector(tokens);
                  if (!selector) {
                    push.apply(results, seed);
                    return results;
                  }
                  break;
                }
              }
            }
          }

          (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
          return results;
        }


        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

        setDocument();

        support.sortDetached = assert(function (el) {
          return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
        });
        jQuery.find = find;

        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = jQuery.uniqueSort;

        find.compile = compile;
        find.select = select;
        find.setDocument = setDocument;
        find.tokenize = tokenize;
        find.escape = jQuery.escapeSelector;
        find.getText = jQuery.text;
        find.isXML = jQuery.isXMLDoc;
        find.selectors = jQuery.expr;
        find.support = jQuery.support;
        find.uniqueSort = jQuery.uniqueSort;

      })();
      var dir = function dir(elem, _dir, until) {
        var matched = [],
          truncate = until !== undefined;
        while ((elem = elem[_dir]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      };
      var _siblings = function siblings(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }
        return matched;
      };
      var rneedsContext = jQuery.expr.match.needsContext;
      var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

      function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
          return jQuery.grep(elements, function (elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
          });
        }

        if (qualifier.nodeType) {
          return jQuery.grep(elements, function (elem) {
            return elem === qualifier !== not;
          });
        }

        if (typeof qualifier !== "string") {
          return jQuery.grep(elements, function (elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
          });
        }

        return jQuery.filter(qualifier, elements, not);
      }
      jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];
        if (not) {
          expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
          return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
          return elem.nodeType === 1;
        }));
      };
      jQuery.fn.extend({
        find: function find(selector) {
          var i,
            ret,
            len = this.length,
            self = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery(selector).filter(function () {
              for (i = 0; i < len; i++) {
                if (jQuery.contains(self[i], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i = 0; i < len; i++) {
            jQuery.find(selector, self[i], ret);
          }
          return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function filter(selector) {
          return this.pushStack(winnow(this, selector || [], false));
        },
        not: function not(selector) {
          return this.pushStack(winnow(this, selector || [], true));
        },
        is: function is(selector) {
          return !!winnow(this,
          typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
      });


      var rootjQuery,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        init = jQuery.fn.init = function (selector, context, root) {
          var match, elem;

          if (!selector) {
            return this;
          }

          root = root || rootjQuery;

          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }

            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;

                jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);

                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;

              } else {
                elem = document.getElementById(match[2]);
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }

            } else if (!context || context.jquery) {
              return (context || root).find(selector);

            } else {
              return this.constructor(context).find(selector);
            }

          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;

          } else if (isFunction(selector)) {
            return root.ready !== undefined ? root.ready(selector) :
            selector(jQuery);
          }
          return jQuery.makeArray(selector, this);
        };

      init.prototype = jQuery.fn;

      rootjQuery = jQuery(document);
      var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
      jQuery.fn.extend({
        has: function has(target) {
          var targets = jQuery(target, this),
            l = targets.length;
          return this.filter(function () {
            var i = 0;
            for (; i < l; i++) {
              if (jQuery.contains(this, targets[i])) {
                return true;
              }
            }
          });
        },
        closest: function closest(selectors, context) {
          var cur,
            i = 0,
            l = this.length,
            matched = [],
            targets = typeof selectors !== "string" && jQuery(selectors);

          if (!rneedsContext.test(selectors)) {
            for (; i < l; i++) {
              for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :
                cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                  matched.push(cur);
                  break;
                }
              }
            }
          }
          return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function index(elem) {
          if (!elem) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }

          if (typeof elem === "string") {
            return indexOf.call(jQuery(elem), this[0]);
          }

          return indexOf.call(this,
          elem.jquery ? elem[0] : elem);
        },
        add: function add(selector, context) {
          return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function addBack(selector) {
          return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
      });
      function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
      }
      jQuery.each({
        parent: function parent(elem) {
          var parent = elem.parentNode;
          return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function parents(elem) {
          return dir(elem, "parentNode");
        },
        parentsUntil: function parentsUntil(elem, _i, until) {
          return dir(elem, "parentNode", until);
        },
        next: function next(elem) {
          return sibling(elem, "nextSibling");
        },
        prev: function prev(elem) {
          return sibling(elem, "previousSibling");
        },
        nextAll: function nextAll(elem) {
          return dir(elem, "nextSibling");
        },
        prevAll: function prevAll(elem) {
          return dir(elem, "previousSibling");
        },
        nextUntil: function nextUntil(elem, _i, until) {
          return dir(elem, "nextSibling", until);
        },
        prevUntil: function prevUntil(elem, _i, until) {
          return dir(elem, "previousSibling", until);
        },
        siblings: function siblings(elem) {
          return _siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function children(elem) {
          return _siblings(elem.firstChild);
        },
        contents: function contents(elem) {
          if (elem.contentDocument != null &&
          getProto(elem.contentDocument)) {
            return elem.contentDocument;
          }

          if (nodeName(elem, "template")) {
            elem = elem.content || elem;
          }
          return jQuery.merge([], elem.childNodes);
        }
      }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
          var matched = jQuery.map(this, fn, until);
          if (name.slice(-5) !== "Until") {
            selector = until;
          }
          if (selector && typeof selector === "string") {
            matched = jQuery.filter(selector, matched);
          }
          if (this.length > 1) {
            if (!guaranteedUnique[name]) {
              jQuery.uniqueSort(matched);
            }

            if (rparentsprev.test(name)) {
              matched.reverse();
            }
          }
          return this.pushStack(matched);
        };
      });
      var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

      function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
          object[flag] = true;
        });
        return object;
      }

      jQuery.Callbacks = function (options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var
          firing,
          memory,
          _fired,
          _locked,
          list = [],
          queue = [],
          firingIndex = -1,
          fire = function fire() {
            _locked = _locked || options.once;

            _fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }

            if (!options.memory) {
              memory = false;
            }
            firing = false;

            if (_locked) {
              if (memory) {
                list = [];

              } else {
                list = "";
              }
            }
          },
          self = {
            add: function add() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add(args) {
                  jQuery.each(args, function (_, arg) {
                    if (isFunction(arg)) {
                      if (!options.unique || !self.has(arg)) {
                        list.push(arg);
                      }
                    } else if (arg && arg.length && toType(arg) !== "string") {
                      add(arg);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            remove: function remove() {
              jQuery.each(arguments, function (_, arg) {
                var index;
                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);

                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            has: function has(fn) {
              return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function empty() {
              if (list) {
                list = [];
              }
              return this;
            },
            disable: function disable() {
              _locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function disabled() {
              return !list;
            },
            lock: function lock() {
              _locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function locked() {
              return !!_locked;
            },
            fireWith: function fireWith(context, args) {
              if (!_locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            fire: function fire() {
              self.fireWith(this, arguments);
              return this;
            },
            fired: function fired() {
              return !!_fired;
            }
          };
        return self;
      };
      function Identity(v) {
        return v;
      }
      function Thrower(ex) {
        throw ex;
      }
      function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
          if (value && isFunction(method = value.promise)) {
            method.call(value).done(resolve).fail(reject);

          } else if (value && isFunction(method = value.then)) {
            method.call(value, resolve, reject);

          } else {
            resolve.apply(undefined, [value].slice(noValue));
          }

        } catch (value) {
          reject.apply(undefined, [value]);
        }
      }
      jQuery.extend({
        Deferred: function Deferred(func) {
          var tuples = [
            ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
            _state = "pending",
            _promise = {
              state: function state() {
                return _state;
              },
              always: function always() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function _catch(fn) {
                return _promise.then(null, fn);
              },
              pipe: function pipe( 
              ) {
                var fns = arguments;
                return jQuery.Deferred(function (newDefer) {
                  jQuery.each(tuples, function (_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                    deferred[tuple[1]](function () {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function then(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred, handler, special) {
                  return function () {
                    var that = this,
                      args = arguments,
                      mightThrow = function mightThrow() {
                        var returned, then;

                        if (depth < maxDepth) {
                          return;
                        }
                        returned = handler.apply(that, args);

                        if (returned === deferred.promise()) {
                          throw new TypeError("Thenable self-resolution");
                        }

                        then = returned && (
                        _typeof(returned) === "object" || typeof returned === "function") && returned.then;

                        if (isFunction(then)) {
                          if (special) {
                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

                          } else {
                            maxDepth++;
                            then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                          }

                        } else {
                          if (handler !== Identity) {
                            that = undefined;
                            args = [returned];
                          }

                          (special || deferred.resolveWith)(that, args);
                        }
                      },
                      process = special ? mightThrow : function () {
                        try {
                          mightThrow();
                        } catch (e) {
                          if (jQuery.Deferred.exceptionHook) {
                            jQuery.Deferred.exceptionHook(e, process.error);
                          }

                          if (depth + 1 >= maxDepth) {
                            if (handler !== Thrower) {
                              that = undefined;
                              args = [e];
                            }
                            deferred.rejectWith(that, args);
                          }
                        }
                      };

                    if (depth) {
                      process();
                    } else {
                      if (jQuery.Deferred.getErrorHook) {
                        process.error = jQuery.Deferred.getErrorHook();

                      } else if (jQuery.Deferred.getStackHook) {
                        process.error = jQuery.Deferred.getStackHook();
                      }
                      window.setTimeout(process);
                    }
                  };
                }
                return jQuery.Deferred(function (newDefer) {
                  tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

                  tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));

                  tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
                }).promise();
              },
              promise: function promise(obj) {
                return obj != null ? jQuery.extend(obj, _promise) : _promise;
              }
            },
            deferred = {};

          jQuery.each(tuples, function (i, tuple) {
            var list = tuple[2],
              stateString = tuple[5];

            _promise[tuple[1]] = list.add;

            if (stateString) {
              list.add(function () {
                _state = stateString;
              },
              tuples[3 - i][2].disable,
              tuples[3 - i][3].disable,
              tuples[0][2].lock,
              tuples[0][3].lock);
            }

            list.add(tuple[3].fire);

            deferred[tuple[0]] = function () {
              deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
              return this;
            };

            deferred[tuple[0] + "With"] = list.fireWith;
          });

          _promise.promise(deferred);

          if (func) {
            func.call(deferred, deferred);
          }

          return deferred;
        },
        when: function when(singleValue) {
          var
            remaining = arguments.length,
            i = remaining,
            resolveContexts = Array(i),
            resolveValues = _slice.call(arguments),
            primary = jQuery.Deferred(),
            updateFunc = function updateFunc(i) {
              return function (value) {
                resolveContexts[i] = this;
                resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
                if (! --remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };

          if (remaining <= 1) {
            adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);

            if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
              return primary.then();
            }
          }

          while (i--) {
            adoptValue(resolveValues[i], updateFunc(i), primary.reject);
          }
          return primary.promise();
        }
      });

      var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

      jQuery.Deferred.exceptionHook = function (error, asyncError) {
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
          window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, asyncError);
        }
      };
      jQuery.readyException = function (error) {
        window.setTimeout(function () {
          throw error;
        });
      };

      var readyList = jQuery.Deferred();
      jQuery.fn.ready = function (fn) {
        readyList.then(fn)

        ["catch"](function (error) {
          jQuery.readyException(error);
        });
        return this;
      };
      jQuery.extend({
        isReady: false,
        readyWait: 1,
        ready: function ready(wait) {
          if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
            return;
          }

          jQuery.isReady = true;

          if (wait !== true && --jQuery.readyWait > 0) {
            return;
          }

          readyList.resolveWith(document, [jQuery]);
        }
      });
      jQuery.ready.then = readyList.then;

      function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
      }

      if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);

        window.addEventListener("load", completed);
      }

      var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
          len = elems.length,
          bulk = key == null;

        if (toType(key) === "object") {
          chainable = true;
          for (i in key) {
            access(elems, fn, i, key[i], true, emptyGet, raw);
          }

        } else if (value !== undefined) {
          chainable = true;
          if (!isFunction(value)) {
            raw = true;
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null;

            } else {
              bulk = fn;
              fn = function fn(elem, _key, value) {
                return bulk.call(jQuery(elem), value);
              };
            }
          }
          if (fn) {
            for (; i < len; i++) {
              fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            }
          }
        }
        if (chainable) {
          return elems;
        }

        if (bulk) {
          return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
      };

      var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g;

      function fcamelCase(_all, letter) {
        return letter.toUpperCase();
      }

      function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      }
      var acceptData = function acceptData(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
      };
      function Data() {
        this.expando = jQuery.expando + Data.uid++;
      }
      Data.uid = 1;
      Data.prototype = {
        cache: function cache(owner) {
          var value = owner[this.expando];

          if (!value) {
            value = {};

            if (acceptData(owner)) {
              if (owner.nodeType) {
                owner[this.expando] = value;

              } else {
                Object.defineProperty(owner, this.expando, {
                  value: value,
                  configurable: true
                });
              }
            }
          }
          return value;
        },
        set: function set(owner, data, value) {
          var prop,
            cache = this.cache(owner);

          if (typeof data === "string") {
            cache[camelCase(data)] = value;

          } else {
            for (prop in data) {
              cache[camelCase(prop)] = data[prop];
            }
          }
          return cache;
        },
        get: function get(owner, key) {
          return key === undefined ? this.cache(owner) :
          owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function access(owner, key, value) {
          if (key === undefined || key && typeof key === "string" && value === undefined) {
            return this.get(owner, key);
          }

          this.set(owner, key, value);

          return value !== undefined ? value : key;
        },
        remove: function remove(owner, key) {
          var i,
            cache = owner[this.expando];
          if (cache === undefined) {
            return;
          }
          if (key !== undefined) {
            if (Array.isArray(key)) {
              key = key.map(camelCase);
            } else {
              key = camelCase(key);

              key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
            }
            i = key.length;
            while (i--) {
              delete cache[key[i]];
            }
          }

          if (key === undefined || jQuery.isEmptyObject(cache)) {
            if (owner.nodeType) {
              owner[this.expando] = undefined;
            } else {
              delete owner[this.expando];
            }
          }
        },
        hasData: function hasData(owner) {
          var cache = owner[this.expando];
          return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
      };
      var dataPriv = new Data();
      var dataUser = new Data();


      var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;
      function getData(data) {
        if (data === "true") {
          return true;
        }
        if (data === "false") {
          return false;
        }
        if (data === "null") {
          return null;
        }

        if (data === +data + "") {
          return +data;
        }
        if (rbrace.test(data)) {
          return JSON.parse(data);
        }
        return data;
      }
      function dataAttr(elem, key, data) {
        var name;

        if (data === undefined && elem.nodeType === 1) {
          name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
          data = elem.getAttribute(name);
          if (typeof data === "string") {
            try {
              data = getData(data);
            } catch (e) {}

            dataUser.set(elem, key, data);
          } else {
            data = undefined;
          }
        }
        return data;
      }
      jQuery.extend({
        hasData: function hasData(elem) {
          return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function data(elem, name, _data) {
          return dataUser.access(elem, name, _data);
        },
        removeData: function removeData(elem, name) {
          dataUser.remove(elem, name);
        },
        _data: function _data(elem, name, data) {
          return dataPriv.access(elem, name, data);
        },
        _removeData: function _removeData(elem, name) {
          dataPriv.remove(elem, name);
        }
      });
      jQuery.fn.extend({
        data: function data(key, value) {
          var i,
            name,
            data,
            elem = this[0],
            attrs = elem && elem.attributes;

          if (key === undefined) {
            if (this.length) {
              data = dataUser.get(elem);
              if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                i = attrs.length;
                while (i--) {
                  if (attrs[i]) {
                    name = attrs[i].name;
                    if (name.indexOf("data-") === 0) {
                      name = camelCase(name.slice(5));
                      dataAttr(elem, name, data[name]);
                    }
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
            }
            return data;
          }

          if (_typeof(key) === "object") {
            return this.each(function () {
              dataUser.set(this, key);
            });
          }
          return access(this, function (value) {
            var data;

            if (elem && value === undefined) {
              data = dataUser.get(elem, key);
              if (data !== undefined) {
                return data;
              }

              data = dataAttr(elem, key);
              if (data !== undefined) {
                return data;
              }

              return;
            }

            this.each(function () {
              dataUser.set(this, key, value);
            });
          }, null, value, arguments.length > 1, null, true);
        },
        removeData: function removeData(key) {
          return this.each(function () {
            dataUser.remove(this, key);
          });
        }
      });
      jQuery.extend({
        queue: function queue(elem, type, data) {
          var queue;
          if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);

            if (data) {
              if (!queue || Array.isArray(data)) {
                queue = dataPriv.access(elem, type, jQuery.makeArray(data));
              } else {
                queue.push(data);
              }
            }
            return queue || [];
          }
        },
        dequeue: function dequeue(elem, type) {
          type = type || "fx";
          var queue = jQuery.queue(elem, type),
            startLength = queue.length,
            fn = queue.shift(),
            hooks = jQuery._queueHooks(elem, type),
            next = function next() {
              jQuery.dequeue(elem, type);
            };

          if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
          }
          if (fn) {
            if (type === "fx") {
              queue.unshift("inprogress");
            }

            delete hooks.stop;
            fn.call(elem, next, hooks);
          }
          if (!startLength && hooks) {
            hooks.empty.fire();
          }
        },
        _queueHooks: function _queueHooks(elem, type) {
          var key = type + "queueHooks";
          return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
            empty: jQuery.Callbacks("once memory").add(function () {
              dataPriv.remove(elem, [type + "queue", key]);
            })
          });
        }
      });
      jQuery.fn.extend({
        queue: function queue(type, data) {
          var setter = 2;
          if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
          }
          if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
          }
          return data === undefined ? this : this.each(function () {
            var queue = jQuery.queue(this, type, data);

            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
        },
        dequeue: function dequeue(type) {
          return this.each(function () {
            jQuery.dequeue(this, type);
          });
        },
        clearQueue: function clearQueue(type) {
          return this.queue(type || "fx", []);
        },
        promise: function promise(type, obj) {
          var tmp,
            count = 1,
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function resolve() {
              if (! --count) {
                defer.resolveWith(elements, [elements]);
              }
            };
          if (typeof type !== "string") {
            obj = type;
            type = undefined;
          }
          type = type || "fx";
          while (i--) {
            tmp = dataPriv.get(elements[i], type + "queueHooks");
            if (tmp && tmp.empty) {
              count++;
              tmp.empty.add(resolve);
            }
          }
          resolve();
          return defer.promise(obj);
        }
      });
      var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
      var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
      var cssExpand = ["Top", "Right", "Bottom", "Left"];
      var documentElement = document.documentElement;
      var isAttached = function isAttached(elem) {
          return jQuery.contains(elem.ownerDocument, elem);
        },
        composed = {
          composed: true
        };

      if (documentElement.getRootNode) {
        isAttached = function isAttached(elem) {
          return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
        };
      }
      var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {
        elem = el || elem;

        return elem.style.display === "none" || elem.style.display === "" &&
        isAttached(elem) && jQuery.css(elem, "display") === "none";
      };
      function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted,
          scale,
          maxIterations = 20,
          currentValue = tween ? function () {
            return tween.cur();
          } : function () {
            return jQuery.css(elem, prop, "");
          },
          initial = currentValue(),
          unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
          initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          initial = initial / 2;

          unit = unit || initialInUnit[3];

          initialInUnit = +initial || 1;
          while (maxIterations--) {
            jQuery.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          jQuery.style(elem, prop, initialInUnit + unit);

          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;

          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }
      var defaultDisplayMap = {};
      function getDefaultDisplay(elem) {
        var temp,
          doc = elem.ownerDocument,
          nodeName = elem.nodeName,
          display = defaultDisplayMap[nodeName];
        if (display) {
          return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
          display = "block";
        }
        defaultDisplayMap[nodeName] = display;
        return display;
      }
      function showHide(elements, show) {
        var display,
          elem,
          values = [],
          index = 0,
          length = elements.length;

        for (; index < length; index++) {
          elem = elements[index];
          if (!elem.style) {
            continue;
          }
          display = elem.style.display;
          if (show) {
            if (display === "none") {
              values[index] = dataPriv.get(elem, "display") || null;
              if (!values[index]) {
                elem.style.display = "";
              }
            }
            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
              values[index] = getDefaultDisplay(elem);
            }
          } else {
            if (display !== "none") {
              values[index] = "none";

              dataPriv.set(elem, "display", display);
            }
          }
        }

        for (index = 0; index < length; index++) {
          if (values[index] != null) {
            elements[index].style.display = values[index];
          }
        }
        return elements;
      }
      jQuery.fn.extend({
        show: function show() {
          return showHide(this, true);
        },
        hide: function hide() {
          return showHide(this);
        },
        toggle: function toggle(state) {
          if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
          }
          return this.each(function () {
            if (isHiddenWithinTree(this)) {
              jQuery(this).show();
            } else {
              jQuery(this).hide();
            }
          });
        }
      });
      var rcheckableType = /^(?:checkbox|radio)$/i;
      var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
      (function () {
        var fragment = document.createDocumentFragment(),
          div = fragment.appendChild(document.createElement("div")),
          input = document.createElement("input");

        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);

        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
      })();

      var wrapMap = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;

      if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
      }
      function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
          ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
          ret = context.querySelectorAll(tag || "*");
        } else {
          ret = [];
        }
        if (tag === undefined || tag && nodeName(context, tag)) {
          return jQuery.merge([context], ret);
        }
        return ret;
      }

      function setGlobalEval(elems, refElements) {
        var i = 0,
          l = elems.length;
        for (; i < l; i++) {
          dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
        }
      }
      var rhtml = /<|&#?\w+;/;
      function buildFragment(elems, context, scripts, selection, ignored) {
        var elem,
          tmp,
          tag,
          wrap,
          attached,
          j,
          fragment = context.createDocumentFragment(),
          nodes = [],
          i = 0,
          l = elems.length;
        for (; i < l; i++) {
          elem = elems[i];
          if (elem || elem === 0) {
            if (toType(elem) === "object") {
              jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));

            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));

              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild;
              }

              jQuery.merge(nodes, tmp.childNodes);

              tmp = fragment.firstChild;

              tmp.textContent = "";
            }
          }
        }

        fragment.textContent = "";
        i = 0;
        while (elem = nodes[i++]) {
          if (selection && jQuery.inArray(elem, selection) > -1) {
            if (ignored) {
              ignored.push(elem);
            }
            continue;
          }
          attached = isAttached(elem);

          tmp = getAll(fragment.appendChild(elem), "script");

          if (attached) {
            setGlobalEval(tmp);
          }

          if (scripts) {
            j = 0;
            while (elem = tmp[j++]) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }
        return fragment;
      }
      var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
      function returnTrue() {
        return true;
      }
      function returnFalse() {
        return false;
      }
      function _on(elem, types, selector, data, fn, one) {
        var origFn, type;

        if (_typeof(types) === "object") {
          if (typeof selector !== "string") {
            data = data || selector;
            selector = undefined;
          }
          for (type in types) {
            _on(elem, type, selector, data, types[type], one);
          }
          return elem;
        }
        if (data == null && fn == null) {
          fn = selector;
          data = selector = undefined;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = undefined;
          } else {
            fn = data;
            data = selector;
            selector = undefined;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = function fn(event) {
            jQuery().off(event);
            return origFn.apply(this, arguments);
          };

          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function () {
          jQuery.event.add(this, types, fn, data, selector);
        });
      }

      jQuery.event = {
        global: {},
        add: function add(elem, types, handler, data, selector) {
          var handleObjIn,
            eventHandle,
            tmp,
            events,
            t,
            handleObj,
            special,
            handlers,
            type,
            namespaces,
            origType,
            elemData = dataPriv.get(elem);

          if (!acceptData(elem)) {
            return;
          }

          if (handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
          }

          if (selector) {
            jQuery.find.matchesSelector(documentElement, selector);
          }

          if (!handler.guid) {
            handler.guid = jQuery.guid++;
          }

          if (!(events = elemData.events)) {
            events = elemData.events = Object.create(null);
          }
          if (!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function (e) {
              return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
            };
          }

          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();

            if (!type) {
              continue;
            }

            special = jQuery.event.special[type] || {};

            type = (selector ? special.delegateType : special.bindType) || type;

            special = jQuery.event.special[type] || {};

            handleObj = jQuery.extend({
              type: type,
              origType: origType,
              data: data,
              handler: handler,
              guid: handler.guid,
              selector: selector,
              needsContext: selector && jQuery.expr.match.needsContext.test(selector),
              namespace: namespaces.join(".")
            }, handleObjIn);

            if (!(handlers = events[type])) {
              handlers = events[type] = [];
              handlers.delegateCount = 0;

              if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }

            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }

            jQuery.event.global[type] = true;
          }
        },
        remove: function remove(elem, types, handler, selector, mappedTypes) {
          var j,
            origCount,
            tmp,
            events,
            t,
            handleObj,
            special,
            handlers,
            type,
            namespaces,
            origType,
            elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
          if (!elemData || !(events = elemData.events)) {
            return;
          }

          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();

            if (!type) {
              for (type in events) {
                jQuery.event.remove(elem, type + types[t], handler, selector, true);
              }
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

            origCount = j = handlers.length;
            while (j--) {
              handleObj = handlers[j];
              if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }

            if (origCount && !handlers.length) {
              if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          }

          if (jQuery.isEmptyObject(events)) {
            dataPriv.remove(elem, "handle events");
          }
        },
        dispatch: function dispatch(nativeEvent) {
          var i,
            j,
            ret,
            matched,
            handleObj,
            handlerQueue,
            args = new Array(arguments.length),
            event = jQuery.event.fix(nativeEvent),
            handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
            special = jQuery.event.special[event.type] || {};

          args[0] = event;
          for (i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          event.delegateTarget = this;

          if (special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
          }

          handlerQueue = jQuery.event.handlers.call(this, event, handlers);

          i = 0;
          while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;
            j = 0;
            while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
              if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                if (ret !== undefined) {
                  if ((event.result = ret) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              }
            }
          }

          if (special.postDispatch) {
            special.postDispatch.call(this, event);
          }
          return event.result;
        },
        handlers: function handlers(event, _handlers) {
          var i,
            handleObj,
            sel,
            matchedHandlers,
            matchedSelectors,
            handlerQueue = [],
            delegateCount = _handlers.delegateCount,
            cur = event.target;

          if (delegateCount &&
          cur.nodeType &&
          !(event.type === "click" && event.button >= 1)) {
            for (; cur !== this; cur = cur.parentNode || this) {
              if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                matchedHandlers = [];
                matchedSelectors = {};
                for (i = 0; i < delegateCount; i++) {
                  handleObj = _handlers[i];

                  sel = handleObj.selector + " ";
                  if (matchedSelectors[sel] === undefined) {
                    matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                  }
                  if (matchedSelectors[sel]) {
                    matchedHandlers.push(handleObj);
                  }
                }
                if (matchedHandlers.length) {
                  handlerQueue.push({
                    elem: cur,
                    handlers: matchedHandlers
                  });
                }
              }
            }
          }

          cur = this;
          if (delegateCount < _handlers.length) {
            handlerQueue.push({
              elem: cur,
              handlers: _handlers.slice(delegateCount)
            });
          }
          return handlerQueue;
        },
        addProp: function addProp(name, hook) {
          Object.defineProperty(jQuery.Event.prototype, name, {
            enumerable: true,
            configurable: true,
            get: isFunction(hook) ? function () {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function () {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },
            set: function set(value) {
              Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: value
              });
            }
          });
        },
        fix: function fix(originalEvent) {
          return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
          load: {
            noBubble: true
          },
          click: {
            setup: function setup(data) {
              var el = this || data;

              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click", true);
              }

              return false;
            },
            trigger: function trigger(data) {
              var el = this || data;

              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click");
              }

              return true;
            },
            _default: function _default(event) {
              var target = event.target;
              return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
            }
          },
          beforeunload: {
            postDispatch: function postDispatch(event) {
              if (event.result !== undefined && event.originalEvent) {
                event.originalEvent.returnValue = event.result;
              }
            }
          }
        }
      };

      function leverageNative(el, type, isSetup) {
        if (!isSetup) {
          if (dataPriv.get(el, type) === undefined) {
            jQuery.event.add(el, type, returnTrue);
          }
          return;
        }

        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
          namespace: false,
          handler: function handler(event) {
            var result,
              saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              if (!saved) {
                saved = _slice.call(arguments);
                dataPriv.set(this, type, saved);

                this[type]();
                result = dataPriv.get(this, type);
                dataPriv.set(this, type, false);
                if (saved !== result) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result;
                }

              } else if ((jQuery.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }

            } else if (saved) {
              dataPriv.set(this, type, jQuery.event.trigger(saved[0], saved.slice(1), this));

              event.stopPropagation();
              event.isImmediatePropagationStopped = returnTrue;
            }
          }
        });
      }
      jQuery.removeEvent = function (elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle);
        }
      };
      jQuery.Event = function (src, props) {
        if (!(this instanceof jQuery.Event)) {
          return new jQuery.Event(src, props);
        }

        if (src && src.type) {
          this.originalEvent = src;
          this.type = src.type;

          this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&
          src.returnValue === false ? returnTrue : returnFalse;

          this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
          this.currentTarget = src.currentTarget;
          this.relatedTarget = src.relatedTarget;

        } else {
          this.type = src;
        }

        if (props) {
          jQuery.extend(this, props);
        }

        this.timeStamp = src && src.timeStamp || Date.now();

        this[jQuery.expando] = true;
      };

      jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function preventDefault() {
          var e = this.originalEvent;
          this.isDefaultPrevented = returnTrue;
          if (e && !this.isSimulated) {
            e.preventDefault();
          }
        },
        stopPropagation: function stopPropagation() {
          var e = this.originalEvent;
          this.isPropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopPropagation();
          }
        },
        stopImmediatePropagation: function stopImmediatePropagation() {
          var e = this.originalEvent;
          this.isImmediatePropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopImmediatePropagation();
          }
          this.stopPropagation();
        }
      };

      jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
      }, jQuery.event.addProp);
      jQuery.each({
        focus: "focusin",
        blur: "focusout"
      }, function (type, delegateType) {
        function focusMappedHandler(nativeEvent) {
          if (document.documentMode) {

            var handle = dataPriv.get(this, "handle"),
              event = jQuery.event.fix(nativeEvent);
            event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
            event.isSimulated = true;

            handle(nativeEvent);

            if (event.target === event.currentTarget) {
              handle(event);
            }
          } else {
            jQuery.event.simulate(delegateType, nativeEvent.target, jQuery.event.fix(nativeEvent));
          }
        }
        jQuery.event.special[type] = {
          setup: function setup() {
            var attaches;

            leverageNative(this, type, true);
            if (document.documentMode) {
              attaches = dataPriv.get(this, delegateType);
              if (!attaches) {
                this.addEventListener(delegateType, focusMappedHandler);
              }
              dataPriv.set(this, delegateType, (attaches || 0) + 1);
            } else {
              return false;
            }
          },
          trigger: function trigger() {
            leverageNative(this, type);

            return true;
          },
          teardown: function teardown() {
            var attaches;
            if (document.documentMode) {
              attaches = dataPriv.get(this, delegateType) - 1;
              if (!attaches) {
                this.removeEventListener(delegateType, focusMappedHandler);
                dataPriv.remove(this, delegateType);
              } else {
                dataPriv.set(this, delegateType, attaches);
              }
            } else {
              return false;
            }
          },
          _default: function _default(event) {
            return dataPriv.get(event.target, type);
          },
          delegateType: delegateType
        };

        jQuery.event.special[delegateType] = {
          setup: function setup() {
            var doc = this.ownerDocument || this.document || this,
              dataHolder = document.documentMode ? this : doc,
              attaches = dataPriv.get(dataHolder, delegateType);

            if (!attaches) {
              if (document.documentMode) {
                this.addEventListener(delegateType, focusMappedHandler);
              } else {
                doc.addEventListener(type, focusMappedHandler, true);
              }
            }
            dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
          },
          teardown: function teardown() {
            var doc = this.ownerDocument || this.document || this,
              dataHolder = document.documentMode ? this : doc,
              attaches = dataPriv.get(dataHolder, delegateType) - 1;
            if (!attaches) {
              if (document.documentMode) {
                this.removeEventListener(delegateType, focusMappedHandler);
              } else {
                doc.removeEventListener(type, focusMappedHandler, true);
              }
              dataPriv.remove(dataHolder, delegateType);
            } else {
              dataPriv.set(dataHolder, delegateType, attaches);
            }
          }
        };
      });

      jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function (orig, fix) {
        jQuery.event.special[orig] = {
          delegateType: fix,
          bindType: fix,
          handle: function handle(event) {
            var ret,
              target = this,
              related = event.relatedTarget,
              handleObj = event.handleObj;

            if (!related || related !== target && !jQuery.contains(target, related)) {
              event.type = handleObj.origType;
              ret = handleObj.handler.apply(this, arguments);
              event.type = fix;
            }
            return ret;
          }
        };
      });
      jQuery.fn.extend({
        on: function on(types, selector, data, fn) {
          return _on(this, types, selector, data, fn);
        },
        one: function one(types, selector, data, fn) {
          return _on(this, types, selector, data, fn, 1);
        },
        off: function off(types, selector, fn) {
          var handleObj, type;
          if (types && types.preventDefault && types.handleObj) {
            handleObj = types.handleObj;
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
            return this;
          }
          if (_typeof(types) === "object") {
            for (type in types) {
              this.off(type, selector, types[type]);
            }
            return this;
          }
          if (selector === false || typeof selector === "function") {
            fn = selector;
            selector = undefined;
          }
          if (fn === false) {
            fn = returnFalse;
          }
          return this.each(function () {
            jQuery.event.remove(this, types, fn, selector);
          });
        }
      });
      var
        rnoInnerhtml = /<script|<style|<link/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

      function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
          return jQuery(elem).children("tbody")[0] || elem;
        }
        return elem;
      }

      function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
      }
      function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
          elem.type = elem.type.slice(5);
        } else {
          elem.removeAttribute("type");
        }
        return elem;
      }
      function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }

        if (dataPriv.hasData(src)) {
          pdataOld = dataPriv.get(src);
          events = pdataOld.events;
          if (events) {
            dataPriv.remove(dest, "handle events");
            for (type in events) {
              for (i = 0, l = events[type].length; i < l; i++) {
                jQuery.event.add(dest, type, events[type][i]);
              }
            }
          }
        }

        if (dataUser.hasData(src)) {
          udataOld = dataUser.access(src);
          udataCur = jQuery.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      }

      function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();

        if (nodeName === "input" && rcheckableType.test(src.type)) {
          dest.checked = src.checked;

        } else if (nodeName === "input" || nodeName === "textarea") {
          dest.defaultValue = src.defaultValue;
        }
      }
      function domManip(collection, args, callback, ignored) {
        args = flat(args);
        var fragment,
          first,
          scripts,
          hasScripts,
          node,
          doc,
          i = 0,
          l = collection.length,
          iNoClone = l - 1,
          value = args[0],
          valueIsFunction = isFunction(value);

        if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
          return collection.each(function (index) {
            var self = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self.html());
            }
            domManip(self, args, callback, ignored);
          });
        }
        if (l) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }

          if (first || ignored) {
            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;

            for (; i < l; i++) {
              node = fragment;
              if (i !== iNoClone) {
                node = jQuery.clone(node, true, true);

                if (hasScripts) {
                  jQuery.merge(scripts, getAll(node, "script"));
                }
              }
              callback.call(collection[i], node, i);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;

              jQuery.map(scripts, restoreScript);

              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                  if (node.src && (node.type || "").toLowerCase() !== "module") {
                    if (jQuery._evalUrl && !node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce: node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  } else {
                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                  }
                }
              }
            }
          }
        }
        return collection;
      }
      function _remove(elem, selector, keepData) {
        var node,
          nodes = selector ? jQuery.filter(selector, elem) : elem,
          i = 0;
        for (; (node = nodes[i]) != null; i++) {
          if (!keepData && node.nodeType === 1) {
            jQuery.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && isAttached(node)) {
              setGlobalEval(getAll(node, "script"));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }
      jQuery.extend({
        htmlPrefilter: function htmlPrefilter(html) {
          return html;
        },
        clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
          var i,
            l,
            srcElements,
            destElements,
            clone = elem.cloneNode(true),
            inPage = isAttached(elem);

          if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
            destElements = getAll(clone);
            srcElements = getAll(elem);
            for (i = 0, l = srcElements.length; i < l; i++) {
              fixInput(srcElements[i], destElements[i]);
            }
          }

          if (dataAndEvents) {
            if (deepDataAndEvents) {
              srcElements = srcElements || getAll(elem);
              destElements = destElements || getAll(clone);
              for (i = 0, l = srcElements.length; i < l; i++) {
                cloneCopyEvent(srcElements[i], destElements[i]);
              }
            } else {
              cloneCopyEvent(elem, clone);
            }
          }

          destElements = getAll(clone, "script");
          if (destElements.length > 0) {
            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
          }

          return clone;
        },
        cleanData: function cleanData(elems) {
          var data,
            elem,
            type,
            special = jQuery.event.special,
            i = 0;
          for (; (elem = elems[i]) !== undefined; i++) {
            if (acceptData(elem)) {
              if (data = elem[dataPriv.expando]) {
                if (data.events) {
                  for (type in data.events) {
                    if (special[type]) {
                      jQuery.event.remove(elem, type);

                    } else {
                      jQuery.removeEvent(elem, type, data.handle);
                    }
                  }
                }

                elem[dataPriv.expando] = undefined;
              }
              if (elem[dataUser.expando]) {
                elem[dataUser.expando] = undefined;
              }
            }
          }
        }
      });
      jQuery.fn.extend({
        detach: function detach(selector) {
          return _remove(this, selector, true);
        },
        remove: function remove(selector) {
          return _remove(this, selector);
        },
        text: function text(value) {
          return access(this, function (value) {
            return value === undefined ? jQuery.text(this) : this.empty().each(function () {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value;
              }
            });
          }, null, value, arguments.length);
        },
        append: function append() {
          return domManip(this, arguments, function (elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.appendChild(elem);
            }
          });
        },
        prepend: function prepend() {
          return domManip(this, arguments, function (elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.insertBefore(elem, target.firstChild);
            }
          });
        },
        before: function before() {
          return domManip(this, arguments, function (elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this);
            }
          });
        },
        after: function after() {
          return domManip(this, arguments, function (elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this.nextSibling);
            }
          });
        },
        empty: function empty() {
          var elem,
            i = 0;
          for (; (elem = this[i]) != null; i++) {
            if (elem.nodeType === 1) {
              jQuery.cleanData(getAll(elem, false));

              elem.textContent = "";
            }
          }
          return this;
        },
        clone: function clone(dataAndEvents, deepDataAndEvents) {
          dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
          deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
          return this.map(function () {
            return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
          });
        },
        html: function html(value) {
          return access(this, function (value) {
            var elem = this[0] || {},
              i = 0,
              l = this.length;
            if (value === undefined && elem.nodeType === 1) {
              return elem.innerHTML;
            }

            if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
              value = jQuery.htmlPrefilter(value);
              try {
                for (; i < l; i++) {
                  elem = this[i] || {};

                  if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.innerHTML = value;
                  }
                }
                elem = 0;

              } catch (e) {}
            }
            if (elem) {
              this.empty().append(value);
            }
          }, null, value, arguments.length);
        },
        replaceWith: function replaceWith() {
          var ignored = [];

          return domManip(this, arguments, function (elem) {
            var parent = this.parentNode;
            if (jQuery.inArray(this, ignored) < 0) {
              jQuery.cleanData(getAll(this));
              if (parent) {
                parent.replaceChild(elem, this);
              }
            }

          }, ignored);
        }
      });
      jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function (name, original) {
        jQuery.fn[name] = function (selector) {
          var elems,
            ret = [],
            insert = jQuery(selector),
            last = insert.length - 1,
            i = 0;
          for (; i <= last; i++) {
            elems = i === last ? this : this.clone(true);
            jQuery(insert[i])[original](elems);

            push.apply(ret, elems.get());
          }
          return this.pushStack(ret);
        };
      });
      var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
      var rcustomProp = /^--/;
      var getStyles = function getStyles(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window;
        }
        return view.getComputedStyle(elem);
      };
      var swap = function swap(elem, options, callback) {
        var ret,
          name,
          old = {};

        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);

        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      };
      var rboxStyle = new RegExp(cssExpand.join("|"), "i");
      (function () {
        function computeStyleTests() {
          if (!div) {
            return;
          }
          container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
          div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== "1%";

          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

          div.style.right = "60%";
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

          div.style.position = "absolute";
          scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
          documentElement.removeChild(container);

          div = null;
        }
        function roundPixelMeasures(measure) {
          return Math.round(parseFloat(measure));
        }
        var pixelPositionVal,
          boxSizingReliableVal,
          scrollboxSizeVal,
          pixelBoxStylesVal,
          reliableTrDimensionsVal,
          reliableMarginLeftVal,
          container = document.createElement("div"),
          div = document.createElement("div");

        if (!div.style) {
          return;
        }

        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery.extend(support, {
          boxSizingReliable: function boxSizingReliable() {
            computeStyleTests();
            return boxSizingReliableVal;
          },
          pixelBoxStyles: function pixelBoxStyles() {
            computeStyleTests();
            return pixelBoxStylesVal;
          },
          pixelPosition: function pixelPosition() {
            computeStyleTests();
            return pixelPositionVal;
          },
          reliableMarginLeft: function reliableMarginLeft() {
            computeStyleTests();
            return reliableMarginLeftVal;
          },
          scrollboxSize: function scrollboxSize() {
            computeStyleTests();
            return scrollboxSizeVal;
          },
          reliableTrDimensions: function reliableTrDimensions() {
            var table, tr, trChild, trStyle;
            if (reliableTrDimensionsVal == null) {
              table = document.createElement("table");
              tr = document.createElement("tr");
              trChild = document.createElement("div");
              table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
              tr.style.cssText = "box-sizing:content-box;border:1px solid";

              tr.style.height = "1px";
              trChild.style.height = "9px";

              trChild.style.display = "block";
              documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
              trStyle = window.getComputedStyle(tr);
              reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
              documentElement.removeChild(table);
            }
            return reliableTrDimensionsVal;
          }
        });
      })();
      function curCSS(elem, name, computed) {
        var width,
          minWidth,
          maxWidth,
          ret,
          isCustomProp = rcustomProp.test(name),
          style = elem.style;
        computed = computed || getStyles(elem);

        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (isCustomProp && ret) {
            ret = ret.replace(rtrimCSS, "$1") || undefined;
          }
          if (ret === "" && !isAttached(elem)) {
            ret = jQuery.style(elem, name);
          }

          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;

            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;

            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== undefined ?
        ret + "" : ret;
      }
      function addGetHookIf(conditionFn, hookFn) {
        return {
          get: function get() {
            if (conditionFn()) {
              delete this.get;
              return;
            }

            return (this.get = hookFn).apply(this, arguments);
          }
        };
      }
      var cssPrefixes = ["Webkit", "Moz", "ms"],
        emptyStyle = document.createElement("div").style,
        vendorProps = {};

      function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1),
          i = cssPrefixes.length;
        while (i--) {
          name = cssPrefixes[i] + capName;
          if (name in emptyStyle) {
            return name;
          }
        }
      }

      function finalPropName(name) {
        var _final = jQuery.cssProps[name] || vendorProps[name];
        if (_final) {
          return _final;
        }
        if (name in emptyStyle) {
          return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
      }
      var
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        cssShow = {
          position: "absolute",
          visibility: "hidden",
          display: "block"
        },
        cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
      function setPositiveNumber(_elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ?
        Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
      }
      function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0,
          extra = 0,
          delta = 0,
          marginDelta = 0;

        if (box === (isBorderBox ? "border" : "content")) {
          return 0;
        }
        for (; i < 4; i += 2) {
          if (box === "margin") {
            marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
          }

          if (!isBorderBox) {
            delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

            if (box !== "padding") {
              delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

            } else {
              extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }

          } else {
            if (box === "content") {
              delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
            }

            if (box !== "margin") {
              delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
          }
        }

        if (!isBorderBox && computedVal >= 0) {
          delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5

          )) || 0;
        }
        return delta + marginDelta;
      }
      function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem),
          boxSizingNeeded = !support.boxSizingReliable() || extra,
          isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
          valueIsBorderBox = isBorderBox,
          val = curCSS(elem, dimension, styles),
          offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

        if (rnumnonpx.test(val)) {
          if (!extra) {
            return val;
          }
          val = "auto";
        }

        if ((!support.boxSizingReliable() && isBorderBox ||
        !support.reliableTrDimensions() && nodeName(elem, "tr") ||
        val === "auto" ||
        !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
        elem.getClientRects().length) {
          isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

          valueIsBorderBox = offsetProp in elem;
          if (valueIsBorderBox) {
            val = elem[offsetProp];
          }
        }

        val = parseFloat(val) || 0;

        return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles,
        val) + "px";
      }
      jQuery.extend({
        cssHooks: {
          opacity: {
            get: function get(elem, computed) {
              if (computed) {
                var ret = curCSS(elem, "opacity");
                return ret === "" ? "1" : ret;
              }
            }
          }
        },
        cssNumber: {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageSlice: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          scale: true,
          widows: true,
          zIndex: true,
          zoom: true,
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeMiterlimit: true,
          strokeOpacity: true
        },
        cssProps: {},
        style: function style(elem, name, value, extra) {
          if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
          }

          var ret,
            type,
            hooks,
            origName = camelCase(name),
            isCustomProp = rcustomProp.test(name),
            style = elem.style;

          if (!isCustomProp) {
            name = finalPropName(origName);
          }

          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

          if (value !== undefined) {
            type = _typeof(value);

            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
              value = adjustCSS(elem, name, ret);

              type = "number";
            }

            if (value == null || value !== value) {
              return;
            }

            if (type === "number" && !isCustomProp) {
              value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
            }

            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
              style[name] = "inherit";
            }

            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
              if (isCustomProp) {
                style.setProperty(name, value);
              } else {
                style[name] = value;
              }
            }
          } else {
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
              return ret;
            }

            return style[name];
          }
        },
        css: function css(elem, name, extra, styles) {
          var val,
            num,
            hooks,
            origName = camelCase(name),
            isCustomProp = rcustomProp.test(name);

          if (!isCustomProp) {
            name = finalPropName(origName);
          }

          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

          if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra);
          }

          if (val === undefined) {
            val = curCSS(elem, name, styles);
          }

          if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
          }

          if (extra === "" || extra) {
            num = parseFloat(val);
            return extra === true || isFinite(num) ? num || 0 : val;
          }
          return val;
        }
      });
      jQuery.each(["height", "width"], function (_i, dimension) {
        jQuery.cssHooks[dimension] = {
          get: function get(elem, computed, extra) {
            if (computed) {
              return rdisplayswap.test(jQuery.css(elem, "display")) && (
              !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
                return getWidthOrHeight(elem, dimension, extra);
              }) : getWidthOrHeight(elem, dimension, extra);
            }
          },
          set: function set(elem, value, extra) {
            var matches,
              styles = getStyles(elem),
              scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
              boxSizingNeeded = scrollboxSizeBuggy || extra,
              isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
              subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;

            if (isBorderBox && scrollboxSizeBuggy) {
              subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
            }

            if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
              elem.style[dimension] = value;
              value = jQuery.css(elem, dimension);
            }
            return setPositiveNumber(elem, value, subtract);
          }
        };
      });
      jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
        if (computed) {
          return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
            marginLeft: 0
          }, function () {
            return elem.getBoundingClientRect().left;
          })) + "px";
        }
      });

      jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
          expand: function expand(value) {
            var i = 0,
              expanded = {},
              parts = typeof value === "string" ? value.split(" ") : [value];
            for (; i < 4; i++) {
              expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
            }
            return expanded;
          }
        };
        if (prefix !== "margin") {
          jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
      });
      jQuery.fn.extend({
        css: function css(name, value) {
          return access(this, function (elem, name, value) {
            var styles,
              len,
              map = {},
              i = 0;
            if (Array.isArray(name)) {
              styles = getStyles(elem);
              len = name.length;
              for (; i < len; i++) {
                map[name[i]] = jQuery.css(elem, name[i], false, styles);
              }
              return map;
            }
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
          }, name, value, arguments.length > 1);
        }
      });
      function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
      }
      jQuery.Tween = Tween;
      Tween.prototype = {
        constructor: Tween,
        init: function init(elem, options, prop, end, easing, unit) {
          this.elem = elem;
          this.prop = prop;
          this.easing = easing || jQuery.easing._default;
          this.options = options;
          this.start = this.now = this.cur();
          this.end = end;
          this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function cur() {
          var hooks = Tween.propHooks[this.prop];
          return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function run(percent) {
          var eased,
            hooks = Tween.propHooks[this.prop];
          if (this.options.duration) {
            this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
          } else {
            this.pos = eased = percent;
          }
          this.now = (this.end - this.start) * eased + this.start;
          if (this.options.step) {
            this.options.step.call(this.elem, this.now, this);
          }
          if (hooks && hooks.set) {
            hooks.set(this);
          } else {
            Tween.propHooks._default.set(this);
          }
          return this;
        }
      };
      Tween.prototype.init.prototype = Tween.prototype;
      Tween.propHooks = {
        _default: {
          get: function get(tween) {
            var result;

            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
              return tween.elem[tween.prop];
            }

            result = jQuery.css(tween.elem, tween.prop, "");

            return !result || result === "auto" ? 0 : result;
          },
          set: function set(tween) {
            if (jQuery.fx.step[tween.prop]) {
              jQuery.fx.step[tween.prop](tween);
            } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
              jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            } else {
              tween.elem[tween.prop] = tween.now;
            }
          }
        }
      };

      Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function set(tween) {
          if (tween.elem.nodeType && tween.elem.parentNode) {
            tween.elem[tween.prop] = tween.now;
          }
        }
      };
      jQuery.easing = {
        linear: function linear(p) {
          return p;
        },
        swing: function swing(p) {
          return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
      };
      jQuery.fx = Tween.prototype.init;

      jQuery.fx.step = {};
      var fxNow,
        inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;
      function schedule() {
        if (inProgress) {
          if (document.hidden === false && window.requestAnimationFrame) {
            window.requestAnimationFrame(schedule);
          } else {
            window.setTimeout(schedule, jQuery.fx.interval);
          }
          jQuery.fx.tick();
        }
      }

      function createFxNow() {
        window.setTimeout(function () {
          fxNow = undefined;
        });
        return fxNow = Date.now();
      }

      function genFx(type, includeWidth) {
        var which,
          i = 0,
          attrs = {
            height: type
          };

        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
          which = cssExpand[i];
          attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
          attrs.opacity = attrs.width = type;
        }
        return attrs;
      }
      function createTween(value, prop, animation) {
        var tween,
          collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
          index = 0,
          length = collection.length;
        for (; index < length; index++) {
          if (tween = collection[index].call(animation, prop, value)) {
            return tween;
          }
        }
      }
      function defaultPrefilter(elem, props, opts) {
        var prop,
          value,
          toggle,
          hooks,
          oldfire,
          propTween,
          restoreDisplay,
          display,
          isBox = "width" in props || "height" in props,
          anim = this,
          orig = {},
          style = elem.style,
          hidden = elem.nodeType && isHiddenWithinTree(elem),
          dataShow = dataPriv.get(elem, "fxshow");

        if (!opts.queue) {
          hooks = jQuery._queueHooks(elem, "fx");
          if (hooks.unqueued == null) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function () {
              if (!hooks.unqueued) {
                oldfire();
              }
            };
          }
          hooks.unqueued++;
          anim.always(function () {
            anim.always(function () {
              hooks.unqueued--;
              if (!jQuery.queue(elem, "fx").length) {
                hooks.empty.fire();
              }
            });
          });
        }

        for (prop in props) {
          value = props[prop];
          if (rfxtypes.test(value)) {
            delete props[prop];
            toggle = toggle || value === "toggle";
            if (value === (hidden ? "hide" : "show")) {
              if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                hidden = true;

              } else {
                continue;
              }
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
          }
        }

        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
          return;
        }

        if (isBox && elem.nodeType === 1) {
          opts.overflow = [style.overflow, style.overflowX, style.overflowY];

          restoreDisplay = dataShow && dataShow.display;
          if (restoreDisplay == null) {
            restoreDisplay = dataPriv.get(elem, "display");
          }
          display = jQuery.css(elem, "display");
          if (display === "none") {
            if (restoreDisplay) {
              display = restoreDisplay;
            } else {
              showHide([elem], true);
              restoreDisplay = elem.style.display || restoreDisplay;
              display = jQuery.css(elem, "display");
              showHide([elem]);
            }
          }

          if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
            if (jQuery.css(elem, "float") === "none") {
              if (!propTween) {
                anim.done(function () {
                  style.display = restoreDisplay;
                });
                if (restoreDisplay == null) {
                  display = style.display;
                  restoreDisplay = display === "none" ? "" : display;
                }
              }
              style.display = "inline-block";
            }
          }
        }
        if (opts.overflow) {
          style.overflow = "hidden";
          anim.always(function () {
            style.overflow = opts.overflow[0];
            style.overflowX = opts.overflow[1];
            style.overflowY = opts.overflow[2];
          });
        }

        propTween = false;
        for (prop in orig) {
          if (!propTween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = dataPriv.access(elem, "fxshow", {
                display: restoreDisplay
              });
            }

            if (toggle) {
              dataShow.hidden = !hidden;
            }

            if (hidden) {
              showHide([elem], true);
            }


            anim.done(function () {

              if (!hidden) {
                showHide([elem]);
              }
              dataPriv.remove(elem, "fxshow");
              for (prop in orig) {
                jQuery.style(elem, prop, orig[prop]);
              }
            });
          }

          propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = propTween.start;
            if (hidden) {
              propTween.end = propTween.start;
              propTween.start = 0;
            }
          }
        }
      }
      function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        for (index in props) {
          name = camelCase(index);
          easing = specialEasing[name];
          value = props[index];
          if (Array.isArray(value)) {
            easing = value[1];
            value = props[index] = value[0];
          }
          if (index !== name) {
            props[name] = value;
            delete props[index];
          }
          hooks = jQuery.cssHooks[name];
          if (hooks && "expand" in hooks) {
            value = hooks.expand(value);
            delete props[name];

            for (index in value) {
              if (!(index in props)) {
                props[index] = value[index];
                specialEasing[index] = easing;
              }
            }
          } else {
            specialEasing[name] = easing;
          }
        }
      }
      function Animation(elem, properties, options) {
        var result,
          stopped,
          index = 0,
          length = Animation.prefilters.length,
          deferred = jQuery.Deferred().always(function () {
            delete tick.elem;
          }),
          tick = function tick() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
            for (; index < length; index++) {
              animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);

            if (percent < 1 && length) {
              return remaining;
            }

            if (!length) {
              deferred.notifyWith(elem, [animation, 1, 0]);
            }

            deferred.resolveWith(elem, [animation]);
            return false;
          },
          animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
              specialEasing: {},
              easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function createTween(prop, end) {
              var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
              animation.tweens.push(tween);
              return tween;
            },
            stop: function stop(gotoEnd) {
              var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index < length; index++) {
                animation.tweens[index].run(1);
              }

              if (gotoEnd) {
                deferred.notifyWith(elem, [animation, 1, 0]);
                deferred.resolveWith(elem, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem, [animation, gotoEnd]);
              }
              return this;
            }
          }),
          props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
          result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
          if (result) {
            if (isFunction(result.stop)) {
              jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
            }
            return result;
          }
        }
        jQuery.map(props, createTween, animation);
        if (isFunction(animation.opts.start)) {
          animation.opts.start.call(elem, animation);
        }

        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery.fx.timer(jQuery.extend(tick, {
          elem: elem,
          anim: animation,
          queue: animation.opts.queue
        }));
        return animation;
      }
      jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
          "*": [function (prop, value) {
            var tween = this.createTween(prop, value);
            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
            return tween;
          }]
        },
        tweener: function tweener(props, callback) {
          if (isFunction(props)) {
            callback = props;
            props = ["*"];
          } else {
            props = props.match(rnothtmlwhite);
          }
          var prop,
            index = 0,
            length = props.length;
          for (; index < length; index++) {
            prop = props[index];
            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
            Animation.tweeners[prop].unshift(callback);
          }
        },
        prefilters: [defaultPrefilter],
        prefilter: function prefilter(callback, prepend) {
          if (prepend) {
            Animation.prefilters.unshift(callback);
          } else {
            Animation.prefilters.push(callback);
          }
        }
      });
      jQuery.speed = function (speed, easing, fn) {
        var opt = speed && _typeof(speed) === "object" ? jQuery.extend({}, speed) : {
          complete: fn || !fn && easing || isFunction(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !isFunction(easing) && easing
        };

        if (jQuery.fx.off) {
          opt.duration = 0;
        } else {
          if (typeof opt.duration !== "number") {
            if (opt.duration in jQuery.fx.speeds) {
              opt.duration = jQuery.fx.speeds[opt.duration];
            } else {
              opt.duration = jQuery.fx.speeds._default;
            }
          }
        }

        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }

        opt.old = opt.complete;
        opt.complete = function () {
          if (isFunction(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery.dequeue(this, opt.queue);
          }
        };
        return opt;
      };
      jQuery.fn.extend({
        fadeTo: function fadeTo(speed, to, easing, callback) {
          return this.filter(isHiddenWithinTree).css("opacity", 0).show()

          .end().animate({
            opacity: to
          }, speed, easing, callback);
        },
        animate: function animate(prop, speed, easing, callback) {
          var empty = jQuery.isEmptyObject(prop),
            optall = jQuery.speed(speed, easing, callback),
            doAnimation = function doAnimation() {
              var anim = Animation(this, jQuery.extend({}, prop), optall);

              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
          doAnimation.finish = doAnimation;
          return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function stop(type, clearQueue, gotoEnd) {
          var stopQueue = function stopQueue(hooks) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop(gotoEnd);
          };
          if (typeof type !== "string") {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = undefined;
          }
          if (clearQueue) {
            this.queue(type || "fx", []);
          }
          return this.each(function () {
            var dequeue = true,
              index = type != null && type + "queueHooks",
              timers = jQuery.timers,
              data = dataPriv.get(this);
            if (index) {
              if (data[index] && data[index].stop) {
                stopQueue(data[index]);
              }
            } else {
              for (index in data) {
                if (data[index] && data[index].stop && rrun.test(index)) {
                  stopQueue(data[index]);
                }
              }
            }
            for (index = timers.length; index--;) {
              if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                timers[index].anim.stop(gotoEnd);
                dequeue = false;
                timers.splice(index, 1);
              }
            }

            if (dequeue || !gotoEnd) {
              jQuery.dequeue(this, type);
            }
          });
        },
        finish: function finish(type) {
          if (type !== false) {
            type = type || "fx";
          }
          return this.each(function () {
            var index,
              data = dataPriv.get(this),
              queue = data[type + "queue"],
              hooks = data[type + "queueHooks"],
              timers = jQuery.timers,
              length = queue ? queue.length : 0;

            data.finish = true;

            jQuery.queue(this, type, []);
            if (hooks && hooks.stop) {
              hooks.stop.call(this, true);
            }

            for (index = timers.length; index--;) {
              if (timers[index].elem === this && timers[index].queue === type) {
                timers[index].anim.stop(true);
                timers.splice(index, 1);
              }
            }

            for (index = 0; index < length; index++) {
              if (queue[index] && queue[index].finish) {
                queue[index].finish.call(this);
              }
            }

            delete data.finish;
          });
        }
      });
      jQuery.each(["toggle", "show", "hide"], function (_i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
          return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
      });

      jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
          opacity: "show"
        },
        fadeOut: {
          opacity: "hide"
        },
        fadeToggle: {
          opacity: "toggle"
        }
      }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
          return this.animate(props, speed, easing, callback);
        };
      });
      jQuery.timers = [];
      jQuery.fx.tick = function () {
        var timer,
          i = 0,
          timers = jQuery.timers;
        fxNow = Date.now();
        for (; i < timers.length; i++) {
          timer = timers[i];

          if (!timer() && timers[i] === timer) {
            timers.splice(i--, 1);
          }
        }
        if (!timers.length) {
          jQuery.fx.stop();
        }
        fxNow = undefined;
      };
      jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
      };
      jQuery.fx.interval = 13;
      jQuery.fx.start = function () {
        if (inProgress) {
          return;
        }
        inProgress = true;
        schedule();
      };
      jQuery.fx.stop = function () {
        inProgress = null;
      };
      jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
      };

      jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function (next, hooks) {
          var timeout = window.setTimeout(next, time);
          hooks.stop = function () {
            window.clearTimeout(timeout);
          };
        });
      };
      (function () {
        var input = document.createElement("input"),
          select = document.createElement("select"),
          opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";

        support.checkOn = input.value !== "";

        support.optSelected = opt.selected;

        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
      })();
      var boolHook,
        attrHandle = jQuery.expr.attrHandle;
      jQuery.fn.extend({
        attr: function attr(name, value) {
          return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function removeAttr(name) {
          return this.each(function () {
            jQuery.removeAttr(this, name);
          });
        }
      });
      jQuery.extend({
        attr: function attr(elem, name, value) {
          var ret,
            hooks,
            nType = elem.nodeType;

          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }

          if (typeof elem.getAttribute === "undefined") {
            return jQuery.prop(elem, name, value);
          }

          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
          }
          if (value !== undefined) {
            if (value === null) {
              jQuery.removeAttr(elem, name);
              return;
            }
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
              return ret;
            }
            elem.setAttribute(name, value + "");
            return value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          ret = jQuery.find.attr(elem, name);

          return ret == null ? undefined : ret;
        },
        attrHooks: {
          type: {
            set: function set(elem, value) {
              if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                var val = elem.value;
                elem.setAttribute("type", value);
                if (val) {
                  elem.value = val;
                }
                return value;
              }
            }
          }
        },
        removeAttr: function removeAttr(elem, value) {
          var name,
            i = 0,
            attrNames = value && value.match(rnothtmlwhite);
          if (attrNames && elem.nodeType === 1) {
            while (name = attrNames[i++]) {
              elem.removeAttribute(name);
            }
          }
        }
      });

      boolHook = {
        set: function set(elem, value, name) {
          if (value === false) {
            jQuery.removeAttr(elem, name);
          } else {
            elem.setAttribute(name, name);
          }
          return name;
        }
      };
      jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function (elem, name, isXML) {
          var ret,
            handle,
            lowercaseName = name.toLowerCase();
          if (!isXML) {
            handle = attrHandle[lowercaseName];
            attrHandle[lowercaseName] = ret;
            ret = getter(elem, name, isXML) != null ? lowercaseName : null;
            attrHandle[lowercaseName] = handle;
          }
          return ret;
        };
      });
      var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;
      jQuery.fn.extend({
        prop: function prop(name, value) {
          return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function removeProp(name) {
          return this.each(function () {
            delete this[jQuery.propFix[name] || name];
          });
        }
      });
      jQuery.extend({
        prop: function prop(elem, name, value) {
          var ret,
            hooks,
            nType = elem.nodeType;

          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            name = jQuery.propFix[name] || name;
            hooks = jQuery.propHooks[name];
          }
          if (value !== undefined) {
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
              return ret;
            }
            return elem[name] = value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          return elem[name];
        },
        propHooks: {
          tabIndex: {
            get: function get(elem) {
              var tabindex = jQuery.find.attr(elem, "tabindex");
              if (tabindex) {
                return parseInt(tabindex, 10);
              }
              if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                return 0;
              }
              return -1;
            }
          }
        },
        propFix: {
          "for": "htmlFor",
          "class": "className"
        }
      });

      if (!support.optSelected) {
        jQuery.propHooks.selected = {
          get: function get(elem) {

            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
            return null;
          },
          set: function set(elem) {

            var parent = elem.parentNode;
            if (parent) {
              parent.selectedIndex;
              if (parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
            }
          }
        };
      }
      jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        jQuery.propFix[this.toLowerCase()] = this;
      });

      function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
      }
      function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
      }
      function classesToArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "string") {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      }
      jQuery.fn.extend({
        addClass: function addClass(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function (j) {
              jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function () {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (cur.indexOf(" " + className + " ") < 0) {
                    cur += className + " ";
                  }
                }

                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        removeClass: function removeClass(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function (j) {
              jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
          }
          if (!arguments.length) {
            return this.attr("class", "");
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function () {
              curValue = getClass(this);

              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];

                  while (cur.indexOf(" " + className + " ") > -1) {
                    cur = cur.replace(" " + className + " ", " ");
                  }
                }

                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        toggleClass: function toggleClass(value, stateVal) {
          var classNames,
            className,
            i,
            self,
            type = _typeof(value),
            isValidValue = type === "string" || Array.isArray(value);
          if (isFunction(value)) {
            return this.each(function (i) {
              jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
            });
          }
          if (typeof stateVal === "boolean" && isValidValue) {
            return stateVal ? this.addClass(value) : this.removeClass(value);
          }
          classNames = classesToArray(value);
          return this.each(function () {
            if (isValidValue) {
              self = jQuery(this);
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];

                if (self.hasClass(className)) {
                  self.removeClass(className);
                } else {
                  self.addClass(className);
                }
              }

            } else if (value === undefined || type === "boolean") {
              className = getClass(this);
              if (className) {
                dataPriv.set(this, "__className__", className);
              }

              if (this.setAttribute) {
                this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
              }
            }
          });
        },
        hasClass: function hasClass(selector) {
          var className,
            elem,
            i = 0;
          className = " " + selector + " ";
          while (elem = this[i++]) {
            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
              return true;
            }
          }
          return false;
        }
      });
      var rreturn = /\r/g;
      jQuery.fn.extend({
        val: function val(value) {
          var hooks,
            ret,
            valueIsFunction,
            elem = this[0];
          if (!arguments.length) {
            if (elem) {
              hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
              if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                return ret;
              }
              ret = elem.value;

              if (typeof ret === "string") {
                return ret.replace(rreturn, "");
              }

              return ret == null ? "" : ret;
            }
            return;
          }
          valueIsFunction = isFunction(value);
          return this.each(function (i) {
            var val;
            if (this.nodeType !== 1) {
              return;
            }
            if (valueIsFunction) {
              val = value.call(this, i, jQuery(this).val());
            } else {
              val = value;
            }

            if (val == null) {
              val = "";
            } else if (typeof val === "number") {
              val += "";
            } else if (Array.isArray(val)) {
              val = jQuery.map(val, function (value) {
                return value == null ? "" : value + "";
              });
            }
            hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
              this.value = val;
            }
          });
        }
      });
      jQuery.extend({
        valHooks: {
          option: {
            get: function get(elem) {
              var val = jQuery.find.attr(elem, "value");
              return val != null ? val :
              stripAndCollapse(jQuery.text(elem));
            }
          },
          select: {
            get: function get(elem) {
              var value,
                option,
                i,
                options = elem.options,
                index = elem.selectedIndex,
                one = elem.type === "select-one",
                values = one ? null : [],
                max = one ? index + 1 : options.length;
              if (index < 0) {
                i = max;
              } else {
                i = one ? index : 0;
              }

              for (; i < max; i++) {
                option = options[i];

                if ((option.selected || i === index) &&
                !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                  value = jQuery(option).val();

                  if (one) {
                    return value;
                  }

                  values.push(value);
                }
              }
              return values;
            },
            set: function set(elem, value) {
              var optionSet,
                option,
                options = elem.options,
                values = jQuery.makeArray(value),
                i = options.length;
              while (i--) {
                option = options[i];


                if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                  optionSet = true;
                }

              }

              if (!optionSet) {
                elem.selectedIndex = -1;
              }
              return values;
            }
          }
        }
      });

      jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
          set: function set(elem, value) {
            if (Array.isArray(value)) {
              return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
          }
        };
        if (!support.checkOn) {
          jQuery.valHooks[this].get = function (elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          };
        }
      });

      var location = window.location;
      var nonce = {
        guid: Date.now()
      };
      var rquery = /\?/;

      jQuery.parseXML = function (data) {
        var xml, parserErrorElem;
        if (!data || typeof data !== "string") {
          return null;
        }

        try {
          xml = new window.DOMParser().parseFromString(data, "text/xml");
        } catch (e) {}
        parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
        if (!xml || parserErrorElem) {
          jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function (el) {
            return el.textContent;
          }).join("\n") : data));
        }
        return xml;
      };
      var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        stopPropagationCallback = function stopPropagationCallback(e) {
          e.stopPropagation();
        };
      jQuery.extend(jQuery.event, {
        trigger: function trigger(event, data, elem, onlyHandlers) {
          var i,
            cur,
            tmp,
            bubbleType,
            ontype,
            handle,
            special,
            lastElement,
            eventPath = [elem || document],
            type = hasOwn.call(event, "type") ? event.type : event,
            namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
          cur = lastElement = tmp = elem = elem || document;

          if (elem.nodeType === 3 || elem.nodeType === 8) {
            return;
          }

          if (rfocusMorph.test(type + jQuery.event.triggered)) {
            return;
          }
          if (type.indexOf(".") > -1) {
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
          }
          ontype = type.indexOf(":") < 0 && "on" + type;

          event = event[jQuery.expando] ? event : new jQuery.Event(type, _typeof(event) === "object" && event);

          event.isTrigger = onlyHandlers ? 2 : 3;
          event.namespace = namespaces.join(".");
          event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

          event.result = undefined;
          if (!event.target) {
            event.target = elem;
          }

          data = data == null ? [event] : jQuery.makeArray(data, [event]);

          special = jQuery.event.special[type] || {};
          if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
            return;
          }

          if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
            bubbleType = special.delegateType || type;
            if (!rfocusMorph.test(bubbleType + type)) {
              cur = cur.parentNode;
            }
            for (; cur; cur = cur.parentNode) {
              eventPath.push(cur);
              tmp = cur;
            }

            if (tmp === (elem.ownerDocument || document)) {
              eventPath.push(tmp.defaultView || tmp.parentWindow || window);
            }
          }

          i = 0;
          while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
            lastElement = cur;
            event.type = i > 1 ? bubbleType : special.bindType || type;

            handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");
            if (handle) {
              handle.apply(cur, data);
            }

            handle = ontype && cur[ontype];
            if (handle && handle.apply && acceptData(cur)) {
              event.result = handle.apply(cur, data);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          event.type = type;

          if (!onlyHandlers && !event.isDefaultPrevented()) {
            if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
              if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) {
                  elem[ontype] = null;
                }

                jQuery.event.triggered = type;
                if (event.isPropagationStopped()) {
                  lastElement.addEventListener(type, stopPropagationCallback);
                }
                elem[type]();
                if (event.isPropagationStopped()) {
                  lastElement.removeEventListener(type, stopPropagationCallback);
                }
                jQuery.event.triggered = undefined;
                if (tmp) {
                  elem[ontype] = tmp;
                }
              }
            }
          }
          return event.result;
        },
        simulate: function simulate(type, elem, event) {
          var e = jQuery.extend(new jQuery.Event(), event, {
            type: type,
            isSimulated: true
          });
          jQuery.event.trigger(e, null, elem);
        }
      });
      jQuery.fn.extend({
        trigger: function trigger(type, data) {
          return this.each(function () {
            jQuery.event.trigger(type, data, this);
          });
        },
        triggerHandler: function triggerHandler(type, data) {
          var elem = this[0];
          if (elem) {
            return jQuery.event.trigger(type, data, elem, true);
          }
        }
      });
      var rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
      function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
          jQuery.each(obj, function (i, v) {
            if (traditional || rbracket.test(prefix)) {
              add(prefix, v);
            } else {
              buildParams(prefix + "[" + (_typeof(v) === "object" && v != null ? i : "") + "]", v, traditional, add);
            }
          });
        } else if (!traditional && toType(obj) === "object") {
          for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
          }
        } else {
          add(prefix, obj);
        }
      }

      jQuery.param = function (a, traditional) {
        var prefix,
          s = [],
          add = function add(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
        if (a == null) {
          return "";
        }

        if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
          jQuery.each(a, function () {
            add(this.name, this.value);
          });
        } else {
          for (prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
          }
        }

        return s.join("&");
      };
      jQuery.fn.extend({
        serialize: function serialize() {
          return jQuery.param(this.serializeArray());
        },
        serializeArray: function serializeArray() {
          return this.map(function () {
            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          }).filter(function () {
            var type = this.type;

            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
          }).map(function (_i, elem) {
            var val = jQuery(this).val();
            if (val == null) {
              return null;
            }
            if (Array.isArray(val)) {
              return jQuery.map(val, function (val) {
                return {
                  name: elem.name,
                  value: val.replace(rCRLF, "\r\n")
                };
              });
            }
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          }).get();
        }
      });
      var r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*"),
        originAnchor = document.createElement("a");
      originAnchor.href = location.href;

      function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
          if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
          }
          var dataType,
            i = 0,
            dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
          if (isFunction(func)) {
            while (dataType = dataTypes[i++]) {
              if (dataType[0] === "+") {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);

              } else {
                (structure[dataType] = structure[dataType] || []).push(func);
              }
            }
          }
        };
      }

      function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {},
          seekingTransport = structure === transports;
        function inspect(dataType) {
          var selected;
          inspected[dataType] = true;
          jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
              options.dataTypes.unshift(dataTypeOrTransport);
              inspect(dataTypeOrTransport);
              return false;
            } else if (seekingTransport) {
              return !(selected = dataTypeOrTransport);
            }
          });
          return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
      }

      function ajaxExtend(target, src) {
        var key,
          deep,
          flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
          if (src[key] !== undefined) {
            (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
          }
        }
        if (deep) {
          jQuery.extend(true, target, deep);
        }
        return target;
      }

      function ajaxHandleResponses(s, jqXHR, responses) {
        var ct,
          type,
          finalDataType,
          firstDataType,
          contents = s.contents,
          dataTypes = s.dataTypes;

        while (dataTypes[0] === "*") {
          dataTypes.shift();
          if (ct === undefined) {
            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
          }
        }

        if (ct) {
          for (type in contents) {
            if (contents[type] && contents[type].test(ct)) {
              dataTypes.unshift(type);
              break;
            }
          }
        }

        if (dataTypes[0] in responses) {
          finalDataType = dataTypes[0];
        } else {
          for (type in responses) {
            if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
              finalDataType = type;
              break;
            }
            if (!firstDataType) {
              firstDataType = type;
            }
          }

          finalDataType = finalDataType || firstDataType;
        }

        if (finalDataType) {
          if (finalDataType !== dataTypes[0]) {
            dataTypes.unshift(finalDataType);
          }
          return responses[finalDataType];
        }
      }

      function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2,
          current,
          conv,
          tmp,
          prev,
          converters = {},
          dataTypes = s.dataTypes.slice();

        if (dataTypes[1]) {
          for (conv in s.converters) {
            converters[conv.toLowerCase()] = s.converters[conv];
          }
        }
        current = dataTypes.shift();

        while (current) {
          if (s.responseFields[current]) {
            jqXHR[s.responseFields[current]] = response;
          }

          if (!prev && isSuccess && s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
          }
          prev = current;
          current = dataTypes.shift();
          if (current) {
            if (current === "*") {
              current = prev;

            } else if (prev !== "*" && prev !== current) {
              conv = converters[prev + " " + current] || converters["* " + current];

              if (!conv) {
                for (conv2 in converters) {
                  tmp = conv2.split(" ");
                  if (tmp[1] === current) {
                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                    if (conv) {
                      if (conv === true) {
                        conv = converters[conv2];

                      } else if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1]);
                      }
                      break;
                    }
                  }
                }
              }

              if (conv !== true) {
                if (conv && s["throws"]) {
                  response = conv(response);
                } else {
                  try {
                    response = conv(response);
                  } catch (e) {
                    return {
                      state: "parsererror",
                      error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                  }
                }
              }
            }
          }
        }
        return {
          state: "success",
          data: response
        };
      }
      jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: location.href,
          type: "GET",
          isLocal: rlocalProtocol.test(location.protocol),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",

          accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          converters: {
            "* text": String,
            "text html": true,
            "text json": JSON.parse,
            "text xml": jQuery.parseXML
          },
          flatOptions: {
            url: true,
            context: true
          }
        },
        ajaxSetup: function ajaxSetup(target, settings) {
          return settings ?
          ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
          ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function ajax(url, options) {
          if (_typeof(url) === "object") {
            options = url;
            url = undefined;
          }

          options = options || {};
          var transport,
            cacheURL,
            responseHeadersString,
            responseHeaders,
            timeoutTimer,
            urlAnchor,
            completed,
            fireGlobals,
            i,
            uncached,
            s = jQuery.ajaxSetup({}, options),
            callbackContext = s.context || s,
            globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
            deferred = jQuery.Deferred(),
            completeDeferred = jQuery.Callbacks("once memory"),
            _statusCode = s.statusCode || {},
            requestHeaders = {},
            requestHeadersNames = {},
            strAbort = "canceled",
            jqXHR = {
              readyState: 0,
              getResponseHeader: function getResponseHeader(key) {
                var match;
                if (completed) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              getAllResponseHeaders: function getAllResponseHeaders() {
                return completed ? responseHeadersString : null;
              },
              setRequestHeader: function setRequestHeader(name, value) {
                if (completed == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              overrideMimeType: function overrideMimeType(type) {
                if (completed == null) {
                  s.mimeType = type;
                }
                return this;
              },
              statusCode: function statusCode(map) {
                var code;
                if (map) {
                  if (completed) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      _statusCode[code] = [_statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              abort: function abort(statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };

          deferred.promise(jqXHR);

          s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

          s.type = options.method || options.type || s.method || s.type;

          s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

          if (s.crossDomain == null) {
            urlAnchor = document.createElement("a");

            try {
              urlAnchor.href = s.url;

              urlAnchor.href = urlAnchor.href;
              s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            } catch (e) {
              s.crossDomain = true;
            }
          }

          if (s.data && s.processData && typeof s.data !== "string") {
            s.data = jQuery.param(s.data, s.traditional);
          }

          inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

          if (completed) {
            return jqXHR;
          }

          fireGlobals = jQuery.event && s.global;

          if (fireGlobals && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart");
          }

          s.type = s.type.toUpperCase();

          s.hasContent = !rnoContent.test(s.type);

          cacheURL = s.url.replace(rhash, "");

          if (!s.hasContent) {
            uncached = s.url.slice(cacheURL.length);

            if (s.data && (s.processData || typeof s.data === "string")) {
              cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

              delete s.data;
            }

            if (s.cache === false) {
              cacheURL = cacheURL.replace(rantiCache, "$1");
              uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
            }

            s.url = cacheURL + uncached;

          } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
            s.data = s.data.replace(r20, "+");
          }

          if (s.ifModified) {
            if (jQuery.lastModified[cacheURL]) {
              jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
            }
            if (jQuery.etag[cacheURL]) {
              jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
          }

          if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s.contentType);
          }

          jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

          for (i in s.headers) {
            jqXHR.setRequestHeader(i, s.headers[i]);
          }

          if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
            return jqXHR.abort();
          }

          strAbort = "abort";

          completeDeferred.add(s.complete);
          jqXHR.done(s.success);
          jqXHR.fail(s.error);

          transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

          if (!transport) {
            done(-1, "No Transport");
          } else {
            jqXHR.readyState = 1;

            if (fireGlobals) {
              globalEventContext.trigger("ajaxSend", [jqXHR, s]);
            }

            if (completed) {
              return jqXHR;
            }

            if (s.async && s.timeout > 0) {
              timeoutTimer = window.setTimeout(function () {
                jqXHR.abort("timeout");
              }, s.timeout);
            }
            try {
              completed = false;
              transport.send(requestHeaders, done);
            } catch (e) {
              if (completed) {
                throw e;
              }

              done(-1, e);
            }
          }

          function done(status, nativeStatusText, responses, headers) {
            var isSuccess,
              success,
              error,
              response,
              modified,
              statusText = nativeStatusText;

            if (completed) {
              return;
            }
            completed = true;

            if (timeoutTimer) {
              window.clearTimeout(timeoutTimer);
            }

            transport = undefined;

            responseHeadersString = headers || "";

            jqXHR.readyState = status > 0 ? 4 : 0;

            isSuccess = status >= 200 && status < 300 || status === 304;

            if (responses) {
              response = ajaxHandleResponses(s, jqXHR, responses);
            }

            if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
              s.converters["text script"] = function () {};
            }

            response = ajaxConvert(s, response, jqXHR, isSuccess);

            if (isSuccess) {
              if (s.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                  jQuery.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                  jQuery.etag[cacheURL] = modified;
                }
              }

              if (status === 204 || s.type === "HEAD") {
                statusText = "nocontent";

              } else if (status === 304) {
                statusText = "notmodified";

              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
              }
            } else {
              error = statusText;
              if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                  status = 0;
                }
              }
            }

            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";

            if (isSuccess) {
              deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
              deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }

            jqXHR.statusCode(_statusCode);
            _statusCode = undefined;
            if (fireGlobals) {
              globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
            }

            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
            if (fireGlobals) {
              globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

              if (! --jQuery.active) {
                jQuery.event.trigger("ajaxStop");
              }
            }
          }
          return jqXHR;
        },
        getJSON: function getJSON(url, data, callback) {
          return jQuery.get(url, data, callback, "json");
        },
        getScript: function getScript(url, callback) {
          return jQuery.get(url, undefined, callback, "script");
        }
      });
      jQuery.each(["get", "post"], function (_i, method) {
        jQuery[method] = function (url, data, callback, type) {
          if (isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
          }

          return jQuery.ajax(jQuery.extend({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
          }, jQuery.isPlainObject(url) && url));
        };
      });
      jQuery.ajaxPrefilter(function (s) {
        var i;
        for (i in s.headers) {
          if (i.toLowerCase() === "content-type") {
            s.contentType = s.headers[i] || "";
          }
        }
      });
      jQuery._evalUrl = function (url, options, doc) {
        return jQuery.ajax({
          url: url,
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          converters: {
            "text script": function textScript() {}
          },
          dataFilter: function dataFilter(response) {
            jQuery.globalEval(response, options, doc);
          }
        });
      };
      jQuery.fn.extend({
        wrapAll: function wrapAll(html) {
          var wrap;
          if (this[0]) {
            if (isFunction(html)) {
              html = html.call(this[0]);
            }

            wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
              wrap.insertBefore(this[0]);
            }
            wrap.map(function () {
              var elem = this;
              while (elem.firstElementChild) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this);
          }
          return this;
        },
        wrapInner: function wrapInner(html) {
          if (isFunction(html)) {
            return this.each(function (i) {
              jQuery(this).wrapInner(html.call(this, i));
            });
          }
          return this.each(function () {
            var self = jQuery(this),
              contents = self.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self.append(html);
            }
          });
        },
        wrap: function wrap(html) {
          var htmlIsFunction = isFunction(html);
          return this.each(function (i) {
            jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
          });
        },
        unwrap: function unwrap(selector) {
          this.parent(selector).not("body").each(function () {
            jQuery(this).replaceWith(this.childNodes);
          });
          return this;
        }
      });
      jQuery.expr.pseudos.hidden = function (elem) {
        return !jQuery.expr.pseudos.visible(elem);
      };
      jQuery.expr.pseudos.visible = function (elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      jQuery.ajaxSettings.xhr = function () {
        try {
          return new window.XMLHttpRequest();
        } catch (e) {}
      };
      var xhrSuccessStatus = {
          0: 200,
          1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
      support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
      support.ajax = xhrSupported = !!xhrSupported;
      jQuery.ajaxTransport(function (options) {
        var _callback, errorCallback;

        if (support.cors || xhrSupported && !options.crossDomain) {
          return {
            send: function send(headers, complete) {
              var i,
                xhr = options.xhr();
              xhr.open(options.type, options.url, options.async, options.username, options.password);

              if (options.xhrFields) {
                for (i in options.xhrFields) {
                  xhr[i] = options.xhrFields[i];
                }
              }

              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }

              if (!options.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }

              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }

              _callback = function callback(type) {
                return function () {
                  if (_callback) {
                    _callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                    if (type === "abort") {
                      xhr.abort();
                    } else if (type === "error") {
                      if (typeof xhr.status !== "number") {
                        complete(0, "error");
                      } else {
                        complete(
                        xhr.status, xhr.statusText);
                      }
                    } else {
                      complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,
                      (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                        binary: xhr.response
                      } : {
                        text: xhr.responseText
                      }, xhr.getAllResponseHeaders());
                    }
                  }
                };
              };

              xhr.onload = _callback();
              errorCallback = xhr.onerror = xhr.ontimeout = _callback("error");

              if (xhr.onabort !== undefined) {
                xhr.onabort = errorCallback;
              } else {
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                    window.setTimeout(function () {
                      if (_callback) {
                        errorCallback();
                      }
                    });
                  }
                };
              }

              _callback = _callback("abort");
              try {
                xhr.send(options.hasContent && options.data || null);
              } catch (e) {
                if (_callback) {
                  throw e;
                }
              }
            },
            abort: function abort() {
              if (_callback) {
                _callback();
              }
            }
          };
        }
      });

      jQuery.ajaxPrefilter(function (s) {
        if (s.crossDomain) {
          s.contents.script = false;
        }
      });

      jQuery.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function textScript(text) {
            jQuery.globalEval(text);
            return text;
          }
        }
      });

      jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
          s.cache = false;
        }
        if (s.crossDomain) {
          s.type = "GET";
        }
      });

      jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain || s.scriptAttrs) {
          var script, _callback2;
          return {
            send: function send(_, complete) {
              script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
                charset: s.scriptCharset,
                src: s.url
              }).on("load error", _callback2 = function callback(evt) {
                script.remove();
                _callback2 = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              });

              document.head.appendChild(script[0]);
            },
            abort: function abort() {
              if (_callback2) {
                _callback2();
              }
            }
          };
        }
      });
      var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

      jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function jsonpCallback() {
          var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
          this[callback] = true;
          return callback;
        }
      });

      jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var callbackName,
          overwritten,
          responseContainer,
          jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

        if (jsonProp || s.dataTypes[0] === "jsonp") {
          callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

          if (jsonProp) {
            s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
          } else if (s.jsonp !== false) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
          }

          s.converters["script json"] = function () {
            if (!responseContainer) {
              jQuery.error(callbackName + " was not called");
            }
            return responseContainer[0];
          };

          s.dataTypes[0] = "json";

          overwritten = window[callbackName];
          window[callbackName] = function () {
            responseContainer = arguments;
          };

          jqXHR.always(function () {
            if (overwritten === undefined) {
              jQuery(window).removeProp(callbackName);

            } else {
              window[callbackName] = overwritten;
            }

            if (s[callbackName]) {
              s.jsonpCallback = originalSettings.jsonpCallback;

              oldCallbacks.push(callbackName);
            }

            if (responseContainer && isFunction(overwritten)) {
              overwritten(responseContainer[0]);
            }
            responseContainer = overwritten = undefined;
          });

          return "script";
        }
      });

      support.createHTMLDocument = function () {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
      }();

      jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== "string") {
          return [];
        }
        if (typeof context === "boolean") {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document.implementation.createHTMLDocument("");

            base = context.createElement("base");
            base.href = document.location.href;
            context.head.appendChild(base);
          } else {
            context = document;
          }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];

        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
          jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
      };

      /**
       * Load a url into a page
       */
      jQuery.fn.load = function (url, params, callback) {
        var selector,
          type,
          response,
          self = this,
          off = url.indexOf(" ");
        if (off > -1) {
          selector = stripAndCollapse(url.slice(off));
          url = url.slice(0, off);
        }

        if (isFunction(params)) {
          callback = params;
          params = undefined;

        } else if (params && _typeof(params) === "object") {
          type = "POST";
        }

        if (self.length > 0) {
          jQuery.ajax({
            url: url,
            type: type || "GET",
            dataType: "html",
            data: params
          }).done(function (responseText) {
            response = arguments;
            self.html(selector ?
            jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
            responseText);

          }).always(callback && function (jqXHR, status) {
            self.each(function () {
              callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
          });
        }
        return this;
      };
      jQuery.expr.pseudos.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
          return elem === fn.elem;
        }).length;
      };
      jQuery.offset = {
        setOffset: function setOffset(elem, options, i) {
          var curPosition,
            curLeft,
            curCSSTop,
            curTop,
            curOffset,
            curCSSLeft,
            calculatePosition,
            position = jQuery.css(elem, "position"),
            curElem = jQuery(elem),
            props = {};

          if (position === "static") {
            elem.style.position = "relative";
          }
          curOffset = curElem.offset();
          curCSSTop = jQuery.css(elem, "top");
          curCSSLeft = jQuery.css(elem, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

          if (calculatePosition) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }
          if (isFunction(options)) {
            options = options.call(elem, i, jQuery.extend({}, curOffset));
          }
          if (options.top != null) {
            props.top = options.top - curOffset.top + curTop;
          }
          if (options.left != null) {
            props.left = options.left - curOffset.left + curLeft;
          }
          if ("using" in options) {
            options.using.call(elem, props);
          } else {
            curElem.css(props);
          }
        }
      };
      jQuery.fn.extend({
        offset: function offset(options) {
          if (arguments.length) {
            return options === undefined ? this : this.each(function (i) {
              jQuery.offset.setOffset(this, options, i);
            });
          }
          var rect,
            win,
            elem = this[0];
          if (!elem) {
            return;
          }

          if (!elem.getClientRects().length) {
            return {
              top: 0,
              left: 0
            };
          }

          rect = elem.getBoundingClientRect();
          win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        position: function position() {
          if (!this[0]) {
            return;
          }
          var offsetParent,
            offset,
            doc,
            elem = this[0],
            parentOffset = {
              top: 0,
              left: 0
            };

          if (jQuery.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
          } else {
            offset = this.offset();

            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
              parentOffset = jQuery(offsetParent).offset();
              parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
              parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
            }
          }

          return {
            top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
          };
        },
        offsetParent: function offsetParent() {
          return this.map(function () {
            var offsetParent = this.offsetParent;
            while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
          });
        }
      });

      jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
      }, function (method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function (val) {
          return access(this, function (elem, method, val) {
            var win;
            if (isWindow(elem)) {
              win = elem;
            } else if (elem.nodeType === 9) {
              win = elem.defaultView;
            }
            if (val === undefined) {
              return win ? win[prop] : elem[method];
            }
            if (win) {
              win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
            } else {
              elem[method] = val;
            }
          }, method, val, arguments.length);
        };
      });

      jQuery.each(["top", "left"], function (_i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
          if (computed) {
            computed = curCSS(elem, prop);

            return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
          }
        });
      });

      jQuery.each({
        Height: "height",
        Width: "width"
      }, function (name, type) {
        jQuery.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        }, function (defaultExtra, funcName) {
          jQuery.fn[funcName] = function (margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
              extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
            return access(this, function (elem, type, value) {
              var doc;
              if (isWindow(elem)) {
                return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
              }

              if (elem.nodeType === 9) {
                doc = elem.documentElement;

                return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
              }
              return value === undefined ?
              jQuery.css(elem, type, extra) :
              jQuery.style(elem, type, value, extra);
            }, type, chainable ? margin : undefined, chainable);
          };
        });
      });
      jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
        jQuery.fn[type] = function (fn) {
          return this.on(type, fn);
        };
      });
      jQuery.fn.extend({
        bind: function bind(types, data, fn) {
          return this.on(types, null, data, fn);
        },
        unbind: function unbind(types, fn) {
          return this.off(types, null, fn);
        },
        delegate: function delegate(selector, types, data, fn) {
          return this.on(types, selector, data, fn);
        },
        undelegate: function undelegate(selector, types, fn) {
          return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        hover: function hover(fnOver, fnOut) {
          return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
        }
      });
      jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
        jQuery.fn[name] = function (data, fn) {
          return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
      });

      var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

      jQuery.proxy = function (fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }

        if (!isFunction(fn)) {
          return undefined;
        }

        args = _slice.call(arguments, 2);
        proxy = function proxy() {
          return fn.apply(context || this, args.concat(_slice.call(arguments)));
        };

        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
      };
      jQuery.holdReady = function (hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      };
      jQuery.isArray = Array.isArray;
      jQuery.parseJSON = JSON.parse;
      jQuery.nodeName = nodeName;
      jQuery.isFunction = isFunction;
      jQuery.isWindow = isWindow;
      jQuery.camelCase = camelCase;
      jQuery.type = toType;
      jQuery.now = Date.now;
      jQuery.isNumeric = function (obj) {
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&
        !isNaN(obj - parseFloat(obj));
      };
      jQuery.trim = function (text) {
        return text == null ? "" : (text + "").replace(rtrim, "$1");
      };



      if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
          return jQuery;
        });
      }
      var
        _jQuery = window.jQuery,
        _$ = window.$;
      jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
          window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
          window.jQuery = _jQuery;
        }
        return jQuery;
      };

      if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
      }
      return jQuery;
    });
  }, {}],
  10: [function (require, module, exports) {
    !function (n, t) {
      "object" == _typeof(exports) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = "undefined" != typeof globalThis ? globalThis : n || self).LazyLoad = t();
    }(this, function () {
      "use strict";

      function n() {
        return n = Object.assign || function (n) {
          for (var t = 1; t < arguments.length; t++) {
            var e = arguments[t];
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
          }
          return n;
        }, n.apply(this, arguments);
      }
      var t = "undefined" != typeof window,
        e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        i = t && "IntersectionObserver" in window,
        o = t && "classList" in document.createElement("p"),
        a = t && window.devicePixelRatio > 1,
        r = {
          elements_selector: ".lazy",
          container: e || t ? document : null,
          threshold: 300,
          thresholds: null,
          data_src: "src",
          data_srcset: "srcset",
          data_sizes: "sizes",
          data_bg: "bg",
          data_bg_hidpi: "bg-hidpi",
          data_bg_multi: "bg-multi",
          data_bg_multi_hidpi: "bg-multi-hidpi",
          data_bg_set: "bg-set",
          data_poster: "poster",
          class_applied: "applied",
          class_loading: "loading",
          class_loaded: "loaded",
          class_error: "error",
          class_entered: "entered",
          class_exited: "exited",
          unobserve_completed: !0,
          unobserve_entered: !1,
          cancel_on_exit: !0,
          callback_enter: null,
          callback_exit: null,
          callback_applied: null,
          callback_loading: null,
          callback_loaded: null,
          callback_error: null,
          callback_finish: null,
          callback_cancel: null,
          use_native: !1,
          restore_on_error: !1
        },
        c = function c(t) {
          return n({}, r, t);
        },
        l = function l(n, t) {
          var e,
            i = "LazyLoad::Initialized",
            o = new n(t);
          try {
            e = new CustomEvent(i, {
              detail: {
                instance: o
              }
            });
          } catch (n) {
            (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
              instance: o
            });
          }
          window.dispatchEvent(e);
        },
        u = "src",
        s = "srcset",
        d = "sizes",
        f = "poster",
        _ = "llOriginalAttrs",
        g = "data",
        v = "loading",
        b = "loaded",
        p = "applied",
        m = "error",
        h = "native",
        E = "data-",
        I = "ll-status",
        y = function y(n, t) {
          return n.getAttribute(E + t);
        },
        k = function k(n) {
          return y(n, I);
        },
        w = function w(n, t) {
          return function (n, t, e) {
            var i = "data-ll-status";
            null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
          }(n, 0, t);
        },
        A = function A(n) {
          return w(n, null);
        },
        L = function L(n) {
          return null === k(n);
        },
        O = function O(n) {
          return k(n) === h;
        },
        x = [v, b, p, m],
        C = function C(n, t, e, i) {
          n && "function" == typeof n && (void 0 === i ? void 0 === e ? n(t) : n(t, e) : n(t, e, i));
        },
        N = function N(n, t) {
          "" !== t && (o ? n.classList.add(t) : n.className += (n.className ? " " : "") + t);
        },
        M = function M(n, t) {
          "" !== t && (o ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, ""));
        },
        z = function z(n) {
          return n.llTempImage;
        },
        T = function T(n, t) {
          if (t) {
            var e = t._observer;
            e && e.unobserve(n);
          }
        },
        R = function R(n, t) {
          n && (n.loadingCount += t);
        },
        G = function G(n, t) {
          n && (n.toLoadCount = t);
        },
        j = function j(n) {
          for (var t, e = [], i = 0; t = n.children[i]; i += 1) "SOURCE" === t.tagName && e.push(t);
          return e;
        },
        D = function D(n, t) {
          var e = n.parentNode;
          e && "PICTURE" === e.tagName && j(e).forEach(t);
        },
        H = function H(n, t) {
          j(n).forEach(t);
        },
        V = [u],
        F = [u, f],
        B = [u, s, d],
        J = [g],
        P = function P(n) {
          return !!n[_];
        },
        S = function S(n) {
          return n[_];
        },
        U = function U(n) {
          return delete n[_];
        },
        $ = function $(n, t) {
          if (!P(n)) {
            var e = {};
            t.forEach(function (t) {
              e[t] = n.getAttribute(t);
            }), n[_] = e;
          }
        },
        q = function q(n, t) {
          if (P(n)) {
            var e = S(n);
            t.forEach(function (t) {
              !function (n, t, e) {
                e ? n.setAttribute(t, e) : n.removeAttribute(t);
              }(n, t, e[t]);
            });
          }
        },
        K = function K(n, t, e) {
          N(n, t.class_applied), w(n, p), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
        },
        Q = function Q(n, t, e) {
          N(n, t.class_loading), w(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
        },
        W = function W(n, t, e) {
          e && n.setAttribute(t, e);
        },
        X = function X(n, t) {
          W(n, d, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, u, y(n, t.data_src));
        },
        Y = {
          IMG: function IMG(n, t) {
            D(n, function (n) {
              $(n, B), X(n, t);
            }), $(n, B), X(n, t);
          },
          IFRAME: function IFRAME(n, t) {
            $(n, V), W(n, u, y(n, t.data_src));
          },
          VIDEO: function VIDEO(n, t) {
            H(n, function (n) {
              $(n, V), W(n, u, y(n, t.data_src));
            }), $(n, F), W(n, f, y(n, t.data_poster)), W(n, u, y(n, t.data_src)), n.load();
          },
          OBJECT: function OBJECT(n, t) {
            $(n, J), W(n, g, y(n, t.data_src));
          }
        },
        Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
        nn = function nn(n, t) {
          !t || function (n) {
            return n.loadingCount > 0;
          }(t) || function (n) {
            return n.toLoadCount > 0;
          }(t) || C(n.callback_finish, t);
        },
        tn = function tn(n, t, e) {
          n.addEventListener(t, e), n.llEvLisnrs[t] = e;
        },
        en = function en(n, t, e) {
          n.removeEventListener(t, e);
        },
        on = function on(n) {
          return !!n.llEvLisnrs;
        },
        an = function an(n) {
          if (on(n)) {
            var t = n.llEvLisnrs;
            for (var e in t) {
              var i = t[e];
              en(n, e, i);
            }
            delete n.llEvLisnrs;
          }
        },
        rn = function rn(n, t, e) {
          !function (n) {
            delete n.llTempImage;
          }(n), R(e, -1), function (n) {
            n && (n.toLoadCount -= 1);
          }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
        },
        cn = function cn(n, t, e) {
          var i = z(n) || n;
          on(i) || function (n, t, e) {
            on(n) || (n.llEvLisnrs = {});
            var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
            tn(n, i, t), tn(n, "error", e);
          }(i, function (o) {
            !function (n, t, e, i) {
              var o = O(t);
              rn(t, e, i), N(t, e.class_loaded), w(t, b), C(e.callback_loaded, t, i), o || nn(e, i);
            }(0, n, t, e), an(i);
          }, function (o) {
            !function (n, t, e, i) {
              var o = O(t);
              rn(t, e, i), N(t, e.class_error), w(t, m), C(e.callback_error, t, i), e.restore_on_error && q(t, B), o || nn(e, i);
            }(0, n, t, e), an(i);
          });
        },
        ln = function ln(n, t, e) {
          !function (n) {
            return Z.indexOf(n.tagName) > -1;
          }(n) ? function (n, t, e) {
            !function (n) {
              n.llTempImage = document.createElement("IMG");
            }(n), cn(n, t, e), function (n) {
              P(n) || (n[_] = {
                backgroundImage: n.style.backgroundImage
              });
            }(n), function (n, t, e) {
              var i = y(n, t.data_bg),
                o = y(n, t.data_bg_hidpi),
                r = a && o ? o : i;
              r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(u, r), Q(n, t, e));
            }(n, t, e), function (n, t, e) {
              var i = y(n, t.data_bg_multi),
                o = y(n, t.data_bg_multi_hidpi),
                r = a && o ? o : i;
              r && (n.style.backgroundImage = r, K(n, t, e));
            }(n, t, e), function (n, t, e) {
              var i = y(n, t.data_bg_set);
              if (i) {
                var o = i.split("|"),
                  a = o.map(function (n) {
                    return "image-set(".concat(n, ")");
                  });
                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = o.map(function (n) {
                  return "-webkit-image-set(".concat(n, ")");
                }), n.style.backgroundImage = a.join()), K(n, t, e);
              }
            }(n, t, e);
          }(n, t, e) : function (n, t, e) {
            cn(n, t, e), function (n, t, e) {
              var i = Y[n.tagName];
              i && (i(n, t), Q(n, t, e));
            }(n, t, e);
          }(n, t, e);
        },
        un = function un(n) {
          n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
        },
        sn = function sn(n) {
          D(n, function (n) {
            q(n, B);
          }), q(n, B);
        },
        dn = {
          IMG: sn,
          IFRAME: function IFRAME(n) {
            q(n, V);
          },
          VIDEO: function VIDEO(n) {
            H(n, function (n) {
              q(n, V);
            }), q(n, F), n.load();
          },
          OBJECT: function OBJECT(n) {
            q(n, J);
          }
        },
        fn = function fn(n, t) {
          (function (n) {
            var t = dn[n.tagName];
            t ? t(n) : function (n) {
              if (P(n)) {
                var t = S(n);
                n.style.backgroundImage = t.backgroundImage;
              }
            }(n);
          })(n), function (n, t) {
            L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
          }(n, t), A(n), U(n);
        },
        _n = ["IMG", "IFRAME", "VIDEO"],
        gn = function gn(n) {
          return n.use_native && "loading" in HTMLImageElement.prototype;
        },
        vn = function vn(n, t, e) {
          n.forEach(function (n) {
            return function (n) {
              return n.isIntersecting || n.intersectionRatio > 0;
            }(n) ? function (n, t, e, i) {
              var o = function (n) {
                return x.indexOf(k(n)) >= 0;
              }(n);
              w(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function (n, t, e) {
                t.unobserve_entered && T(n, e);
              }(n, e, i), C(e.callback_enter, n, t, i), o || ln(n, e, i);
            }(n.target, n, t, e) : function (n, t, e, i) {
              L(n) || (N(n, e.class_exited), function (n, t, e, i) {
                e.cancel_on_exit && function (n) {
                  return k(n) === v;
                }(n) && "IMG" === n.tagName && (an(n), function (n) {
                  D(n, function (n) {
                    un(n);
                  }), un(n);
                }(n), sn(n), M(n, e.class_loading), R(i, -1), A(n), C(e.callback_cancel, n, t, i));
              }(n, t, e, i), C(e.callback_exit, n, t, i));
            }(n.target, n, t, e);
          });
        },
        bn = function bn(n) {
          return Array.prototype.slice.call(n);
        },
        pn = function pn(n) {
          return n.container.querySelectorAll(n.elements_selector);
        },
        mn = function mn(n) {
          return function (n) {
            return k(n) === m;
          }(n);
        },
        hn = function hn(n, t) {
          return function (n) {
            return bn(n).filter(L);
          }(n || pn(t));
        },
        En = function En(n, e) {
          var o = c(n);
          this._settings = o, this.loadingCount = 0, function (n, t) {
            i && !gn(n) && (t._observer = new IntersectionObserver(function (e) {
              vn(e, n, t);
            }, function (n) {
              return {
                root: n.container === document ? null : n.container,
                rootMargin: n.thresholds || n.threshold + "px"
              };
            }(n)));
          }(o, this), function (n, e) {
            t && (e._onlineHandler = function () {
              !function (n, t) {
                var e;
                (e = pn(n), bn(e).filter(mn)).forEach(function (t) {
                  M(t, n.class_error), A(t);
                }), t.update();
              }(n, e);
            }, window.addEventListener("online", e._onlineHandler));
          }(o, this), this.update(e);
        };
      return En.prototype = {
        update: function update(n) {
          var t,
            o,
            a = this._settings,
            r = hn(n, a);
          G(this, r.length), !e && i ? gn(a) ? function (n, t, e) {
            n.forEach(function (n) {
              -1 !== _n.indexOf(n.tagName) && function (n, t, e) {
                n.setAttribute("loading", "lazy"), cn(n, t, e), function (n, t) {
                  var e = Y[n.tagName];
                  e && e(n, t);
                }(n, t), w(n, h);
              }(n, t, e);
            }), G(e, 0);
          }(r, a, this) : (o = r, function (n) {
            n.disconnect();
          }(t = this._observer), function (n, t) {
            t.forEach(function (t) {
              n.observe(t);
            });
          }(t, o)) : this.loadAll(r);
        },
        destroy: function destroy() {
          this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), pn(this._settings).forEach(function (n) {
            U(n);
          }), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount;
        },
        loadAll: function loadAll(n) {
          var t = this,
            e = this._settings;
          hn(n, e).forEach(function (n) {
            T(n, t), ln(n, e, t);
          });
        },
        restoreAll: function restoreAll() {
          var n = this._settings;
          pn(n).forEach(function (t) {
            fn(t, n);
          });
        }
      }, En.load = function (n, t) {
        var e = c(t);
        ln(n, e);
      }, En.resetStatus = function (n) {
        A(n);
      }, t && function (n, t) {
        if (t) if (t.length) for (var e, i = 0; e = t[i]; i += 1) l(n, e);else l(n, t);
      }(En, window.lazyLoadOptions), En;
    });
  }, {}]
}, {}, [1]);
//# sourceMappingURL=app.js.map