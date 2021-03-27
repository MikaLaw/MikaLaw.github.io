// Carousel
$(function() {
    var owl = $('.owl-carousel'),
        owlOptions = {
            loop: true,
            margin: 23,
            nav: true,
            navText: [ '<div><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<circle cx="20" cy="20" r="20" fill="#896BFD"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7238 14.6842C22.1204 15.0014 22.1847 15.5801 21.8674 15.9767L18.6488 19.9999L21.8674 24.0232C22.1847 24.4197 22.1204 24.9984 21.7238 25.3156C21.3273 25.6329 20.7486 25.5686 20.4314 25.172L16.7532 20.5743C16.4846 20.2385 16.4846 19.7613 16.7532 19.4255L20.4314 14.8278C20.7486 14.4312 21.3273 14.367 21.7238 14.6842Z" fill="white"/>\n' +
            '</svg>\n</div>', '<div><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="#896BFD"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2763 14.6842C17.8797 15.0014 17.8154 15.5801 18.1327 15.9767L21.3513 19.9999L18.1327 24.0232C17.8154 24.4197 17.8797 24.9984 18.2763 25.3156C18.6728 25.6329 19.2515 25.5686 19.5687 25.172L23.2469 20.5743C23.5155 20.2385 23.5155 19.7613 23.2469 19.4255L19.5687 14.8278C19.2515 14.4312 18.6728 14.367 18.2763 14.6842Z" fill="white"/>\n' +
            '</svg></div>'],
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

    if ( window.innerWidth < 480 ) {
        //Wow.js init
        wow = new WOW(
          {
              animateClass: 'animated',
              mobile: true,
              offset: 0
          }
        );
        wow.init();
    } else {
        //Wow.js init
        wow = new WOW(
          {
              animateClass: 'animated',
              mobile: true,
              offset: 100
          }
        );
        wow.init();
    }
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





