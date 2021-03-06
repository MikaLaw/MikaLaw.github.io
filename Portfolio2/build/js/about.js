"use strict";

//Yandex map
var map = function () {
  return {
    init: function init() {
      ymaps.ready(init);

      function init() {
        var myMap = new ymaps.Map("map", {
          center: [54.63436457003265, 39.688799999999986],
          zoom: 13,
          controls: ['zoomControl']
        });
        var myPlacemark = new ymaps.Placemark([54.636082787125765, 39.75102628570547], {
          hintContent: 'Рязань!',
          balloonContent: ''
        }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icons/map_marker.svg',
          iconImageSize: [30, 42],
          iconImageOffset: [-25, -42]
        });
        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
      }
    }
  };
}(); // Header menu


var menu = function () {
  return {
    init: function init() {
      var hamburger = $('.navbar-toggle'),
          mainMenu = $('.menu-nav');
      hamburger.on('click', function () {
        mainMenu.toggleClass('active');
        hamburger.toggleClass('active');
      });
    }
  };
}(); // ArrowScroll


var arrowScroll = function () {
  return {
    init: function init() {
      $('a[data-anchor^="#"]').click(function (e) {
        e.preventDefault();
        var target = $(e.currentTarget).attr('data-anchor');
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);
        return false;
      });
    }
  };
}(); // Preloader


var preloader = function () {
  return {
    init: function init() {
      var percentsTotal = 0,
          preloader = $('.preloader');
      var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';

        if (background != 'none') {
          path = background.replace('url("', '').replace('")', '');
        }

        if (img) {
          path = $(element).attr('src');
        }

        if (path) return path;
      });

      var setPercents = function setPercents(total, current) {
        var persents = Math.ceil(current / total * 100);
        $('.preloader__percents').text(persents + '%');

        if (persents >= 100) {
          preloader.addClass('done');
        }
      };

      var loadImages = function loadImages(images) {
        if (!images.length) preloader.addClass('done');
        images.forEach(function (img, i, images) {
          var fakeImage = $('<img>', {
            attr: {
              src: img
            }
          });
          fakeImage.on('load error', function () {
            percentsTotal++;
            setPercents(images.length, percentsTotal);
          });
        });
      };

      var imgs = imgPath.toArray();
      loadImages(imgs);
    }
  };
}(); // ParallaxScroll


var parallaxScroll = function () {
  var user = document.querySelector('.user_section'),
      sectionName = document.querySelector('.hero__title-img'),
      sectionBg = document.querySelector('.hero__bg');
  return {
    move: function move(block, windowScroll, strafeAmount) {
      var strafe = windowScroll / -strafeAmount + -50 + '%',
          style = block.style,
          transformString = 'translate(-50%,' + strafe + ')';
      style.transform = transformString;
    },
    init: function init(wScroll) {
      this.move(sectionBg, wScroll, 115);
      this.move(sectionName, wScroll, 25);
      this.move(user, wScroll, 10);
    }
  };
}();

$(function () {
  preloader.init();
  svg4everybody({});
});

window.onload = function () {
  arrowScroll.init();
  menu.init();
  map.init();
};

window.onscroll = function () {
  var wScroll = window.pageYOffset;
  parallaxScroll.init(wScroll);
};