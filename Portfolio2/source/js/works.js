// Header menu
let menu = (() => {
    return {
        init: function init() {
            let hamburger = $('.navbar-toggle'),
                mainMenu = $('.menu-nav');
            hamburger.on('click', () => {
                mainMenu.toggleClass('active');
                hamburger.toggleClass('active');
            });
        }
    }
})();

// Slider portfolio
let slider = (() => {     

    var params = {
        slider: document.querySelector('.slider'),
        img: document.querySelector('.slider__body-img'),
        title: document.querySelector('.slider__title'),
        teh: document.querySelector('.slider__teh'),
        link: document.querySelector('.slider__link'),
        next: document.querySelector('.next'),
        prev: document.querySelector('.prev'),
        images: '.slider__controls-item',
        active: 0,
        duration: 1000
    };


    var data,
        animate = true,
        nextList = params.next.querySelectorAll(params.images),
        prevList = params.prev.querySelectorAll(params.images),
        length = nextList.length,
        activeIndex = params.active,
        nextIndex,
        prevIndex;
        return {
            init: function init() {

                function getNextIndex() {
                    if (activeIndex + 1 > length - 1) nextIndex = 0;else nextIndex = activeIndex + 1;
                }

                function getPrevIndex() {
                    if (activeIndex - 1 < 0) prevIndex = length - 1;else prevIndex = activeIndex - 1;
                }

                function getActiveIndex(dir) {
                    if (dir === 'next') {
                        if (activeIndex < length - 1) activeIndex++;else activeIndex = 0;
                    } else if (dir === 'prev') {
                        if (activeIndex > 0) activeIndex--;else activeIndex = length - 1;
                    }
                }

                function getData() {
                    data = {
                        src: [],
                        title: [],
                        teh: [],
                        link: []
                    };

                    Array.prototype.forEach.call(nextList, function (item, i, arr) {
                        data.src.push(item.getAttribute('data-src'));
                        data.title.push(item.getAttribute('data-title'));
                        data.teh.push(item.getAttribute('data-teh'));
                        data.link.push(item.getAttribute('data-link'));
                    });
                }

                function changeImg() {
                    var img = params.img;
                    $(img).fadeOut(params.duration / 2, function () {
                        this.setAttribute('src', data.src[activeIndex]);
                        $(this).fadeIn(params.duration / 2);
                    });
                }

                function changeInfo() {
                    params.link.setAttribute('href', data.link[activeIndex]);
                    $(params.title).fadeOut(500, function() {                        
                        params.title.innerHTML = data.title[activeIndex];
                        $(params.title).fadeIn(800);
                    });
                    $(params.teh).fadeOut(500, function() {
                        params.teh.innerHTML = data.teh[activeIndex];
                        $(params.teh).fadeIn(800);
                    });
                }              

                function slideNext() {
                    animate = false;

                    var active = nextList.item(nextIndex);
                    getNextIndex();
                    var next = nextList.item(nextIndex);

                    $(active).animate({ 'top': '-100%' }, params.duration);

                    $(next).animate({ 'top': '0%' }, params.duration, function () {
                        this.classList.add('active');

                        active.classList.remove('active');
                        active.style.top = '100%';
                        animate = true;
                    });
                }

                function slidePrev() {
                    $('body, html').animate({
                        scrollTop: params.slider.getBoundingClientRect().top + pageYOffset
                    });
                    animate = false;

                    var active = prevList.item(prevIndex);
                    getPrevIndex();
                    var prev = prevList.item(prevIndex);

                    $(active).animate({ 'top': '100%' }, params.duration);

                    $(prev).animate({ 'top': '0%' }, params.duration, function () {
                        this.classList.add('active');

                        active.classList.remove('active');
                        active.style.top = '-100%';
                        animate = true;
                    });
                }

                function setDefault() {
                    getData();
                    getPrevIndex();
                    getNextIndex();

                    nextList.item(nextIndex).classList.add('active');
                    prevList.item(prevIndex).classList.add('active');

                    changeImg();
                    changeInfo();
                }

                function run(dir) {
                    if (animate) {
                        
                        getActiveIndex(dir);

                        changeImg();
                        changeInfo();

                        slideNext();
                        slidePrev();
                    }
                }

                setDefault();

                params.next.addEventListener('click', function () {
                    run('next');
                    
                });

                params.prev.addEventListener('click', function () {
                    run('prev');
                });


            }
        }    
})();

// ArrowScroll
let arrowScroll = (() => {
    return {
        init: function init() {
            $('a[data-anchor^="#"]').click((e) => {
                e.preventDefault();
                let target =$(e.currentTarget).attr('data-anchor');         
                $('html, body').animate({
                    scrollTop: $(target).offset().top            
                }, 1000);
                return false;
            });
        }
    }
})();

// Blur form
let blur = (() => {
    let image = document.querySelector('.blur'),
        bg = document.querySelector('.feedback__bg');

    return {
        init: function init() {
            let bgW = bg.offsetWidth,
                bgCoord = bg.getBoundingClientRect(),
                bgL = bgCoord.left,
                bgT = bgCoord.top,
                imageCoord = image.getBoundingClientRect(),
                imageL = imageCoord.left,
                imageT = imageCoord.top,
                offsetL = bgL - imageL,
                offsetT = bgT - imageT;

            image.style.backgroundSize = bgW + 'px ' + 'auto';
            image.style.backgroundPosition = offsetL + 'px ' + offsetT + 'px';

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

// ParallaxScroll
let parallaxScroll = (() => {
    let user = document.querySelector('.user_section'),
        sectionName = document.querySelector('.hero__title-img'),
        sectionBg = document.querySelector('.hero__bg');
    return {
        move: (block, windowScroll, strafeAmount) => {
            let strafe = windowScroll / -strafeAmount + -50 +'%',
                style = block.style,
                transformString = 'translate(-50%,' + strafe + ')';
                style.transform = transformString;
        },
        init: function init(wScroll) {
            this.move(sectionBg, wScroll, 115);
            this.move(sectionName, wScroll, 25);
            this.move(user, wScroll, 10);
        }
    }
})();

// Form Validate
let Validate = (() => {

    var match_arr = {
        "username" : /^[A-Za-zА-Яа-я0-9_-\s]{2,}$/g,
        "email" : /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/g,
        "text" : /.{10,}/g,
        "password" : /^([a-zA-Z0-9@*#]{6,18})$/g

    },
    errors_arr = {
        "username" : "Имя должно быть длиннее 2х символов и не содержать посторонних знаков",
        "email" : "Email имеет неверный формат",
        "text" : "Сообщение должно быть длинее 10 символов"
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


            // Check text fields on air with regexp
            function onAirCheck (form_selector){
                var fields = $(form_selector).find("input[type=text], input[type=email], textarea");

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

            // Check text fields on form submit
            function textFieldsCheck (form) {
                var fields = form.find("input[type=text], input[type=email], textarea"),
                    valid = true,
                    tooltip_template = $("<div class='tooltip'></div>"),
                    form_offset = form.offset().top;


                fields.each(function() {
                    var field = $(this),
                        check_type = field.data("check"),
                        value = field.val(),
                        tooltip_offset = field.offset().top - form_offset;

                    if(!value.match(match_arr[check_type])){
                        var field_tooltip;

                        if(field.next().hasClass("tooltip")){
                            field_tooltip = field.next();
                        } else {
                            field_tooltip = tooltip_template.clone();
                            field.after(field_tooltip);
                        }

                        field_tooltip
                            .css({"top" : tooltip_offset})
                            .html(errors_arr[check_type])
                            .removeClass("hide")
                            .addClass("show");

                        field.addClass("error");
                        valid = false;
                    }

                });

                return valid;
            };

            // Reset textfields
            function resetForm (form){
                var maybe_airchecked_fields = form.find("input[type=text], input[type=email], input[type=password], textarea"),
                    tooltips = form.find(".tooltip");

                maybe_airchecked_fields.removeClass("error valid");
                tooltips.removeClass("show").addClass("hide");
                form[0].reset();
            }

            // Send Feedback
            function sendFeedback (form) {
                if(textFieldsCheck(form)){
                    $.ajax({
                        url: "/works",
                        type: "POST",
                        data: form.serialize(),
                        dataType: "json"
                    }).done(function(resp) {
                        showPopup(resp.status, 2000);
                        resetForm(form);
                    }).fail(function(resp){
                        showPopup(resp.status);
                        showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.", 2000);
                        resetForm(form);
                    });
                    return false;
                } else {
                    showPopup("Пожалуйста исправьте ошибки заполнения.",2500);
                }
            }

            // Contact form watcher
            function contactForm (selector, reset){
                var form = $(selector),
                    reset = form.find(reset),
                    fields = form.find("input[type=text], input[type=email], textarea");

                fields.on("focus", function hideTooplitp(){
                    var field = $(this);

                    if(field.next().hasClass("tooltip")){
                        field.next().removeClass("show").addClass("hide");
                    }
                });
                   
                reset.on("click", function(e){
                    e.preventDefault();
                    resetForm(form);
                });

                form.on("submit", function(e) {
                    e.preventDefault();
                    sendFeedback(form);
                });
            };

            contactForm("#feedback", "#form-clear");
            onAirCheck("#feedback");           
        }
    }
})();


$(function () {
    new WOW().init();
    preloader.init();
    svg4everybody({});
});

window.onload = () => {
    arrowScroll.init();
    menu.init();
    blur.init();
    if ($('.slider').length) {
        slider.init();
    }
    Validate.init();
};

window.onresize = function () {
    blur.init();
};

window.onscroll = () => {
    let wScroll = window.pageYOffset;
    parallaxScroll.init(wScroll);
};
