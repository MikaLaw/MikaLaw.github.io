export default class Tooltip{
  constructor() {
    this.tooltip = null;
    this.activeTrigger = null;
    this.tooltipId = 'shared-tooltip';
    this.init();
  }

  init() {
    this.tooltip = document.querySelector('.tooltip');
    document.addEventListener('pointerover', (e) => this.handleIn(e), {passive: true});
    document.addEventListener('pointerout', (e) => this.handleOut(e), {passive: true});
    document.addEventListener('focusin', (e) => this.handleIn(e), { capture: true, passive: true });
    document.addEventListener('focusout', (e) => this.handleOut(e), { capture: true, passive: true });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
  }

  handleIn(e) {
    if(e.target === document) return;

    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (!trigger) return;
    
    trigger.setAttribute('aria-describedby', this.tooltipId);
    this.show(trigger);
  }

  handleOut(e) {
    if(e.target === document) return;

    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (!trigger || this.activeTrigger !== trigger) return;
    this.hide();
  }

  show(trigger) {
    this.activeTrigger = trigger;
    const text = trigger.getAttribute('data-tooltip-text');
    if (!text) return;

    this.tooltip.textContent = text;
    this.tooltip.setAttribute('aria-hidden', 'false');
    this.tooltip.classList.add('tooltip--visible');

    this.positionTooltip(trigger);
  }

  hide() {
    if (!this.activeTrigger) return;
    this.activeTrigger.removeAttribute('aria-describedby');
    this.activeTrigger = null;
    this.tooltip.setAttribute('aria-hidden', 'true');
    this.tooltip.classList.remove('tooltip--visible');
  }

  positionTooltip(trigger) {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    
    let position = trigger.getAttribute('data-tooltip-position') || 'bottom';
    
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    const offset = 8;
    const screenPadding = 8;

    if (position === 'bottom' && (triggerRect.bottom + tooltipRect.height + offset > viewportHeight)) {
      position = 'top';
    } else if (position === 'top' && (triggerRect.top - tooltipRect.height - offset < 0)) {
      position = 'bottom';
    } else if (position === 'right' && (triggerRect.right + tooltipRect.width + offset > viewportWidth)) {
      position = 'left';
    } else if (position === 'left' && (triggerRect.left - tooltipRect.width - offset < 0)) {
      position = 'right';
    }

    if (position === 'bottom') {
      top = triggerRect.bottom + scrollY + offset;
      left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
    } else if (position === 'top') {
      top = triggerRect.top + scrollY - tooltipRect.height - offset;
      left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
    } else if (position === 'right') {
      top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + scrollX + offset;
    } else if (position === 'left') {
      top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left + scrollX - tooltipRect.width - offset;
    }

    const minLeft = screenPadding + scrollX;
    const maxLeft = viewportWidth + scrollX - tooltipRect.width - screenPadding;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    const mintop = screenPadding + scrollY;
    const maxtop = viewportHeight + scrollY - tooltipRect.height - screenPadding;
    top = Math.max(mintop, Math.min(top, maxtop));

    this.tooltip.style.setProperty('--tt-top', `${top}px`);
    this.tooltip.style.setProperty('--tt-left', `${left}px`);
  }
}