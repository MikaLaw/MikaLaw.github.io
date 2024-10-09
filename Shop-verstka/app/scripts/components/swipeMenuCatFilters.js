var $ = require('jquery');

module.exports = function() {
  $('body').on('click', '.js_mobileCatFilters', function(e) {
    $('#swipeMenuCatFilters').addClass('isActive');
  });
}


    
    