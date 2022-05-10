"use strict";

module.exports = () => {
  $.gulp.task("sprite:png", () => {
    const spriteData = $.gulp.src($.config.src + "/img/sprite/*.png").pipe(
      $.gp.spritesmith({
        imgName: "sprite.png",
        cssName: "sprite.scss",
        imgPath: "../img/sprite.png",
        retinaSrcFilter: $.config.src + "/img/sprite/*@2x.png",
        retinaImgName: "sprite@2x.png",
        retinaImgPath: "../img/sprite@2x.png",
        algorithm: "left-right",
        padding: 20,
      })
    );
    const imgStream = spriteData.img.pipe($.gulp.dest($.config.root + "/img")); // путь куда записываем спрайт

    const cssStream = spriteData.css.pipe(
      $.gulp.dest($.config.src + "/scss/sprite")
    ); // путь куда записываем файл стилей для спрайта

    return $.merge(imgStream, cssStream);
  });
};
