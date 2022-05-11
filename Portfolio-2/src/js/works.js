import {
  arrowScroll,
  formValidation,
  menu,
  parallaxScroll,
  preloader,
} from "./functions";

let slider = () => {
  let prevBtn = $(".prev"),
    nextBtn = $(".next"),
    imagePreview = $(".slider__review-img"),
    nextSliders = $(".slider__controls-right .slider__controls-pic"),
    prevSliders = $(".slider__controls-left .slider__controls-pic"),
    nextIndex,
    activeIndex = 0,
    prevIndex,
    activeItem = {
      src: "",
      title: "",
      tech: "",
      link: "",
    },
    duration = 800,
    clikBtn = true,
    animate = true;

  function getActiveIndex(dir) {
    if (dir === "next") {
      if (activeIndex < nextSliders.length - 1) activeIndex++;
      else activeIndex = 0;
    } else if (dir === "prev") {
      if (activeIndex > 0) activeIndex--;
      else activeIndex = prevSliders.length - 1;
    }
  }
  function getPrevIndex() {
    if (activeIndex - 1 < 0) prevIndex = length - 1;
    else prevIndex = activeIndex - 1;
  }
  function getNextIndex() {
    if (activeIndex + 1 > nextSliders.length - 1) nextIndex = 0;
    else nextIndex = activeIndex + 1;
  }
  function setNextSlider() {
    animate = false;
    let active = nextSliders.eq(nextIndex);
    getSliderData(active);
    getNextIndex();
    let next = nextSliders.eq(nextIndex);

    $(active).animate({ top: "-100%" }, duration);
    $(next).animate({ top: "0%" }, duration, () => {
      $(next).addClass("active");
      $(active).removeClass("active");
      $(active).css("top", "100%");
      animate = true;
      clikBtn = true;
    });
  }
  function setPrevSlider() {
    animate = false;
    let active = prevSliders.eq(prevIndex);
    getSliderData(active);
    getPrevIndex();
    let prev = prevSliders.eq(prevIndex);

    $(active).animate({ top: "100%" }, duration);

    $(prev).animate({ top: "0%" }, duration, () => {
      $(prev).addClass("active");
      $(active).removeClass("active");
      $(active).css("top", "-100%");
      animate = true;
      clikBtn = true;
    });
  }
  function getSliderData(active) {
    activeItem.src = active.attr("data-src");
    activeItem.title = active.attr("data-title");
    activeItem.tech = active.attr("data-tech");
    activeItem.link = active.attr("data-link");
  }
  function setImagePreview() {
    imagePreview.fadeOut(duration / 2, function () {
      $(this)
        .attr("src", activeItem.src)
        .fadeIn(duration / 2);
    });
  }
  function setSliderData() {
    let sliderTitle = $(".slider__title"),
      sliderTech = $(".slider__tech"),
      sliderBtn = $(".slider__btn");

    sliderTitle.fadeOut(duration / 2, function () {
      $(this)
        .text(activeItem.title)
        .fadeIn(duration / 2);
    });
    sliderTech.fadeOut(duration / 2, function () {
      $(this)
        .text(activeItem.tech)
        .fadeIn(duration / 2);
    });
    sliderBtn.fadeOut(duration / 2, function () {
      $(this)
        .attr("href", activeItem.link)
        .fadeIn(duration / 2);
    });
  }
  function setSliders() {
    if (animate) {
      setPrevSlider();
      setNextSlider();
      setImagePreview();
      setSliderData();
    }
  }
  getSliderData(nextSliders.eq(activeIndex));
  getPrevIndex();
  getNextIndex();
  setImagePreview();
  setSliderData();

  $(nextSliders.eq(nextIndex)).addClass("active");
  $(prevSliders.eq(prevIndex)).addClass("active");

  prevBtn.on("click", () => {
    if (clikBtn) {
      clikBtn = false;
      getActiveIndex("prev");
      setSliders();
    }
  });

  nextBtn.on("click", () => {
    if (clikBtn) {
      clikBtn = false;
      getActiveIndex("next");
      setSliders();
    }
  });
};

//Feedback form blur
let blur = () => {
  const formBg = document.querySelector(".feedback-form__blur"),
    sectionBg = document.querySelector(".feedback__bg"),
    sectionBgWidth = sectionBg.offsetWidth,
    sectionBgCoordLeft = sectionBg.getBoundingClientRect().left,
    sectionBgCoordTop = sectionBg.getBoundingClientRect().top,
    formBgCoordLeft = formBg.getBoundingClientRect().left,
    formBgCoordTop = formBg.getBoundingClientRect().top,
    offsetL = sectionBgCoordLeft - formBgCoordLeft,
    offsetT = sectionBgCoordTop - formBgCoordTop;

  formBg.style.backgroundSize = sectionBgWidth + "px " + "auto";
  formBg.style.backgroundPosition = offsetL + "px " + offsetT + "px";
};

window.onload = () => {
  arrowScroll();
  menu();
  slider();
  blur();
  formValidation(".feedback-form", "/works");
  preloader();
  // new WOW().init();
};

window.onresize = function () {
  blur();
};

window.onscroll = () => {
  parallaxScroll(document.querySelector(".user"), window.pageYOffset, 25);
  parallaxScroll(
    document.querySelector(".hero__subtitle"),
    window.pageYOffset,
    10
  );
};
