import Select from '../select/select';
import Tabs from '../tabs/tabs';

const API_KEY = 'f556b704-ff8c-4fed-8566-13a295d99e4d';

class YandexMapsLoader {
  static #promise = null;
  static #isScriptLoading = false;

  static load(apiKey, lang = 'ru_RU') {
    if (window.ymaps) return Promise.resolve(window.ymaps);
    if (this.#isScriptLoading) return this.#promise;

    this.#isScriptLoading = true;
    this.#promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${lang}`;
      script.async = true;
      script.onload = () => resolve(window.ymaps);
      script.onerror = () => reject(new Error('Не удалось загрузить Yandex Maps API'));
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    });

    return this.#promise;
  }
}

class MapBalloon {
  #element;
  #activeMarker = null;
  #onDeactivateMarker;

  constructor(balloonElement, onDeactivateMarker) {
    this.#element = balloonElement;
    this.#onDeactivateMarker = onDeactivateMarker;
  }

  open(data, marker) {
    this.#activeMarker = marker;
    this.updateData(data);
    
    this.#element.classList.add("is-active");
    this.#element.querySelector(".balloon__close")?.addEventListener("click", this.close);
    document.addEventListener("keydown", this.#handleKeydown);
  }

  close = () => {
    this.#element.classList.remove("is-active");
    if (this.#activeMarker) {
      this.#onDeactivateMarker(this.#activeMarker);
      this.#activeMarker = null;
    }
    this.#element.querySelector(".balloon__close")?.removeEventListener("click", this.close);
    document.removeEventListener("keydown", this.#handleKeydown);
  };

  #handleKeydown = (e) => {
    if (e.key === "Escape") this.close();
  };

  updateData(data) {
    this.#element.querySelector(".balloon__title").textContent = data.title || data.address;
    this.#element.querySelector(".balloon__contact-text--address").textContent = data.address;
    
    const phoneEl = this.#element.querySelector(".balloon__contact-text--phone");
    if (phoneEl && data.tel) {
      phoneEl.textContent = data.tel;
      const cleanPhone = data.tel.replace(/[^0-9]/g, "");
      phoneEl.href = `tel:+${cleanPhone.startsWith('7') || cleanPhone.startsWith('8') ? '' : '+'}${cleanPhone}`;
    }

    const container = this.#element.querySelector(".balloon__working-hours");
    if (container && data.workingHours) {
      container.innerHTML = data.workingHours
        .map(hour => `<div class="balloon__text">${hour}</div>`)
        .join("");
    }
  }
}

class MapDefault {
  constructor(component) {
    this.component = component;
    this.componentId = this.component.dataset.id || Math.random().toString(36).substring(2);
    this.mapContainer = this.component.querySelector('[data-map-element]');
    this.zoomInBtn = this.component.querySelector('[data-map-zoom="in"]');
    this.zoomOutBtn = this.component.querySelector('[data-map-zoom="out"]');
    this.locationBtn = this.component.querySelector('[data-map-location]');
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;

    this.config = {
      defaultZoom: 12,
      placemarkDefaultZoom: 15,
      zIndexDefault: 200,
      zIndexCurrent: 300,
      apiKey: typeof API_KEY !== 'undefined' ? API_KEY : ''
    };

    this.iconsUrl = {
      markers: {
        iconHref: "./img/icons/map-icons.svg",
        currentIcon: { iconClipRect: [[39, 0], [78, 52]], iconSize:[46, 52], iconOffset: [-25, -52] },
        defaultIcon: { iconClipRect: [[0, 0], [39, 52]], iconSize:[46, 52], iconOffset: [-20, -52] }
      },
      cluster: { href: "./img/icons/cluster-icon.svg", size:[46, 52], offset: [-20, -52] }
    };

    this.placemark = {
      iconLayout: "default#image",
      iconImageHref: this.iconsUrl.markers.iconHref,
      iconImageClipRect: this.iconsUrl.markers.defaultIcon.iconClipRect,
      iconImageSize: this.iconsUrl.markers.defaultIcon.iconSize,
      iconImageOffset: this.iconsUrl.markers.defaultIcon.iconOffset,
      zIndex: this.config.zIndexDefault,
      zIndexHover: this.config.zIndexDefault
    };

    this.cluster = {
      zoomMargin: 100,
      clusterIcons: [{ href: this.iconsUrl.cluster.href, size: this.iconsUrl.cluster.size, offset: this.iconsUrl.cluster.offset }],
      clusterIconContentLayout: null
    };

    this.userLocation = null;
    this.ymaps = null;
    this.map = null;
    this.data = null;
    this.isMobile = window.matchMedia(`(max-width: 767px)`).matches;
    this.activeMarker = null;
  }

  // Слой 1 и 2: Инициализация среды и загрузка данных
  async initDefault() {
    try {
      this.data = this.getData();
      if (!this.data || Object.keys(this.data).length === 0) return null;

      this.ymaps = await YandexMapsLoader.load(this.config.apiKey);
      await new Promise((resolve) => this.ymaps.ready(resolve));

      return this.data;
    } catch (error) {
      console.error('Не удалось инициализировать карту:', error);
      return null;
    }
  }

  // Слой 3: Инициализация ядра карты и общих контролов управления
  initMap(coords, zoomLevel) {
    if (!this.mapContainer) return;

    this.map = new this.ymaps.Map(this.mapContainer, {
      center: coords,
      zoom: zoomLevel || this.config.defaultZoom,
      controls: []
    }, {
      yandexMapDisablePoiInteractivity: true,
      suppressMapOpenBlock: true
    });
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      this.map.behaviors.disable('drag');
      this.map.behaviors.enable('multiTouch'); 
    } 
    this.setZoomControl();
    this.setLocationControl();
  }

  setLocationControl() {
    if (!this.locationBtn) return;
    this.locationBtn.addEventListener("click", () => {
      this.getUserLocation(() => {
        this.map.setCenter([this.userLocation.lat, this.userLocation.lng], this.config.defaultZoom, {
          duration: 150,
          checkZoomRange: true
        });
      });
    }, { signal: this.signal });
  }

  getUserLocation(callback) {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      if (callback) callback();
    });
  }

  setZoomControl() {
    if (!this.zoomInBtn || !this.zoomOutBtn) return;
    this.zoomInBtn.addEventListener("click", () => {
      this.map.setZoom(this.map.getZoom() + 1, { duration: 150, checkZoomRange: true });
    }, { signal: this.signal });
    this.zoomOutBtn.addEventListener("click", () => {
      this.map.setZoom(this.map.getZoom() - 1, { duration: 150, checkZoomRange: true });
    }, { signal: this.signal });
  }

  getData() {
    const jsonString = this.component?.dataset?.json;
    if (!jsonString) return {};
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      return {};
    }
  }

  onDocumentClick(e) {
    if (!this.isMobile) return;
    const isInteractiveElement = e.target.closest("[data-map], [data-select]");
    this.mapContainer.classList.toggle("is-blocked", !isInteractiveElement);
  }

  activateMarker(marker) {
    if (!marker) return;
    this.activeMarker = marker;
    marker.options.set("iconImageClipRect", this.iconsUrl.markers.currentIcon.iconClipRect);
    marker.options.set("iconImageSize", this.iconsUrl.markers.currentIcon.iconSize);
    marker.options.set("iconImageOffset", this.iconsUrl.markers.currentIcon.iconOffset);
    marker.options.set("zIndex", this.config.zIndexCurrent);
    marker.options.set("zIndexHover", this.config.zIndexCurrent);
  }

  deactivateMarker(marker) {
    if (!marker) return;
    marker.options.set("iconImageClipRect", this.iconsUrl.markers.defaultIcon.iconClipRect);
    marker.options.set("iconImageSize", this.iconsUrl.markers.defaultIcon.iconSize);
    marker.options.set("iconImageOffset", this.iconsUrl.markers.defaultIcon.iconOffset);
    marker.options.set("zIndex", this.config.zIndexDefault);
    marker.options.set("zIndexHover", this.config.zIndexDefault);
  }

  createPlaceMark(props) {
    const { clusterer, coord, object } = props;
    const placemark = new this.ymaps.Placemark(coord, { pointData: object }, { ...this.placemark });
    clusterer.add(placemark);
    return placemark;
  }

  focusOnMarker(targetMarker) {
    this.map.setCenter(targetMarker.geometry.getCoordinates(), this.config.placemarkDefaultZoom, {
      checkZoomRange: true,
      duration: 300
    });

    if (this.activeMarker) {
      this.deactivateMarker(this.activeMarker);
    }
    this.activateMarker(targetMarker);
  }

  fitMapToCity(clusterer) {
    this.map.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
      duration: 300
    }).then(() => {
      if (this.map.getZoom() > this.config.placemarkDefaultZoom) {
        this.map.setZoom(this.config.placemarkDefaultZoom);
      }
    });
  };

  resetAllInputs(container) {
    container.querySelectorAll("input[type='radio']").forEach(input => {
      input.checked = false;
    });
  }

  destroyDefault() {
    this.abortController.abort();
    if (this.map) {
      this.map.destroy();
    }
  }
}

class MapBlock extends MapDefault{
  #uiElements = [];
  #balloon = null;
  #cityClusters = new Map(); // Хранилище связей: Название города -> Кластер

  constructor(container) {
    super(container);
    this.selectInstance = null;
    this.cities = [];
    this.initCoordinates = this.component.dataset.coordinates || null;

    this.init();
  }

  async init() {
    const data = await super.initDefault(); 
    if (!data) return;

    // Порядок 1: Инициализируем ядро карты в дефолтной точке
    const defaultCity = data.cities[data.defaultCityIndex || 0];
    const initialCoords = JSON.parse(this.initCoordinates) || defaultCity?.items[0]?.coordinates || [55.76, 37.64];
    this.cities = data.cities;
    super.initMap(initialCoords);

    // Порядок 2: Инициализируем всплывающий балун
    this.#balloon = new MapBalloon(
      this.component.querySelector('[data-balloon]'), 
      this.deactivateMarker.bind(this)
    );

    // Порядок 3: Строим интерфейс и параллельно готовим коллекции точек (кластеры)
    this.renderUI(this.data.cities);

    // Порядок 4: Настраиваем сквозные события связывания (Мост)
    this.bindEvents(this.data.cities);
  }

  // Слой 4: Рендеринг разметки (Глупые функции генерации DOM)
  renderUI(citiesData) {
    const dropdown = this.component.querySelector('[data-select]');
    const dropdownList = dropdown?.querySelector('[data-select-list]');
    if (!dropdownList) return;

    const primaryCities = citiesData.filter(city => city.isPrimary);
    const otherCities = citiesData.filter(city => !city.isPrimary)
                                  .sort((a, b) => a.name.localeCompare(b.name));

    const fragment = document.createDocumentFragment();

    // Рендер приоритетных
    primaryCities.forEach(city => fragment.append(this.createCityNode(city)));

    // Группировка и рендер остальных
    const grouped = {};
    otherCities.forEach(city => {
      const letter = city.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(city);
    });

    Object.entries(grouped).forEach(([letter, cities]) => {
      fragment.append(this.createDelimiterNode(letter));
      cities.forEach(city => fragment.append(this.createCityNode(city)));
    });

    dropdownList.replaceChildren(fragment);
    this.createCityList(this.cities[0]?.name);
    this.selectInstance = new Select(dropdown);
  }

  createDelimiterNode(letter) {
    const li = document.createElement('li');
    li.className = 'select__item select__item--delimiter';
    li.innerHTML = `<div class="select__item-text">${letter}</div>`;
    return li;
  }

  createCityNode(city) {
    const li = document.createElement('li');
    li.className = 'select__item';
    li.id = city.name;
    li.tabIndex = 0;
    li.setAttribute('data-select-item', '');
    li.setAttribute('data-select-value', city.name);
    li.setAttribute('aria-selected', 'false');
    li.setAttribute('role', 'option');
    li.innerHTML = `
      <div class="select__item-checkbox"></div>
      <div class="select__item-text" data-select-item-text="${city.name}">${city.name}</div>
    `;
    return li;
  }

  createCityList(name) {
    const cityNameElement = this.component.querySelector('[data-city]');
    const cityListElement = this.component.querySelector('[data-data-city-list]');
    const city = this.cities.find((city) => city.name === name);
    if(city && cityNameElement && cityListElement) {
      const fragment = document.createDocumentFragment();
      cityNameElement.textContent = name;
      city.items.forEach((item) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        li.className = 'city-list__item';
        link.className = 'city-list__link',
        link.setAttribute('href', "./shop.html");        
        link.textContent = item.title;
        li.append(link);
        fragment.append(li)
      })
      cityListElement.replaceChildren(fragment)
    }
  }  

  // Слой 5: Связывание логики (Двусторонний медиатор)
  bindEvents(citiesData) {
    // Наполнение гео-объектов
    citiesData.forEach((city) => {
      const clusterer = new this.ymaps.Clusterer(this.cluster);
      
      city.items.forEach(item => {
        const pointData = {
          title: item.title,
          workingHours: item.workingHours,
          address: item.contacts.address,
          tel: item.contacts.tel,          
        }
        const placemark = super.createPlaceMark({
          clusterer: clusterer,
          coord: item.coordinates,
          object: pointData
        });
  
        if(this.initCoordinates && this.initCoordinates.trim() === JSON.stringify(item.coordinates)) {          
          super.activateMarker(placemark);
          this.#balloon.open(pointData, this.activeMarker);
        }
      });

      this.map.geoObjects.add(clusterer);
      this.#cityClusters.set(city.name, clusterer);

      // Мост 1: Клик по карте -> Меняет UI
      clusterer.events.add("click", event => {
        const targetMarker = event.get("target");
        if (typeof targetMarker.getGeoObjects === 'function') return; // Пропуск клика по самому кластеру

        this.handleMarkerSelection(targetMarker, city.name);
      });
    });

    // Мост 2: Выбор в UI (Клик по элементу селекта) -> Меняет карту
    this.selectInstance?.selectItems.forEach(cityButton => {
      const cityName = cityButton.getAttribute('data-select-value');
      const clickHandler = () => this.focusMapToCity(cityName);
      
      cityButton.addEventListener("click", () => {
        this.#balloon.close();
        this.createCityList(cityName);
        clickHandler()
      });

      this.#uiElements.push({ element: cityButton, handler: clickHandler });

      // Стартовое позиционирование
      const cityData = citiesData.find(c => c.name === cityName);
      if (cityData?.isSelected) {
        this.focusMapToCity(cityName);
      }
    });
  }

  handleMarkerSelection(marker, cityName) {
    const pointData = marker.properties.get("pointData");
    super.focusOnMarker(marker);

    if (pointData) {
      this.#balloon.open(pointData, this.activeMarker);
      // Переключаем кастомный селект      
      const targetUiItem = this.selectInstance?.selectItems.find(item => item.getAttribute('data-select-value') === cityName);
      if (targetUiItem && targetUiItem.getAttribute('aria-selected') === "false") {
        this.selectInstance?.toggleItemState(targetUiItem);
        this.createCityList(cityName);
        targetUiItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }

  focusMapToCity(cityName) {
    const clusterer = this.#cityClusters.get(cityName);
    if (!clusterer) return;
    super.fitMapToCity(clusterer);
  }

  destroy() {
    this.#uiElements.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    this.#balloon.close();
    this.selectInstance?.destroy?.();
    super.destroyDefault();
  }
}

export class MapStore extends MapDefault {
  #clusterersArray = []; // Массив для поддержки вкладок
  #uiInputs = [];
  #selectionButton = null;
  #selectionHandlerFn = null;

  constructor(component) {
    super(component);
    
    // Инициализация контейнеров
    this.listContainer = this.component.querySelector('[data-map-list]');
    this.tabsContainer = this.component.querySelector('[data-tabs]');
    this.mode = this.component.dataset.map;
    this.controlsContainer = this.component.querySelector("[data-tabs-controls]");
    this.listWrapper = this.component.querySelector("[data-tabs-content]");
    
    this.init();
  }

  async init() {
    const data = await super.initDefault();
    if (!data) return;

    const hasTabs = this.mode === 'point' && data.tabs && data.tabs.length > 0;
    const hasPoints = this.mode === 'store' && data.points && data.points.length > 0;
    if (!hasTabs && !hasPoints) return;

    if (hasTabs) {
      this.initAsTabs(data);
    } else {
      this.initAsSingleList(data);
    }

    this.initSelectionAction();
  }

  // Режим 1: Одна группа точек (бывший MapStore)
  initAsSingleList(data) {
    if(!this.listContainer) return;
    super.initMap(data.points[0].coordinates);
    
    const clusterer = new this.ymaps.Clusterer(this.cluster);
    this.#clusterersArray.push(clusterer);
    this.map.geoObjects.add(clusterer);

    this.renderList(data.points, this.listContainer, clusterer, 'single');
    this.bindEvents(clusterer, this.listContainer);
    
    // Специфичное для одиночного списка авто-позиционирование и выбор первого элемента
    super.fitMapToCity(clusterer);
    this.emulateFirstInputSelection(this.listContainer);
  }

  // Режим 2: Группировка по вкладкам / ТК (бывший MapPoint)
  initAsTabs(data) {
    const activeTab = data.tabs[data.activeTabIndex || 0];
    super.initMap(activeTab.points[0].coordinates);

    data.tabs.forEach((tab, index) => {
      const controlBtn = this.createUiControlBtn(tab, index);
      const pointList = this.createUiList(index);

      if (this.controlsContainer) this.controlsContainer.append(controlBtn);
      if (this.listWrapper) this.listWrapper.append(pointList);

      const tabClusterer = new this.ymaps.Clusterer(this.cluster);
      this.#clusterersArray.push(tabClusterer);

      controlBtn.addEventListener("click", () => {
        this.map.geoObjects.removeAll();
        this.map.geoObjects.add(tabClusterer);
        super.fitMapToCity(tabClusterer);
      });

      this.renderList(tab.points, pointList, tabClusterer, index);
      this.bindEvents(tabClusterer, pointList);
    });

    // Активируем стартовую вкладку
    const initialClusterer = this.#clusterersArray[data.activeTabIndex || 0];
    this.map.geoObjects.add(initialClusterer);
    super.fitMapToCity(initialClusterer);
    
    if (typeof Tabs === 'function' && this.tabsContainer) {
      new Tabs(this.tabsContainer);
    }
  }

  // Универсальный рендеринг списка в целевой контейнер
  renderList(points, container, clusterer, groupSuffix) {
    if (!container) return;
    container.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    points.forEach(point => {
      const placemark = super.createPlaceMark({
        clusterer: clusterer,
        coord: point.coordinates,
        object: {
          name: point.name,
          address: point.address,
          value: point.value,
          id: this.componentId + point.address,
        }
      });

      if (point.checked) {
        super.activateMarker(placemark);
      }

      fragment.append(this.createCardNode(point, groupSuffix));
    });
    
    container.append(fragment);
  }

  // Универсальная разметка карточки
  createCardNode(data, groupSuffix) {
    const li = document.createElement('li');
    li.className = 'map__item';
    li.innerHTML = `
      <div class="map__card">
        <div class="toggle toggle--map-card">
          <input 
            class="toggle__input visually-hidden" 
            id="${this.componentId + data.address}" 
            type="radio" 
            name="${this.componentId + groupSuffix + '-cluster-group'}" 
            value="${this.componentId + data.address}" 
            ${data.checked ? 'checked' : ''}
          >
          <label class="toggle__label" for="${this.componentId + data.address}">
            <span class="toggle__icon"></span>
            <div class="map-address-card">
              <div class="map-address-card__title">${data.address}</div>
              <div class="map-address-card__content">
                <div class="map-address-card__subtitle">Режим работы:</div>
                <div class="map-address-card__text">${data.workingHours || 'Не указан'}</div>
                <div class="map-address-card__subtitle">Срок доставки:</div>
                <div class="map-address-card__text">${data.value}</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    `;
    return li;
  }

  // Универсальная привязка событий для конкретного кластера и контейнера
  bindEvents(clusterer, container) {
    if (!container) return;

    // Мост1: Клик по Карте -> Изменение в Списке
    clusterer.events.add("click", event => {
      const targetMarker = event.get("target");
      if (typeof targetMarker.getGeoObjects === 'function') return;

      const val = targetMarker.properties.get("pointData")?.id;
      const targetInput = container.querySelector(`input[id="${val}"]`);

      if (targetInput) {
        super.resetAllInputs(container);
        targetInput.checked = true;
        targetInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      super.focusOnMarker(targetMarker);
    });

    // Мост2: Клик по Списку -> Фокус на маркере карты
    const inputs = container.querySelectorAll("input[type='radio']");
    inputs.forEach(input => {
      const changeHandler = () => {
        if (!input.checked) return;
        const linkedMarker = clusterer.getGeoObjects().find(obj => 
          obj.properties.get("pointData")?.id === input.id
        );
        if (linkedMarker) super.focusOnMarker(linkedMarker);
      };
      
      input.addEventListener("change", changeHandler);
      this.#uiInputs.push({ element: input, handler: changeHandler });
    });
  }

  initSelectionAction() {
    this.#selectionButton = this.component.querySelector("[data-selection-button]");
    if (!this.#selectionButton) return;

    this.#selectionHandlerFn = () => {
      if (typeof this._selectionHandler === 'function') {
        this._selectionHandler(this.component, "store");
      }
    };
    this.#selectionButton.addEventListener("click", this.#selectionHandlerFn);
  }

  emulateFirstInputSelection(container) {
    const firstActiveInput = container.querySelector("input[type='radio']:checked") || container.querySelector("input[type='radio']");
    if (firstActiveInput) {
      firstActiveInput.checked = true;
      firstActiveInput.dispatchEvent(new Event("change"));
    }
  }

  createUiControlBtn(tab, ind) {
    const controlBtn = document.createElement('button');
    controlBtn.type = 'button';
    controlBtn.className = 'map-select__control-btn';
    controlBtn.textContent = tab.transportCompany;
    controlBtn.setAttribute("data-id", tab.id);
    controlBtn.setAttribute("data-tabs-control", '');
    controlBtn.classList.toggle('is-active', ind === 0);
    return controlBtn;
  }

  createUiList(ind) {
    const list = document.createElement('ul');
    list.className = 'map-select__list custom-scroll';
    list.setAttribute("data-map-list", '');
    list.setAttribute("data-tabs-element", '');
    list.classList.toggle('is-active', ind === 0);
    return list;
  }

  destroy() {
    this.#uiInputs.forEach(({ element, handler }) => {
      element.removeEventListener("change", handler);
    });
    if (this.#selectionButton && this.#selectionHandlerFn) {
      this.#selectionButton.removeEventListener("click", this.#selectionHandlerFn);
    }
    super.destroyDefault();
  }
}

export default class MapController {
  constructor(component) {
    this.component = component;
    this.mapType = this.component.dataset.map;
    this.modal = this.component.closest('dialog');
    this.mapInstance = null;
    
    this.mapClasses = {
      'block': MapBlock,
      'store': MapStore,
      'point': MapStore,
    };
    
    this.init();
  }

  init() {
    if (!this.mapClasses[this.mapType]) {
      console.error(`Неизвестный тип карты: ${this.mapType}`);
      return;
    }

    if (this.modal) {
      this.modal.addEventListener('toggle', this.onModalToggle);
    } else {
      this.mapInstance = new this.mapClasses[this.mapType](this.component);
    }
  }

  onModalToggle = (e) => {
    if (e.newState === 'open') {
      if (!this.mapInstance) {
        this.mapInstance = new this.mapClasses[this.mapType](this.component);
      }
    } else {
      if (this.mapInstance) {
        this.mapInstance.destroy();
        this.mapInstance = null;
      }
    }
  };

  destroy() {
    if (this.modal) {
      this.modal.removeEventListener('toggle', this.onModalToggle);
    }
    if (this.mapInstance) {
      this.mapInstance.destroy();
      this.mapInstance = null;
    }
    this.component = null;
    this.modal = null;
  }
}