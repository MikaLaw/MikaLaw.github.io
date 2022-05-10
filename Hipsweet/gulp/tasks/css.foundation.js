"use strict";

module.exports = () => {
  $.gulp.task("css:foundation", () => {
    return $.gulp
      .src($.path.cssFoundation)
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.init()))
      .pipe($.gp.concat("foundation.min.css"))
      .pipe($.gp.cleanCSS())
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.config.root + "/css"));
  });
};
