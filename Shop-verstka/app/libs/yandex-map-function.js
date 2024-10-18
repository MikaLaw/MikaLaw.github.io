
/**
 * @param {string} containerId
 * @param {[{title: {string}, geo: {[]}, type: {string}, html: {string}}]} points
 */
 function BaseMap(containerId, points){
	 var yamap;

	init();

	 function init() {

		 if (typeof ymaps !== "undefined")
		{
			ymaps.ready(function(){
				yamap = new ymaps.Map(containerId, {
					center: points[0] && points[0].geo ? points[0].geo:[55.751574, 37.573856],
					zoom: 10
				});

				yamap.behaviors.disable('scrollZoom');
				renderPoints();
			});
		}
	}

	/**
	 * @param {function} [filter]
	 */
	 function renderPoints(filter) {

		 var renderedPoints = points.slice();
		 var animatedLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="placemark"><img class="placemark-icon" src="'+window.imgRootPath+'/img/icons/map.svg" /></div>',
				{
					build: function () {
						animatedLayout.superclass.build.call(this);
						var element = this.getParentElement().getElementsByClassName('placemark-icon')[0];
						// Если метка выбрана, то увеличим её размер.

						if (this.isActive) {
							element.classList.add("active");
						} else if (this.inited) {
							element.classList.remove("active");
						}
						if (!this.inited) {
							this.inited = true;
							this.isActive = false;
							// При клике по метке будем перестраивать макет.
							this.getData().geoObject.events.add('click', function () {
								this.isActive = !this.isActive;
								this.rebuild();
							}, this);
						}
					}
				}
			);

		if(typeof filter === 'function') renderedPoints = renderedPoints.filter(filter);
		if(!renderedPoints.length) return;

		yamap.geoObjects.removeAll();
		var collection = new ymaps.GeoObjectCollection();

		// MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
		// 	'<div class="popover top">' +
		// 	'<a class="close" href="#"></a>' +
		// 	'<div class="arrow"></div>' +
		// 	'<div class="popover-inner">' +
		// 	'$[[options.contentLayout observeSize minWidth=457 maxWidth=457 maxHeight=350 minHeight=257]]' +
		// 	'</div>' +
		// 	'</div>', {
		// 	/**
		// 	 * @function
		// 	 * @name build
		// 	 */
		// 		build: function () {

		// 		this.constructor.superclass.build.call(this);

		// 		this._$element = $('.popover', this.getParentElement());

		// 		this.applyElementOffset();

		// 		this._$element.find('.close')
		// 			.on('click', $.proxy(this.onCloseClick, this));
		// 		},

		// 		/**
		// 		 * @function
		// 		 * @name clear
		// 		 */
		// 		clear: function () {
		// 			this._$element.find('.close')
		// 					.off('click');

		// 			this.constructor.superclass.clear.call(this);
		// 		},

		// 		/**
		// 		 * @function
		// 		 * @name onSublayoutSizeChange
		// 		 */
		// 		onSublayoutSizeChange: function () {
		// 			MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

		// 				if(!this._isElement(this._$element)) {
		// 					return;
		// 				}

		// 				this.applyElementOffset();

		// 				this.events.fire('shapechange');
		// 			},

		// 		/**
		// 		 * @function
		// 		 * @name applyElementOffset
		// 		 */

		// 		applyElementOffset: function () {

		// 			this._$element.css({
		// 					left: -(this._$element[0].offsetWidth / 2),
		// 					top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
		// 			});
		// 		},

		// 		/**
		// 		 * @function
		// 		 * @name onCloseClick
		// 		 */
		// 		onCloseClick: function (e) {
		// 			e.preventDefault();

		// 				this.events.fire('userclose');
		// 			},

		// 		/**
		// 		 * @function
		// 		 * @name getClientBounds
		// 		 * @returns {Number[][]}
		// 		 */
		// 		getShape: function () {
		// 			if(!this._isElement(this._$element)) {
		// 					return MyBalloonLayout.superclass.getShape.call(this);
		// 			}

		// 			var position = this._$element.position();

		// 			return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
		// 					[position.left, position.top], [
		// 							position.left + this._$element[0].offsetWidth,
		// 							(position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
		// 					]
		// 			]));
		// 		},

		// 		/**
		// 		 * @function
		// 		 * @private
		// 		 * @name _isElement
		// 		 * @param {jQuery} [element]
		// 		 * @returns {Boolean}
		// 		 */
		// 		_isElement: function (element) {
		// 			return element && element[0] && element.find('.arrow')[0];
		// 		}
		// 	}),

		// MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
		// 	'<div class="popover-content">$[properties.balloonContent]</div>'
		// ),

			renderedPoints.forEach(function (point) {

			collection.add(new ymaps.Placemark(point.geo, {
				balloonContent: point.html,
				hintContent: point.title,
			},
			{
				iconLayout: animatedLayout,
				iconImageHref: 'img/icons/map.svg',
				iconImageSize: [30, 42],
				iconImageOffset: [-5, -38]
			},
			));
			if (point.html) {
				var placemark = window.placemark = new ymaps.Placemark(yamap.getCenter(), {
					balloonContent: point.html,
				},
				{
					balloonLayout: MyBalloonLayout,
					balloonContentLayout: MyBalloonContentLayout,
				});

				if ($(window).width() > 1023) {
					yamap.geoObjects.remove(placemark);
					yamap.geoObjects.add(placemark);
					placemark.balloon.open();
				}
				$(window).on('resize', function() {
					if ($(window).width() > 1023) {
						yamap.geoObjects.remove(placemark);
						yamap.geoObjects.add(placemark);
						placemark.balloon.open();
					}
				})
			}
		});

		yamap.geoObjects.add(collection);

		// var centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
		// 	collection.getBounds(),
		// 	yamap.container.getSize(),
		// 	yamap.options.get('projection'),
		// 	{margin: [30, 30, 30, 30]}
		// );

		// yamap.setCenter(centerAndZoom.center, (renderedPoints.length === 1 ? 15:centerAndZoom.zoom));
	}

	return {
		renderPoints: renderPoints
	}
}
