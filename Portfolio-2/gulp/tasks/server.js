"use strict";

module.exports = () => {
  $.gulp.task("server", () => {
    $.browserSync.init({
      proxy: "http://localhost:3000/",
      port: 4000,
    });
  });
};
