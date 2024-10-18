"use strict";

module.exports = () => {
  $.gulp.task("sprite:svg", () => {
    return $.gulp
      .src($.config.src + "/img/sprite/*.svg")
      .pipe(
        $.gp.svgo({
          plugins: [
            {
              removeAttrs: {
                attrs: "(fill|stroke|style*)",
              },
            },
          ],
        })
      )
      .pipe(
        $.gp.svgSprite({
          mode: {
            symbol: {
              sprite: "../sprite.svg",
            },
          },
        })
      )
      .pipe($.gulp.dest($.config.root + "/img"));
  });
};
