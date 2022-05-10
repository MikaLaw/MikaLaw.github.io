(function () {
  //Burger slider
  let burgerCarousel = () => {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      items: 1,
      navText: ['<img src="./img/icon/arrow-scroll-left.svg" />', '<img src="./img/icon/arrow-scroll-right.svg" />'],
    });
  };

  //Input mask
  Inputmask({ mask: "+7 (999) 999-99-99" }).mask("#phone");

  let teamAcco = () => {
    $(".team-accordion__trigger").on("click", function (e) {
      e.preventDefault();
      var flag = true;

      let $this = $(this),
        item = $this.closest(".team-accordion__item"),
        currentContent = item.find(".team-accordion__content"),
        duration = 500;

      if (flag) {
        flag = false;
        if (!item.hasClass("active")) {
          item.addClass("active").siblings().removeClass("active").find(".team-accordion__content").slideUp(duration);

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

  let menuAcco = () => {
    $(".menu-accordion__trigger").on("click", function (e) {
      e.preventDefault();
      var flag = true;
      var $this = $(this),
        item = $this.closest(".menu-accordion__item"),
        content = item.find(".menu-accordion__content"),
        otherItem = item.siblings(),
        reqWidth = item.find(".menu-accordion__content .menu-accordion__wrap").outerWidth(),
        otherContent = otherItem.find(".menu-accordion__content"),
        duration = 500;

      if (flag) {
        flag = false;
        if (window.innerWidth > 768) {
          if (!item.hasClass("active")) {
            otherItem.removeClass("active");
            otherContent.css({
              width: "0",
            });
            item.addClass("active");
            content.css({
              width: reqWidth,
            });
            flag = true;
          } else {
            item.removeClass("active");
            content.css({
              width: "0",
            });
            flag = true;
          }
        } else {
          if (!item.hasClass("active")) {
            item.addClass("active").siblings().removeClass("active").find(".menu-accordion__content").slideUp(duration);
            content.slideDown(duration, function () {
              flag = true;
            });
          } else {
            item.removeClass("active");
            content.slideUp(function () {
              flag = true;
            });
          }
        }
      }
    });
  };

  //Yandex map
  let lazyScript = () => {
    let ok = false;
    window.addEventListener("load", (event) => {
      setTimeout(() => {
        let script = document.createElement("script");
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=вашAPI-ключ&lang=ru_RU";
        document.getElementById("yamap").replaceWith(script);
        script.onload = function () {
          ymaps.ready(init);
        };
      }, 3000);
    });
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [59.91807704072416, 30.304899499999895],
        zoom: 12,
        controls: ["zoomControl"],
      });

      var coords = [
        [59.91519306503046, 30.30146610155869],
        [59.94731792589854, 30.383949393184682],
        [59.94459450109974, 30.49443737935239],
        [59.971275461653455, 30.313675516994483],
      ];

      var myGeoObjects = [];

      for (var i = 0; i < coords.length; i++) {
        myGeoObjects[i] = new ymaps.GeoObject(
          {
            geometry: {
              type: "Point",
              coordinates: coords[i],
            },
          },
          {
            iconLayout: "default#image",
            iconImageHref: "./img/icon/map-marker.svg",
            iconImageSize: [30, 42],
            iconImageOffset: [-60, -42],
          }
        );
      }

      var myClusterer = new ymaps.Clusterer();
      myClusterer.add(myGeoObjects);
      myMap.geoObjects.add(myClusterer);

      myMap.behaviors.disable("scrollZoom");
      myMap.behaviors.disable("drag");
    }
  };

  //Review popup
  let fancyPopup = () => {
    $(".review__link").on("click", function (e) {
      e.preventDefault();

      let $this = $(this),
        authorDesc = $this.closest(".review__content"),
        authotName = authorDesc.find(".review__name").text(),
        authotText = authorDesc.find(".review__text p").text();
      $(".review-modal__title").text(authotName);
      $(".review-modal__body p").text(authotText);

      $.fancybox.open({
        src: "#review-modal",
        type: "inline",
      });
    });
  };

  //Form
  let form = () => {
    $("#order-btn").on("click", function (e) {
      e.preventDefault();

      let form = $("#form-order")[0];
      let modalText = $(".form-modal__body p");
      $(".form-moda__btn ").on("click", function (e) {
        e.preventDefault();
        $.fancybox.close();
      });

      if (form.name.value.length !== 0 && form.phone.value.length !== 0 && form.street.value.length !== 0 && form.house.value.length !== 0 && form.housing.value.length !== 0 && form.flat.value.length !== 0 && form.floor.value.length !== 0 && form.commentary.value.length !== 0) {
        modalText.text("Сообщене отправлено");
        $.fancybox.open({
          src: "#form-modal",
          type: "inline",
          smallBtn: false,
          toolbar: false,
        });
      } else {
        modalText.text("Заполните все поля!");
        $.fancybox.open({
          src: "#form-modal",
          type: "inline",
          smallBtn: false,
          toolbar: false,
        });
      }
    });
  };

  //One page Scroll
  let onepageScroll = () => {
    $(".maincontent").onepage_scroll({
      sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
      easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
      animationTime: 1000, // AnimationTime let you define how long each section takes to animate
      pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
      updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
      beforeMove: function (index) {}, // This option accepts a callback function. The function will be called before the page moves.
      afterMove: function (index) {}, // This option accepts a callback function. The function will be called after the page moves.
      loop: true, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
      keyboard: true, // You can activate the keyboard controls
      responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
      // the browser's width is less than 600, the fallback will kick in.
      direction: "vertical", // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });

    $(".nav__link, .btn, .hero-arrow__link, .onepage-pagination a").on("click", function (e) {
      e.preventDefault();
      let sectionNum = $(this).attr("data-index"),
        scrollPercent = "-" + (sectionNum - 1) + "00%,",
        sideBarNavLink = $(".onepage-pagination a").filter('a[data-index^="' + sectionNum + '"]'),
        sectionReq = $('section[data-index="' + sectionNum + '"]');

      sectionReq.addClass("active").siblings().removeClass("active");

      sideBarNavLink.addClass("active").closest("li").siblings().find("a").removeClass("active");

      $(".maincontent").css("-webkit-transform", "translate3d(0px, " + scrollPercent + " 0px)");

      $(".maincontent").css("-webkit-transform", "translate3d(0px, " + scrollPercent + " 0px)");
    });
    $("html").css({ "touch-action": "pan-down" });
  };

  let preloader = () => {
    let preloader = $(".preloader"),
      percentsTotal = 0,
      imagePath = [];

    $("body *").each(function (ndx, element) {
      $("body").addClass("disable-scroll");

      let background = $(element).css("background-image"),
        img = $(element).is("img");

      if (background != "none" && background.indexOf("linear-gradient") < 0) {
        imagePath.push(background.slice(5, -2));
      }
      if (background.indexOf("linear-gradient") >= 0 && background.indexOf("url") >= 0) {
        imagePath.push(background.slice(background.indexOf("img"), -2));
      }

      if (img) imagePath.push($(element).attr("src"));
    });

    function setPercents(total, current) {
      let persents = Math.ceil((current / total) * 100);
      $(".preloader__percents").text(persents + "%");
      if (persents >= 100) {
        preloader.addClass("done");
        $("body").removeClass("disable-scroll");
      }
    }

    function loadImages(images) {
      if (!images.length) {
        preloader.addClass("done");
        $("body").removeClass("disable-scroll");
      } else {
        images.forEach(function (img, i, images) {
          let fakeImage = $("<img>", {
            attr: {
              src: img,
            },
          });
          fakeImage.on("load error", function () {
            percentsTotal++;
            setPercents(images.length, percentsTotal);
          });
        });
      }
    }
    loadImages(imagePath);
  };

  let lazyLoad = () => {
    let images = $(".lazy__img");
    window.addEventListener("load", (event) => {
      setTimeout(function () {
        images.each(function () {
          $(this).attr("src", $(this).attr("data-src"));
        });
      }, 3000);
    });
  };

  let menu = () => {
    let hamburger = $(".nav-toggle"),
      mainMenu = $(".header__nav");

    hamburger.on("click", () => {
      mainMenu.toggleClass("active");
      hamburger.toggleClass("active");
    });

    $(".nav__link").on("click", () => {
      mainMenu.toggleClass("active");
      hamburger.toggleClass("active");
    });

    $(".onepage-pagination a").on("click", () => {
      mainMenu.toggleClass("active");
      hamburger.toggleClass("active");
    });

    $(window).on("touchmove mousewheel", function () {
      mainMenu.removeClass("active");
      hamburger.removeClass("active");
    });
  };

  preloader();
  lazyLoad();
  lazyScript();
  menu();
  onepageScroll();
  fancyPopup();
  teamAcco();
  burgerCarousel();
  menuAcco();
  form();
})();
