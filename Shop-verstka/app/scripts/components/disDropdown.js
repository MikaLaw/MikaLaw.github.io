/* Выпадашки disDropdown
* Copyright (c) 2017 Алексеенко Сергей Александрович <sergei_alekseenk@list.ru>
*
* Version: 1.1
*
* Работает так:
	* При клике по элементу у которого имеется атрибут "data-dsdd" переключается класс "open" его родителя
* data-dsdd="this" - переключается класс "open" у самого элемента
* data-dsdd="#container" - переключается класс "open" у элемента $("#container")
*
* Вы можете создать свою выпадашку со своими стилями, отображение которой зависит от класса "open" контейнера,
* в котором находится выпадашка.
*
* Либо можете использовать выпадашку "dsdd-menu". Примеры её использования смотрите ниже.
*/

/**
 Пример 1:
 <div style="position: relative; display: inline-block;">
 <button data-dsdd>Кнопка</button>
 <ul class="dsdd-menu">
 <li><a href="#" class="item" data-icon>Пункт 1</a></li>
 <li><a href="#" class="item" data-icon>Пункт 2</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
 <li class="sep"></li>
 <li class="title">Заголовок</li>
 <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
 <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
 <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
 </ul>
 </div>
 */
/**
 Пример 2:
 <div style="position: relative; display: inline-block;" data-dsdd="this">
 Кнопка
 <ul class="dsdd-menu">
 <li><a href="#" class="item" data-icon>Пункт 1</a></li>
 <li><a href="#" class="item" data-icon>Пункт 2</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
 <li class="sep"></li>
 <li class="title">Заголовок</li>
 <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
 <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
 <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
 </ul>
 </div>
 */
/**
 Пример 3:
 <div data-dsdd="#container">
 Кнопка
 </div>

 <div style="position: relative;" id="container">
 <ul class="dsdd-menu">
 <li><a href="#" class="item" data-icon>Пункт 1</a></li>
 <li><a href="#" class="item" data-icon>Пункт 2</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 3</a></li>
 <li class="sep"></li>
 <li class="title">Заголовок</li>
 <li><a href="#" class="item" data-icon="basket">Пункт 4</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 5</a></li>
 <li><a href="#" class="item" data-icon="circle" data-count="15">Пункт 6</a></li>
 <li><a href="#" class="item" data-icon="heart" data-count="2">Пункт 7</a></li>
 <li><a href="#" class="item" data-icon="circle">Пункт 8</a></li>
 </ul>
 </div>
 */
/**
 Пример 4:
 <div style="position: relative;">
 <button data-dsdd>Кнопка</button>

 <div class="vashe-menu">
 Ваше меню, которое отображаетя по классу .open .vashe-menu {display: block;}
 </div>
 </div>
 */

'use strict';

var $ = require('jquery');

module.exports = function () {

	var toggle = '[data-dsdd]';
	var toggle_text = '[data-dsdd-content]:not([data-dsdd])';

	function dropdown(e){
		var $this = $(this);

		if($this.is('.disabled, :disabled')) return;

		var $parent = getParent($this);
		var isActive = $parent.hasClass('open');

		clearMenus(e);

		if(!isActive)
		{
			if(e.isDefaultPrevented()) return;
			$parent.addClass('open');

			var $popup = $parent.find(".dsdd-menu");
			if($popup.length)
			{
				if(!$('.angle:first', $popup).length) $popup.append('<div class="angle"></div>');

				$popup.resetVerticalPosition = function(){
					this.removeClass('pos-t').removeClass('pos-b');
				};
				$popup.resetHorizontalPosition = function(){
					this.css('margin-left', 0);
					this.find('.angle:first').css('margin-left', 0);
				};

				// Установка горизонтального положения меню
				$popup.setOffsetHorisontal = function(extra_length){
					this.resetHorizontalPosition();
					var popup_width = this.outerWidth(true);
					var offset_lenght = 0;
					extra_length = parseInt(extra_length);

					if(this.offset().left < 0)
					{
						offset_lenght = (this.offset().left * -1) + 5;
					}
					else if((this.offset().left + popup_width) > $(window).width())
					{
						offset_lenght = ((this.offset().left + popup_width) - $(window).width() + 5) * -1;
						if(extra_length > 0) offset_lenght = offset_lenght + extra_length + 5;
					}
					if(offset_lenght !== 0)
					{
						this.css('margin-left', offset_lenght);
						this.find('.angle:first').css('margin-left', offset_lenght * -1);
					}

					if(!extra_length && this.offset().left < 0) this.setOffsetHorisontal(this.offset().left * -1);
				};
				$popup.setOffsetHorisontal();


				// Установка вертикального положения меню
				$popup.resetVerticalPosition();
				$popup.addClass('pos-b');
				if(($popup.offset().top + $popup.outerHeight(true)) > ($(document).scrollTop() + $(window).height()))
				{
					$popup.resetVerticalPosition();
					$popup.addClass('pos-t');

					if(($popup.offset().top+($popup.outerHeight(true)/4)) < ($(document).scrollTop()))
					{
						$popup.resetVerticalPosition();
						$popup.addClass('pos-b');
					}
				}
			}

			$this.focus();
		}

		return false
	}

	function clearMenus(e){
		const $target = $(e.target);
		$(toggle).each(function(_,item) {
			var $parent = getParent($(this));
			if(!$parent.hasClass('open')) return;

			if ($target.parents('.dsdd-menu').siblings(toggle).is($(item))) return;
			$parent.removeClass('open')
		})
	}

	function getParent($this){
		var selector = $this.attr('data-dsdd');
		var $parent;
		if(selector && selector !== "undefined")
		{
			$parent = (selector === "this") ? $this:$(selector);
		}
		return $parent && $parent.length ? $parent:$this.parent();
	}

	function printContent(){
		var $this = $(this);
		var content = $this.data('dsdd-content');
		var tpl = '<div class="dsdd-menu v--content">'+content+'</div>';
		$this.append(tpl);
		$this.attr('data-dsdd', 'this');
		setTimeout(function(){
			$this.trigger('click.dis.dropdown');
		}, 50);
	}

	function selectInput(e) {

	}

	$(document)
		.on('click.dis.dropdown', clearMenus)
		.on('click.dis.dropdown', toggle, dropdown)
		.on('click.dis.dropdown', toggle_text, printContent)
}

