window.addEventListener('DOMContentLoaded', () => {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false
  });
  const menu = document.querySelector('.header__nav');
	const burgerBtn = menu?.querySelector('.burger');

  if (menu && burgerBtn) {
    const toggleMenu = (isOpen) => {
      burgerBtn.setAttribute('aria-expanded', isOpen);
      burgerBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      menu.classList.toggle('header__nav--open', isOpen);
      document.body.classList.toggle('overflow', isOpen);
    };

    burgerBtn.addEventListener('click', () => {
      const isExpanding = burgerBtn.getAttribute('aria-expanded') !== 'true';
      toggleMenu(isExpanding);
    });

    menu.addEventListener('click', (e) => {
      if (e.target.closest('.nav__link')) {
        toggleMenu(false);
      }
    });
  }

  function animateBottleInSection() {
    const sections = document.querySelectorAll("[data-bottle-section]");
    if (!sections.length) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const activeObservers = [];

    function initAnimation(e) {
      if (e.matches) {
        const header = document.querySelector(".page__header");
        const headerHeight = header ? header.offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const baseTopMargin = -(windowHeight / 2) - headerHeight;
        const baseBottomMargin = -(windowHeight / 2);
        const quarterMarginTop = -(windowHeight / 4) - headerHeight;
        const quarterMarginBottom = -(windowHeight / 4);

        sections.forEach((section, ind) => {
          const bottleImg = section.querySelector('[data-bottle-move]');
          if (!bottleImg) return;
          let topMarginPx = baseTopMargin;
          let bottomMarginPx = baseBottomMargin;
          if (ind === 0) {
            topMarginPx = quarterMarginTop;
          } else if (ind === sections.length - 1) {
            bottomMarginPx = quarterMarginBottom;
          }

          const rootMargin = `${Math.round(topMarginPx)}px 0px ${Math.round(bottomMarginPx)}px 0px`;

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              bottleImg.classList.toggle("visible", entry.isIntersecting);
            });
          }, {
            root: null,
            rootMargin: rootMargin,
            threshold: 0
          });

          observer.observe(section);
          activeObservers.push(observer);
        });
      } else {
        activeObservers.forEach(observer => observer.disconnect());
        activeObservers.length = 0;

        sections.forEach(section => {
          const bottleImg = section.querySelector('[data-bottle-move]');
          if (bottleImg) bottleImg.classList.remove("visible");
        });
      }
    }

    initAnimation(mediaQuery);
    mediaQuery.addEventListener("change", initAnimation);
  }

  function animateSinkBottle() {
    const section = document.querySelector(".section--sink");
    const bottleContainer = section.querySelector(".bottle");
    if (!section || !bottleContainer) return;

    const header = document.querySelector(".page__header");
    
    const frames = Array.from(bottleContainer.querySelectorAll(".bottle__img-container"));
    const framesAmount = frames.length;
    if (!framesAmount) return;

    let headerHeight = 0;
    let windowViewheight = 0;
    let speed = 0;
    let sectionOffsetTop = 0;
    let isIntersecting = false;
    let ticking = false;
    let lastIndex = -1;

    function updateMetrics() {
      headerHeight = header ? header.offsetHeight : 0;
      windowViewheight = window.innerHeight - headerHeight;
      speed = framesAmount / windowViewheight;
      sectionOffsetTop = section.getBoundingClientRect().top + window.scrollY;
    }

    function renderFrame() {
      if (!isIntersecting) {
        ticking = false;
        return;
      }

      const windowFullheight = window.scrollY + headerHeight;
      const coeffDiff = speed * (windowFullheight + windowViewheight - sectionOffsetTop);
      
      let currentIndex = 0;
      if (coeffDiff > framesAmount - 1) {
        currentIndex = framesAmount - 1;
      } else if (coeffDiff > 0) {
        currentIndex = Math.floor(coeffDiff);
      }

      // Меняем активный кадр только если индекс действительно изменился
      if (currentIndex !== lastIndex) {
        if (frames[lastIndex]) {
          frames[lastIndex].classList.remove("is-active");
        }
        frames[currentIndex].classList.add("is-active");
        lastIndex = currentIndex;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking && isIntersecting) {
        requestAnimationFrame(renderFrame);
        ticking = true;
      }
    }

    // Intersection Observer: активируем скролл только когда секция видна
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          updateMetrics();
          window.addEventListener("scroll", onScroll, { passive: true });
          requestAnimationFrame(renderFrame); // Отрисовка при входе в экран
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      });
    }, { threshold: 0 });

    sectionObserver.observe(section);

    // Нативный Resize Observer для адаптивности по высоте
    const resizeObserver = new ResizeObserver(() => {
      if (isIntersecting) {
        updateMetrics();
        requestAnimationFrame(renderFrame);
      }
    });
    resizeObserver.observe(document.documentElement);
  }

  function initSmoothScroll() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-scroll][href]");
      
      if (!trigger) return;
     
      const targetId = trigger.getAttribute("href");
      
      // Проверяем, является ли ссылка локальным якорем (начинается с #)
      if (!targetId.startsWith("#") || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const header = document.querySelector(".page__header");
      const headerHeight = header ? header.offsetHeight : 0;

      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  }

  function setAnimationName(element, attr) {
    const animationName = element.getAttribute(attr);
    if (animationName) {
      element.classList.add("animate", `animate__${animationName}`);
    }
  }

  function sectionAnimationInit() {
    const animatedElements = document.querySelectorAll("[data-animate]");
    if (!animatedElements.length) return;

    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Если элемент пересек границу вьюпорта (появился на экране)
        if (entry.isIntersecting) {
          const element = entry.target;
          
          setAnimationName(element, "data-animate");
          
          // Как только анимация запущена, прекращаем слежку за элементом (unobserve),
          // чтобы не тратить ресурсы памяти и процессора
          observer.unobserve(element);
        }
      });
    }, {
      root: null, // Отслеживаем относительно экрана (viewport)
      rootMargin: "0px 0px -5% 0px", // Небольшой отступ снизу, чтобы анимация стартовала чуть раньше полного появления
      threshold: 0 // Срабатывает, как только показывается первый пиксель элемента
    });

    animatedElements.forEach(element => animationObserver.observe(element));
  }

  function animateNaturalSection() {
    const STONES_DATA = [
      { selector: ".natural-2__stone--6", targetLeft: 73.95, targetTop: 16.38 }, 
      { selector: ".natural-2__stone--2", targetLeft: 13.41, targetTop: 32.91 }, 
      { selector: ".natural-2__stone--8", targetLeft: 90.05, targetTop: 42.83 }, 
      { selector: ".natural-2__stone--5", targetLeft: 60.37, targetTop: 45.6  }, 
      { selector: ".natural-2__stone--4", targetLeft: 29.42, targetTop: 47.45 }, 
      { selector: ".natural-2__stone--1", targetLeft: 3.14,  targetTop: 65.04 }, 
      { selector: ".natural-2__stone--9", targetLeft: 97.93, targetTop: 73.45 }, 
      { selector: ".natural-2__stone--7", targetLeft: 74.61, targetTop: 87.29 }, 
      { selector: ".natural-2__stone--3", targetLeft: 21.76, targetTop: 94.2  }
    ];

    // Оригинальная математика без изменений
    function calculateInitialCoords(w, h, targetLeft, targetTop) {
      const halfW = w / 2, halfH = h / 2;
      const offsetX = (targetLeft / 100 - 0.5) * w;
      const offsetY = (targetTop / 100 - 0.5) * h;
      
      let boundaryLeft, boundaryTop;
      if ((offsetY / offsetX) >= (halfH / halfW)) {
        boundaryLeft = 100 * (Math.sign(offsetY) * halfH * offsetX / offsetY / w + 0.5);
        boundaryTop = 100 * (Math.sign(offsetY) * halfH / h + 0.5);
      } else {
        boundaryLeft = 100 * (Math.sign(offsetX) * halfW / w + 0.5);
        boundaryTop = 100 * (Math.sign(offsetX) * halfW * offsetY / offsetX / h + 0.5);
      }
      return {
        initialLeft: (boundaryLeft + 3 * targetLeft) / 4,
        initialTop: boundaryTop
      };
    }

    const section = document.querySelector(".section--stone");
    const headerElement = document.querySelector(".page__header");
    const centralTextElements = section?.querySelector(".nature-2__content");
    if (!section || !centralTextElements) return;

    let sectionW = section.offsetWidth;
    let sectionH = section.offsetHeight;

    const activeStones = STONES_DATA.map((stone, index) => {
      const domElement = section.querySelector(stone.selector);
      if (!domElement) return null;

      const coords = calculateInitialCoords(sectionW, sectionH, stone.targetLeft, stone.targetTop);
      return {
        domElement,
        targetLeft: stone.targetLeft,
        targetTop: stone.targetTop,
        initialLeft: coords.initialLeft,
        initialTop: coords.initialTop,
        delay: 0.1 * sectionH * index
      };
    }).filter(Boolean);

    let isRenderPending = false;

    const getProgress = (sectionOffset, endLine, midLine, duration) => {
      if (sectionOffset > endLine) return 0;
      if (sectionOffset < midLine) return 1;
      return Math.max(0, Math.min(1, (endLine - sectionOffset) / duration));
    };

    function updatePositions() {
      const headerH = headerElement ? headerElement.offsetHeight : 0;
      const vhWithoutHeader = window.innerHeight - headerH;
      const currentScroll = window.scrollY;
      
      const triggerLine = currentScroll + headerH;
      const sectionGlobalTop = section.getBoundingClientRect().top + currentScroll;
      const animEndLine = triggerLine + vhWithoutHeader - (sectionH / 2);
      const animDuration = vhWithoutHeader / 2;
      const fullVisLine = triggerLine + (vhWithoutHeader / 2) - (sectionH / 2);

      const centerProgress = getProgress(sectionGlobalTop, animEndLine, fullVisLine, animDuration);
      centralTextElements.style.opacity = centerProgress;
      centralTextElements.style.transform = `scale(${0.5 + 0.5 * centerProgress})`;

      activeStones.forEach(stone => {
        const stoneProgress = getProgress(
          sectionGlobalTop + stone.delay, 
          animEndLine, 
          fullVisLine, 
          animDuration - stone.delay
        );

        const currentLeft = stone.initialLeft + stoneProgress * (stone.targetLeft - stone.initialLeft);
        const currentTop = stone.initialTop + stoneProgress * (stone.targetTop - stone.initialTop);

        stone.domElement.style.opacity = stoneProgress;
        stone.domElement.style.left = `${currentLeft}%`;
        stone.domElement.style.top = `${currentTop}%`;
      });

      isRenderPending = false;
    }

    window.addEventListener("resize", () => {
      sectionW = section.offsetWidth;
      sectionH = section.offsetHeight;
      activeStones.forEach(stone => {
        const coords = calculateInitialCoords(sectionW, sectionH, stone.targetLeft, stone.targetTop);
        stone.initialLeft = coords.initialLeft;
        stone.initialTop = coords.initialTop;
        stone.delay = 0.1 * sectionH * activeStones.indexOf(stone);
      });
      updatePositions();
    });

    window.addEventListener("scroll", () => {
      if (!isRenderPending) {
        window.requestAnimationFrame(updatePositions);
        isRenderPending = true;
      }
    }, { passive: true });

    updatePositions();
  }

  initSmoothScroll();
  sectionAnimationInit();
  animateBottleInSection();
  animateSinkBottle();
  animateNaturalSection()
  
});