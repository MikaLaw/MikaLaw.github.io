$(document).ready(function(){ 

	$(function () {
		$('.owl-carousel').owlCarousel({
	    loop: true,
	    margin:10,
	    nav: false,
	    dots: true,
	    items: 1,
		})
	});

	$(function () {
		$('.team__acco-trigger').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				item = $this.closest('.team__acco-item'),
				content = item.find('.team__acco-content'),
				reqHeight = item.find('.team__acco-block').outerHeight(),
				otherItem = item.siblings(),
				otherContent = otherItem.find('.team__acco-content');

			if (!item.hasClass('active')) {
				otherItem.removeClass('active');
				otherContent.css({
				'height' : '0'
				});
				item.addClass('active');
				content.css({
				'height' : reqHeight
				});
			} else {
				item.removeClass('active');
				content.css({
				'height' : '0'
				});
			}
		});
	});

	$(function () {
		$('.menu__acco-trigger').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				item = $this.closest('.menu__acco-item'),
				content = item.find('.menu__acco-content'),
				otherItem = item.siblings(),
				reqWidth = item.find('.menu__acco-content p').outerWidth(),
				otherContent = otherItem.find('.menu__acco-content');

			if (!item.hasClass('active')) {
				otherItem.removeClass('active');
				otherContent.css({
				'width' : '0'
				});
				item.addClass('active');
				content.css({
				'width' : reqWidth
				});
			} else {
				item.removeClass('active');
				content.css({
				'width' : '0'
				});
			}
		});
	});

	$(function () {
		ymaps.ready(init);
    	function init(){ 
       
        var myMap = new ymaps.Map("map", {
            center: [59.91807704072416,30.304899499999895],
            zoom: 12,
            controls: ['zoomControl']
       		});

        var coords = [
		    [59.91519306503046,30.30146610155869],
		    [59.94731792589854,30.383949393184682],
		    [59.94459450109974,30.49443737935239],
		    [59.971275461653455,30.313675516994483]
		];

		var myGeoObjects = [];

		for (var i = 0; i<coords.length; i++) {
		  myGeoObjects[i] = new ymaps.GeoObject({
		    geometry: {
		      type: "Point",
		      coordinates: coords[i]
		    }
		  }, {
		  	iconLayout: 'default#image',
			iconImageHref: 'img/icon/map-marker.svg',
			iconImageSize: [30, 42],
			iconImageOffset: [-60, -42]
		  }

		  );
		}

		var myClusterer = new ymaps.Clusterer();
		myClusterer.add(myGeoObjects);
		myMap.geoObjects.add(myClusterer);
		myMap.behaviors.disable('scrollZoom');		 
    	}
	});

	$(function () {		
		$('#phone').inputmask({"mask": "+7 (999) 999 99 99"});
	});

	$(function () {
	    $(".rewiew__btn-link").fancybox({
	    	maxWidth: 460,
	    	padding:[20 , 20, 30 , 20]
	    });	  

	    $('.rewiew__popup-close').on('click', function(e){
	    	e.preventDefault();
	    	$.fancybox.close();
	    });
	});


	//one page scroll
	$(function () {
	    (function () {

	      var display = $('.maincontent');
	      var sections = $('.section');
	      var inScroll = false;

	      /**
	       * Транзишн до секции
	       * @param  {integer} sectionEq
	       */
	      var performTransition = function (sectionEq) {
	        if (inScroll) return;

	        inScroll = true;

	        var position = (sectionEq * -100) + '%';

	        sections.eq(sectionEq).addClass('active')
	          .siblings().removeClass('active');

	        display.css({
	          'transform': 'translate(0,' + position + ')'
	        });

	        setTimeout(function () {
	          inScroll = false;

	          $('.fixed-menu__item').eq(sectionEq).addClass('active')
	            .siblings().removeClass('active');
	        }, 1300);

	      };


	      $('.wrapper').on('wheel', function (e) {
	        var activeSection = sections.filter('.active');
	        var nextSection = activeSection.next();
	        var prevSection = activeSection.prev();


	        if (e.originalEvent.deltaY > 0 && nextSection.length) { //скроллим вниз
	          performTransition(nextSection.index());
	        }

	        if (e.originalEvent.deltaY < 0 && prevSection.length) { //скроллим вверх
	          performTransition(prevSection.index());
	        }
	      });

	      	document.addEventListener('touchmove', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var activeSection = sections.filter('.active');
		        var nextSection = activeSection.next();
		        var prevSection = activeSection.prev();


		        if (e.originalEvent.deltaY > 0 && nextSection.length) { //скроллим вниз
		          performTransition(nextSection.index());
		        }

		        if (e.originalEvent.deltaY < 0 && prevSection.length) { //скроллим вверх
		          performTransition(prevSection.index());
		        }
			}, false);

	      $('.arrow__link').on('click', function (e) {
	        e.preventDefault();
	        performTransition(1);
	      });

	      $('.nav__link, .fixed-menu__link').on('click', function (e) {
	        e.preventDefault();

	        var href = parseInt($(this).attr('data-anchor'));
	        

	        performTransition(href);
	      });

	    }());
	});


	$(function () {			
		$('#submit').on('click', function(){
			var name = $('input[name=name]').val();

			$.ajax({
				url: 'form-handler.php',
				method: 'post',
				data: {
					name: name
				},
				success: function(res) {
					$.fancybox({
					  	href: '#success',
					  	width: 200,
				    	height: 108,
				    	autoSize: false,
				    	padding:[ 0, 0, 0, 0],
				    	closeBtn: false					  			  
					}); 
				},
				error : function(res) {
      			$.fancybox({
				        href: '#error',
				       	width: 200,
				    	height: 108,
				    	autoSize: false,
				    	padding:[ 0, 0, 0, 0],
				    	closeBtn: false			        
			      	});
  				}
			});

			$('.status-popup__close').on('click', function(e){
		    	e.preventDefault();
		    	$.fancybox.close();
		    });
		});	
	});

	

});