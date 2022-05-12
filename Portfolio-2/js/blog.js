"use strict";

// Header menu
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
}(); // Blog navigation


var blogMenu = function () {
  var params = {
    sidebar: document.querySelector('.articles__sidebar'),
    titlesList: document.querySelector('.articles__sidebar-list'),
    titles: document.querySelectorAll('.articles__sidebar-item'),
    articlesList: document.querySelector('.articles__list'),
    articles: document.querySelectorAll('.articles__item'),
    control: document.querySelector('.articles__sidebar-control')
  };
  return {
    init: function init() {
      var coordArticles,
          active = 0;

      function getCoordArticles() {
        coordArticles = [];

        for (var i = 0, l = params.articles.length; i < l; i++) {
          var coord = params.articles[i].getBoundingClientRect();
          coordArticles[i] = {};
          coordArticles[i].top = coord.top + pageYOffset - 150;
          coordArticles[i].bottom = coord.bottom + pageYOffset - 151;
        }
      }

      function changeActive(index) {
        params.titles[active].classList.remove('active');
        active = index;
        params.titles[active].classList.add('active');
      }

      function fixMenu() {
        var top = params.articlesList.getBoundingClientRect().top + pageYOffset;
        if (pageYOffset < top) params.sidebar.classList.remove('fixed');else {
          params.sidebar.classList.add('fixed');
        }
      }

      function clickArt(e) {
        var index = Array.prototype.indexOf.call(params.titles, e.target),
            article = params.articles[index],
            offset = article.getBoundingClientRect().top + pageYOffset;
        changeActive(index);
        document.removeEventListener('scroll', scrollCheck);
        $('body, html').animate({
          scrollTop: offset
        }, function () {
          document.addEventListener('scroll', scrollCheck);
        });
      }

      function scrollCheck() {
        for (var i = 0; i < coordArticles.length; i++) {
          if (pageYOffset >= coordArticles[i].top && pageYOffset <= coordArticles[i].bottom) {
            changeActive(i);
          }
        }
      }

      function heightCheck() {
        var heightVieport = document.documentElement.clientHeight,
            coord = params.articlesList.getBoundingClientRect(),
            scrollSize = coord.top + coord.height + pageYOffset,
            diff = scrollSize - $(params.sidebar).offset().top,
            heightTitles = params.titlesList.getBoundingClientRect().height,
            heightSidebar = params.sidebar.getBoundingClientRect().height,
            maxHeightSidebar = heightVieport < diff ? heightVieport : diff;
        if (heightTitles !== heightSidebar) maxHeightSidebar = heightSidebar;
        if (window.innerWidth <= 768) maxHeightSidebar = heightVieport;
        params.titlesList.style.maxHeight = maxHeightSidebar + 'px';
      }

      function showMenu() {
        params.sidebar.classList.toggle('open');
      }

      getCoordArticles();
      scrollCheck();
      fixMenu();
      window.addEventListener('resize', getCoordArticles);
      window.addEventListener('resize', heightCheck);
      window.addEventListener('resize', fixMenu);
      window.addEventListener('resize', scrollCheck);
      window.addEventListener('scroll', fixMenu);
      document.addEventListener('scroll', scrollCheck);
      window.addEventListener('scroll', heightCheck);
      Array.prototype.forEach.call(params.titles, function (item, i, arr) {
        item.addEventListener('click', function (e) {
          clickArt(e);
          params.sidebar.classList.remove('open');
        });
      });
      params.control.addEventListener('click', showMenu);
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
      this.move(user, wScroll, 20);
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
}();

$(function () {
  preloader.init();
  svg4everybody({});
});

window.onload = function () {
  arrowScroll.init();
  menu.init();
  blogMenu.init();
};

window.onscroll = function () {
  var wScroll = window.pageYOffset;
  parallaxScroll.init(wScroll);
};