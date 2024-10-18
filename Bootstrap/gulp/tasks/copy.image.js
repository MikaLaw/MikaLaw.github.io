"use strict";

module.exports = () => {
  $.gulp.task("copy:image", () => {
    return $.gulp
      .src(
        [$.config.src + "/img/**/*.*", "!" + $.config.src + "/img/sprite/*.*"],
        {
          since: $.gulp.lastRun("copy:image"),
        }
      )
      .pipe($.gulp.dest($.config.root + "/img"));
  });
};
