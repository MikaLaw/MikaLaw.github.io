var $ = require('jquery');

module.exports = function() {

  $('body').on('click', '.js_showVacancieInfo', function(e) {
    var vacancieCard = $(this).parents('.vacancieCard');
    vacancieCard.addClass('isOpen');
    vacancieCard.find('.vacancieCard__footer').hide();
  });

}
