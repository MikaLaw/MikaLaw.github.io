import {Mode, UserAction, UpdateType, FilterType} from '../consts.js';
import {render, remove, replace} from '../framework/render';
import AlbumView from '../view/album-view';
import AlbumDetailsView from '../view/album-detail-view';

export default class AlbumPresenter {
    #album = null;
    #albumComponent = null;
    #comments = null;
    #albumDetailsComponent = null;
    #albumListContainer = null;
    #boardContainer = null;
    #handleDataChange = null;
    #handleModeChange = null;
    #mode = Mode.DEFAULT;
    #filterType = null;

    constructor({boardContainer, albumListContainer, filterType, onDataChange, onModeChange}){
        this.#boardContainer = boardContainer;
        this.#albumListContainer = albumListContainer;
        this.#filterType = filterType;
        this.#handleDataChange = onDataChange;
        this.#handleModeChange = onModeChange;
    }

    init(album, comments) {
     
        this.#album = album;
        this.#comments = comments;     
        
        const prevAlbumComponent = this.#albumComponent; 
        const prevAlbumDetailsComponent = this.#albumDetailsComponent;   
        
        this.#albumComponent = new AlbumView({
            album: this.#album,
            onDetailsClick: this.#handleDetailsClick,
            onControlsClick:this.#handleControlsClick,
        });
        this.#albumDetailsComponent = new AlbumDetailsView({
          album: this.#album,
          comments: this.#comments,
          onDetailsClose: this.#handleDetailsClose,
          onControlsClick:this.#handleControlsClick,
          onDeleteClick: this.#handleDeleteClick,
          onCommentAdd: this.#handleCommentAdd,
        });
        
        if (prevAlbumComponent === null || prevAlbumDetailsComponent === null) {
            render(this.#albumComponent, this.#albumListContainer);
            return;
        }       
        if (this.#mode === Mode.DEFAULT) {
          replace(this.#albumComponent, prevAlbumComponent);
        }     
        if (this.#mode === Mode.DETAILS) {

          replace(this.#albumDetailsComponent, prevAlbumDetailsComponent);
          replace(this.#albumComponent, prevAlbumComponent);
          const scrollPosition = prevAlbumDetailsComponent.getScrollPosition();
          this.#albumDetailsComponent.setScrollPosition(scrollPosition);
          return;
        }  
        remove(prevAlbumComponent);
        remove(prevAlbumDetailsComponent);       
    }

    resetView() {
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceFormToCard();
      }
    }

    destroy() {
      remove(this.#albumComponent);
    }

    #handleDetailsClick = () => {
      this.#replaceCardToForm();
    };
    
    #handleControlsClick = (control) => {
        let updateType;
        if (this.#filterType === FilterType.ALL || !this.#filterType){
          updateType = UpdateType.PATCH;
        } else {
          updateType = UpdateType.MINOR;
        }

        this.#handleDataChange(
          UserAction.UPDATE_ALBUM,
          updateType,
          {
            album: {...this.#album,
              userDetails: {
                ...this.#album.userDetails,
                [control.id]: !this.#album.userDetails[control.id],
              }
            }
          });
    };

    #handleDetailsClose = () => {
      this.#replaceFormToCard();
    };

    async #replaceCardToForm(){  
      if (!this.#comments.length){
        const commentsForFilm = await this.#comments.getComments(this.#album.id);
        this.#albumDetailsComponent.setComments(commentsForFilm);
      }   

      document.querySelector('body').append(this.#albumDetailsComponent.element);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#handleModeChange();
      this.#mode = Mode.DETAILS;
      this.#albumDetailsComponent.resetForm();
    }

    #replaceFormToCard(){
      remove(this.#albumDetailsComponent);      
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    }

    #escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceFormToCard();
      }
    };

    #handleDeleteClick = (commentId) => {
      this.#handleDataChange(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        {
          commentId,
          album: this.#album,
        }
      );
    };

    #handleCommentAdd = (comment) => {
      const album = this.#album;
      this.#handleDataChange(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          comment,
          album
        },
      );
    };
}
