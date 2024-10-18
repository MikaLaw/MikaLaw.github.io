"use strict";

module.exports = () => {
  $.gulp.task("clean", () => {
    return $.gulp.src($.config.root + "/**/*", { read: false }).pipe($.gp.rm());
  });
};
