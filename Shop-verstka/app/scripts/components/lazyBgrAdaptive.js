var $ = require('jquery');
var throttle = require('lodash.throttle');

module.exports = function() {
  var goLazyAdaptiveBgr = function() {
    $('.lazyBgrAdaptive').each(function(index, item) {
      if($(document).scrollTop() + $(window).height() + 100  >= $(item).position().top) {
        var w480 = $(item).attr('data-bgr-480');
        var w768 = $(item).attr('data-bgr-768');
        var w992 = $(item).attr('data-bgr-992');
        var w1024 = $(item).attr('data-bgr-1024');
        var w1280 = $(item).attr('data-bgr-1280');
        var w1920 = $(item).attr('data-bgr-1920');

        var windowWidth = window.innerWidth;

        if (windowWidth > 1280 && w1920) {
          $(item).css('background-image', 'url(' + w1920 + ')');
          return;
        }
        if (windowWidth > 1024 && w1280) {
          $(item).css('background-image', 'url(' + w1280 + ')');
          return;
        }
        if (windowWidth > 992 && w1024) {
          $(item).css('background-image', 'url(' + w1024 + ')');
          return;
        }
        if (windowWidth > 768 && w992) {
          $(item).css('background-image', 'url(' + w992 + ')');
          return;
        }
        if (windowWidth > 480 && w768) {
          $(item).css('background-image', 'url(' + w768 + ')');
          return;
        }

        $(item).css('background-image', 'url(' + w480 + ')');
        return;
      }
    })
  }

  goLazyAdaptiveBgr();
  $(document).scroll(throttle(goLazyAdaptiveBgr, 700));
}
