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

	$(function(){
		$('.tabs__controls-link').on('click', function(e){
			e.preventDefault();

			var
				$this = $(this),
				itemTab = $this.closest('.tabs__controls-item'),
				containerTab = $this.closest('.tabs'),
				contentTab = containerTab.find('.tabs__content-item'),
				ndxTab = itemTab.index(),
				reqItemTab = contentTab.eq(ndxTab),
				activeItemTab = contentTab.filter('.active');

			itemTab.addClass('active')
				.siblings()
				.removeClass('active');

			activeItemTab.fadeOut(500, function () {
				reqItemTab.fadeIn(500, function () {
					$(this).addClass('active')
						.siblings()
						.removeClass('active');
				});
			});
		});
	}());

	$(function () {		
		$('#phone').inputmask({"mask": "+7 (999) 999 99 99"});
	});

	 //Wow.js init
	$(function () {		
		wow = new WOW(
	      {
	        animateClass: 'animated',
	        mobile: false,
	        offset: 200
	      }
	    );
	    wow.init();
	});


    

	$(function(){
		$('.acco__trigger').on('click', function(e){
			e.preventDefault();


			var	$this = $(this),
				item = $this.closest('.acco__item'),
				content = item.find('.acco__content'),
				otherItem = item.siblings(),
				otherContent = otherItem.find('.acco__content'),
				reqheight = content.find('.acco__content-text').outerHeight(true);


			if (!item.hasClass('active')) {
				item.addClass('active');
				otherItem.removeClass('active');
				otherContent.css({'height' : 0});
				content.css({'height' : reqheight});

			} else {
				item.removeClass('active');
				content.css({'height' : 0});
			}
			
		});
	}());

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
			iconImageHref: 'img/icon/mark.png',
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
	    $('a[href^="#"]').click(function(e) {
	        var target = $(this).attr('href');
	        $('html, body').animate({
	            scrollTop: $(target).offset().top            
	        }, 1000);
	        return false;
	    });
	});


});