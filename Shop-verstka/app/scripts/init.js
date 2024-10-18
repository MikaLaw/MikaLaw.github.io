'use strict';
var $ = window.$;

let mediaXxs = 320;
let mediaXs = 480;
let mediaSm = 768;
let mediaMd = 1024;
let mediaLg = 1200;
let mediaXl = 1440;
let mediaXxl = 1600;
let mediaXxxl = 1920;

function fileLoad(){
    $('.js-input-file-wrap').each((_, item) => {
        const $wrap = $(item);

        $wrap.on('change', '.js-input-file', (e) => {
            const $input = $(e.target);
            changeMultiFile($input);
        })

        const changeMultiFile = ($input) => {
          const $name = $input.parent().find('.js-input-file-name');
          const $appendInput = $input.parent().clone();
          const inputWithoutPic = $($input).closest('.input-file-with-field').length == 0;

          if ($input.get(0).files.length) {
            if (inputWithoutPic) {
              if ($input.get(0).files[0].type.indexOf('image') > -1) {
                $name.before($('<img src="' + URL.createObjectURL($input.get(0).files[0]) + '" alt="' + $input.get(0).files[0].name + '">'));
              } else {
                $name.before($('<div class="placeholder"></div>'));
              }              
            }

            $input.parent().wrap('<span class="input-file__wrap">').closest('.input-file__wrap').append($('<span class="btn-file-close" data-js-input-file-clear><svg class="icon icon-close" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6647 2.33521C13.2177 1.88826 12.4936 1.88827 12.0466 2.33521L7.99888 6.38167L3.95344 2.33521C3.50866 1.88827 2.78227 1.88827 2.33526 2.33521C1.88825 2.78215 1.88825 3.50678 2.33526 3.95372L6.3807 8L2.33526 12.0463C1.89048 12.4932 1.89048 13.2179 2.33526 13.6648C2.78227 14.1117 3.50866 14.1117 3.95567 13.6648L8.00112 9.61898L12.0466 13.6648C12.4936 14.1117 13.2177 14.1117 13.6647 13.6648C14.1118 13.2179 14.1118 12.4932 13.6647 12.0463L9.6193 8.00046L13.6647 3.95372C14.1118 3.50678 14.1118 2.78215 13.6647 2.33521Z" fill="currentColor"/></svg></span>'))
            $wrap.find('[data-js-input-file-clear]').on('click', (e) => {
                $(e.target).closest('.input-file__wrap').remove()
            });
            $wrap.append($appendInput);
            $appendInput.wrap('<form>').closest('form').get(0).reset();
            $appendInput.unwrap();
            $name.attr('data-name-file',$input.get(0).files[0].name);
            $input.addClass('is-filled')
          }
        }
    })
}
$(document).ready(function () {
  $.fancybox.defaults.toolbar = false;
  $.fancybox.defaults.infobar = false;
  $.fancybox.defaults.arrows = false;
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.backFocus = false;
  $.fancybox.defaults.touch = false;

  $('[data-fancybox]').on('click', function () {
    let paddingRight = $('.awPageWrapper').width() -  $('.page').width()
    $('body').css('--paddingRight', `${paddingRight}px`)
  })

  let optPriceRange = {
    values: [1000, 25000],
  }

  window.notification = {
    $container: $('.js-notification-container'),
    $template: $('.js-notification-template'),
    titleClass: '.js-notification-title',
    textClass: '.js-notification-text',
    productClass: '.js-notification-product',
    productClassTitle: '.notification-product__title',
    productClassCost: '.notification-product__cost',
    productClassStock: '.notification-product__stock',
    productClassImg: '.notification-product__img',
    btnClass: '.js-notification-btn',
    btnCloseClass: '.js-notification-close',
    open: function (options) {
      const $container =  this.$template.parent();
      const $notification = this.$template.clone().removeClass('js-notification-template');
      const $text = $notification.find(this.textClass);
      const $title = $notification.find(this.titleClass);
      const $product = $notification.find(this.productClass);
      const $productTitle = $notification.find(this.productClassTitle);
      const $productCost = $notification.find(this.productClassCost);
      const $productStock = $notification.find(this.productClassStock);
      const $productImg = $notification.find(this.productClassImg);
      const $btn = $notification.find(this.btnClass);
      const $btnSuccess = $notification.find(this.btnSuccessClass);
      const $btnClose = $notification.find(this.btnCloseClass);


      if (options.text && options.text !== '') {
        $text.html(options.text)
      } else {
        $text.remove();
      }

      if (options.title && options.title !== '') {
        $title.html(options.title)
      } else {
        $title.remove();
      }
      if (!options.product) {
        $product.remove();
      } else {
        if (options.product.title && options.product.title !== '') {
          $productTitle.html(options.product.title)
        }
        if (options.product.cost && options.product.cost !== '') {
          $productCost.html(options.product.cost)
        }
        if (options.product.stock && options.product.stock !== '') {
          $productStock.html(options.product.stock)
        }
        if (options.product.img && options.product.img !== '') {
          $productImg.attr('src', options.product.img)
        }
      }
      if (options.btn && options.btn !== '' && options.btnClick) {
        $btn.text(options.btn);
        $btn.on('click', (e) => {
          options.btnClick(e)
          $notification.remove()
        })
      } else {
        $btn.remove();
      }

      if (options.btnSuccess && options.btnSuccess !== '' && options.btnSuccessClick) {
        $btnSuccess.text(options.btnSuccess);
        $btnSuccess.on('click', (e) => {
          options.btnSuccessClick(e)
          $notification.remove()
        })
      } else {
        $btnSuccess.remove();
      }

      if (options.addClassContainer && options.addClassContainer !== '') {
        $container.addClass(options.addClassContainer);
      }
      if (options.addClass && options.addClass !== '') {
        $notification.addClass(options.addClass);
      }
      this.$container.append($notification);

      $btnClose.on('click', () => {
        $notification.remove()
      })
      setTimeout(() => {
          $notification.remove()
      }, options.hideTime? options.hideTime: 5000)
    },
    close: function () {
      const $notification = this.$template.clone().removeClass('js-notification-template');
      $notification.remove()
    }
  }
  $(document).on('click', '.js-add-product', (e) => {
    e.preventDefault();
    notification.open({
      title: 'добавлено в корзину: <span>5</span> <span class="small">шт.<span>',
      product: {
        title: 'Шампунь Антистресс с экстрактом мальвы 250 мл CD СПА',
        cost: '6 750 ₽',
        stock: '2 135,00 ₽',
        img: './img/components/product-card/img-10.jpg',
      }
    })
  })
  $(document).on('click', '.js-remove-product', (e) => {
    e.preventDefault();
    notification.open({
      title: 'Товар удален из корзины',
      product: {
        title: 'Шампунь Антистресс с экстрактом мальвы 250 мл CD СПА',
        cost: '6 750 ₽',
        stock: '2 125,00 ₽',
        img: './img/components/product-card/img-10.jpg',
      },
      btn: 'вернуть в корзину',
      btnClick: () => {}
    })
  })
  $(document).on('click', '.js-add-favorites', (e) => {
    e.preventDefault();
    notification.open({
      title: 'Товар добавлен в избранное',
      product: {
        title: 'Шампунь Антистресс с экстрактом мальвы 250 мл CD СПА',
        cost: '6 750 ₽',
        stock: '2 125,00 ₽',
        img: './img/components/product-card/img-10.jpg',
      }
    })
  })
  $(document).on('click', '.js-remove-favorites', (e) => {
    e.preventDefault();
    notification.open({
      title: 'Товар удален из избранного',
      product: {
        title: 'Шампунь Антистресс с экстрактом мальвы 250 мл CD СПА',
        cost: '6 750 ₽',
        stock: '2 125,00 ₽',
        img: './img/components/product-card/img-10.jpg',
      }
    })
  })
  $(document).on('click', '.js-basket-clear', (e) => {
    e.preventDefault();
    notification.open({
      title: 'Корзина очищена',
      addClassContainer: 'bottom-position',
      addClass: 'backet-clear',
    })
  })
  $(document).on('click', '.js-be-registered', (e) => {
    e.preventDefault();
    notification.open({
      addClass: 'backet-text',
      text: 'Для точного рассчета накопительных скидок нужно войти в <a href="#">Личный кабинет</a>',
    })
  })
  $(document).on('click', '.js-pay-gift', (e) => {
    e.preventDefault();
    notification.open({
      addClass: 'backet-text backet-text_icon',
      text: '<a href="#">Купи стартовый пакет 15/Precions Nature и получи <span>подарок</span></a>',
    })
  })

  /**
  * Order field
  */
  function orderMake() {
    $('.form__checkbox-wrap .checkbox__input[data-attr]').each((_, item) => {
      let $checkbox = $(item);
      let attr = $checkbox.attr('data-attr');
      $checkbox.on('change', function () {
        if ($checkbox.prop('checked')) {
          if (attr === 'post' || attr === 'CDEK') {
            $('.form__row_map').addClass('is-show')
            $('.form__row_address').removeClass('is-show')
          } else if (attr === 'pickup' || attr === 'courier') {
            $('.form__row_address').addClass('is-show')
            $('.form__row_map').removeClass('is-show')
          }
        }
      })
    })

    $('.js-order-trigger .select__input').on('change', function () {
      if ($(this).prop('checked')) {
        $('.js-order-trigger').closest('.form__row').next().addClass('is-show')
      }
    })
    let addressObj = [];
    $('.form__row_address .input__wrap-input input').each((_, item) => {
      let itemObj = {};
      itemObj[$(item).attr('data-attr')] = null
      addressObj.push(itemObj)
      console.log(addressObj, 'addressObj 1')
    })
    $('.form__row_address .select__button-inner').each((_, item) => {
      let itemObj = {};
      itemObj[$(item).attr('data-placeholder')] = null
      addressObj.push(itemObj);
      console.log(addressObj, 'addressObj 2')
    })

    $('.form__row_address input').on('input', function () {
       console.log(addressObj, 'addressObj 3')
        addressObj.map((item) =>{
          for (let key in item) {
            if (key == $(this).attr('data-attr')) {
              if ($(this).val().length > 0) {
                item[key] = $(this).val()
              } else {
                item[key] = null
              }
            };
          }
        })

      makeresult()
    })
    $('.form__row_address .select .select__input').on('change', function () {
      if ($(this).prop('checked')) {
        let dataAttr = $(this).closest('[data-js-form-field]').find('[data-placeholder]').attr('data-placeholder');
        addressObj.map((item) =>{
          for (let key in item) {
            if (key == dataAttr) {
              item[key] = $(this).val()
            };
          }
        })
        makeresult()
      }
    })

    function makeresult() {
      console.log(addressObj, 'addressObj 3')
      let result = addressObj.filter((item) => {
        for (let key in item) {
          return item[key] == null
        }
      })
      if (result.length === 0) {
        $('.form_pay').addClass('is-show')
      } else {
        $('.form_pay').removeClass('is-show')
      }
    }
  }
  orderMake()

  /**
  * Open login modal
  */

  $('.js-registration-modal').on('click', function () {
    $.fancybox.close()
    $.fancybox.open({
      src  : '#registration',
      type : 'inline',
      opts : {
      }
    });
  })

  /**
  * js-phone-verify
  */

  $('.js-phone-verify').find('input').on('input', function (e) {
    if ($(e.target).val().length > 0) {
      $(e.target).closest('.form__item').next().addClass('is-show')
    } else {
      $(e.target).closest('.form__item').next().removeClass('is-show')
    }
  })
  $('.js-code-verify').find('input').on('input', function (e) {
    if ($(e.target).val().length > 0) {
      $(e.target).closest('.form').find('.js-reg-modal-next').attr('disabled', false)
    } else {
      $(e.target).closest('.form').find('.js-reg-modal-next').attr('disabled', true)
    }
  })
  $('.js-reg-modal-next').on('click', function () {
    $.fancybox.close()
      $.fancybox.open({
        src  : '#end-registration',
        type : 'inline',
        opts : {
        }
      });
  })

  /**
  * Поля выбора
  */

  fileLoad()
  /**
  * Показ пароля в инпуте
  */
  $(document).on(
    'click',
    '[data-js-password-input] [class*="__visibility-btn"]',
    function () {
      let $block = $(this).closest('[data-js-password-input]');
      let $input = $block.find('input');
      if ($input.attr('type') == 'password') {
        $input.prop('type', 'text');
      } else {
        $input.prop('type', 'password');
      }
    }
  );

  /**
  * Collapse
  */

  $('[data-drop-next]').on('click', function (e) {
    $(this).toggleClass('is-open');
    $(this).next().slideToggle(200);
  });
  $('[data-drop-next-mobile]').on('click', function (e) {
    if ($(window).width() < 1024) {
      if ($(this).closest('.form').length !== 0) {
        $(this).closest('.form').toggleClass('is-open');
      }
        $(this).toggleClass('is-open');
        $(this).next().slideToggle(200);
    }
  });


  /**
  * Tabs
  */
  $(document).delegate('[data-js-tabs] [data-button]', 'click', function (e) {
    e.preventDefault();

    let $block = $(this).closest('[data-js-tabs]');
    let index = $(this).data('button');

    $('[data-button]', $block).parent().removeClass('is-active');
    $('[data-button=' + index + ']', $block)
      .parent()
      .addClass('is-active');
    $('[data-tab]', $block).removeClass('is-active');
    $('[data-tab=' + index + ']', $block).addClass('is-active');

    let $sliders = $('[data-tab=' + index + ']').find('.slick-slider');
    if ($sliders.length) $sliders.slick('setPosition');
  });


  $('.js-list-trigger').on('click', function () {
    let $btn = $(this);
    $btn.closest('.js-list').toggleClass('is-show');
    if ($btn.text().trim() == 'весь список') {
      $btn.text('Скрыть список')
    } else {
      $btn.text('весь список')
    }
  })

  /**
  *  Раскрытие таблицы в секции моей карты
  */  

  $('[data-js-discount-more]').on('click', function (e) { 
    if ($(window).width() < 1280) {
      let block = $(this).closest('.discount-system-card').find('.discount-system-card__body');
      $(this).toggleClass('is-open');
      console.log($(this).text().trim())
      if ($(this).text().trim() == 'Подробнее') {
        $(this).text('Свернуть')
      } else {
        $(this).text('Подробнее')
      }
      $(block).slideToggle(200);
    }
  });
  /**
  * Аккордеон
  */
  $(document).on('click', '.js-drop-next', function (e) {
    $(this).toggleClass('is-open');
    $(this).next().slideToggle(300);
  });

  /**
  * Аккордеон меню подвала
  */
  $(document).on('click', '.js-drop-footer-menu', function (e) {
    if ($(window).outerWidth() < 768) {
      $(this).toggleClass('is-open');
      $(this).next().slideToggle(300);
    }
  });

  /**
  * Initiate priorityNav
  */

  if ($('.tags_priority .tags__list').length !== 0 && ($(window).width() >= 1024) ) {
    priorityPlus(document.querySelector('.tags_priority .tags__list'), {
      innerToggleTemplate: '+ Показать больше',
      classNames: {
        container: ['p-plus-container', 'p-plus-container_tags']
      }
    });

  }
  function morph(int, array) {
    return (array = array || ['подборка', 'подборки', 'подборок']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
  }

  if ($('.tags_main .tags__list').length !== 0 && ($(window).width() >= 768)) {
    const inst = priorityPlus(document.querySelector('.tags_main .tags__list'), {
      innerToggleTemplate: ({ toggleCount, totalCount }) => `
        + ещё ${toggleCount && toggleCount !== totalCount ? ` ${toggleCount} ` + morph(toggleCount) : ''}
      `,
       classNames: {
        container: ['p-plus-container', 'p-plus-container_tags']
      }
    });


  }
  if ($(window).outerWidth() < 1024) {
    $('.awPageWrapper').scroll(function (e) {
      if ($('.awPageWrapper').scrollTop() > $('.js-product-filters').offset().top) {
        let filtersHeight = $('.js-product-filters:not(.filters-modify)').outerHeight(true);
        if (filtersHeight) {
          $('.js-product-filters').parent().css('padding-top', filtersHeight + 'px')
        }

        $('.js-product-filters').addClass('filters-modify');
      } else {
        $('.js-product-filters').parent().css('padding-top', '0px')
        $('.js-product-filters').removeClass('filters-modify');
      }
    });
  }
  function filterParams(selector) {

    let userFilters = [];
    let userFiltersAdditional = []
    let $input = $(selector).find('input');
    let $selectPlacehilder = $(selector).find('[data-display]');
    let $trigerBtn = $(selector).find('[data-data-js-tabselect-range]');
    let $btnSubmit = $('[data-btn-submit]');
    let $btnResetMobile = $('.mobile-filter [data-btn-reset]');
    let inst;
    if ($(window).outerWidth() >= 1024) {
      inst = priorityPlus(document.querySelector('.product-params__list'), { innerToggleTemplate: 'Ещё' });
    }

    function containsId(arr, elem) {
      return !!arr.find((i) => i.id === elem);
    }
    function containsText(arr, elem) {
      return !!arr.find((i) => i.text === elem);
    }
    function deleteRangeVal(btnId) {
      let $btnRange = $('[data-data-js-tabselect-range]');
      if (btnId) {
        $btnRange = $('[data-data-js-tabselect-range][data-id=' + btnId + ']');
      }
      let $slider = $btnRange.closest('[data-data-js-tabselect-range-wrap]').find('.slider-range');
      let $leftSlider = $slider.next().find('[data-data-js-tabselect-range-left]')
      let $rightSlider = $slider.next().find('[data-data-js-tabselect-range-right]')
      let $selectPlacehilder = $btnRange.closest('[data-data-js-tabselect]').find('[data-display]');
      $selectPlacehilder.text($selectPlacehilder.attr('data-placeholder')).addClass('placeholder').removeClass('is-multiple')
      $leftSlider.val(optPriceRange.values[0]);
      $rightSlider.val(optPriceRange.values[1]);
      $slider.slider("values", 0, optPriceRange.values[0]);
      $slider.slider("values", 1, optPriceRange.values[1]);
    }
    function deleteRadioVal(input) {
      $(input).prop("checked", false);
      let $selectPlacehilder = $(item).closest('[data-data-js-tabselect]').find('[data-display]');
      $selectPlacehilder.text($selectPlacehilder.attr('data-placeholder')).addClass('placeholder').removeClass('is-multiple')
    }
    function createTag(array) {
      let usersArr = array;
      if ($(window).outerWidth() >= 1024) {
        inst.destroy();
      }
      $('.product-params__item').remove();
      usersArr.forEach((item) => {
        let $param = $('<li class="product-params__item">' +
        '<div class="product-params__param">' + item.text +
        '<button class="product-params__btn" data-id=' + item.id + '></div>' +
          '</li>')
        $('.product-params__list').prepend($param);
      })
      if ($(window).outerWidth() >= 1024) {
        inst = priorityPlus(document.querySelector('.product-params__list'), { innerToggleTemplate: 'Ещё' });
      }
      if (usersArr.length !== 0) {
        $('.product-params').addClass('is-show')
      } else {
         $('.product-params').removeClass('is-show')
      }

	  if(typeof window.updateFilterParamsListWith === "function")
	  {
		  window.updateFilterParamsListWith();
	  }

      let $delBtn = $('.js-product-filters').find('.product-params__btn');
      let $btnReset = $('[data-btn-reset]');

      $delBtn.on('click', function () {
        let btnId = $(this).attr('data-id');
        userFilters.forEach((item) => {
          if (btnId === item.id) {
            if (item.type === 'range') {
              deleteRangeVal(btnId)
            }
          }
        })
        userFilters = userFilters.filter((item) => item.id !== btnId);
        $input.each((_, item) => {
          let inputId = $(item).attr('data-id');
          let inputType = $(item).attr('type');
          if (inputId == btnId) {
            if (inputType === 'checkbox') {
              $(item).trigger("click");
            }
            if (inputType === 'radio') {
              deleteRadioVal(item)
            }
          }
        })
        createTag(userFilters);
      })
      $btnReset.on('click', () => {
        $('.product-params').removeClass('is-show')
        if ($(window).outerWidth() >= 1024) {
          inst.destroy();
        }
        $('.product-params__item').remove();
        if ($(window).outerWidth() >= 1024) {
          inst = priorityPlus(document.querySelector('.product-params__list'), { innerToggleTemplate: 'Ещё' });
        }
        userFilters = [];
        $input.prop("checked", false);
        $input.next().removeClass('is-active')
        $selectPlacehilder.each((_, select) => {
          $(select).text($(select).attr('data-placeholder')).addClass('placeholder').removeClass('is-multiple')
        })
        deleteRangeVal()

      })
    }
    if ($(window).outerWidth() >= 1024){
      $input.on('change', function () {
        let id = $(this).attr('data-id');
        let text = $(this).next().text().trim();
        let type = $(this).prop('type');
        let checked = $(this).prop('checked');
        let inputInfo = {
          id: id,
          text: text,
          checked: checked,
          type: type
        }
        if (checked) {
          if (containsId(userFilters, id)) {
            userFilters.map((item) => {
              if (item.id == id) {
                item.text = text
              }
            })
          } else {
            userFilters.push(inputInfo)
          }

        } else {
          userFilters = userFilters.filter((item) => item.id !== id)
        }
        createTag(userFilters)
      })
      $trigerBtn.on('click', function () {
        let id = $(this).attr('data-id');
        let minVal = $(this).parent().find('[data-data-js-tabselect-range-left]').val();
        let maxVal = $(this).parent().find('[data-data-js-tabselect-range-right]').val();
        let text = minVal + '-' + maxVal;
        let rangeInfo = {
          id: id,
          text: text,
          type: 'range'
        }
        if (!containsText(userFilters, text)) {
          userFilters.push(rangeInfo)
        }
        createTag(userFilters)
      })
    } else {

      $trigerBtn.on('click', function () {
        let id = $(this).attr('data-id');
        let minVal = $(this).parent().find('[data-data-js-tabselect-range-left]').val();
        let maxVal = $(this).parent().find('[data-data-js-tabselect-range-right]').val();
        let text = minVal + '-' + maxVal;
        let rangeInfo = {
          id: id,
          text: text,
          type: 'range'
        }
        if (!containsText(userFiltersAdditional, text)) {
          userFiltersAdditional.push(rangeInfo)
        }
      })
      $btnSubmit.on('click', function () {
        userFilters = [...userFiltersAdditional];
        $input.each((_, item) => {
          let id = $(item).attr('data-id');
          let text = $(item).next().text().trim();
          let type = $(item).prop('type');
          let inputInfo = {
            id: id,
            text: text,
            type: type
          }
          if ($(item).prop("checked")) {
            userFilters.push(inputInfo)
          }
        })
        createTag(userFilters);

      })

      $(selector).find('[data-dsdd]').on('click', function (e) {
        if (!($(e.target).hasClass('btn-round-close'))) {
          $('.mobile-filter__head').toggleClass('is-hidden');
          $btnSubmit.toggleClass('is-hidden')
          $(this).closest('.form__item').toggleClass('is-open').siblings().toggleClass('is-hidden')
        }
      })

      $btnResetMobile.on('click', function () {
        userFilters = [];
        userFiltersAdditional = [];
        $input.prop("checked", false);
        $input.next().removeClass('is-active')
        $selectPlacehilder.each((_, select) => {
          $(select).text($(select).attr('data-placeholder')).addClass('placeholder').removeClass('is-multiple')
        })
        deleteRangeVal()
      })

    }

  }

	window.updateFilterParamsListWith = function() {
		if($(window).outerWidth() < 1024) {
			let summ = 0;
			$('.product-params__item').each((_, item) => {
				summ += $(item).width()
			})
			$('.product-params__list').css('min-width', (summ / 2) + 'px');
		}
	}

  if ($(window).outerWidth() >= 1024) {
    if ($('.js-product-filters').length !==0 ) {
      filterParams('.form_filter')
    }
  } else {

    if ($('.js-product-filters').length !== 0) {
      filterParams('.form_filter-mobile')
    }
  }



  /**
  * Переключение между лейблами
  */
  $('.data-js-tabs-active').each((_, item) => {
    let $item = $(item);
    $item.on('click', (e) => {
      $(e.target).addClass('is-active').siblings().removeClass('is-active')
    })
  })



  /**
  * Ползунок выбора
  */
  function RangeToSelect() {
    let $lRange = $(".amount-left");
    let $rRange = $(".amount-right");
    let $slider = $(".slider-range");
    let opt = optPriceRange

    $slider.slider({
      min: 0,
      max: 50000,
      ...opt,
      range: true,
      animate: "fast",
      slide: function (event, ui) {
        $lRange.val(ui.values[0]);
        $rRange.val(ui.values[1]);
      }
    });

    $lRange.val($slider.slider("values", 0));
    $rRange.val($slider.slider("values", 1));
    $slider.parent().find("input").keydown(function () {
      var input_left = $lRange.val().replace(/[^0-9]/g, ''),
        opt_left = $slider.slider("option", "min"),
        where_right = $slider.slider("values", 1),
        input_right = $rRange.val().replace(/[^0-9]/g, ''),
        opt_right = $slider.slider("option", "max"),
        where_left = $slider.slider("values", 0);

      if (!(input_left > where_right || input_right < where_left)) {

        if (input_left < opt_left) {
          input_left = opt_left;
        }
        if (input_left == "") {
          input_left = 0;
        }
        if (input_right > opt_right) {
          input_right = opt_right;
        }
        if (input_right == "") {
          input_right = 0;
        }
        $lRange.val(input_left);
        $rRange.val(input_right);
        if (input_left != where_left) {
          $slider.slider("values", 0, input_left);
        }
        if (input_right != where_right) {
          $slider.slider("values", 1, input_right);
        }
      }
    })

  };

  RangeToSelect();



 /**
  * Открытие мобильного меню
  */
  function toggleOpenClose() {
    let windowWidth = $(window).width();
    let innerWindowWidth = document.body.clientWidth;
    if ($(window).outerWidth() >= 1024) {

      $('[data-modal="catalog"]').each((_, item) => {
        const $menu = $(item);
        const $toggleBtn = $('[data-open="catalog"]');
        let windowWidth = $(window).width();
        let innerWindowWidth = document.body.clientWidth;
        let deltaWindoWidth = windowWidth - innerWindowWidth


        const openCatalog = (e) => {
          if (e) e.preventDefault();
          $menu.addClass('is-open');
          $('body').addClass('is-hidden');
          $('.awPageWrapper').css('padding-right', deltaWindoWidth + 'px');
          if ($('.header_main')) {
            $('.header_main').css('padding-right', deltaWindoWidth + 'px')
          }
          $toggleBtn.addClass('is-show');
        }

        const closeCatalog = (e) => {
          if (e) e.preventDefault();
          $menu.removeClass('is-open');
          $('body').removeClass('is-hidden');
          $('.awPageWrapper').css('padding-right', '0');
          if ($('.header_main')) {
            $('.header_main').css('padding-right', '0')
          }
          $toggleBtn.removeClass('is-show');

          $menu.find('.js-item-menu-catalog').removeClass('is-open');
          $menu.find('.js-menu-catalog-section').removeClass('is-open');
          $menu.find('.js-menu-dropdown-open').removeClass('is-open');
        }

        $toggleBtn.on('click', (e) => {

          e.preventDefault();
          $menu.hasClass('is-open') ? closeCatalog() : openCatalog();
        })

      })

      $('[data-modal="catalog"]').each((_, item) => {
        const $menu = $(item);
        const $section = $menu.find('.js-menu-catalog-section');
        const openSubmenu = ($itemMenu) => {
          const currentStep = $itemMenu.parents('.js-menu-catalog-section').index();
          const step = currentStep + 1;
          const $submenu = $itemMenu.siblings('.js-menu-dropdown-active');
          const $chooseSection = $section.eq(step);

          if (!$submenu.length) { // если нет подменю, то закрываем ненужную колонку.
            $section.each((index, item) => $(item).toggleClass('is-open', index < step));
            return;
          }

          // открываем колонки
          $section.each((index, item) => {
            $(item).toggleClass('is-open', index <= step)
          })

          $chooseSection
            .find('> .js-menu-dropdown-active')
            .remove()
            .end()
            .prepend($submenu.clone());
          /*$($chooseSection).find(' > .menu-catalog__submenu-wrap').mCustomScrollbar({
              axis: 'y',
              scrollInertia: 30,
              contentTouchScroll: 30,
              documentTouchScroll: false,
          });*/
        }

        $section.on('mouseenter', '.js-item-menu-catalog', (e) => {
          const $itemMenu = $(e.currentTarget);
          $itemMenu.addClass('is-open').siblings().removeClass('is-open')
          $itemMenu.addClass('is-open').parent().siblings().find('.js-item-menu-catalog').removeClass('is-open')
          openSubmenu($itemMenu);
        })

      })
    } else {
      $('body').scroll(function (e) {
        if ($('body').scrollTop() > 1) {
          $('.header_main').addClass('header-modify');
        } else {
          $('.header_main').removeClass('header-modify');
        }
      });



      $('.js-menu-dropdown-open').on('click', (e) => {
        e.preventDefault();
        const $btn = $(e.currentTarget);
        const $parent = $btn.closest('.js-menu-dropdown');
        const $dropdown = $parent.children('.js-menu-dropdown-active');

        if ($parent.hasClass('is-open')) {
          $parent.removeClass('is-open');
          $dropdown.animate({
            height: 0,
          }, 300);
        } else {
          $parent.addClass('is-open');
          $dropdown.animate({
            height: $dropdown.find('.menu-catalog__submenu').outerHeight()
          }, 300, () => {
            $dropdown.addClass('is-open').height('auto');
          })
        }
      })
    }


    function closeDropdownMenu($selector) {
      let $dropDown = $selector.find('.js-menu-dropdown');
      let $menuItem = $selector.find('.menu-list__item');
      $menuItem.removeClass('is-open').removeClass('is-hide')

      $dropDown.each((_, dropDown) => {
        if ($(dropDown).hasClass('is-open')) {
          $(dropDown).removeClass('is-open')
          $dropDown.find('.js-menu-dropdown-active').removeAttr('style')
        }
      })
    }
    function dataClose(modal) {
      modal.removeClass('is-open');
      $('body').removeClass('is-hidden');
      if ($(window).outerWidth() >= 1024) {
        $('.awPageWrapper').css('padding-right', '0');
        if ($('.header_main')) {
          $('.header_main').css('padding-right', '0')
        }
      }
      if (modal.find('.js-menu-dropdown-open')) {
        closeDropdownMenu(modal)
      }
    }
    $(document).on('click', '[data-open]', function (e) {
      let modalAttr = $(this).attr('data-open');
      let $modal = $('[data-modal=' + modalAttr + ']');
      if (!(modalAttr === "catalog")) {
        dataOpen($modal)

      } else if ((modalAttr === "catalog") && $(window).outerWidth() < 1024) {
        dataOpen($modal);

      }
      function dataOpen(modal) {
        let $modal = modal;
        if ($(window).outerWidth() >= 1024) {
          $('.awPageWrapper').css('padding-right', (windowWidth - innerWindowWidth) + 'px');
          if ($('.header_main')) {
            $('.header_main').css('padding-right', (windowWidth - innerWindowWidth) + 'px')
          }
        }
        if ($modal.find('.js-menu-dropdown-open')) {
          if ($modal.hasClass('is-open')) {
            closeDropdownMenu($modal)
          }
        }
        $modal.toggleClass('is-open');
        $('[data-modal]').not('[data-modal=' + modalAttr + ']').removeClass('is-open');
        let $modalCount = $('[data-modal]').filter((i, item) => {
          if ($(item).hasClass('is-open')) return $(item)
        })
        if ($modalCount.length === 0) {
          $('body').removeClass('is-hidden');
        } else {
          $('body').addClass('is-hidden');
        }
        $(document).on('click', function (e) {
          let $modal = $('.is-open[data-modal]');
          let $child = $modal.children();
          if ($modal && $(e.target).closest($child).length == 0 && $(e.target).closest($('[data-open]')).length == 0 && !($(e.target).hasClass('fancybox-slide')) && $(e.target).closest('.fancybox-slide').length === 0) {
            dataClose($modal);
          }
        })
      }

    })

    $(document).on('click', '[data-close]', function (e) {
      let modalAttr = $(this).attr('data-close');
      let $modal = $('[data-modal=' + modalAttr + ']')

      if (!(modalAttr === "catalog")) {
        dataClose($modal);
      } else if ((modalAttr === "catalog") && $(window).outerWidth() < 1024) {
        dataClose($modal)
      }
    })
  }
  toggleOpenClose()
  /**
  * Input выбора количества
  */
  $(document).on('click', '[data-input-counter] [data-input-counter-button]', (e) => {
    e.preventDefault();
    const changed = +$(e.currentTarget).attr('data-sc-change');
    const $item = $(e.currentTarget).parent().parent();
    $item.removeClass('is-error')
    const $input = $item.find('input');
    let val = +$input.val() + changed;
    const min = +$item.attr('data-min').replace(/\s/g, '');
    const max = +$item.attr('data-max').replace(/\s/g, '');

    if (max && max < val) {
      $item.addClass('is-error');
    }
    if (val < min) {
      $input.val(+$item.attr('data-min'))
    }
    else {
      $input.val(val);
    }
  })

  $(document).on('keydown', '[data-input-counter] input', (e) => {
    if (['+', '-', 'e', '.', ','].includes(e.key)) {
      return false;
    }
  })

  $(document).on('input', '[data-input-counter] input', (e) => {
    const $input = $(e.target);
    const $item = $input.parent().parent();
    $item.removeClass('is-error');
    let value = $input.val();
    if (+$item.attr('data-min').replace(/\s/g, '') > value) {
      value = $input.attr('data-min');
    }
    if (+$item.attr('data-max').replace(/\s/g, '') < value) {
      $item.addClass('is-error');
    }
    $input.val(value);
  })


  $(document).on('click', '.js-row-input-counter[data-input-counter] [data-input-counter-button]', (e) => {
    e.preventDefault();
    let $backet = $(e.currentTarget).closest('.product-row__control-container').find('.js-row-backet');
    $backet.on('click', function () {
      let val = $(e.currentTarget).parent().find('[data-input-counter-input]').val();
      if (val && val != 0) {
        $backet.addClass('is-full');
      } else {
        $backet.removeClass('is-full');
      }
    })
  })

  $('.js-info-backet:not(.disabled)').on('click', function (e) {
    let $backet = $(this);
    let val = $(e.currentTarget).parent().find('[data-input-counter-input]').val();
    if (val && val != 0) {
      $backet.addClass('is-full');
    } else {
      $backet.removeClass('is-full');
    }


    $(document).on('click', '.js-info-input-counter [data-input-counter-button]', (e) => {
      e.preventDefault();
      const $inputBlock = $(e.currentTarget).parent().parent();
      const $item = $(e.currentTarget).parent();
      const $input = $item.find('input');
      const $basketBlock = $item.closest('.product__control-container');
      const $basketCart = $basketBlock.find('.js-info-backet');

      let val = +$input.val();

      if (val == 0) {
        $basketCart.removeClass('is-full');
      }
     })
  })

  /**
  * Раскладывание мобильного меню каталога
  */
  $('.menu-list_mobile').on('click', '.menu-list__link', function (e) {
    if ($(window).outerWidth() < 1024) {
      let $item = $(e.currentTarget).closest('.menu-list__item');
      let $phone = $('.mobile-menu__contact');
      if ($item.find('.menu-list__submenu').length !== 0) {
        if ($item.hasClass('is-open')) {
          $item.removeClass('is-open').siblings().removeClass('is-hide');
          $phone.removeClass('is-hide');

        } else {
          $item.addClass('is-open').siblings().addClass('is-hide')
          $phone.addClass('is-hide')
        }

      }
    }
  })


  /**
  * Галлерея фото
  */
  $('[data-fancybox="gallery"]').fancybox({
        infobar: false,
        toolbar: false,
        autoFocus: false,
        backFocus: false,
        touch: false,
        baseTpl:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-inner">' +
        '<div class="fancybox-stage"></div>' +
        '</div>' +
        '</div>',

        afterLoad: function (fb, item) {
          item.$content.remove('.fb-caption');
          item.$content.children().wrap('<div class="modal__body"></div>');
          item.$content.append('<div class="fancybox-navigation"><button data-fancybox-prev class="fancybox-button--arrow_left" title="{{PREV}}"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.37878 16.3305L0.271697 8.35701C2.30511 6.36275 6.34554 2.37756 8.3786 0.383301L9.40168 1.37317C7.57245 3.16673 5.15306 5.55676 3.01811 7.65326L16.2188 7.65326L16.2187 9.06103L3.01811 9.06103L9.4019 15.3302L8.37848 16.3309L8.37878 16.3305Z" fill="#2A1F15"/></svg></button><button data-fancybox-next class="fancybox-button--arrow_right" title="{{NEXT}}"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.62122 16.3305L16.7283 8.35701C14.6949 6.36275 10.6545 2.37756 8.6214 0.383301L7.59832 1.37317C9.42755 3.16673 11.8469 5.55676 13.9819 7.65326L0.78125 7.65326L0.781251 9.06103L13.9819 9.06103L7.5981 15.3302L8.62152 16.3309L8.62122 16.3305Z" fill="#2A1F15"/></svg></button></div>')
          item.$content.append('<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="Close"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg></button>')
          $(item.$content).addClass('modal');
        }

  });
  
  /**
  * Модальное окно с лоадером для расчета скидок
  */
  $('.js-discount-preloader').on('click', function () {
    $.fancybox.open({
      src  : '#discount-preloader',
      type: 'inline',
      touch: false,
      opts: {
        smallBtn: false, 
        clickContent: false,
        clickSlide: false,
        clickOutside: false,
        dblclickContent: false,
        dblclickSlide: false,
        dblclickOutside: false
      }
    });
    //при закрытии использовать $.fancybox.close() , setTimeout для примера
    setTimeout(() => {
      $.fancybox.close()
    }, 1500)
  })

  

  /**
  * Слайдеры
  */
  function sliderLazyLoad(slider) {
    slider.on('afterChange', function () {
      if (typeof window.lazyloadInited === 'object' && typeof window.lazyloadInited.loadAll === 'function') {
        window.lazyloadInited.loadAll()
      }
    })
  }
  $('[data-product-slider ]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');
    let $dots = $block.find('[class*="-dots"]');

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: true,
      prevArrow: $prev,
      nextArrow: $next,
      appendDots: $dots,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 480 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
          },
        },
        {
          breakpoint: 1440 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
          },
        },
      ],
    });
    sliderLazyLoad($init)
  });
  $('[data-product-main-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: false,
      prevArrow: $prev,
      nextArrow: $next,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 480 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth:true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
          },
        },
        {
          breakpoint: 1024 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
          },
        },
        {
          breakpoint: 1440 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
          },
        },
      ],
    });
    sliderLazyLoad($init)
  });
  $('[data-brend-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $dots = $block.find('[class*="-dots"]');

    if ($(window).outerWidth() < 768) {
      $init.slick({
        infinite: false,
        sliderToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        arrows: false,
        dots: true,
        appendDots: $dots,
        rows: 4,
        responsive: [
          {
            breakpoint: 320 - 1,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 4,
            },
          },
          {
            breakpoint: 480 - 1,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              rows: 4,
            },
          },
        ]
      })
      sliderLazyLoad($init)
    }
  })
  $('[data-stock-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');

      $init.slick({
        infinite: false,
        sliderToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 320 - 1,
            settings: {
              variableWidth: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768 - 1,
            settings: {
              variableWidth: true,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024 - 1,
            settings: {
              variableWidth: false,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1440 - 1,
            settings: {
              variableWidth: false,
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
        ]
      })
    sliderLazyLoad($init)

  })
  $('[data-article-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');
    let $dots = $block.find('[class*="-dots"]');

    let showDots = false;
    if ($init.children().length > 1) {
      showDots = true;
    }

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: showDots,
      prevArrow: $prev,
      nextArrow: $next,
      appendDots: $dots,

    });
    sliderLazyLoad($init)
  });
  $('[data-article-new-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');
    let $dots = $block.find('[class*="-dots"]');

    $init.slick({
      infinite: true,
      sliderToShow: 4,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: true,
      prevArrow: $prev,
      nextArrow: $next,
      appendDots: $dots,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 480 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth:true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
          },
        },
        {
          breakpoint: 1024 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
          },
        },
        {
          breakpoint: 1440 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
          },
        },
      ],
    });
    sliderLazyLoad($init)
  });
  $('[data-course-page-slider]').each(function () {
    $('.slider-preview__list-content').slick({
        infinite: true,
        sliderToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        arrows: false,
        dots: false,
    });
    $('.slider-preview__list-nav').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable:true,
        asNavFor: '.slider-preview__list-content',
        focusOnSelect: true,
        arrows: false,
        dots: false,
    });

    $(".slider-preview__list-nav, .slider-preview__list-content").each(function() {
        this.slick.getSlideCount = function() {
            var _ = this,
                slidesTraversed, swipedSlide, centerOffset;

            centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

          if (_.options.swipeToSlide === true) {

                _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                    var offsetPoint = slide.offsetLeft,
                        outerSize = $(slide).outerWidth();

                    if(_.options.vertical === true) {
                        offsetPoint = slide.offsetTop;
                        outerSize = $(slide).outerHeight();
                    }
                    if (offsetPoint - centerOffset + (outerSize / 2) > (_.swipeLeft * -1)) {
                        swipedSlide = slide;
                        return false;
                    }
                });
                slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

                return slidesTraversed;
            } else {
                return _.options.slidesToScroll;
            }

        };

          this.slick.getNavigableIndexes = function() {

              var _ = this,
                  breakPoint = 0,
                  counter = 0,
                  indexes = [],
                  max;

              if (_.options.infinite === false) {
                  max = _.slideCount;
              } else {
                  breakPoint = _.options.slideCount * -1;
                  counter = _.options.slideCount * -1;
                  max = _.slideCount * 2;
              }

              while (breakPoint < max) {
                  indexes.push(breakPoint);
                  breakPoint = counter + _.options.slidesToScroll;
                  counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
              }

              return indexes;

          };
    });
  });
  $('[data-main-news-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: false,
      prevArrow: $prev,
      nextArrow: $next,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 480 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
          },
        },

      ],
    });

    sliderLazyLoad($init)
  });
  $('[data-main-data-stock-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 480 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth:true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },

      ],
    });

    sliderLazyLoad($init)
  });
  $('[data-rebate-system-slider]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');

    $init.slick({
      infinite: false,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 320 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 768 - 1,
          settings: {
            variableWidth: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },
        {
          breakpoint: 1024 - 1,
          settings: {
            variableWidth:false,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          },
        },

      ],
    });

    sliderLazyLoad($init)
  });
  
  window.initPurchasSlider = function(){
	  $('[data-purchas-slider]').each(function () {
		  let $block = $(this);
		  let $init = $block.find('[class*="__list"]');

		  $init.slick({
			  infinite: false,
			  sliderToShow: 4,
			  slidesToScroll: 4,
			  mobileFirst: true,
			  arrows: false,
			  dots: false,
			  responsive: [
				  {
					  breakpoint: 320 - 1,
					  settings: {
						  variableWidth: true,
						  slidesToShow: 3,
						  slidesToScroll: 1,
						  arrows: false,
						  dots: false,
					  },
				  },
				  {
					  breakpoint: 480 - 1,
					  settings: {
						  variableWidth: true,
						  slidesToShow: 4,
						  slidesToScroll: 1,
						  arrows: false,
						  dots: false,
					  },
				  },
			  ],
		  });
		  sliderLazyLoad($init)
	  });
  }
  window.initPurchasSlider();

  $('[data-main-top-banner]').each(function () {
    let $block = $(this);
    let $init = $block.find('[class*="__list"]');
    let $prev = $block.find('[class*="_prev"]');
    let $next = $block.find('[class*="_next"]');
    let $dots = $block.find('[class*="-dots"]');

    $init.slick({
      infinite: true,
      sliderToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      arrows: true,
      dots: true,
      prevArrow: $prev,
      nextArrow: $next,
      appendDots: $dots,

    });
    sliderLazyLoad($init)
  });


  /**
  * Обрезка текста
  */
  let seoOpt = {
    collapsedHeight: $(window).outerWidth() >= 1280 ? 100 : $(window).outerWidth() >= 768 ? 70 : $(window).outerWidth() >= 480 ? 121: 221,
  }
  let brandsOpt = {
    collapsedHeight: $(window).outerWidth() >= 1024 ? 69 : $(window).outerWidth() >= 768 ? 86 : $(window).outerWidth() >= 480 ? 120: 154,
  }

  $('.block__text_seo').readmore({
    moreLink: '<a href="#" class="read-more">Подробнее</a>',
    lessLink: '<a href="#" class="read-less">Скрыть</a>',
    heightMargin: 16,
    ...seoOpt
  });
  $('.brand-goods-banner__text').readmore({
    moreLink: '<a href="#" class="read-more">Подробнее</a>',
    lessLink: '<a href="#" class="read-less">Скрыть</a>',
    heightMargin: 16,
    ...brandsOpt
  });


  /**
   * Tooltip
   */

  function hideTooltip() {
    const $tooltip = this;
    if ($tooltip) {
      $tooltip.animate({
        opacity: 0
      }, 300, () => {
        $tooltip.remove();
      })
    }
  }

  $(document).on('mouseenter', '[data-tooltip]', (e) => {
    const $target = $(e.currentTarget);
    const text = $target.data('tooltip');
    const $drop = $(`<div class="tooltip">${text}</div>`);
    const positionTarget = $target.offset();

    const positionDrop = {
      top: positionTarget.top - $drop.outerHeight() - 10 - $(window).scrollTop(),
      left: (positionTarget.left + $target.outerWidth() / 2) - ($drop.outerWidth() / 2),
    }

    if ((positionDrop.left + $drop.outerWidth()) > $(window).width()) {
      positionDrop.left = $(window).width() - $drop.outerWidth();
    }

    if (positionDrop.left < 0) {
      positionDrop.left = 0;
    }
    $('body').append($drop)
    $drop.data('target', $target);
    $drop.css({
      top: positionDrop.top,
      left: positionDrop.left,
      opacity: 0
    })

    $drop.animate({
      opacity: 1
    }, 300)

    $target.one('mouseleave', hideTooltip.bind($drop))
  })

  $('.awPageWrapper').scroll(() => {
    const $drops = $('.tooltip')
    $drops.each((_, item) => {
      const $target = $(item).data('target');
      $target.trigger('mouseleave')
    })
  })

});

