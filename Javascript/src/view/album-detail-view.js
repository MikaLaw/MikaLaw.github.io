import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {getDigitToWord, isCtrlPlusEnterPressed} from '../utils/album';
import {EMOTIONS} from '../consts';
import he from 'he';

function getControlsClassName(control) {
    return control ? 'album-details__control-button--active' : '';
}
  
function createEmotionTemplate(checkedEmoji, emotions) {
    return emotions.map((emotion) => `
      <input class="album-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${checkedEmoji === emotion ? 'checked' : ''} >
        <label class="album-details__emoji-label" for="emoji-${emotion}">
            <img id="${emotion}" src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>
    `).join(' ');
  }

const createcommentsTemplate = (commentsModel) => {
    const commentsArray =  commentsModel.length ? commentsModel.map(comment => 
        `<li class="album-details__comment">
            <span class="album-details__comment-emoji">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="album-details__comment-text">${comment.comment}</p>
              <p class="album-details__comment-info">
                <span class="album-details__comment-author">${comment.author}</span>
                <span class="album-details__comment-day">${new Date(comment.date).toLocaleString('ru-RU', {  year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <button class="album-details__comment-delete" id="${comment.id}">Удалить</button>
              </p>
            </div>
          </li>`
    ) : ''

    return `
        <ul class="album-details__comments-list">
            ${commentsArray}
        </ul>
    `
}


function createAlbumDetailsTemplate(album, comments, addedComment) {
    const {userComment, checkedEmoji} = addedComment;
    const {albumInfo, userDetails} = album;
    const {title, label, cover, artist, description, members, genre , release, runtime, trackCount} = albumInfo;
    const {watchlist, watched, favorite} = userDetails;

    const commentsTemplate = createcommentsTemplate(comments)

    return `<section class="album-details">
  <div class="album-details__inner">

    <div class="album-details__top-container">
      <section class="album-details__controls">
        <button type="button" class="album-details__control-button album-details__control-button--watchlist  ${getControlsClassName(watchlist)}" id="watchlist" name="watchlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                <path d="M5 19.6693V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V19.6693C19 20.131 18.4277 20.346 18.1237 19.9985L12 13L5.87629 19.9985C5.57227 20.346 5 20.131 5 19.6693Z" stroke="currentColor" stroke-linejoin="round"/>
            </svg>
        </button>
        <button type="button" class="album-details__control-button  album-details__control-button--watched ${getControlsClassName(watched)}" id="watched" name="watched">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button type="button" class="album-details__control-button album-details__control-button--favorite ${getControlsClassName(favorite)}" id="favorite" name="favorite">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="currentColor"/>
            </svg>
        </button>
        <div class="album-details__close">
            <button class="album-details__close-btn" type="button">close</button>
        </div>
      </section>

      <div class="album-details__info-wrap">
        <div class="album-details__cover">
          <img class="album-details__cover-img" src=${cover} alt="">
        </div>

        <div class="album-details__info">
          <div class="album-details__info-head">
            <div class="album-details__title-wrap">
              <h3 class="album-details__title">${title}</h3>
              <p class="album-details__artist">${artist}</p>
            </div>

            <div class="album-details__track">
              <p class="album-details__track-count">${ getDigitToWord(trackCount, ['трэк', 'трека', 'треков'])}</p>
            </div>
          </div>

          <table class="album-details__table">
            <tr class="album-details__row">
              <td class="album-details__term">Лейбл</td>
              <td class="album-details__cell">${label}</td>
            </tr>
            <tr class="album-details__row">
              <td class="album-details__term">Участники группы</td>
              <td class="album-details__cell">${members}</td>
            </tr>
            <tr class="album-details__row">
              <td class="album-details__term">Дата релиза</td>
              <td class="album-details__cell">${release.date}</td>
            </tr>
            <tr class="album-details__row">
              <td class="album-details__term">Продолжительность</td>
              <td class="album-details__cell">${runtime}</td>
            </tr>
            <tr class="album-details__row">
              <td class="album-details__term">Страна</td>
              <td class="album-details__cell">${release.releaseCountry}</td>
            </tr>
            <tr class="album-details__row">
              <td class="album-details__term">Жанры</td>
              <td class="album-details__cell">
                ${genre.map(item => `<span class="album-details__genre">${item}</span>`)}
            </td>
            </tr>
          </table>

          <p class="album-details__album-description">
          ${description}
          </p>
        </div>
      </div>


    </div>

    <div class="album-details__bottom-container">
      <section class="album-details__comments-wrap">
        <h3 class="album-details__comments-title">Комментарии <span class="album-details__comments-count">${comments.length}</span></h3>
        ${commentsTemplate}
        

        <form class="album-details__new-comment" action="" method="get">
          <div class="album-details__add-emoji-label"> ${checkedEmoji ? `<img src="./images/emoji/${checkedEmoji}.png" width="55" height="55" alt="emoji-${checkedEmoji}">` : ''}</div>

          <label class="album-details__comment-label">
            <textarea class="album-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" >${userComment ? userComment : ''}</textarea>
          </label>

          <div class="album-details__emoji-list">
            ${createEmotionTemplate(checkedEmoji, EMOTIONS)}
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`;
  }
  

export default class AlbumDetailsView extends AbstractStatefulView{
    #album = null;
    #comments = null;
    #handleDetailsClose = null;
    #handleControlsClick = null;
    #handleDeleteClick = null;
    #handleAddCommentSubmit = null;

    constructor({album, comments, onDetailsClose, onControlsClick, onDeleteClick, onCommentAdd}){
        super();

        this.#album = album;
        this.#comments = comments;
        this._setState(AlbumDetailsView.parseCommentToState());
        this.#handleDetailsClose = onDetailsClose;
        this.#handleControlsClick = onControlsClick;
        this.#handleDeleteClick = onDeleteClick;     
        this.#handleAddCommentSubmit = onCommentAdd;   

        this._restoreHandlers();
    }

    get template() {
        return createAlbumDetailsTemplate(this.#album, this.#comments, this._state);
    }

    _restoreHandlers() {
        this.element.querySelector('.album-details__close-btn').addEventListener('click', this.#detailsCloseHandler);
        this.element.querySelector('.album-details__controls').addEventListener('click', this.#controlsClickHandler);
        this.element.querySelectorAll('.album-details__comment-delete').forEach((deleteButton) => deleteButton.addEventListener('click', this.#commentDeleteClickHandler));
        this.element.querySelector('.album-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
        this.element.querySelector('.album-details__comment-input').addEventListener('input', this.#commentInputHandler);
        this.element.querySelector('.album-details__comment-input').addEventListener('keydown', this.#addCommentKeydownHandler);
        this.element.addEventListener('scroll', this.#scrollPositionHandler);
    }

    getScrollPosition() {
        return this._state.scrollPosition;
    }

    resetForm() {
        this.updateElement({
          userComment: '',
          checkedEmoji: '',
        });
      }
    
      static parseCommentToState() {
        return {
          checkedEmoji: null,
          userComment: null,
          isDisabled: false,
          isDeleting: false,
        };
      }

    #scrollPositionHandler = () => {
        this._setState({scrollPosition: this.element.scrollTop});
    };

    setScrollPosition(scrollPosition) {
        this.element.scrollTo(0, scrollPosition);
    }

    setComments(commentsForFilm) {
        this.#comments = commentsForFilm;
    }

    #detailsCloseHandler = (evt) => {
        evt.preventDefault();
        this.#handleDetailsClose(this.#album);
        document.querySelector('body').classList.remove('hide-overflow');
    };

    #controlsClickHandler = (evt) => {
        evt.preventDefault();

        if (!evt.target.closest('.album-details__control-button')) {
        return;
        }

        this.#handleControlsClick(evt.target.closest('.album-details__control-button'));
    };

    #commentDeleteClickHandler = (evt) => {    
        evt.preventDefault();
        this.updateElement({
            scrollPosition: this.element.scrollTop
        });        
        this.#handleDeleteClick(evt.target.id);     
        this.element.scrollTo(0, this._state.scrollPosition);     
   
    };

    #emojiClickHandler = (evt) => {
        evt.preventDefault();
        this.updateElement({
          checkedEmoji: evt.target.id,
          scrollPosition: this.element.scrollTop,
        });
        this.element.scrollTo(0, this._state.scrollPosition);
    };
    
    #commentInputHandler = (evt) => {
        this._setState({
          userComment: he.encode(evt.target.value)
        });
    };

    #addCommentKeydownHandler = (evt) => {       
        if (isCtrlPlusEnterPressed(evt)) {
          const commentToAdd = {
            comment: this._state.userComment,
            emotion: this._state.checkedEmoji
          };
          this.updateElement({
            scrollPosition: this.element.scrollTop
          });
          this.#handleAddCommentSubmit(commentToAdd);
          this.element.scrollTo(0, this._state.scrollPosition);
        }
    };

}


