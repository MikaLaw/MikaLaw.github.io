(function () {
  //Menu toogler
  let menuToogler = () => {
    $(".nav-close").on("click", function (e) {
      e.preventDefault();

      $(".nav__header").removeClass("active");
    });
    $(".nav-toggler").on("click", function (e) {
      e.preventDefault();

      $(".nav__header").addClass("active");
    });
    $(".nav__link").on("click", function () {
      $(".nav__header").removeClass("active");
    });
  };

  let footerYear = () => {
    let year = new Date().getFullYear();
    $(".footer__copyright-year").text(year);
  };

  let pageScroll = () => {
    $('a[data-href^="#"]').on("click", function (e) {
      e.preventDefault();

      let target = $(this).attr("data-href");
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );
      return false;
    });
  };

  let accoServices = () => {
    $(".services__btn").on("click", function (e) {
      e.preventDefault();
      var flag = true;

      let $this = $(this),
        item = $this.closest(".servises__item"),
        currentContent = item.find(".services__info "),
        duration = 500;

      if (flag) {
        flag = false;
        if (!item.hasClass("active")) {
          item.addClass("active").siblings().removeClass("active").find(".services__info ").slideUp(duration);

          currentContent.slideDown(duration, function () {
            flag = true;
          });
        } else {
          item.removeClass("active");
          currentContent.slideUp(function () {
            flag = true;
          });
        }
      }
    });
  };

  let accoQuote = () => {
    function createAccoQuote(className) {
      $(className).owlCarousel({
        loop: true,
        margin: 10,
        items: 1,
        navText: ["", ""],
        responsive: {
          0: {
            nav: false,
            dots: true,
          },
          768: {
            nav: false,
            dots: true,
          },
        },
      });
    }
    createAccoQuote(".quote__list-two");
    createAccoQuote(".quote__list-one");
  };

  let teamCarousel = () => {
    $(".team__list").owlCarousel({
      loop: true,
      margin: 20,
      responsiveClass: true,
      slideBy: 3,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 1,
          dots: true,
        },
        576: {
          items: 2,
          dots: true,
        },
        992: {
          items: 3,
        },
      },
    });
  };

  let wowAnimate = () => {
    window.onload = function () {
      let opt = {
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animate__animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        scrollContainer: null, // optional scroll container selector, otherwise use window
      };
      var wow = new WOW(opt);
      wow.init();
    };
  };

  let counterInPage = () => {
    $(".counter__num").counterUp({
      delay: 10,
      time: 1000,
      offset: 70,
      beginAt: 100,
      formatter: function (n) {
        return n.replace(/,/g, ".");
      },
    });
  };

  menuToogler();
  footerYear();
  pageScroll();
  accoServices();
  accoQuote();
  teamCarousel();
  counterInPage();
  wowAnimate();
})();
