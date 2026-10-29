import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../consts.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'Нет альбомов',
  [FilterType.WATCHLIST]: 'Нет отложенных альбомов',
  [FilterType.HISTORY]: 'Нет прослушенных альбомов',
  [FilterType.FAVORITES]: 'Нет альбомов в избранном',
};

function createEmptyListTemplate(filterType) {
  const noFilmTextValue = NoFilmsTextType[filterType];

  return `<section class="albums-list">
    <h2 class="films-list__title">${noFilmTextValue}</h2>
  </section>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
