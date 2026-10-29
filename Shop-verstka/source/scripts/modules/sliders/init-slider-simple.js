export const initSliderSimple = () => {
  const sliders = document.querySelectorAll('[data-slider="card"]');
  const slidersStockMain = document.querySelectorAll('[data-slider="card-stock-main"]');

  sliders?.forEach((slider) => {
    new Swiper(slider, {
      a11y: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
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

  slidersStockMain?.forEach((slider) => {
    new Swiper(slider, {
      a11y: true,
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        480: {
          slidesPerView: 1.2,
        },
        768: {
          slidesPerView: 1.6,
        },
        1280: {
          slidesPerView: 2.2,          
        },
      },
    });
  }); 
}
