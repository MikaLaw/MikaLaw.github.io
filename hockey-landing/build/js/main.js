// Carousel
$(function() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        responsive: {
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

});

// Header menu
$(function (){
    var hamburger = $('.navbar'),
        mainMenu = $('.nav__hidden'),
        nav =  $('.nav'),
        link = $('.nav__link-hidden');

    hamburger.on('click', function(e){
        e.preventDefault();
        mainMenu.toggleClass('active');
        hamburger.toggleClass('active');
        nav.toggleClass('active');
    });

    link.on('click', function(e){
        e.preventDefault();
        mainMenu.toggleClass('active');
        hamburger.toggleClass('active');
        nav.toggleClass('active');
    });
});

// Menu scroll
$('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 800);
    return false;
});

//
// function modal() {
//     document.querySelector('.hero__btn-input').addEventListener('change',  randomDigit);
//     $('#saveModal').fadeIn(300, function(){
//         setTimeout(function(){
//             window.clearTimeout();
//             $('#saveModal').fadeOut(300);
//         }, 3500);
//     });
// };

// $('.hero__btn-click').on('click', function () {
//     if ($('.hero__btn-input').val().length !== 0) {
//         modal()
//     }
// });
// $('.hero__btn-input').on('keyup', function () {
//     if (event.keyCode === 13 && $('.hero__btn-input').val().length !== 0) {
//         modal()
//     }
// });

class AjaxHelper {
    static ajax(url, method, data) {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();
            ajax.open(method, url, true);
            ajax.onreadystatechange = () => {
                if (ajax.readyState !== 4) {
                    return;
                }
                if (ajax.status === 200) {
                    try {
                        return resolve(JSON.parse(ajax.responseText));
                    } catch (error) {
                        return reject(error);
                    }
                } else {
                    if (ajax.status == 409) {
                        return reject("Такой email уже есть в системе!")
                    }
                }
            };
            ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            if (data) {
                ajax.send(data);
            }
            else {
                ajax.send();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", async function(event) {
    // let mailForm = document.querySelector(".email-form");
    // mailForm.addEventListener('click', async function (e) {
    //     e.preventDefault();
    //     document.querySelector(".info-span").innerHTML = '';
    //     let email = document.querySelector('.email__input').value;
    //     let data = JSON.stringify({
    //         'name' : '',
    //         'text' : '',
    //         'email' : email
    //     });
    //
    //     try {
    //         result = await AjaxHelper.ajax('https://develop.appcraft.team:30050/api/landing/email', "POST", data);
    //         document.querySelector(".info-span").innerHTML ='Ваш email отправлен успешно!';
    //         if (localStorage.getItem('locale') == 'en') {
    //             document.querySelector(".info-span").innerHTML ='Your email has been sent successfully!';
    //         }
    //     }
    //     catch(error) {
    //         document.querySelector(".info-span").innerHTML = error;
    //         if (localStorage.getItem('locale') == 'en') {
    //             document.querySelector(".info-span").innerHTML = 'This email is already in the system!';
    //         }
    //     }
    // });
});