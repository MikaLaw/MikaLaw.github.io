"use strict";

module.exports = () => {
  $.gulp.task("js:foundation", () => {
    return $.gulp
      .src($.path.jsFoundation)
      .pipe($.gp.concat("foundation.min.js"))
      .pipe($.gulp.dest($.config.root + "/js"));
  });
};
