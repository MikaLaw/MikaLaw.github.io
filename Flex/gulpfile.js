"use strict";

global.$ = {
  path: {
    task: require("./gulp/paths/tasks.js"),
    jsFoundation: require("./gulp/paths/js.foundation.js"),
    cssFoundation: require("./gulp/paths/css.foundation.js"),
  },
  config: require("./gulp/config.js"),
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")({
    rename: {
      "gulp-sass-glob": "sassGlob",
      "gulp-group-css-media-queries": "gcmq",
      "gulp-clean-css": "cleanCSS",
      "gulp-svg-sprite": "svgSprite",
    },
  }),
  px2rem: require("postcss-plugin-px2rem"),
  browserSync: require("browser-sync").create(),
  env: process.env.NODE_ENV,
  sass: require("gulp-sass")(require("sass")),
  merge: require("merge-stream"),
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task("default", $.gulp.series("clean", $.gulp.parallel("pug", "sass", "sprite:svg", "copy:fonts", "css:foundation", "copy:image", "js:process", "js:foundation"), $.gulp.parallel("watch", "server")));

$.gulp.task("build", $.gulp.series("clean", $.gulp.parallel("pug", "sass", "sprite:svg", "copy:fonts", "css:foundation", "copy:image", "js:process", "js:foundation")));
