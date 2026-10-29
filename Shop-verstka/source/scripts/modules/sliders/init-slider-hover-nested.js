export const initSliderHoverNested = () => {
  const sliders = document.querySelectorAll('[data-slider-trigger="hover"][data-slider="nested"]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    new Swiper(slider, {
      a11y: true,
      effect: 'fade',
      nested: true,
      pagination: {
        el: '.swiper-pagination', 
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" tabindex="-1" role="presentation"></span>`;
        },
      },
      on: {
        init() {
          const bullets = this.pagination.bullets;
          bullets.forEach((bullet, index) => {
            bullet.addEventListener('mouseenter', () => {
              this.slideToLoop(index, 0);
            });
          });
        },
      },
    });
  });
}