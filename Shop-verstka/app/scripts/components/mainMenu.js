var $ = require('jquery');

module.exports = function() {
  function hoverIn() {
    $(this).addClass('isOpen');
  }

  function hoverOut() {
    $(this).removeClass('isOpen');
  }

  $('.mainMenu__menuList .menuList__item_hasChild').hover(hoverIn, hoverOut);
}
