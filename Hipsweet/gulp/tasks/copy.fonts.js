"use strict";

module.exports = () => {
  $.gulp.task("copy:fonts", () => {
    return $.gulp
      .src($.config.src + "/fonts/**/*.*")
      .pipe($.gp.rename({ dirname: "" }))
      .pipe($.gulp.dest($.config.root + "/fonts"));
  });
};
