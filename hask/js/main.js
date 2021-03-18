// Carousel
$(function() {
    var owl = $('.owl-carousel'),
        owlOptions = {
            loop: true,
            margin: 23,
            nav: true,
            navText: [ '<div><img src="/img/icon/arrow-prev.svg" alt=""></div>', '<div><img src="/img/icon/arrow-next.svg" alt=""></div>'],
            responsive: {
                0: {
                    items: 2,
                },
                768: {
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

// Scroll header
$(function () {
    $(window).scroll(function() {
      if ($(document).scrollTop() > $('#advantages').offset().top) {
          $('.header').addClass('header-modify');
              } else {
          $('.header').removeClass('header-modify');
        }

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


//Wow.js init
wow = new WOW(
    {
        animateClass: 'animated',
        mobile: true,
        offset: 100
    }
);
wow.init();




