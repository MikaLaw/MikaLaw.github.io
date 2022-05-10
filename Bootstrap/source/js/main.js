(function () {
  //Menu toogler
  let menu = () => {
    $(".navbar-close").on("click", function (e) {
      e.preventDefault();

      $(".nav").removeClass("active");
    });
    $(".navbar-toggler").on("click", function (e) {
      e.preventDefault();

      $(".nav").addClass("active");
    });
    $(".nav__link").on("click", function () {
      $(".nav").removeClass("active");
    });
  };

  let teamSlider = () => {
    $(".team__list").owlCarousel({
      loop: false,
      margin: 10,
      navText: ["", ""],
      responsiveClass: true,
      nav: true,
      dots: true,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        576: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });
  };

  let reviewSlider = () => {
    $(".review__list").owlCarousel({
      loop: true,
      margin: 30,
      navText: ["", ""],
      autoplay: true,
      autoplayTimeout: 5000,
      responsiveClass: true,
      slideBy: 2,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        992: {
          items: 2,
        },
      },
    });
  };

  let footerYear = () => {
    let year = new Date().getFullYear();
    $(".footer__copyright-year").text(year);
  };

  let wowAnime = () => {
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
    if (!opt.mobile) {
      let userAgent = window.navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        $(".visibility").removeClass("visibility");
      }
    }
  };

  menu();
  teamSlider();
  reviewSlider();
  footerYear();
  wowAnime();
})();
