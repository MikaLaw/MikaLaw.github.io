"use strict";

module.exports = () => {
  $.gulp.task("pug", () => {
    return $.gulp
      .src($.config.src + "/template/index.pug")
      .pipe(
        $.gp.plumber({
          errorHandler: $.gp.notify.onError((err) => {
            return { title: "Pug", message: err.message };
          }),
        })
      )
      .pipe(
        $.gp.pug({
          pretty: true,
        })
      )
      .pipe($.gulp.dest($.config.root));
  });
};
