export const initSliderInnerNested = () => {
  const sliders = document.querySelectorAll('[data-slider-trigger="click"][data-slider="nested"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    new Swiper(slider, {
      a11y: false,
      nested: true,
      pagination: {
        el: '.swiper-pagination', 
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" tabindex="-1" role="presentation"></span>`;
        },
      },
    });
  });
}