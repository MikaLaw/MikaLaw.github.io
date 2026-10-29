import ApiService from './api-service';

export default class AlbumsApiService extends ApiService {

  get albums() {    
    if (ApiService.getLocalStorage('albums')) {
      return new Promise(resolve => {
        resolve( ApiService.getLocalStorage('albums'))
      })
    } else {
      return this._load({url: 'albums.json'})
      .then(ApiService.parseResponse)
      .then(response => ApiService.setLocalStorage(response, 'albums'))
      .then(ApiService.getLocalStorage('albums'))       
    }

  }

  async updateAlbum(album) {   
    let albums =  ApiService.getLocalStorage('albums');    
    let updatedAlbumInd = albums.findIndex(el => el.id === album.id);    
    let newAlbums = [...albums.slice(0, updatedAlbumInd), this.#adaptToServer(album), ...albums.slice(updatedAlbumInd + 1)];
    ApiService.setLocalStorage(newAlbums, 'albums');

    return new Promise(resolve => {
      resolve( ApiService.getLocalStorage('albums').find(el => el.id === album.id))
    }) 
  }

  #adaptToServer(album) {
    const adaptedAlbum = {
      ...album,
      'album_info': {
        ...album.albumInfo,
        'track_count' : album.albumInfo.trackCount,
        'release': {
          ...album.albumInfo.release,
          'release_country': album.albumInfo.release.releaseCountry,
        }
      },
      'user_details': {
        ...album.userDetails,
        'already_watched': album.userDetails.watched,
      }
    };

    delete adaptedAlbum.albumInfo;
    delete adaptedAlbum['album_info'].tracCount;
    delete adaptedAlbum['album_info'].release.releaseCountry;
    delete adaptedAlbum.userDetails;
    delete adaptedAlbum['user_details'].watched;

    return adaptedAlbum;
  }
}
