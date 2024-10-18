import ApiService from './api-service';

export default class CommentsApiService extends ApiService {
  async getComments(id) {   

    if (ApiService.getLocalStorage('comments')) {
      
      return new Promise(resolve => {
        let comments = ApiService.getLocalStorage('comments');
        resolve(comments[id])        
      })
    } else {
      return this._load({url: 'comments.json'})
        .then(ApiService.parseResponse)
        .then(response => ApiService.setLocalStorage(response, 'comments'))
        .then(ApiService.getLocalStorage('comments')[id]);
    }

  }

  async addComment(id, comment) {
    let comments =  ApiService.getLocalStorage('comments');
    let albums =  ApiService.getLocalStorage('albums');
    let commentsIds = comments.flat().map(item => item.id);    
    let newCommentId = (Math.max(...commentsIds) + 1).toString();   
    let newComment = {
      author: "Tom Hanks",
      comment: comment.comment,
      date: new Date(),
      emotion: comment.emotion,
      id: newCommentId,
    }
    let updatedFilms = albums.map(album => ({...album, comments: album.id === id ? [...album.comments, newCommentId] : album.comments}));
    let updatedComments = comments.map((comment, i) => (+i === +id ? [...comment, newComment] : [...comment]))

    ApiService.setLocalStorage(updatedFilms, 'albums');
    ApiService.setLocalStorage(updatedComments, 'comments'); 

    return new Promise(resolve => {
      resolve(ApiService.getLocalStorage('comments')[id])
    }) 
  }

  async deleteComment(id) {
    let comments =  ApiService.getLocalStorage('comments');
    let albums =  ApiService.getLocalStorage('albums');

    let updatedFilms = albums.map(album => ({...album, comments: album.comments.filter(commentId => commentId !== id)}))
    let updatedComments = comments.map(comment => comment.filter(item => item.id !== id))
    ApiService.setLocalStorage(updatedFilms, 'albums');
    ApiService.setLocalStorage(updatedComments, 'comments'); 
  
    return new Promise(resolve => {
      resolve()
    }) 
  }
}
