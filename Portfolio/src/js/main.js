import AOS from 'aos';


AOS.init();

// Menu scroll

Array.from(document.querySelectorAll('a[href^="#"]')).forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo(0, document.querySelector(this.getAttribute("href")).offsetTop - 50) 
    });
})

// Burger menu

function burger(){
    const burger = document?.querySelector('[data-burger]');
    const menu = document?.querySelector('[data-menu]');
    const menuItems = menu.querySelectorAll('.menu__item');

    burger?.addEventListener('click', (e) => {
        burger?.classList.toggle('burger_active');
        menu?.classList.toggle('menu_active');
    
        if (menu?.classList.contains('menu_active')) {
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
          burger.classList.remove('burger_active');
          menu.classList.remove('menu_active');
        });
      });
}
burger()