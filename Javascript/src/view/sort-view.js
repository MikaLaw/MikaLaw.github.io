import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../consts'


const createSortTemplate = (currentSortType) => {
    const sortTypeName =  {
        [SortType.DEFAULT]: 'По умолчанию',
        [SortType.DATE]: 'По дате выхода',
        [SortType.TRACK]: 'По количеству треков',
    };
    const sortfilters = Object.entries(sortTypeName).map(([type, title]) => `<li class="sort__item"><button class="sort__button ${currentSortType === type ? 'sort__button--active' : ''}" data-sort-type="${type}">${title}</button></li>`).join('');
    
    return `
        <ul class="sort">
            ${sortfilters}
        </ul>
    `
}

export default class SortView extends AbstractView {
    #currentSortType = null;
    #handleSortTypeChange = null;

    constructor({currentSortType, onSortTypeChange}){
        super();
        this.#currentSortType = currentSortType;
        this.#handleSortTypeChange = onSortTypeChange;
    
        this.element.addEventListener('click', this.#sortTypeChangeHandler);
    }

    get template() {
        return createSortTemplate(this.#currentSortType);
    }

    #sortTypeChangeHandler = (evt) => {
        if (!evt.target.classList.contains('sort__button')) {
          return;
        }
    
        evt.preventDefault();
        this.#handleSortTypeChange(evt.target.dataset.sortType);    
    }
}