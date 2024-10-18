var $ = require('jquery');
var throttle = require('lodash.throttle');

module.exports = function() {

  $(document).ready(function() {

    function lazyBgrItemSample() {};
    lazyBgrItemSample.prototype = {
      info: function() {
        console.log('status: ' + this.readyStatus + ' url: ' + this.imgUrl + ' w/h: ' + this.tempImg.naturalWidth + '/' + this.tempImg.naturalHeight + ' loadTimeSec: ' + this.loadTimeSec);
      }
    }

    var lazyloadBgr = function() {
      var self = this;
      var selfBgr = self.imgUrl;

      this.readyStatus = false;
      var img = document.createElement('img');
      this.tempImg = img;  
      this.tempImg.src = this.imgUrl;
      var startLoadTime = new Date();

      this.tempImg.onload = function() {
        var endLoadTime = new Date();
        self.loadTimeSec = (endLoadTime - startLoadTime) / 1000;
        self.element.css('background-image', 'url(' + selfBgr + ')');
        self.element.removeClass('js_lazyBgr');
        self.element.addClass('js_lazyBgr_loaded');
        self.readyStatus = true;
      }

      this.tempImg.onerror = function() {
        self.element.removeClass('js_lazyBgr');
        self.element.addClass('js_lazyBgr_loaded');
      }

    }

    var goLazyBgr = function() {

      var lazyBgrs = {};

      $('.js_lazyBgr').each(function(index, item) {
        var bgrFullImageLink = $(item).attr('data-bgr');
        if (!bgrFullImageLink) {
          console.log('you might forgot data-bgr attr for ' + $(item));
          return;
        };

        function lazyBgrItemObj() {};
        lazyBgrItemObj.prototype = Object.create(lazyBgrItemSample.prototype);

        lazyBgrs[index] = new lazyBgrItemObj();
        lazyBgrs[index].element = $(item);
        lazyBgrs[index].imgUrl = bgrFullImageLink;
      })

      for (var key in lazyBgrs) {
        if($(document).scrollTop() + $(window).height() + 100  >= lazyBgrs[key].element.position().top && lazyBgrs[key].element.is(":visible")) {
          lazyloadBgr.call(lazyBgrs[key])
        }
      }      

      window.lazyBgrs = lazyBgrs;
    }

    goLazyBgr();

    $(document).scroll(throttle(goLazyBgr, 700));
  })

}




