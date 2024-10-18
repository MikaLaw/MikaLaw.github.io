import Observable from '../framework/observable';
import {UpdateType} from '../consts';

export default class AlbumModel extends Observable {
  #albumsApiService = null;
  #albums= [];

  constructor({albumsApiService}) {
    super();
    this.#albumsApiService = albumsApiService;
  }

  get albums() {
    return this.#albums;
  }

  async init() {
    
    try {
  
      const albums = await this.#albumsApiService.albums;    
      this.#albums = albums.map(album => this.#adaptToClient(album));    
          
    } catch(err) {
      this.#albums = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateAlbum(updateType, update) {
    const index = this.#albums.findIndex((album) => album.id === update.album.id);

    if (index === -1) {
      throw new Error(ErrorMessage.UPDATE_ALBUM);
    }

    try {     
      const response = await this.#albumsApiService.updateAlbum(update.album);
      const updatedAlbum = this.#adaptToClient(response);
      this.#albums = [
        ...this.#albums.slice(0, index),
        updatedAlbum,
        ...this.#albums.slice(index + 1),
      ];
      this._notify(updateType, updatedAlbum);
    } catch(err) {
      throw new Error(ErrorMessage.UPDATE_ALBUM);
    }
  }

  setFilter(updateType, filter) {
    this.#albums = filter;
    this._notify(updateType, filter);
  }

  #adaptToClient(album) {    
    const adaptedAlbum = {
      ...album,
      albumInfo: {
        ...album['album_info'],
        trackCount: album['album_info']['track_count'],
        release: {
          ...album['album_info']['release'],
          releaseCountry: album['album_info']['release']['release_country']
        }
      },
      userDetails: {
        ...album['user_details'],
        watched: album['user_details']['already_watched'],
      }
    };
    

    delete adaptedAlbum['album_info'];    
    delete adaptedAlbum.albumInfo['track_count'];    
    delete adaptedAlbum.albumInfo.release['release_country'];
    delete adaptedAlbum['user_details'];
    delete adaptedAlbum.userDetails['already_watched'];

    return adaptedAlbum;
  }
}
