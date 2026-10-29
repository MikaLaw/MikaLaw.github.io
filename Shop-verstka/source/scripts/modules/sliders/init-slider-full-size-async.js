import BgVideo from '../bg-video/bg-video';

export const initSliderFullSizeAsync = () => {
  const sliders = document.querySelectorAll('[data-slider-full-size-async]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const videoPlayers = new Map();
    const bgSliderContainer = slider.querySelector('[data-slider-full-size-async-bg]');
    const contentSliderContainer = slider.querySelector('[data-slider-full-size-async-content]');

    const bgSlider = new Swiper(bgSliderContainer, {
      effect: 'fade',
      allowTouchMove: false, // Отключаем прямое управление
      fadeEffect: { crossFade: true },
      on: {
        init: (instance) => {
          instance.el.querySelectorAll('[data-bg-video]').forEach(container => {
            const video = container.querySelector('video');
            if (video) {
              videoPlayers.set(video, new BgVideo(container));
            }
          });
        },
        slideChange: (instance) => {
          playActiveVideo(instance);
        }
      }
    });

    const mainSlider = new Swiper(contentSliderContainer, {
      parallax: true,
      a11y: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination', 
        clickable: true,
        bulletElement: 'button',
        dynamicBullets: true,
        dynamicMainBullets: 3,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      controller: {
        control: [bgSlider],
        by: 'container'
      },
      on: {
        init: (instance) => {
          updateSlideState(instance)
        },
        slideChange: (instance) => {
          updateSlideState(instance);
        }
      }
    });

    function updateSlideState(instance) {
      instance.slides.forEach((slide, idx) => {
        const isVisible = idx === instance.activeIndex;
        slide.toggleAttribute('inert', !isVisible);
      });
    }

    function playActiveVideo(instance) {
      const activeSlide = instance.slides[instance.activeIndex]; 
      instance.slides.forEach((slide) => {
        const videoElement = slide.querySelector('video');
        if(videoElement){          
          if (slide === activeSlide) {
            videoPlayers.get(videoElement).play();
          } else {
            videoPlayers.get(videoElement).pause();
          }
        }
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      const activeSlideVideo = bgSlider.slides[bgSlider.activeIndex].querySelector('video');
      if (entry.isIntersecting) {
        if(activeSlideVideo) {
          videoPlayers.get(activeSlideVideo).play()
        }
        mainSlider.autoplay.start();
      } else {
        if(activeSlideVideo) {
          videoPlayers.get(activeSlideVideo).pause()
        }
        mainSlider.autoplay.stop();
      }
    }, { threshold: 0.15 });
    observer.observe(slider);

    bgSlider.controller.control = mainSlider;
  })
}