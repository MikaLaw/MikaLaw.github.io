import AbstractView from '../framework/view/abstract-view';

function createAlbumsListTemplate(isExtra, title) {
  return `<section class="albums-list ${isExtra ? 'albums-list--extra' : ''}">
    <h2 class="albums-list__title ${isExtra ? '' : 'visually-hidden'}">${title || 'Все альбомы'}</h2>
    <div class="albums-list__container"></div>
  </section>`;
}

export default class AlbumsListView extends AbstractView{
  #isExtra = null;
  #title = null;

  constructor(isExtra, title) {
    super();
    this.#isExtra = isExtra;
    this.#title = title;
  }

  get template() {
    return createAlbumsListTemplate(this.#isExtra, this.#title);
  }
}
