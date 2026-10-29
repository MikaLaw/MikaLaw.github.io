export const initSliderThumb = () => {
  const sliders = document.querySelectorAll('[data-slider="card-gallery"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const swiperbottom = new Swiper(slider.querySelector('[data-slider="card-bottom"]'), {
      a11y: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const swipertop = new Swiper(slider.querySelector('[data-slider="card-top"]'), {
      a11y: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperbottom,
      },
    });

    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
    });
    
    lightbox.on('slide_changed', ({ current }) => {
      const activeIndex = current.index;
      swipertop.slideTo(activeIndex, 300);
    });
  })
}