$(document).ready(function () {
  // Swiper slide
  var mySwiper = new Swiper ('.swiper-container', {
    spaceBetween: 0,
    speed: 800,
    centeredSlides: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Owl corousel
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:false
        },
        600:{
            items:4,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    }
  });

  //Wow.js init
    wow = new WOW(
      {
        animateClass: 'animated',
        mobile: false,
        offset: 200
      }
    );
    wow.init();
    
  // Back-to-top
  $(function() {     
      $(window).scroll(function() {    
        if($(this).scrollTop() != 0) {     
          $('#back-to-top').fadeIn();    
        } else {     
          $('#back-to-top').fadeOut();     
        }    
      }); 

      $('#back-to-top').click(function() {     
        $('body,html').animate({scrollTop:0},800);
      });    
    }); 

  // Menu scroll
  $(function () {
    $('a[href^="#"]').click(function(e) {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top -75            
        }, 800);
        return false;
    });
  });

  // Scroll header
  $(function () {
    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
          $('.header').addClass('header-modify');
              } else {
          $('.header').removeClass('header-modify');
        }
    });
  });

});           