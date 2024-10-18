import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import FilterModel from './model/filter-model';
import AlbumModel from './model/albums-model';
import CommentsModel from './model/comments-model';
import AlbumsApiService from './api/albums-api-service';
import CommentsApiService from './api/comments-api-service';
import {END_POINT} from './consts';

const bodyElement = document.querySelector('body');
const siteHeaderElement = bodyElement.querySelector('.header__container');
const siteBoardElement = bodyElement.querySelector('.album');
const albumsModel = new AlbumModel({albumsApiService: new AlbumsApiService(END_POINT)})
const commentsModel = new CommentsModel({
    commentsApiService: new CommentsApiService(END_POINT),
  });
albumsModel.init().then(() => {
    const filterModel = new FilterModel();

    const filterPresenter = new FilterPresenter({
        filterContainer: siteHeaderElement,
        filterModel,
        albumsModel
    });
    const boardPresenter = new BoardPresenter({
        boardContainer: siteBoardElement,
        filterModel,
        albumsModel,
        commentsModel
    });    
    filterPresenter.init();
    boardPresenter.init();
})
