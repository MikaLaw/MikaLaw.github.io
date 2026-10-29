export default class Cookies {
  #cookieName = 'cookie_consent_status';
  #bannerElement;

  constructor(component) {
    this.#bannerElement = component;
    if (!this.#bannerElement) return;
    
    this.#init();
  }

  #init() {
    if (!this.#getConsentStatus()) {
      this.#bannerElement.show(); 
      this.#bannerElement.addEventListener('click', this.#onBannerClick);
    }
  }

  #onBannerClick = (event) => {
    const actionButton = event.target.closest('[data-cookie-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.cookieAction;
    this.#handleAction(action);
  };

  #handleAction(action) {
    this.#setConsentStatus(action);
    this.#bannerElement.close();
    
    const consentEvent = new CustomEvent('cookieConsentChange', {
      detail: { status: action },
      bubbles: true
    });
    document.dispatchEvent(consentEvent);
  }

  #getConsentStatus() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${this.#cookieName}=`))
      ?.split('=')[1];
  }

  #setConsentStatus(status) {
    const maxAgeOneYear = 31536000;    

    const isSecure = window.location.protocol === 'https:';
    let cookieString = `${this.#cookieName}=${status}; max-age=${maxAgeOneYear}; path=/; SameSite=Lax`;
    
    if (isSecure) {
      cookieString += '; Secure; Partitioned';
    }

    document.cookie = cookieString;
  }

  destroy() {
    if (!this.#bannerElement) return;
    
    this.#bannerElement.removeEventListener('click', this.#onBannerClick);
    this.#bannerElement.close();
    this.#bannerElement = null;
  }
}