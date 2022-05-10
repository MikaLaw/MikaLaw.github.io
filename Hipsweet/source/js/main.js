(function () {
  let heroSlider = () => {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      items: 1,
    });
  };

  let teamTabs = () => {
    $(".tabs__controls-link").on("click", function (e) {
      e.preventDefault();

      let $this = $(this),
        itemTab = $this.closest(".tabs__controls-item"),
        containerTab = $this.closest(".tabs"),
        contentTab = containerTab.find(".tabs__content-item"),
        ndxTab = itemTab.index(),
        reqItemTab = contentTab.eq(ndxTab),
        activeItemTab = contentTab.filter(".active");

      itemTab.addClass("active").siblings().removeClass("active");
      activeItemTab.removeClass("active");
      reqItemTab.addClass("active");
    });
  };

  Inputmask({ mask: "8 (999) 999-99-99" }).mask("#form__input-phone");

  let accoFqs = () => {
    var flag = true;

    $(".acco__trigger").on("click", function (e) {
      e.preventDefault();

      let $this = $(this),
        item = $this.closest(".acco__item"),
        currentContent = item.find(".acco__content"),
        duration = 200;

      if (flag) {
        flag = false;
        if (!item.hasClass("active")) {
          item.addClass("active").siblings().removeClass("active").find(".acco__content").slideUp(duration);

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

  let mapShow = () => {
    let ok = false;
    window.addEventListener("scroll", function () {
      if (ok === false) {
        ok = true;
        setTimeout(() => {
          let script = document.createElement("script");
          script.src = "https://api-maps.yandex.ru/2.1/?apikey=вашAPI-ключ&lang=ru_RU";
          document.getElementById("yamap").replaceWith(script);
          script.onload = function () {
            ymaps.ready(init);
          };
        }, 1000);
      }
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
            iconImageHref: "img/map-mark.png",
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

  let wowAnimate = () => {
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

    if (!opt.mobile) {
      let userAgent = window.navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        $(".visibility").removeClass("visibility");
        $(".animate__animated").removeClass("animate__animated");
      }
    }
  };

  let formValid = () => {
    $(".form__btn").on("click", function (e) {
      e.preventDefault();

      const form = $("#form");
      const popup = $(".popup");
      const popupText = $(".popup .popup__body");
      const popupClose = $(".popup .popup__close-btn");
      const name = form[0].name.value;
      const email = form[0].email.value;
      const phone = form[0].phone.value;
      const isCall = form[0].call.checked;

      function validate(email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email)) {
          return true;
        }
        return false;
      }

      function popupShow(text) {
        popupText.text(text);
        popup.addClass("active");
        setTimeout(function () {
          popup.removeClass("active");
        }, 2000);

        popupClose.on("click", function () {
          popup.removeClass("active");
        });
      }
      if (name && email && phone) {
        if (email && !validate(email)) {
          popupShow("Введите правильный email!");
        }
        let data = {
          name,
          email,
          phone,
          isCall,
        };
        form[0].reset();
        popupShow("Форма успешно отправлена!");
      } else {
        popupShow("Заполните все поля!");
      }
    });
  };

  let preloader = () => {
    let preloader = $(".preloader"),
      percentsTotal = 0,
      imagePath = [];

    $("body *").each(function (ndx, element) {
      $("body").addClass("disable-scroll");

      let background = $(element).css("background-image"),
        img = $(element).is("img");

      if (background != "none" && background.indexOf("linear-gradient") >= 0 && background.indexOf("radial-gradient") >= 0) {
        imagePath.push(background.slice(5, -2));
      }
      if ((background.indexOf("linear-gradient") >= 0 || background.indexOf("radial-gradient") >= 0) && background.indexOf("url") >= 0) {
        if (background.slice(background.indexOf("img")).indexOf(",") < 0) {
          imagePath.push(background.slice(background.indexOf("img"), -2));
        } else {
          background
            .slice(background.indexOf("img"))
            .split(",")
            .map((item) => imagePath.push(item.slice(item.indexOf("img"), -2)));
        }
      }
      if (window.devicePixelRatio > 1) {
        if (img && $(element).attr("srcset")) {
          imagePath.push($(element).attr("srcset").slice(0, -3));
        } else {
          if (img) imagePath.push($(element).attr("src"));
        }
      } else {
        if (img) imagePath.push($(element).attr("src"));
      }
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

  heroSlider();
  teamTabs();
  accoFqs();
  mapShow();
  pageScroll();
  wowAnimate();
  formValid();
  preloader();
})();
