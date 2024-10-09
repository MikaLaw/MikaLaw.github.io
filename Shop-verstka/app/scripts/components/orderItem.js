var $ = require('jquery');

module.exports = function() {

  $('body').on('click', '.js_orderItem .orderItem__header', function(e) {
    $(this).parents('.js_orderItem').toggleClass('isHidden');
  });
}


    
    