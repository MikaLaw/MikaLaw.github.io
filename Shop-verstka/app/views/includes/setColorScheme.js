<script>
	function setColorScheme() {

		var topLogoImg = document.querySelector('.logo__img');
		var bottomLogoImg = document.querySelector('.footer .logo__img');
		var firstSliderImg = document.querySelector('.slider-main__bgr-img');
		var body = document.getElementsByTagName('body')[0];

		if (body.classList.value.indexOf('theme_techno') > -1) {
			topLogoImg.src = 'img/logo_theme_techno.png';
			bottomLogoImg.src = 'img/logoBottom_theme_techno.png'
			
			if (firstSliderImg) {
				firstSliderImg.src ='img/content/index/slide_1_theme_techno.jpg';
			}
		}

		if (body.classList.value.indexOf('theme_sweet') > -1) {
			topLogoImg.src = 'img/logo_theme_sweet.png';
			bottomLogoImg.src = 'img/logoBottom_theme_sweet.png'
			if (firstSliderImg) {
				firstSliderImg.src ='img/content/index/slide_1_theme_sweet.jpg';
			}
		}


		if (body.classList.value.indexOf('theme_city') > -1) {
			topLogoImg.src = 'img/logo_theme_city.png';
			bottomLogoImg.src = 'img/logoBottom_theme_city.png'
			if (firstSliderImg) {
				firstSliderImg.src ='img/content/index/slide_1_theme_city.jpg';
			}
		}

		if (body.classList.value.indexOf('theme_base') > -1) {
			topLogoImg.src = 'img/logo.png';
			bottomLogoImg.src = 'img/logo.png'
			if (firstSliderImg) {
				firstSliderImg.src ='img/content/index/slide_1.jpeg';
			}
		}

	}

	function changeTheme(themeSelector) {
		var body = document.getElementsByTagName('body')[0];
		body.classList.value = '';
		body.classList.value = 'theme_' + themeSelector;
		setColorScheme()
	}

	function changeSchemePanel() {
		var schemePanel = document.getElementById('colorSchemeForm');
		var schemePanelTogglers = document.querySelectorAll('.colorSchemeForm__item');

		function schemeTogglerWork() {
			var themeName = this.getAttribute('data-theme');
			changeTheme(themeName);
			schemePanelTogglers.forEach(function(item) {
				item.classList.remove('colorSchemeForm__item_active');
			})
			this.classList.add('colorSchemeForm__item_active');
		}

		schemePanelTogglers.forEach(function(item) {
			item.addEventListener('click', schemeTogglerWork);
		})

	}
 
	document.addEventListener('DOMContentLoaded', setColorScheme);
	document.addEventListener('DOMContentLoaded', changeSchemePanel);
</script>

<style>

.colorSchemeForm {
	position: fixed; 
	bottom: 0px; 
	left: 0px; 
	z-index: 200;
	width: 100%;

}

.colorSchemeForm__wrapper {
	display: flex;
	justify-content: space-around;	
}

.colorSchemeForm__item {
	height: 50px;
	width: 50px;
	text-align: center;
	background-color: royalblue;
	color: #fff;
	font-size: 35px;
	line-height: 50px;
	cursor: pointer;
	display: inline-block;
}

.colorSchemeForm__item_active {
	background-color: #fff;
	color: royalblue;
	border: 4px solid royalblue;
}

</style>