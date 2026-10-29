export class DynamicAdaptive {
  constructor(components, type = 'max') {
    this.type = type;
    this.components = components;
    this._baseWindowWidth = 767;
    this._daClassName = 'dynamic-adaptive';
    this._objectsArray = [];
    this._listeners = new Set();

    this.init()
  }

  init() {
    const nodes =  this.components;
    
    this._objectsArray = Array.from(nodes).map((node) => {
      const [destSelector, breakpoint, place] = node.dataset.da.split(',').map(s => s.trim());
      return {
        element: node,
        parent: node.parentNode,
        destination: document.querySelector(destSelector),
        breakpoint: breakpoint ? parseInt(breakpoint, 10) : this._baseWindowWidth,
        place: place || 'last',
        index: this._indexInParent(node.parentNode, node)
      };
    }).filter(obj => obj.destination);

    this._arraySort();

    // Создаем уникальные брейкпоинты через Set
    const uniqueBreakpoints = [...new Set(this._objectsArray.map(item => item.breakpoint))];

    uniqueBreakpoints.forEach((breakpoint) => {
      const mediaQueryString = `(${this.type}-width: ${breakpoint}px)`;
      const matchMedia = window.matchMedia(mediaQueryString);
      const objectsFilter = this._objectsArray.filter(item => item.breakpoint === breakpoint);

      // Современный слушатель событий
      const handler = () => this._mediaHandler(matchMedia, objectsFilter);
      matchMedia.addEventListener('change', handler);
      
      // Сохраняем для возможности удаления (профилактика утечек памяти)
      this._listeners.add({ matchMedia, handler });

      // Первичный запуск
      handler();
    });
  }

  _mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach((object) => {
        object.index = this._indexInParent(object.parent, object.element);
        this._moveTo(object.place, object.element, object.destination);
      });
    } else {
      objects.forEach((object) => {
        if (object.element.classList.contains(this._daClassName)) {
          this._moveBack(object.parent, object.element, object.index);
        }
      });
    }
  }

  _moveTo(place, element, destination) {
    element.classList.add(this._daClassName);
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element);
    } else if (place === 'first') {
      destination.prepend(element);
    } else {
      destination.children[place].before(element);
    }
  }

  _moveBack(parent, element, index) {
    element.classList.remove(this._daClassName);
    if (parent.children[index]) {
      parent.children[index].before(element);
    } else {
      parent.append(element);
    }
  }

  _indexInParent(parent, element) {
    return Array.from(parent.children).indexOf(element);
  }

  _arraySort() {
    const isMin = this.type === 'min';
    this._objectsArray.sort((a, b) => {
      if (a.breakpoint !== b.breakpoint) {
        return isMin ? a.breakpoint - b.breakpoint : b.breakpoint - a.breakpoint;
      }

      if (a.place === b.place) return 0;
      
      const order = isMin ? ['first', 'numeric', 'last'] : ['last', 'numeric', 'first'];
      const getPriority = (place) => isNaN(place) ? order.indexOf(place) : order.indexOf('numeric');

      const pA = getPriority(a.place);
      const pB = getPriority(b.place);

      if (pA !== pB) return pA - pB;
      return isMin ? a.place - b.place : b.place - a.place;
    });
  }

  destroy() {
    this._listeners.forEach(({ matchMedia, handler }) => {
      matchMedia.removeEventListener('change', handler);
    });
    this._listeners.clear();
    this._objectsArray = [];
  }
}