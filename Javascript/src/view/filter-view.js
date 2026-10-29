import AbstractView from '../framework/view/abstract-view.js';

function createFilteredCountTemplate(count, type) {
    return `<span class="main-navigation__item-count" data-filter-type="${type}">${count}</span>`;
}

function createFilterItemTemplate(filter, currentFilterType) {
    const {type, name, count} = filter;
    
    return `
        <li class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"><a href="#${type}" data-filter-type="${type}" class="main-navigation__link">${name} ${name === 'Все альбомы' ? '' : createFilteredCountTemplate(count, type)}</a></li>
    `
}

function createFilterTemplate(filterItems, currentFilterType) {
    const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

    return `
        <nav class="main-navigation" data-menu>
            <ul class="main-navigation__list">
                ${filterItemsTemplate}
            </ul>
        </nav>`
}

export default class FilterView extends AbstractView {
    #filters = null;
    #currentFilter = null;
    #handleFilterTypeChange = null;

    constructor({filters, currentFilterType, onFilterTypeChange, onBurgerClick}){
        super();
        this.#filters = filters;
        this.#currentFilter = currentFilterType;
        this.#handleFilterTypeChange = onFilterTypeChange;

        this.element.addEventListener('click', this.#filterTypeChangeHandler);
    }

    get template() {
        return createFilterTemplate(this.#filters, this.#currentFilter);
    }

    #filterTypeChangeHandler = (evt) => {
        evt.preventDefault();
    
        if (evt.target.dataset.filterType) {
          this.#handleFilterTypeChange(evt.target.dataset.filterType);
        }
    };
}