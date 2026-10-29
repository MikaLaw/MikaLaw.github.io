import BgVideo from '../bg-video/bg-video';

export const initSliderFullSize = () => {
  const sliders = document.querySelectorAll('[data-slider-full-size]');
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const videoPlayers = new Map();
    const swiper = new Swiper(slider, {
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
      on: {
        init: (instance) => {
          instance.el.querySelectorAll('[data-bg-video]').forEach(container => {
            const video = container.querySelector('video');
            if (video) {
              videoPlayers.set(video, new BgVideo(container));
            }
          });
          updateSlideState(instance)
        },
        slideChange: (instance) => {
          updateSlideState(instance);
          if(videoPlayers.size !== 0) {
            playActiveVideo(instance);
          }          
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
      const activeSlideVideo = swiper.slides[swiper.activeIndex].querySelector('video');
      if (entry.isIntersecting) {
        if(activeSlideVideo) {
          videoPlayers.get(activeSlideVideo).play()
        }
        swiper.autoplay.start();
      } else {
        if(activeSlideVideo) {
          videoPlayers.get(activeSlideVideo).pause()
        }
        swiper.autoplay.stop();
      }
    }, { threshold: 0.15 });
    observer.observe(slider);
  })
}