function arrowScroll() {
  $('a[data-href^="#"]').on("click", (e) => {
    e.preventDefault();

    let target = $(e.currentTarget).attr("data-href");

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
    return false;
  });
}

function showPopup(text) {
  var popup = $(".popup"),
    content = popup.find(".popup__text"),
    close = popup.find(".popup__close");

  close.on("click", () => {
    popup.removeClass("active");
  });
  popup.addClass("active");
  content.html(text);
}

function formValidation(selector, urlPage) {
  let matchArr = {
    username: {
      regExp: /^[A-Za-zА-Яа-я0-9_-\s]{2,}$/g,
      errorText: "Имя должно быть длиннее 2х символов и не содержать посторонних знаков",
    },
    email: {
      regExp: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/g,
      errorText: "Email имеет неверный формат",
    },
    message: {
      regExp: /.{10,}/g,
      errorText: "Сообщение должно быть длинее 10 символов",
    },
    password: {
      regExp: /^([a-zA-Z0-9@*#]{6,18})$/g,
      errorText: "Должно быть от 6 до 18 символов",
    },
  };

  function validateFormWatcher(selector) {
    var fields = $(selector).find("input, textarea");

    fields.on("keyup", function () {
      var field = $(this),
        checkType = field.attr("name"),
        value = field.val();

      if (value.match(matchArr[checkType].regExp)) {
        field.removeClass("error").addClass("valid");
      } else {
        field.removeClass("valid").addClass("error");
      }
    });

    fields.on("focus", function () {
      let field = $(this);
      if (field.next().hasClass("tooltip")) {
        field.next().remove();
      }
    });
  }

  function validateFormFromSend(selector) {
    let fields = selector.find("input, textarea"),
      valid = true;

    fields.each(function () {
      let field = $(this),
        checkType = field.attr("name"),
        value = field.val(),
        tooltipTemplate = $("<div class='tooltip'></div>");
      if (matchArr[checkType] && !value.match(matchArr[checkType].regExp)) {
        tooltipTemplate.html(matchArr[checkType].errorText);
        field.after(tooltipTemplate);
        field.addClass("error");
        valid = false;
      } else if (field.attr("type") == "checkbox") {
        if (!field.prop("checked")) {
          showPopup("Ошибка! Робот не пройдет!");
          valid = false;
        }
      }
    });
    return valid;
  }

  function resetForm(selector) {
    let fields = selector.find("input[type=text], input[type=email], textarea, input[type=password]");
    fields.removeClass("error valid");
    fields.each(function () {
      let field = $(this);
      if (field.next().hasClass("tooltip")) {
        field.next().remove();
      }
    });
    selector[0].reset();
  }

  // Send Feedback

  function sendFeedback(selector) {
    if (validateFormFromSend(selector)) {
      $.ajax({
        url: urlPage,
        type: "POST",
        data: selector.serialize(),
        dataType: "json",
      })
        .done(function (resp) {
          if (urlPage === "/") {
            if (resp.status == "Логин и/или пароль введены неверно!") {
              showPopup(resp.status);
            } else {
              showPopup(resp.status);
              setTimeout(function () {
                window.location.href = "/admin";
              }, 3000);
            }
          } else {
            showPopup(resp.status);
            resetForm(selector);
          }
        })
        .fail(function (resp) {
          showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.", 2000);
          resetForm(selector);
        });
      return false;
    } else {
      showPopup("Пожалуйста исправьте ошибки заполнения.", 2500);
    }
  }
  function contactForm(selector) {
    var form = $(selector),
      reset = form.find("button[type='reset'], button[type='button']"),
      submit = form.find("button[type='submit']");

    reset.on("click", function (e) {
      e.preventDefault();
      resetForm(form);
    });

    submit.on("click", function (e) {
      e.preventDefault();
      sendFeedback(form);
    });
  }
  validateFormWatcher(selector);
  contactForm(selector);
}

function menu() {
  let hamburger = document.querySelector(".nav-toggle"),
    mainMenu = document.querySelector(".nav"),
    body = document.querySelector("body"),
    paddingOffset = window.innerWidth - document.body.offsetWidth + "px";

  hamburger.addEventListener("click", () => {
    mainMenu.classList.toggle("active");
    hamburger.classList.toggle("active");

    if (body.classList.contains("disable-scroll")) {
      body.classList.remove("disable-scroll");
      body.style.paddingRight = "0px";
    } else {
      body.style.paddingRight = paddingOffset;
      body.classList.add("disable-scroll");
    }
  });
}

function parallaxScroll(block, windowScroll, strafeAmount) {
  let strafe = windowScroll / -strafeAmount + -50 + "%",
    style = block.style,
    transformString = "translate(-50%," + strafe + ")";
  style.transform = transformString;
}

function preloader() {
  let preloader = $(".preloader"),
    percentsTotal = 0,
    imagePath = [];

  $("body *").each(function (ndx, element) {
    $("body").addClass("disable-scroll");

    let background = $(element).css("background-image"),
      img = $(element).is("img");

    if (background != "none") imagePath.push(background.slice(5, -2));
    if (img) imagePath.push($(element).attr("src"));
  });

  function setPercents(total, current) {
    let persents = Math.ceil((current / total) * 100);
    $(".preloader__percents").text(persents + "%");
    if (persents >= 100) {
      preloader.addClass("done");
      $("body").removeClass("disable-scroll");
    }
  }

  function loadImages(images) {
    if (!images.length) {
      preloader.addClass("done");
      $("body").removeClass("disable-scroll");
    } else {
      images.forEach(function (img, i, images) {
        let fakeImage = $("<img>", {
          attr: {
            src: img,
          },
        });
        fakeImage.on("load error", function () {
          percentsTotal++;
          setPercents(images.length, percentsTotal);
        });
      });
    }
  }
  loadImages(imagePath);
}

export { arrowScroll, showPopup, formValidation, menu, parallaxScroll, preloader };
