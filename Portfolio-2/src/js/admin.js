import { showPopup } from "./functions";
var theEditor = {};

ClassicEditor.create(document.querySelector("#editor"))
  .then((editor) => {
    theEditor = editor;
  })
  .catch((error) => {
    console.error(error);
  });

function changeTabs() {
  $(".panel-tabs__btn").on("click", function () {
    let item = $(this).closest(".panel-tabs__controls-title"),
      reqIndex = item.index(),
      contentItems = $(".panel-tabs__content-desc");

    item.addClass("active").siblings().removeClass("active");
    contentItems
      .eq(reqIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
}

function imagePreview(selector) {
  let fileField = $(selector).find($("input[type='file']")),
    previewImg = $(selector).find($(".panel-tabs__content-img"));

  fileField.on("change", function () {
    let input = this,
      preview,
      previewContainer,
      formRow;

    if (previewImg.length > 0) {
      preview = previewImg;
    } else {
      preview = $("<img class='panel-tabs__content-img'/>");
      previewContainer = $("<div class='panel-tabs__content-preview'></div>");
      previewContainer.append(preview);
      formRow = $("<div class='panel-tabs__content-row'></div>");
      formRow.append(previewContainer);
      fileField.closest(".panel-tabs__content-row").after(formRow);
    }

    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        preview.attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
}

function formValidate(fields) {
  let valid = true;
  fields.each(function (i, field) {
    if ($(field).val() === "") {
      valid = false;
    }
  });
  return valid;
}

function sendUserInfo(dataUrl, formSelector, cb) {
  formSelector.on("submit", function (e) {
    e.preventDefault();

    let fields = $(formSelector[0]).find($(".panel-tabs__content-input"));

    if (!formValidate(fields)) {
      showPopup("Заполните все поля!");
    } else {
      $.ajax({
        url: dataUrl,
        type: "POST",
        contentType: false,
        processData: false,
        data: new FormData(formSelector[0]),
        dataType: "json",
      })
        .done(function (resp) {
          showPopup(resp.status, 2000);
          formSelector[0].reset();
          cb();
        })
        .fail(function (resp) {
          showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.");
          formSelector[0].reset();
          cb();
        });
    }
  });
}

window.addEventListener("load", () => {
  changeTabs();
  imagePreview("#about-form");
  imagePreview("#works-form");
  sendUserInfo("/about", $("#about-form"), () =>
    $("#about-form")
      .find($("input[type='file']"))
      .closest(".panel-tabs__content-row")
      .next()
      .remove()
  );
  sendUserInfo("/works/uploads", $("#works-form"), () =>
    $("#works-form")
      .find($("input[type='file']"))
      .closest(".panel-tabs__content-row")
      .next()
      .remove()
  );
  sendUserInfo("/blog", $("#blog-form"), () => theEditor.setData(""));
});
