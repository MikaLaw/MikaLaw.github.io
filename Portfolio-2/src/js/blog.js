import { arrowScroll, menu, parallaxScroll, preloader } from "./functions";

let blogMenu = () => {
  let article = $(".article-content__item"),
    title = $(".article-title__item"),
    nav = $(".article-title__list");

  window.addEventListener("scroll", () => {
    if (nav.offset().top <= window.scrollY && window.innerWidth > 768) {
      nav.addClass("fixed");
    } else {
      nav.removeClass("fixed");
    }

    article.each(function (index, articleItem) {
      if ($(articleItem).offset().top <= window.scrollY) {
        title.eq(index).addClass("active").siblings().removeClass("active");
      }
    });
  });

  $(".article-title__btn").on("click", function () {
    $(".article-title__sidebar").toggleClass("open");
  });

  title.each(function (index, titleItem) {
    $(titleItem).on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $(article.eq(index)).offset().top + 5,
        },
        1000
      );
    });
  });
};

window.onload = () => {
  arrowScroll();
  menu();
  blogMenu();
  preloader();
};

window.onscroll = () => {
  parallaxScroll(document.querySelector(".user"), window.pageYOffset, 25);
};
