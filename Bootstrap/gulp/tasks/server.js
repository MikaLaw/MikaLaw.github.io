"use strict";

module.exports = () => {
  $.gulp.task("server", () => {
    $.browserSync.init({
      server: $.config.root,
    });
  });
};
