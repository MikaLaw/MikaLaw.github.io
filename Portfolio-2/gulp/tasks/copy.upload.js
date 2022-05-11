"use strict";

module.exports = () => {
  $.gulp.task("copy:upload", () => {
    return $.gulp.src($.config.src + "/upload/**/*.*").pipe($.gulp.dest($.config.root + "/upload"));
  });
};
