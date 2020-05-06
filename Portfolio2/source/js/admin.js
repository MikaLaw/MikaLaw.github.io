    $('.tabs__controls-link').on('click', function (e) {
      e.preventDefault()

      var item = $(this).closest('.tabs__controls-item');
      var reqIndex = item.index();
      var contentItems = $('.tabs__content-item');

      item.addClass('active')
        .siblings().removeClass('active');

      contentItems.eq(reqIndex).addClass('active')
        .siblings().removeClass('active');
    });

// Image preview
    $("#file-select").on("change", function(){
      var input = this,
        preview;

      if($("#image-src").length > 0){
        preview = $("#image-src");
      } else {
        preview = $("<img id='image-src'/>");
        $(".form__field_image-preview").append(preview);
      }

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e){
          preview.attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    });

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


const formUpload = document.querySelector('#upload');
const formBlog = document.querySelector('#blog__form');

formUpload.addEventListener('submit', function prepareSendFile(e) {
  e.preventDefault();

  $("#upload").ajaxSubmit({
        type: "POST",
        url: "/works/upload",
        dataType: "json",
        success: function(resp){
          showPopup(resp.status, 2500);
          if(resp.status=='Картинка успешно загружена'){
            $("#upload")[0].reset();
            $("#image-src").remove();
          }
        },
        error: function(){
          showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.", 2500);
          $("#upload")[0].reset();
          $("#image-src").remove();
        }
      });
});


formBlog.addEventListener('submit', function prepareSendBlog(e) { 
  e.preventDefault();
        var form = $('#blog__form');
          $.ajax({
              url: "/blog/addpost",
              type: "POST",
              data: form.serialize(),
              dataType: "json"
          }).done(function(resp) {
              showPopup(resp.status, 2000);
              form[0].reset();
          }).fail(function(resp){
              showPopup(resp.status);
              showPopup("Упс. На сервере произошла ошибка.<br/>Попробуйте позже.", 2000);
              form[0].reset();
          });
          return false;
});


           

         
