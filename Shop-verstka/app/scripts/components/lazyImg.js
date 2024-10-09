'use strict';

var $ = require('jquery');
var throttle = require('lodash.throttle');

module.exports = function() {

  $(document).ready(function() {

    function lazyImgItemSample() {};
    lazyImgItemSample.prototype = {
      info: function() {
        console.log('status: ' + this.readyStatus + ' url: ' + this.imgUrl + ' w/h: ' + this.tempImg.naturalWidth + '/' + this.tempImg.naturalHeight + ' loadTimeSec: ' + this.loadTimeSec);
      }
    }

    var lazyloadImg = function() {
      var self = this;
      var selfImg = self.imgUrl;

      this.readyStatus = false;
      var img = document.createElement('img');
      this.tempImg = img;
      this.tempImg.src = this.imgUrl;
      var startLoadTime = new Date();

      this.tempImg.onload = function() {
        var endLoadTime = new Date();
        self.loadTimeSec = (endLoadTime - startLoadTime) / 1000;
        self.element.attr('src', selfImg);
        self.element.removeClass('js_lazyImg');
        self.element.addClass('js_lazyImg_loaded');
        self.readyStatus = true;
      }

      this.tempImg.onerror = function() {
        self.element.removeClass('js_lazyImg');
        self.element.addClass('js_lazyImg_failed');
      }
    }

    var goLazyImg = function() {

      var lazyImgs = {};

      $('.js_lazyImg').each(function(index, item) {
        var fullImageLink = $(item).attr('data-src');
        if (!fullImageLink) {
          console.log('you might forgot data-src attr for ' + $(item));
          return;
        }

        function lazyImgItemObj() {};
        lazyImgItemObj.prototype = Object.create(lazyImgItemSample.prototype);

        lazyImgs[index] = new lazyImgItemObj();
        lazyImgs[index].element = $(item);
        lazyImgs[index].imgUrl = fullImageLink;

      })

      for (var key in lazyImgs) {
        if($(document).scrollTop() + $(window).height() + 100  >= lazyImgs[key].element.position().top && lazyImgs[key].element.is(":visible")) {
          lazyloadImg.call(lazyImgs[key])
        }
      }

      window.lazyImgs = lazyImgs;
    }

    goLazyImg();

    $(document).scroll(throttle(goLazyImg, 700));
  })

}
