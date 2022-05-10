import "../scss/main.scss";

import "../template/pages/about.pug";
import "../template/pages/portfolio.pug";
import "../template/pages/career.pug";

import "../../src/img/career-2.jpg";
import "../../src/img/career-3.jpg";
import "../../src/img/career-4.jpg";

let careerCarousel = () => {
  let careerCarouselBtn = document.querySelectorAll(".career__wrap"),
    preview = document.querySelector(".career__avatar-pic");

  for (let i = 0; i < careerCarouselBtn.length; i++) {
    careerCarouselBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      let $this = careerCarouselBtn[i];
      let item = $this.parentElement,
        path = item.getAttribute("data-src");

      let items = item.parentElement.children;
      for (let j = 0; j < items.length; j++) {
        items[j].classList.remove("active");
      }
      item.classList.add("active");
      preview.setAttribute("src", path);
    });
  }
};

careerCarousel();
