"use strict";

module.exports = () => {
  $.gulp.task("js:process", () => {
    return $.gulp
      .src($.config.src + "/js/*.js")
      .pipe(
        $.gp.plumber({
          errorHandler: $.gp.notify.onError((err) => {
            return { title: "javaScript", message: err.message };
          }),
        })
      )
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.init()))
      .pipe($.gp.concat("main.min.js", { newLine: ";" }))
      .pipe(
        $.gp.if(
          $.env === "prod",
          $.gp.babel({
            presets: ["@babel/env"],
          })
        )
      )
      .pipe($.gp.if($.env === "prod", $.gp.uglify()))
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.config.root + "/js"))
      .pipe($.browserSync.stream());
  });
};
