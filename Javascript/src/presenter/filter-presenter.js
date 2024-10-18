import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view';
import {FilterType, UpdateType} from '../consts';
import {filter} from '../utils/filter';

export default class FilterPresenter {
    #filterContainer = null;
    #filterModel = null;
    #albumsModel = null;
    #filterComponent = null;

    constructor({filterContainer, filterModel, albumsModel}){
        this.#filterContainer = filterContainer;
        this.#filterModel = filterModel;
        this.#albumsModel = albumsModel;

        this.#albumsModel.addObserver(this.#handleModelEvent);
        this.#filterModel.addObserver(this.#handleModelEvent);
    }

    get filters() {
        const albums = this.#albumsModel.albums;
        const FilterTypeName = {
            [FilterType.ALL]: 'Все альбомы',
            [FilterType.WATCHLIST]: 'Отложенное',
            [FilterType.HISTORY]: 'История',
            [FilterType.FAVORITES]: 'Избранное',
        };
    
        return [
          {
            type: FilterType.ALL,
            name: FilterTypeName[FilterType.ALL],
            count: filter[FilterType.ALL](albums).length,
          },
          {
            type: FilterType.WATCHLIST,
            name: FilterTypeName[FilterType.WATCHLIST],
            count: filter[FilterType.WATCHLIST](albums).length,
          },
          {
            type: FilterType.HISTORY,
            name: FilterTypeName[FilterType.HISTORY],
            count: filter[FilterType.HISTORY](albums).length,
          },
          {
            type: FilterType.FAVORITES,
            name: FilterTypeName[FilterType.FAVORITES],
            count: filter[FilterType.FAVORITES](albums).length,
          },
        ];
    }

    init(){

        const filters = this.filters;
        const prevFilterComponent = this.#filterComponent;       
  
        this.#filterComponent = new FilterView({
            filters,
            currentFilterType: this.#filterModel.filter,
            onFilterTypeChange: this.#handleFilterTypeChange,
        });

        if (prevFilterComponent === null) {
            render(this.#filterComponent, this.#filterContainer);
        } else {
            replace(this.#filterComponent, prevFilterComponent);
            remove(prevFilterComponent);
        }
    }

    #handleFilterTypeChange = (filterType) => {
        if (this.#filterModel.filter === filterType) {
          return;
        }       
    
        this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }

    #handleModelEvent = () => {
        this.init();
    }
}