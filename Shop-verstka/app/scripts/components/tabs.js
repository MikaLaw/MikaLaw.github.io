'use strict';

var $ = require('jquery');

module.exports = function () {
  $(document).delegate('.js__tabs [data-button]', 'click', function(e){
    e.preventDefault();
    var $cotainer = $(this).closest('.js__tabs');
    var index = $(this).data('button');

    $('[data-button]', $cotainer).removeClass('active');
    $('[data-button=' + index + ']', $cotainer).addClass('active');
    $('[data-tab]', $cotainer).removeClass('active');
    $('[data-tab=' + index + ']', $cotainer).addClass('active');
  });
};
