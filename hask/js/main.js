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
        mainMenu = $('.nav__hidden'),
        nav =  $('.nav'),
        link = $('.nav__item-hidden');

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
$('a[href^="#"]').click(function(e) {
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top -75
    }, 800);
    return false;
});

$(document).ready(function(){
    //Wow.js init

    if ( $(window).width() < 480 ) {
        wow = new WOW(
            {
                animateClass: 'animated',
                mobile: true,
                offset: 1
            }
        );
        wow.init();
    } else {
        wow = new WOW(
            {
                animateClass: 'animated',
                mobile: true,
                offset: 100
            }
        );
        wow.init();
    }

});





