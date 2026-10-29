export default class BgVideo {
  #container;
  #video;
  #toggleBtn;
  #motionQuery;
  #observer;
  #options;
  #mediaQuery = window.matchMedia('(max-inline-size: 1279px)');
  #state = {
    userPaused: false,
    isError: false,
  };

  constructor(component, options = {}) {
    if (!component) return;

    this.#container = component;
    this.#video = component.querySelector("video");
    this.#toggleBtn = component.querySelector(".bg-video__control");
    this.#motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.#options = options;
    this.abortController = new AbortController();

    this.#init();
  }

  #init() {
    if (!this.#video) return;

    const { signal } = this.abortController;

    if (this.#motionQuery.matches) {
      this.#state.userPaused = true;
      this.#video.autoplay = false;
      this.#video.pause();
      this.#updateUI(true);
    }

    if (this.#options.observer !== false) {
      this.#observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !this.#state.userPaused) {
          this.play(false);
        } else {
          this.#video.pause();
        }        
      },{ threshold: this.#options.threshold || 0.15 });

      this.#observer.observe(this.#container);
    }

    this.#mediaQuery.addEventListener('change', this.#handleSourceUpdate,{ signal });
    this.#toggleBtn?.addEventListener('click', this.#handleToggle,{ signal });

    this.#video.addEventListener('error', (e) => { 
      this.#state.isError = true; 
      this.#updateUI(true);
      console.error(e, 'err')      
    });
    this.#video.addEventListener('loadedmetadata', () => { 
      this.#state.isError = false; 
    });

    this.#handleSourceUpdate();
  }

  #handleSourceUpdate = () => {
    const { mobile, desktop, posterMobile, posterdesktop } = this.#video.dataset;
    const isMobile = this.#mediaQuery.matches;
    
    const nextSrc = isMobile ? mobile : desktop;
    const nextPoster = isMobile ? posterMobile : posterdesktop;

    // Сравниваем абсолютные URL, чтобы избежать повторной загрузки
    const absoluteNextSrc = nextSrc ? new URL(nextSrc, document.baseURI).href : '';

    if (nextSrc && this.#video.currentSrc !== absoluteNextSrc) {
      this.#state.isError = false;
      this.#video.poster = nextPoster ?? '';
      this.#video.src = nextSrc;
    }
  };

  play(resetCurrentTime = true) {
    if (!this.#video || this.#state.isError || this.#state.userPaused) return;
    if(resetCurrentTime) this.#video.currentTime = 0;

    this.#video.play()
      .then(() => this.#updateUI(false))
      .catch((err) => {
        if (err.name !== 'NotAllowedError') {
          this.#state.isError = true;
        }
        this.#updateUI(true)
      })
  }

  pause() {
    this.#video.pause();
    this.#updateUI(true);
  }

  #handleToggle = () => {
    if (this.#video.paused) {
      this.#state.userPaused = false;
      this.play(false);      
    } else {
      this.#state.userPaused = true;
      this.pause();      
    }
  }

  #updateUI(isPaused) {
    if (!this.#toggleBtn) return;
    const { labelPlay, labelPause } = this.#toggleBtn.dataset;      
    this.#toggleBtn.ariaLabel = isPaused ? labelPlay : labelPause;
    this.#toggleBtn.classList.toggle('is-paused', isPaused);
    if(this.#state.isError) this.#toggleBtn.disabled = true;
  }

  destroy() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }

    this.abortController.abort();
    this.#container = null;
    this.#video = null;
    this.#toggleBtn = null;
  }
}
