"use strict";

module.exports = () => {
  $.gulp.task("watch", () => {
    $.gulp.watch($.config.src + "/scss/**/*.scss", $.gulp.series("sass")).on("change", async () => {
      $.browserSync.reload();
    });
    $.gulp.watch($.config.src + "/js/**/*.js", $.gulp.series("js:process")).on("change", async () => {
      $.browserSync.reload();
    });
    $.gulp.watch($.config.src + "/upload/**/*.*", $.gulp.series("copy:upload")).on("change", async () => {
      $.browserSync.reload();
    });
  });
};
