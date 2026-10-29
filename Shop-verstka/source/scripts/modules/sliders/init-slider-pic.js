export const initSliderPic = () => {
  const sliders = document.querySelectorAll('[data-slider="img"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const swiperImg = new Swiper(slider, {
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

    });

    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
    });
    lightbox.on('close', () => {
      swiperImg.slides[swiperImg.realIndex].querySelector('.glightbox').focus()
    });
    lightbox.on('slide_changed', ({ current }) => {
      const activeIndex = current.index;
      swiperImg.slideTo(activeIndex, 300);
    });
  })
}