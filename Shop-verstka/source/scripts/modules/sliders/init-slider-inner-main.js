export const initSliderInnerMain = () => {
  const sliders = document.querySelectorAll('[data-slider="parent"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    new Swiper(slider, {
      a11y: true,
      slidesPerView: 1,
      spaceBetween: 30,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
  });
}