"use strict";

module.exports = () => {
  $.gulp.task("css:foundation", () => {
    return $.gulp
      .src($.path.cssFoundation)
      .pipe($.gp.concat("foundation.min.css"))
      .pipe($.gp.cleanCSS())
      .pipe($.gulp.dest($.config.root + "/css"));
  });
};
