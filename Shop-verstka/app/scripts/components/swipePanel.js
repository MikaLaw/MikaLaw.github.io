'use strict';

module.exports = function () {
  $('.swipePanel').css('display', '');

  $('body').on('click', '.js-openPanel', function (evt) {
    evt.preventDefault();
    var target = $(this).attr('data-target');
    var $targetPanel = $('#' + target);

    if ($(this).hasClass('isActive')) {
      $('.swipePanel').removeClass('isOpen');
      $('.js-openPanel').removeClass('isActive');
      return;
    }

    if (target && $targetPanel.length) {
      $('.swipePanel').removeClass('isOpen');
      $('.js-openPanel').removeClass('isActive');
      $targetPanel.addClass('isOpen');
      $(this).addClass('isActive');
    }
  });
};
