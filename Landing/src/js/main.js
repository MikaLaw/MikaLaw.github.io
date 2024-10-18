"use strict";
var $ = window.$
  , mediaXxs = 360
  , mediaXs = 480
  , mediaSm = 768
  , mediaMd = 960
  , mediaLg = 1240
  , mediaXl = 1440
  , mediaXxl = 1800;

$(document).ready((function() {
    Fancybox.bind('[data-fancybox]', {     
      Carousel: {
        Navigation: false,
      },
    });
    Fancybox.defaults = {
      ...Fancybox.defaults,
      autoFocus: false,

    };
    
    const mobileWidthMediaQuery = window.matchMedia('(max-width: 960px)').matches;
    function openMainMenu() {
        $(".header__burger-btn").toggleClass("open"),
        $(".header__main-menu").toggleClass("open");
        $(".page").toggleClass("page_overflow-hidden");
        $('.main-menu__link').on('click', function(){
          $(".header__burger-btn").removeClass("open");
          $(".header__main-menu").removeClass("open");
          $(".page").removeClass("page_overflow-hidden");
        })
    }
    mobileWidthMediaQuery ? $(document).on("click", ".header__burger-btn", openMainMenu) : $(document).off("click", ".header__burger-btn", openMainMenu);

    function animateBottleInSection(){
      const sectionAmount = $(".bottle-section").length;
      $(".bottle-section").each(function(ind){
        const $section = $(this);
        const animatedBottleImg = $section.find('[class*="__bottle-img"]');
        let windowHeight, sectionOffsetTop, sectionHeight, headerHeight;
        $(window).on("resize", function(){
          windowHeight = $(window).height();
          sectionOffsetTop = $section.offset().top;
          sectionHeight = $section.outerHeight();
          headerHeight = $(".page__header").outerHeight();
        }).trigger("resize")
        $(window).on("scroll", function(){
          let scrollPos = $(this).scrollTop() + headerHeight;
          if (ind === 0) {
            if (sectionOffsetTop <= scrollPos + windowHeight / 4 && sectionOffsetTop + sectionHeight > scrollPos + windowHeight / 2){
             animatedBottleImg.addClass("visible")
            } else {
              animatedBottleImg.removeClass("visible")
            }
          } else if (ind === sectionAmount - 1) {
            if (sectionOffsetTop <= scrollPos + windowHeight / 2 && sectionOffsetTop + sectionHeight > scrollPos + 3 * windowHeight / 4 ){
              animatedBottleImg.addClass("visible")
            } else {
               animatedBottleImg.removeClass("visible")
            }
          } else {
            if ( sectionOffsetTop <= scrollPos + windowHeight / 2 && sectionOffsetTop + sectionHeight > scrollPos + windowHeight / 2){
              animatedBottleImg.addClass("visible")
            } else {
               animatedBottleImg.removeClass("visible")
            }
          }
        })
      });      
    }

    function animateSinkBottle(){
      let bottleImages = [];
      $("#video-bottle link").each((ind, item) => bottleImages[ind] = $(item).attr("href"));
      $(window).on("resize scroll", function(){
        let $section = $("#video-bottle");
        let headerHeight = $(".page__header").outerHeight();
        let bottleImagesAmount = bottleImages.length;
        let windowViewheight = $(window).height() - headerHeight;
        let speed = bottleImagesAmount / windowViewheight;
        let sectionOffsetTop = $section.offset().top
        let windowFullheight = $(window).scrollTop() + headerHeight;
        let coeffDiff = speed * (windowFullheight + windowViewheight - sectionOffsetTop)
        let currentIndex = 0;
        if (coeffDiff > bottleImagesAmount - 1){
          currentIndex = bottleImagesAmount - 1
        } else if (coeffDiff > 0){
          currentIndex = Math.floor(coeffDiff);
        }
        let currentBottleImage = bottleImages[currentIndex];
        $(".bottle-video-section__image").css("background-image", "url('".concat(currentBottleImage, "')"))    
      }).trigger("resize");
    } 

    function animateNaturalSection(){
      const stones = [
        {
          class: ".natural-section__stone-wrap-6",
          left: 73.95,
          top: 16.38
        }, 
        {
            class: ".natural-section__stone-wrap-2",
            left: 13.41,
            top: 32.91
        }, 
        {
            class: ".natural-section__stone-wrap-8",
            left: 90.05,
            top: 42.83
        }, 
        {
            class: ".natural-section__stone-wrap-5",
            left: 60.37,
            top: 45.6
        }, 
        {
            class: ".natural-section__stone-wrap-4",
            left: 29.42,
            top: 47.45
        }, 
        {
            class: ".natural-section__stone-wrap-1",
            left: 3.14,
            top: 65.04
        }, 
        {
            class: ".natural-section__stone-wrap-9",
            left: 97.93,
            top: 73.45
        }, 
        {
            class: ".natural-section__stone-wrap-7",
            left: 74.61,
            top: 87.29
        }, 
        {
            class: ".natural-section__stone-wrap-3",
            left: 21.76,
            top: 94.2
        }
      ]
      , b = function(e) {
        return e > 0 ? 1 : e < 0 ? -1 : 0 == e ? 0 : NaN
      };
      function getStoneCoords(width, height, left, top) {
        let sectionCenterWidth = width / 2;
        let sectionCenterHeight = height / 2;
          var s = (left / 100 - .5) * width
            , r = (top / 100 - .5) * height
            , l = null
            , c = null;
          return r / s >= sectionCenterHeight / sectionCenterWidth ? 
          (l = 100 * (b(r) * sectionCenterHeight * s / r / width + .5), c = 100 * (b(r) * sectionCenterHeight / height + .5)) : 
          r / s < sectionCenterHeight / sectionCenterWidth && (l = 100 * (b(s) * sectionCenterWidth / width + .5), c = 100 * (b(s) * sectionCenterWidth * r / s / height + .5)),
          {
              left: (l + 3 * left) / 4,
              top: c
          }
      }
      $("[data-natural-section]").each((function() {
        let $section = $(this);
        let headerHeight = $(".page__header").outerHeight();
        let windowViewheight = $(window).height() - headerHeight;
        let sectionWidth = $section.outerWidth();
        let sectionHeight = $section.outerHeight();
        
        $(window).on("scroll", (function() {
          let windowFullheight = $(this).scrollTop() + headerHeight;
          let sectionOffsetTop =  $section.offset().top;
          let opacityEl = 0;
          opacityEl = sectionOffsetTop > windowFullheight + windowViewheight - sectionHeight / 2 ? 
          0 : sectionOffsetTop < windowFullheight + windowViewheight / 2 - sectionHeight / 2 ? 
          1 : (windowFullheight + windowViewheight - sectionHeight / 2 - sectionOffsetTop) / (windowViewheight / 2);
          $section.find(".natural-section__logo-wrap").css({
            opacity: opacityEl,
            transform: "translate(-50%, -50%) scale(" + (.5 + .5 * opacityEl) + ")"
          }),
          $section.find(".natural-section__subtitle-wrap").css({
            opacity: opacityEl,
            transform: "translate(-50%, -50%) scale(" + (.5 + .5 * opacityEl) + ")"
          }),
          $section.find(".natural-section__title-wrap").css({
            opacity: opacityEl,
            transform: "translate(-50%, -50%) scale(" + (.5 + .5 * opacityEl) + ")"
          }),
          stones.forEach((function(item, ind) {
            let opacityEl = 0;
            opacityEl = sectionOffsetTop + .1 * sectionHeight * ind > windowFullheight + windowViewheight - sectionHeight / 2 ? 
              0 : sectionOffsetTop < windowFullheight + windowViewheight / 2 - sectionHeight / 2 ? 
              1 :(windowFullheight + windowViewheight - sectionHeight / 2 - sectionOffsetTop - .1 * sectionHeight * ind) / (windowViewheight / 2 - .1 * sectionHeight * ind);
              let stoneLeft = item.left;
              let stoneTop = item.top;
              let coordLeft =  getStoneCoords(sectionWidth, sectionHeight, stoneLeft, stoneTop).left;
              let coordRight = getStoneCoords(sectionWidth, sectionHeight, stoneLeft, stoneTop).top;
              $section.find(item.class).css({
                  opacity: opacityEl,
                  left: coordLeft + opacityEl * (stoneLeft - coordLeft) + "%",
                  top: coordRight + opacityEl * (stoneTop - coordRight) + "%"
              })
          }))
          
        }))
      }))
    }

    function setAnimationName(element, attr){
      let animationName = $(element).attr(attr);
      $(element).addClass("animate__animated animate__" + animationName)
    }

    function sectionAnimationInit() {
      $("[data-animate]").each((function() {
        let $section = $(this);
        $(window).on("scroll", (function() {
          let windowScrollTop = $(window).scrollTop();
          let windowHeight = $(window).height();
          if ($section.offset().top < windowScrollTop + windowHeight ){ 
            $($section).each(function() {
              setAnimationName(this, "data-animate")
            })
          }
        })).trigger("scroll")
      }))
    };

    function initGorizontalScroll(){
      const stickySection = $('.horizontal_scroll');
      const stickyOneSection = stickySection.find('section');
      const stickyContainer = stickySection.closest('.scroll_container');
      const stickySectionLenght = stickyOneSection.length;
      const stickySectionHeight = stickyOneSection.first().height();
      const stickyContainerHeight = stickyContainer.height() - stickySectionHeight;
      const offsetTop = stickyContainer.offset().top;   
      const maxTransitionWidth = (stickySectionLenght - 1) * 100;  
      const limits = Array(stickySectionLenght).fill(0).map((_, i) => ([(i * 100) + 50, ((i + 1) * 100) + 50]));
      let activeIndex;

      function getGorizontalScroll(){
        if ($(window).scrollTop() >= offsetTop && $(window).scrollTop() <= offsetTop + stickyContainerHeight) {
          let percentage = (($(window).scrollTop() - offsetTop) / window.innerHeight) * 100;          
          percentage = percentage < 0 ? 0 : percentage > maxTransitionWidth ? maxTransitionWidth : percentage; 
          stickySection.attr('style', `transform: translate3d(${-(percentage)}vw, 0, 0);`);           
          limits.forEach(([leftWidth, rightWidth], i ) => {            
            if(leftWidth <= percentage && percentage <= rightWidth){
              if(i !== activeIndex) {
                let activeSection = stickyOneSection[i + 1];     
                setAnimationName(activeSection, 'data-animate-gorizontal')           
                $(activeSection).find('[data-animate-gorizontal]').each((i, item)=>{
                  setAnimationName(item, 'data-animate-gorizontal')
                })
              }
              activeIndex = i;
            }
          })   
    
        }
      }
      window.addEventListener('scroll', getGorizontalScroll)

    }

    $(document).on("click", "[data-scroll][href]", (function() {
      let sectionAnchor = $(this).attr("href");
      let headerHeight = $(".page__header").outerHeight();
      
      return $("html, body").animate({
          scrollTop: $(sectionAnchor).offset().top - headerHeight + "px"
        }, {
            duration: 500,
            easing: "swing"
        }),
        !1
      }
    ));

    initGorizontalScroll();
    sectionAnimationInit();
    animateBottleInSection();
    animateSinkBottle();
    animateNaturalSection();
}))
