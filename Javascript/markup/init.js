// Burger menu

function burger(){
    
    const burger = document?.querySelector('[data-burger]');
    const menu = document?.querySelector('[data-menu]');
    const menuItems = menu.querySelectorAll('.main-navigation__item');
    burger?.addEventListener('click', (e) => {
        
        burger?.classList.toggle('burger--active');
        menu?.classList.toggle('main-navigation--active');
    
        if (menu?.classList.contains('main-navigation--active')) {
          burger?.setAttribute('aria-expanded', 'true');
          burger?.setAttribute('aria-label', 'Закрыть меню');
        } else {
          burger?.setAttribute('aria-expanded', 'false');
          burger?.setAttribute('aria-label', 'Открыть меню');
        }
    });
    menuItems?.forEach(el => {
        el.addEventListener('click', () => {
          burger?.setAttribute('aria-expanded', 'false');
          burger?.setAttribute('aria-label', 'Открыть меню');
          burger.classList.remove('burger--active');
          menu.classList.remove('main-navigation--active');
        });
      });
}
burger()