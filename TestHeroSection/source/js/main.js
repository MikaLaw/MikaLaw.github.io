(function () {
  //Menu toogler
  let menuToogler = () => {
    $(".nav-close").on("click", function (e) {
      e.preventDefault();

      $(".nav").removeClass("active");
    });
    $(".nav-toggler").on("click", function (e) {
      e.preventDefault();

      $(".nav").addClass("active");
    });
    $(".nav__link").on("click", function () {
      $(".nav").removeClass("active");
    });
  };

  let stocksCarousel = () => {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      slideBy: 2,
      navText: [
        "<div class='stock-arrow stock-arrow--left'><img src='./img/icon/arrow-left.svg' alt='arrow-left' /></div>",
        "<div class='stock-arrow stock-arrow--right'><img src='./img/icon/arrow-right.svg' alt='arrow-right' /></div>",
      ],
      responsive: {
        0: {
          items: 1,
          dots: true,
          nav: false,
        },
        481: {
          items: 2,
          dots: true,
          nav: false,
        },
        768: {
          items: 2,
          dots: true,
        },
      },
    });
  };

  menuToogler();
  stocksCarousel();
})();
