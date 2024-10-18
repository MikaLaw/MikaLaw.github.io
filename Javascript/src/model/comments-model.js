import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = null;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  async getComments(id) {
    try {
      this.#comments = await this.#commentsApiService.getComments(id);
    } catch(err) {
      this.#comments = [];
    }
    return this.#comments;
  }

  async addComment(updateType, update) {
    try {
      const newData = await this.#commentsApiService.addComment(update.album.id, update.comment);
      const album = {
        ...update.album,
        comments: newData,
      };
      this._notify(updateType, album);
    } catch(err) {
      throw new Error(ErrorMessage.ADD_COMMENT);
    }
  }

  deleteComment(updateType, update) {
    return this.#commentsApiService.deleteComment(update.commentId)
      .then(() => {
        const album = {
          ...update.album,
          comments: update.album.comments.filter((comment) => comment !== update.commentId),
        };
        
        this._notify(updateType, album);
      });
  }
}
