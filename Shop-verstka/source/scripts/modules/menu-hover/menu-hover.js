import PriorityTags from '../priority-tags/priority-tags';
import Accordion from '../accordion/accordion.js';
import ResponsiveManager from '../../utils/responsive-manager.js';

export default class MenuHover {
  #component;
  #breakpoints;
  #accordionController = null;
  #desktopController = null;
  #desktopEventsController = null;
  #accordionInstance = null;
  #priorityInstance = null;

  constructor(component) {
    if (!component) return;    
    this.#component = component;    
    this.init();
  }

  init() {
    this.#accordionController = ResponsiveManager.watch(
      'max-width: 767px',
      () => this.#initMobileMode(),
      () => this.#destroyMobileMode()
    );

    this.#desktopController = ResponsiveManager.watch(
      'min-width: 768px',
      () => this.#initDesktopMode(),
      () => this.#destroyDesktopMode()
    );
  }

  #initMobileMode() {
    if (this.#accordionInstance) return; 

    const accordionElement = this.#component.querySelector('[data-accordion]');
    if (accordionElement) this.#accordionInstance = new Accordion(accordionElement);
  }

  #destroyMobileMode() {
    this.#accordionInstance?.destroy();
    this.#accordionInstance = null;
  }

  #initDesktopMode() {
    if (this.#priorityInstance || this.#desktopEventsController) return;

    const priorityElement = this.#component.querySelector('[data-priority-tags]');
    if (priorityElement) this.#priorityInstance = new PriorityTags(priorityElement);       

    this.#desktopEventsController = new AbortController();
    this.#initDesktopEvents(this.#desktopEventsController.signal);
  }

  #destroyDesktopMode() {
    this.#priorityInstance?.destroy();
    this.#priorityInstance = null;

    this.#desktopEventsController?.abort();
    this.#desktopEventsController = null;
  }

 #initDesktopEvents(signal) {
    const menuItems = this.#component.querySelectorAll('[data-menu-item]');
    const hasMouse = window.matchMedia('(hover: hover)').matches;

    menuItems.forEach(item => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      if (!trigger) return;
      
      trigger.setAttribute('aria-expanded', "false");

      const setExpanded = (state) => {
        if (trigger.getAttribute('aria-expanded') === state) return;
        trigger.setAttribute('aria-expanded', state);
      };
      
      if (hasMouse) {
        item.addEventListener('mouseenter', () => setExpanded('true'), { signal });
        item.addEventListener('mouseleave', () => setExpanded('false'), { signal });
        trigger.addEventListener('focus', () => setExpanded('true'), { signal });
      }

      if (!hasMouse) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          setExpanded(isExpanded ? 'false' : 'true');
        }, { signal });

        document.addEventListener('click', (e) => {
          if (!item.contains(e.target)) {
            setExpanded('false');
          }
        }, { signal });
      }
      
      item.addEventListener('focusout', (e) => {
        if (!item.contains(e.relatedTarget)) {
          setExpanded('false');
        }
      }, { signal });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
          setExpanded('false');
          trigger.focus();
          e.stopPropagation();
        }
      }, { signal });
    });
  }

  destroy() {
    this.#accordionController?.abort();
    this.#desktopController?.abort();

    this.#destroyMobileMode();
    this.#destroyDesktopMode();

    this.#accordionController = null;
    this.#desktopController = null;
  }
}
