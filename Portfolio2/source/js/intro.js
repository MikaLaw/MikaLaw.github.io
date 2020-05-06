// FlipperForm intro
let flipper = (() => {
    return {
        init: function init() {
            let button = $('.intro-header__link'),
                flipContainer = $('.intro-container'),
                container = $('.auth__login'),
                backButton = $('.auth__login-back ');
            button.on('click', () => {
                flipContainer.addClass('flip');
                button.addClass('auth__button_hidden');
            });
            backButton.on('click', () => {
                flipContainer.removeClass('flip');
                button.removeClass('auth__button_hidden');
            });
                      
            $(document).mouseup(function (e){ 
                if ($(".popup").hasClass('hide')){ 
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        flipContainer.removeClass('flip');
                        button.removeClass('auth__button_hidden');
                    }
                }               
            });
         
        }
    }
})();

// Preloader
let preloader = (() => {
     return {
        init: function init() {
            var percentsTotal = 0,
                preloader = $('.preloader');

              var imgPath = $('*').map(function (ndx, element) {
                var background = $(element).css('background-image'),
                  img = $(element).is('img'),
                  path = '';

                if (background != 'none') {
                  path = background.replace('url("', '').replace('")', '');
                }

                if (img) {
                  path = $(element).attr('src');
                }

                if (path) return path

              });

              var setPercents = function (total, current) {
                var persents = Math.ceil(current / total * 100);

                $('.preloader__percents').text(persents + '%');

                if (persents >= 100) {
                  preloader.addClass('done');
                  $(".intro-container").addClass("loaded");
                }
              }

              var loadImages = function (images) {

                if (!images.length) preloader.addClass('done');

                images.forEach(function (img, i, images) {
                  var fakeImage = $('<img>', {
                    attr: {
                      src: img
                    }
                  });

                  fakeImage.on('load error', function () {
                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                  });
                });
              }             
                  var imgs = imgPath.toArray();

                  loadImages(imgs);  
            }
        }
})();

// Parallax
let parallax = (() => {
  let parallaxContainer = document.getElementById('parallax'),
      layers = parallaxContainer.children;
    return {
        init: function init() {        
        window.addEventListener('mousemove', (e) => {
                let pageX = e.pageX,
                    pageY = e.pageY,
                    initialX = (window.innerWidth / 2) - pageX,
                    initialY = (window.innerHeight / 2) - pageY;
                [].slice.call(layers).forEach((layer, i) => {
                    let divider = (i + 1) / 100,
                        positionX = initialX * divider,
                        positionY = initialY * divider,
                        layerStyle = layer.style,
                        transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0)';
                    layerStyle.transform = transformString;
                    layerStyle.msTransform = transformString;
                    layerStyle.webkitTransform = transformString;
                    layerStyle.oTransform = transformString;
                    layerStyle.mozTransform = transformString;
                });
            })

        }
    }
})();


// Form Validate
let ValidateLogin = (() => {

    var match_arr = {
        "username" : /^[A-Za-zА-Яа-я0-9_-\s]{2,}$/g,
        "password" : /^([a-zA-Z0-9@*#]{6,18})$/g
    };

    return {
        init: function init() { 

            function showPopup (text, time){
                var popup = $(".popup"),
                    content = popup.find(".popup__text"),
                    close = popup.find(".popup__close");

                close.on("click", function closePopup(){
                    popup.addClass("hide").removeClass("show");
                });

                content.html(text);
                popup.removeClass("hide").addClass("show");
            };

            //Check text fields on air with regexp
            function onAirCheck (form_selector){
                var fields = $(form_selector).find("input[type=text], input[type=password]");

                fields.on("keyup", function(){
                    var field = $(this),
                        check_type = field.data("check"),
                        value = field.val();

                    if(value.match(match_arr[check_type])){
                        field.removeClass("error").addClass("valid");
                    }else{
                        field.removeClass("valid").addClass("error");
                    };

                });
            };

            // Reset textfields
            function resetForm (form){
                var maybe_airchecked_fields = form.find("input[type=text], input[type=email], input[type=password], textarea");

                maybe_airchecked_fields.removeClass("error valid");
                form[0].reset();
            }

            // Check robot
            function checkRobot(form, checkbox_stat, radio_stat){
                var valid = false,
                    human = $("input:checkbox").prop("checked"),
                    radio = $("input:radio:checked").val();

                if(human===checkbox_stat && radio===radio_stat){
                    valid = true;
                }else{
                    showPopup("Ошибка! Режим самоуничтожения запущен!",2500);
                }

                return valid;
            }

            // Process login
            function authorization(form){
                $.ajax({
                    type: "POST",
                    url: "/",
                    data: form.serialize(),
                    dataType: "json"
                }).done(function(resp) {
                    if(resp.status=='Логин и/или пароль введены неверно!'){
                        showPopup(resp.status,2000);
                    } else {
                        showPopup(resp.status,2500);
                        setTimeout(function(){
                            window.location.href = "/admin";
                        }, 3000)
                    }
                    resetForm(form);
                }).fail(function(){
                    showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.");
                    resetForm(form);
                });
                return false;
            }

            // Auth form watcher
            function authForm (selector, login, checkbox_stat, radio_stat){
                var form = $(selector),
                    button = form.find(login);

                button.on("click", function(e){
                    e.preventDefault();
                    if(checkRobot(form, checkbox_stat, radio_stat)){
                        authorization(form);
                    } else {
                        resetForm(form);
                    }
                });
            }

            authForm("#login", "#log-me", true, "Yes");
            onAirCheck("#login");
        }
    }
})();


$(function () {
    preloader.init();
    svg4everybody({});
});


window.onload = () => {
    flipper.init();
    parallax.init();
    ValidateLogin.init();

}
