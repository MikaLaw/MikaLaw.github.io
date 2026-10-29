gsap.registerPlugin(ScrollToPlugin, ScrollSmoother, ScrollTrigger, MorphSVGPlugin, MotionPathPlugin);

window.addEventListener('DOMContentLoaded', () => {
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
    if (e.target.closest('.nav__link')) toggleMenu(false);
  });
}

	// --- ИНИЦИАЛИЗАЦИЯ SMOOTHER ---
	ScrollSmoother.create({
		smooth: 1.1, 
		effects: true,
		smoothTouch: 0.1 
	});

	// --- АНИМАЦИЯ СОЛНЦА (Морфинг и вращение) ---
	const sunTimeline = gsap.timeline({ 
		repeat: -1,          
		repeatDelay: 3,       
		delay: 2,
	});

	sunTimeline
		.to("#circle-shape", {
			duration: 0.6,
			morphSVG: "#sun-shape",
			ease: "power2.out"
		})
		.to("#circle-shape", {
			duration: 1.2,
			rotation: 720,
			transformOrigin: "center",
			ease: "power4.out",         
		})
		.to({}, { duration: 0.3 }) 
		.to("#circle-shape", {
			duration: 0.5,
			morphSVG: "#circle-shape", 
			rotation: 0,               
			ease: "power2.inOut"
		});
	
	// --- ДЕКОРАТИВНЫЕ МАСКИ ---
	const maskConfigs = [
		{ target: "#hero-mask-decor-1", morph: "#hero-mask-decor-2" },
		{ target: "#hero-mask-decor-3", morph: "#hero-mask-decor-4" }
	];

	maskConfigs.forEach(({ target, morph }) => {
		gsap.to(target, {
			morphSVG: morph,
			duration: 2,
			ease: "power1.inOut",
			repeat: -1,
			yoyo: true
		});
	});

	gsap.timeline({
		defaults: { duration: 2, ease: "power1.inOut" },
		repeat: -1,
	})
	.to("#hero-mask-1", { morphSVG: "#hero-mask-2" })
	.to("#hero-mask-1", { morphSVG: "#hero-mask-3" })
	.to("#hero-mask-1", { morphSVG: "#hero-mask-1" });

	// --- СЦЕНАРНЫЕ АНИМАЦИИ ---
	// Используем gsap.matchMedia для предотвращения дерганий на мобильных (will-change)
	const mm = gsap.matchMedia();
	
	mm.add("(prefers-reduced-motion: no-preference)", () => {
		// Анимация заголовков секций
		gsap.utils.toArray('.section').forEach((section) => {
			const head = section.querySelector('.section__head');
			if (!head) return;
			gsap.from(head, {
				scrollTrigger: { trigger: section, toggleActions: "play none none reverse" },
				y: 40,
				opacity: 0,
				duration: 1,
				ease: "power2.inOut",
				willChange: "transform, opacity"
			});			
		});

		// Сетка карточек сотрудников
		const workerCards = gsap.utils.toArray('.worker-card__content-wrapper');
		if (workerCards.length) {
			ScrollTrigger.batch(workerCards, {
				onEnter: batch => gsap.to(batch, { opacity: 1, y: -20, stagger: 0.2, duration: 1, ease: "power2.inOut" }),
				once: true
			});
		}
		
		// Список сотрудников
		if (document.querySelector('.workers__list')) {
			gsap.from('.workers__list', {
				scrollTrigger: { trigger: '.workers__list' },
				y: 40,
				opacity: 0,
				duration: 2,
				ease: "power2.inOut"
			});
		}

		// Анимация оверлеев новостей через батч
		const newsOverlays = gsap.utils.toArray('.news-card__img-overlay');
		if (newsOverlays.length) {
			ScrollTrigger.batch(newsOverlays, {
				onEnter: batch => gsap.to(batch, { scaleY: 0, transformOrigin: "bottom center", stagger: 0.2, duration: 2, ease: "power2.inOut" }),
				once: true
			});
		}

		// Параллакс изображений карточек
		gsap.utils.toArray('.worker-card__img').forEach((card) => {
			const img = card.querySelector('img');
			if (!img) return;
			gsap.fromTo(img, 
				{ yPercent: -20, scale: 1.2 }, 
				{
					yPercent: 20,
					scale: 1.2,
					ease: "none",
					scrollTrigger: {
						trigger: card,
						start: "top bottom",
						end: "bottom top",
						scrub: 1
					}
				}
			);			
		});
	});

	// --- СЛАЙДЕР С КОЛЕСОМ НАВИГАЦИИ (Интеграция Swiper + GSAP) ---
	const isDesktop = window.matchMedia('(min-width: 768px)');
	new Swiper(document.querySelector('.process-slider__slider'), {
      a11y: true,
      slidesPerView: 1,
      spaceBetween: 0,
			pagination: {
        el: document.querySelector('.process-slider__pagination'),
        type: "bullets",
        clickable: true, 
      },
			on: {
        slideChange: (instance) => {
					if(isDesktop.matches) {
						let current = tracker.item;
						if (instance.realIndex === current) {
							return;
						}
						let diff = current - instance.realIndex;
						sliderStep.innerHTML = `0${instance.realIndex + 1}<span>/0${numItems}</span>`;
						if (Math.abs(diff) < numItems / 2) {
							moveWheel(diff * itemStep);
						} else {
							var amt = numItems - Math.abs(diff);
							if (current > instance.realIndex) {
								moveWheel(amt * -itemStep);
							} else {
								moveWheel(amt * itemStep);
							}
						}						
					}
        }
      }
	})
	const circlePath = document.querySelector('#circlePath');
	const sliderStep = document.querySelector('.process-slider__count');
	let items = gsap.utils.toArray(".process-slider__pagination .swiper-pagination-bullet"),
		numItems = items.length,
		itemStep = 1 / numItems,
		wrapProgress = gsap.utils.wrap(0, 1),
		snap = gsap.utils.snap(itemStep),
		wrapTracker = gsap.utils.wrap(0, numItems),
		tracker = { item: 0 };

	sliderStep.innerHTML = `01<span>/0${numItems}</span>`;

	gsap.set(items, { 
    motionPath: {
      path: circlePath,
      align: circlePath,
      alignOrigin: [0.5, 0.5],
      start: -0.5,
      end: (i) => (i / items.length) - 0.5,
    }, scale: 0.9 
  });

	const tl = gsap.timeline({ paused:true, reversed: true });
	tl.to('.process-slider__animation', {
    rotation: 360, 
    transformOrigin: 'center', 
    duration: 1, 
    ease: 'none'
  });
  tl.to(items, {
    rotation: "-=360", 
    transformOrigin: 'center', 
    duration: 1, 
    ease: 'none',
  }, 0);
  tl.to(tracker, {
    item: numItems,
    duration: 1, 
    ease: 'none',
    modifiers: {
      item(value) {
        return wrapTracker(numItems - Math.round(value))
      }
    }
  }, 0);
  function moveWheel(amount) {            
    let progress = tl.progress();
    tl.progress(wrapProgress(snap(tl.progress() + amount)))
    tl.progress(progress);

    gsap.to(tl, {
      progress: snap(tl.progress() + amount),
      modifiers: {
        progress: wrapProgress
      }
    });
  }

	// --- СТЭКИНГ КАРТОЧЕК ДЛЯ БЛОГА ---
	const isMobileCard = window.matchMedia('(max-width: 479px)');
	const cardsWrappers = gsap.utils.toArray(".blog__item");
	const cards = gsap.utils.toArray(".blog-card");

	cardsWrappers.forEach((wrapper, i) => {
		const card = cards[i];
		if (!card) return;

		const isLast = i === cards.length - 1;
		const scale = isLast ? 1 : 0.86 + 0.035 * i;
		const rotation = isLast ? 0 : -10;

		gsap.to(card, {
			scale: scale,
			rotationX: rotation,
			transformOrigin: "top center",
			ease: "none",
			scrollTrigger: {
				trigger: wrapper,
				start: `top ${60 + 10 * i}`,
				end: () => isMobileCard.matches ? "bottom 480" : "bottom 380",
				endTrigger: ".blog",
				scrub: true,
				pin: wrapper,
				pinSpacing: false,
				invalidateOnRefresh: true // Пересчет при ресайзе в 2026 году обязателен
			}
		});
	});

	// --- ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ ---
	document.querySelectorAll('nav a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const target = link.getAttribute('href');
			if (target === '#') return;

			gsap.to(window, {
				duration: 1,
				scrollTo: { y: target, offsetY: 70, autoKill: true },
				ease: "power2.inOut"
			});
		});
	});

});