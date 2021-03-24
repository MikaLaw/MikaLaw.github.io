// Carousel
$(function() {
    var owl = $('.owl-carousel'),
        owlOptions = {
            loop: true,
            margin: 23,
            nav: true,
            navText: [ '<div><img src="img/icon/arrow-prev.svg" alt=""></div>', '<div><img src="img/icon/arrow-next.svg" alt=""></div>'],
            responsive: {
                0: {
                    items: 1,
                    margin: 18,
                    stagePadding:16,
                },
                768: {
                    items: 2
                },
                962: {
                    items: 3
                }
            }
        };
    var owlActive = owl.owlCarousel(owlOptions);

});

// Header menu
$(function (){
    var hamburger = $('.navbar'),
        mainMenu = $('.nav__menu'),
        nav =  $('.nav'),
        link = $('.nav__item');

    hamburger.on('click', function(e){
        e.preventDefault();

        mainMenu.toggleClass('active');
        hamburger.toggleClass('active');
        nav.toggleClass('active');
    });

    link.on('click', function(e){
        e.preventDefault();

        mainMenu.toggleClass('active');
        hamburger.toggleClass('active');
        nav.toggleClass('active');
    });
});

// Menu scroll
$('a[data-anchor^="#"]').click(function(e) {
    var target = $(this).attr('data-anchor');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 800);
    return false;
});

$(document).ready(function(){
    //Wow.js init
        wow = new WOW(
            {
                animateClass: 'animated',
                mobile: true,
                offset: 1
            }
        );
        wow.init();

    let featuresItem = document.querySelectorAll('.features__item');
    let downloadOnePic = document.querySelector('.download-one__pic');
    let processItem = document.querySelectorAll('.process__item');
    let reviewItem = document.querySelectorAll('.review__item');

    if ( window.innerWidth < 480 ) {
        for (let i = 0; i < featuresItem.length; i++) {
            featuresItem[i].classList.remove('fadeInUp');
            featuresItem[i].classList.add('hvr-wobble-vertical');
        }
        for (let i = 0; i < processItem.length; i++) {
            processItem[i].classList.remove('fadeInUp');
            processItem[i].classList.add('hvr-wobble-vertical');
        }
        for (let i = 0; i < reviewItem.length; i++) {
            reviewItem[i].classList.remove('fadeInUp');
            reviewItem[i].classList.add('hvr-wobble-vertical');
        }
        downloadOnePic.classList.remove('fadeInUp');
        downloadOnePic.classList.add('hvr-wobble-vertical');
    }

});





