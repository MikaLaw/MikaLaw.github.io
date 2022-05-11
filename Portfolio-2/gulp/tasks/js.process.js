"use strict";

module.exports = function () {
  $.gulp.task("js:process", function () {
    var bundles = ["about.js", "admin.js", "blog.js", "intro.js", "works.js"];

    var bundled = bundles.map(function (bundle) {
      return $.browserify({
        entries: "./src/js/" + bundle,
        debug: true,
      })
        .transform($.babelify, { presets: ["@babel/preset-env"] })
        .transform("glslify")
        .bundle()
        .pipe($.source(bundle))
        .pipe($.gp.rename({ suffix: ".min" }))
        .pipe($.buffer())
        .pipe(
          $.gp.plumber({
            errorHandler: $.gp.notify.onError((err) => {
              return { title: "javaScript", message: err.message };
            }),
          })
        )
        .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.init()))
        .pipe($.gp.if($.env === "prod", $.gp.uglify()))
        .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.write()))
        .pipe($.gulp.dest($.config.root + "/js"))
        .pipe($.browserSync.stream());
    });
    return $.merge(bundled);
  });
};
