import AbstractView from '../framework/view/abstract-view';
import {getDigitToWord} from '../utils/album'

function getControlsClassName(control) {
  return control ? 'album-card__controls-item--active' : '';
}

function createAlbumTemplate(album) {

  const {albumInfo, comments, userDetails} = album;

  const {title, cover, artist, genre, release, trackCount} = albumInfo;
  const {watchlist, watched, favorite} = userDetails;
  const dateModify = new Date(release.date).toLocaleString('ru-RU', {  year: 'numeric', month: 'long', day: 'numeric' })
  const trackCountMofify = getDigitToWord(trackCount, ['трэк', 'трека', 'треков']);
  const commentsMofify = getDigitToWord(comments.length, ['комментарий', 'комментария', 'комментариев']);

  return `<article class="album-card">          
          <div class="album-card__cover-container">
            <a href="#" class="album-card__link"><img src=${cover} alt="" class="album-card__cover"></a>
            <div class="album-card__content">
              <h3 class="album-card__title">${title}</h3>
              <p class="album-card__artist">${artist}</p>
              <p class="album-card__info">
                <span class="album-card__year">${dateModify }</span>
                <span class="album-card__duration">${trackCountMofify}</span>
                <span class="album-card__genre">${genre}</span>
              </p>   
              <div class="album-card__comments-container">
                <button class="album-card__comments">${commentsMofify}</button >
                <form class="album-card__controls">
                  <button class="album-card__controls-item button album-card__controls-item--add-to-watchlist ${getControlsClassName(watchlist)}" aria-label="Добавить в Отложенное" id="watchlist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                      <path d="M5 19.6693V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V19.6693C19 20.131 18.4277 20.346 18.1237 19.9985L12 13L5.87629 19.9985C5.57227 20.346 5 20.131 5 19.6693Z" stroke="currentColor" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="album-card__controls-item button album-card__controls-item--mark-as-watched ${getControlsClassName(watched)}" aria-label="Пометить как прослушенное" id="watched">                
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="album-card__controls-item button album-card__controls-item--favorite ${getControlsClassName(favorite)}" aria-label="Поместить в Избранное" id="favorite">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="currentColor"/>
                    </svg>
                  </button>
                </form>   
              </div>        
            </div>
          </div>         
          
        </article>`;
}

export default class AlbumView extends AbstractView {
  #album = null;
  #handleDetailsClick = null;
  #handleControlsClick = null;

  constructor({album, onDetailsClick, onControlsClick}) {
    super();
    this.#album = album;
    this.#handleDetailsClick = onDetailsClick;
    this.#handleControlsClick = onControlsClick;

    this.element.querySelector('.album-card__link').addEventListener('click', this.#detailsClickHandler);
    this.element.querySelector('.album-card__controls').addEventListener('click', this.#controlsClickHandler);
  }

  get template() {
    return createAlbumTemplate(this.#album);
  }

  #detailsClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDetailsClick();    
  };

  #controlsClickHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.closest('.album-card__controls-item')) {
      return;
    }  
    this.#handleControlsClick(evt.target.closest('.album-card__controls-item'));
  };
}
