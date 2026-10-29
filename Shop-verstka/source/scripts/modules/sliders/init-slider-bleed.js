export const initSliderBleed = () => {
  const sliders = document.querySelectorAll('[data-slider="card-bleed"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const swiper = new Swiper(slider, {
      a11y: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
        },
        480: {
          slidesPerView: 1.7,
        },
        768: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        },
      },
    });
  });
}