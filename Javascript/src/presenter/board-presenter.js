import {render, remove, replace, RenderPosition} from '../framework/render';
import SortView from '../view/sort-view';
import AlbumsListView from '../view/album-list-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import EmptyListView from '../view/empty-list-view';
import {ALBUM_COUNT_PER_STEP, FilterType, SortType, Titles, UserAction, UpdateType} from '../consts';
import {filter} from '../utils/filter';
import {isExtra, sortByDate, sortByTrack, getMostCommentedAlbums} from '../utils/album';
import AlbumPresenter from './album-prsenter'

export default class BoardPresenter {
    #boardContainer = null;
    #filterModel = null;
    #albumsModel = null; 
    #commentsModel = null;
    #sortComponent = null;
    #noAlbumComponent = null;
    #loadMoreButtonComponent = null;
    #filterType = FilterType.ALL;
    #currentSortType = SortType.DEFAULT;
    #renderedAlbumCount = ALBUM_COUNT_PER_STEP;
    #albumsPresenter = new Map();

    #mostCommentedAlbumsListComponent = new AlbumsListView(isExtra, Titles.MOST_COMMENTED);
    #albumsListComponent = new AlbumsListView();


    constructor({boardContainer, filterModel, albumsModel, commentsModel}) {
        this.#boardContainer = boardContainer;
        this.#filterModel = filterModel;
        this.#albumsModel = albumsModel;
        this.#commentsModel  = commentsModel;       

        this.#albumsModel.addObserver(this.#handleModelEvent);
        this.#filterModel.addObserver(this.#handleModelEvent);
        this.#commentsModel .addObserver(this.#handleModelEvent);
    }

    get albums() {
        this.#filterType = this.#filterModel.filter;
        const albums = [...this.#albumsModel.albums];
        const filteredAlbums = filter[this.#filterType](albums);        

        switch (this.#currentSortType) {
            case SortType.DATE:
                return filteredAlbums.sort(sortByDate);
            case SortType.TRACK:
                return filteredAlbums.sort(sortByTrack);               
        }

        return filteredAlbums;
    }

    init() {
        this.#renderBoard();
    }

    #renderBoard(){
        const albums = this.albums;
        const albumCount = albums.length;

        if (albumCount === 0) {
            this.#renderNoAlbums();
            return;
        } 
        render(this.#albumsListComponent, this.#boardContainer);
        this.#renderSort();
        this.#renderAlbums(albums.slice(0, Math.min(albumCount, this.#renderedAlbumCount)));
        if (albumCount > this.#renderedAlbumCount) {
            this.#renderLoadMoreButton();
        }

    }

    #renderNoAlbums(){
        remove(this.#albumsListComponent);
        remove(this.#mostCommentedAlbumsListComponent);
        const prevAlbumComponent = this.#noAlbumComponent;       
  
        this.#noAlbumComponent = new EmptyListView({
            filterType: this.#filterType
        });

        if (prevAlbumComponent === null) {
            render(this.#noAlbumComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
        } else {
            replace(this.#noAlbumComponent, prevAlbumComponent);
            remove(prevAlbumComponent);
        }        
    }

    #clearBoard({resetSortType = false} = {}){
        const albumCount = this.albums.length;

        this.#albumsPresenter.forEach((presenter) => presenter.destroy());
        this.#albumsPresenter.clear();
        remove(this.#sortComponent);    
        remove(this.#loadMoreButtonComponent);
         


        this.#renderedAlbumCount = ALBUM_COUNT_PER_STEP;
        if (albumCount !== 0 && this.#noAlbumComponent) {            
            remove(this.#noAlbumComponent);
            this.#noAlbumComponent = null;
        } 

      
        if (resetSortType) {
            this.#currentSortType = SortType.DEFAULT;
        }

    }

    #renderSort() {
        this.#sortComponent = new SortView({
          currentSortType: this.#currentSortType,
          onSortTypeChange: this.#handleSortTypeChange
        });       
    
        render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
       
    }

    #handleSortTypeChange = (sortType) => {
        if (this.#currentSortType === sortType) {
          return;
        }        
        
        this.#currentSortType = sortType;
        this.#renderedAlbumCount = ALBUM_COUNT_PER_STEP;
        this.#clearBoard();
        this.#renderBoard();
    };

    #renderAlbums(albums){
        albums.forEach((album) => this.#renderAlbum(album));
    }

    #renderAlbum(album) {
        const albumPresenter = new AlbumPresenter({
            boardContainer: this.#boardContainer,
            albumListContainer: this.#albumsListComponent.element.querySelector('.albums-list__container'),
            filterType: this.#filterType,
            onDataChange: this.#handleViewAction,
            onModeChange: this.#handleModeChange,
        });
    
        albumPresenter.init(album, this.#commentsModel );
        this.#albumsPresenter.set(album.id, albumPresenter);
    }

    #handleViewAction = async (actionType, updateType, update) => {
        try {
            switch (actionType) {
                case UserAction.UPDATE_ALBUM:                    
                    await this.#albumsModel.updateAlbum(updateType, update);
                    break;
                case UserAction.ADD_COMMENT:
                    await this.#commentsModel .addComment(updateType, update);
                    break;
                case UserAction.DELETE_COMMENT:
                    await this.#commentsModel .deleteComment(updateType, update);
                    break;
            }
        }
        catch(err){

        }
    };

    #handleModelEvent = async (updateType, data) => {   
 
        switch (updateType) {
            case UpdateType.PATCH: 
                let commentsForFilm = await this.#commentsModel .getComments(data.id);          
                if (this.#albumsPresenter.get(data.id)) {
                    this.#albumsPresenter.get(data.id).init(data, commentsForFilm);
                
                }
                break;
            case UpdateType.MAJOR:                
                this.#clearBoard({ resetSortType: true});
                this.#renderBoard();
                break;
            case UpdateType.MINOR:
                this.#clearBoard();
                this.#renderBoard();
                break;
            case UpdateType.INIT:
                this.#renderBoard();
                break;
        }
    }

    #handleModeChange = () => {      
        this.#albumsPresenter.forEach((presenter) => presenter.resetView());
    };

    #renderLoadMoreButton() {
        this.#loadMoreButtonComponent = new LoadMoreButtonView({
          onClick: this.#handleLoadMoreButtonClick,
        });
    
        render(this.#loadMoreButtonComponent, this.#albumsListComponent.element);
    }

    #handleLoadMoreButtonClick = () => {
        const albumsCount = this.albums.length;
        const newRenderedFilmCount = Math.min(albumsCount, this.#renderedAlbumCount + ALBUM_COUNT_PER_STEP);
        const albums = this.albums.slice(this.#renderedAlbumCount, newRenderedFilmCount);
        this.#renderAlbums(albums);
        this.#renderedAlbumCount = newRenderedFilmCount;
    
        if(this.#renderedAlbumCount >= albumsCount) {
          remove(this.#loadMoreButtonComponent);
        }
    };
    
}
