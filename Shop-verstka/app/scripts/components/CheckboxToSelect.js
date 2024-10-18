'use strict';

// var $ = require('jquery');
function setDisplay($select){
	var display = [];
	var $display = $select.find('[data-display]');
	var $checked = $select.find('[data-inputs] input:checked');
	var $input = $select.find('[data-inputs] input');
	var placeholder = $display.attr('data-placeholder');		

	if ($display.prop("tagName") === 'INPUT') {
		if(placeholder === undefined) {
			placeholder = $display.text();
			$display.attr('data-placeholder', placeholder);
		}
		$checked.each(function(){
			display.push($(this).attr('data-value') || $(this).parent().find('.select__title').html());
		});
		$input.siblings('label').removeClass('is-active');
		$checked.siblings('label').addClass('is-active');
		if (display.length > 0) {
			$display
				.val(display.join(', '))
				.removeClass('placeholder')
				.removeClass('is-multiple');

		} else {
			$display
				.val(placeholder)
				.addClass('placeholder')
				.removeClass('is-multiple');
		}
	} else {		
		if(placeholder === undefined) {
			placeholder = $display.text();
			$display.attr('data-placeholder', placeholder);
		}

		$checked.each(function(){
			display.push($(this).attr('data-value') || $(this).parent().find('label').html());
		});


		if (display.length > 0) {
			if (display.length > 1) {
				$display
					.html('Выбрано ' + display.length)
					.addClass('is-multiple');
			} else {
				$display
					.html(display.join(', '))
					.removeClass('placeholder')
					.removeClass('is-multiple');
			}
		}	else {
			$display
				.html(placeholder)
				.addClass('placeholder')
				.removeClass('is-multiple');
		}
	}
}
function refreshDisplay(selector){
	$(selector).each(function(){
		setDisplay($(this));
	})
}
module.exports.CheckboxToSelect = function () {

	function CheckboxToSelect(selector){
		$(document).on('click.cts', selector + ' [data-inputs]', function(e){
			if(!$(e.target).parent().find('input:radio').length)
			{
				e.stopPropagation();
			}
		});

		$(document).on('click.cts', selector + ' [data-data-js-tabselect-clear]', function(e){
			e.preventDefault();
			e.stopPropagation();
			const $select = $(e.target).parents('[data-data-js-tabselect]');
			$select.find('[data-inputs] input[type="checkbox"]').prop('checked', false);
			setDisplay($select);
		});

		$(document).on('change.cts', selector + ' [data-inputs] input', function(e){
			setDisplay($(this).closest(selector));
		});
		
		$(document).on('click.cts', selector + ' [data-data-js-tabselect-range]', function (e) {
			var $display = $(this).closest(selector).find('[data-display]');
			var leftVal = $(this).parent().find('[data-data-js-tabselect-range-left]').val();
			var rightVal = $(this).parent().find('[data-data-js-tabselect-range-right]').val();
			$display.html(leftVal + ' - ' + rightVal).removeClass('placeholder')	
			$(this).closest(selector).removeClass('open')
		});
		// function setDisplay($select){
		// 	var display = [];
		// 	var $display = $select.find('[data-display]');
		// 	var $checked = $select.find('[data-inputs] input:checked');
		// 	var $input = $select.find('[data-inputs] input');
		// 	var placeholder = $display.attr('data-placeholder');		

		// 	if ($display.prop("tagName") === 'INPUT') {
		// 		if(placeholder === undefined) {
		// 			placeholder = $display.text();
		// 			$display.attr('data-placeholder', placeholder);
		// 		}
		// 		$checked.each(function(){
		// 			display.push($(this).attr('data-value') || $(this).parent().find('.select__title').html());
		// 		});
		// 		$input.siblings('label').removeClass('is-active');
		// 		$checked.siblings('label').addClass('is-active');
		// 		if (display.length > 0) {
		// 			$display
		// 				.val(display.join(', '))
		// 				.removeClass('placeholder')
		// 				.removeClass('is-multiple');

		// 		} else {
		// 			$display
		// 				.val(placeholder)
		// 				.addClass('placeholder')
		// 				.removeClass('is-multiple');
		// 		}
		// 	} else {		
		// 		if(placeholder === undefined) {
		// 			placeholder = $display.text();
		// 			$display.attr('data-placeholder', placeholder);
		// 		}

		// 		$checked.each(function(){
		// 			display.push($(this).attr('data-value') || $(this).parent().find('label').html());
		// 		});


		// 		if (display.length > 0) {
		// 			if (display.length > 1) {
		// 				$display
		// 					.html('Выбрано ' + display.length)
		// 					.addClass('is-multiple');
		// 			} else {
		// 				$display
		// 					.html(display.join(', '))
		// 					.removeClass('placeholder')
		// 					.removeClass('is-multiple');
		// 			}
		// 		}	else {
		// 			$display
		// 				.html(placeholder)
		// 				.addClass('placeholder')
		// 				.removeClass('is-multiple');
		// 		}
		// 	}
		// }
		// function refreshDisplay(){
		// 	$(selector).each(function(){
		// 		setDisplay($(this));
		// 	})
		// }

		refreshDisplay(selector);

		return {
			refreshDisplay: refreshDisplay
		};
	};

	CheckboxToSelect('[data-data-js-tabselect]');
};
module.exports.refreshDisplay = refreshDisplay