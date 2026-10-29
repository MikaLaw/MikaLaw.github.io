export const initSliderCustom = () => {
  const sliders = document.querySelectorAll('[data-slider="custom"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {    
    const swiperBottom = new Swiper(slider.querySelector('[data-slider="custom-Bottom"]'), {
      a11y: true,
      slidesPerView: 1,
      breakpoints: {
        1024: {
          watchSlidesProgress: true,
          freeMode: true,
          direction: 'vertical', // для корректной логики, хотя CSS переопределит вид
          slidesPerView: 'auto', // или число всех слайдов
          allowTouchMove: false, // отключаем свайп, так как это просто список
        },
      },
    })

    const swiperTop = new Swiper(slider.querySelector('[data-slider="custom-Top"]'), {
      a11y: true,
      spaceBetween: 10,
      effect: 'fade',
      enabled: false,
      breakpoints: {
        1024: {
          enabled: true,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperBottom,
      },
      on: {
        init() {
          const thumbSlides = swiperBottom.slides;
          thumbSlides.forEach((slide, index) => {
            slide.addEventListener('mouseenter', () => {
              this.slideToLoop(index, 0);
            });
          });
          thumbSlides.forEach((slide) => {
            slide.addEventListener('mouseleave', () => {
              slide.classList.remove('is-hover');
            });
          });
        },
        slideChangeTransitionStart() {
          const activeIndex = this.realIndex;
          swiperBottom.slides.forEach((slide, idx) => {
            slide.classList.toggle('swiper-slide-thumb-active', idx === activeIndex);
            slide.classList.toggle('is-hover', idx === activeIndex);
          });
        },
      },
    })
  })
}