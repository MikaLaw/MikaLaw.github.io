$(document).ready(function() {
    
    // Hidden menu
    $( '.navbar-toggle' ).click( function() {
        if ( $( '.nav_hidden' ).is( ':hidden' ) ) {
            $( '.nav_hidden' ).show();
        } else {
            $( '.nav_hidden' ).hide();
        }
    });

    // Carousel
    $('.slide-one').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            576:{
                items:2,
                nav:false
            },
            768:{
                items:3,
                nav:false,
                loop:false
            },
            992:{
                items:4,
                nav:false,
                loop:false
            }
        }
    });

    $('.slide-two').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            576:{
                items:2,
                nav:false
            },
            768:{
                items:3,
                nav:false,
                loop:false
            },
            992:{
                items:5,
                nav:false,
                loop:false
            }
        }
    });

    $('.slide-three').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            576:{
                items:1,
                nav:false
            },
            768:{
                items:1,
                nav:false,
                loop:false
            },
            992:{
                items:1,
                nav:false,
                loop:false
            }
        }
    });

    // Sort

    $(function () {
        var mixer = mixitup('.container-filter');

    });

     $(document).ready(function(){
        $('.navifation__buttons .works__btn-link').click(function() {
            $(this).siblings('.works__btn-link').removeClass('active');
            $(this).addClass('active');
        });
    });
   
    // Scroll
    $(function () {
    $('a[href^="#"]').click(function(e) {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top            
        }, 1000);
        return false;
    });

});

    //wow.js init
    wow = new WOW(
        {
          animateClass: 'animated',
          mobile: false,
          offset: 200
        }
    );
    wow.init();

});