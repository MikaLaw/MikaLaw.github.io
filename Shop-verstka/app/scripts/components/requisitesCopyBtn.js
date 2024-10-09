var $ = require('jquery');

module.exports = function() {

  $('body').on('click', '.js_requisitesCopyBtn', function(e) {

    var copyContent = $(this).parents('.requisites').find('.requisites__content')[0];

    var range = document.createRange();
    window.getSelection().removeAllRanges();  
    range.selectNode(copyContent);  
    window.getSelection().addRange(range);    

    try {  
      var successful = document.execCommand('copy');  
    } catch(err) {  
      alert('Unable to copy');  
    } 

    window.getSelection().removeAllRanges();

    $(this).text('Текст скопирован в буфер обмена');

    setTimeout(() => {
      $(this).text('Скопировать текст');
    }, 2000)

  });

}
