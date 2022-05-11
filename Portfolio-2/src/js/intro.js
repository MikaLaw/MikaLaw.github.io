import { arrowScroll, formValidation, menu, parallaxScroll, preloader } from "./functions";

function parallax() {
  if (window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      let initialX = window.innerWidth / 2 - e.pageX,
        initialY = window.innerHeight / 2 - e.pageY;

      $(".parallax__layer").each(function (index, layer) {
        let divider = (index + 1) / 100,
          positionX = initialX * divider,
          positionY = initialY * divider,
          transformString = "translate3d(" + positionX + "px, " + positionY + "px, 0)";

        $(layer).css("msTransform", transformString);
        $(layer).css("webkitTransform", transformString);
        $(layer).css("oTransform", transformString);
        $(layer).css("mozTransform", transformString);
        $(layer).css("transform", transformString);
      });
    });
  }
}

function flipper() {
  let btnWelcomFlipIn = $(".header-intro__btn"),
    cardContainer = $(".intro__content"),
    btnWelcomFlipOut = $(".auth-form[type='button']");

  btnWelcomFlipIn.on("click", function () {
    cardContainer.addClass("flip");
    btnWelcomFlipIn.addClass("btn__hidden");
  });
  btnWelcomFlipOut.on("click", function () {
    cardContainer.removeClass("flip");
    btnWelcomFlipIn.removeClass("btn__hidden");
  });
}

flipper();
formValidation(".auth-form", "/");
preloader();
parallax();
