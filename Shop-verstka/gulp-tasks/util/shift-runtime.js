'use strict';

var merge = require('merge-stream');

module.exports = function (gulp, plugins, appPath, runPath) {
  return function () {
    var fonts = gulp.src(appPath + '/fonts/**/*')
        .pipe(plugins.changed(runPath + '/fonts/'))
        .pipe(gulp.dest(runPath + '/fonts/'));

    var images = gulp.src([
      appPath + '/img/**/*',

      '!' + appPath + '/img/**/*.html',

      '!' + appPath + '/img/sprite/',
      '!' + appPath + '/img/sprite/**/*',

      '!' + appPath + '/img/resize/',
      '!' + appPath + '/img/resize/**/*',

      '!' + appPath + '/img/makeup/',
      '!' + appPath + '/img/makeup/**/*',

      '!' + appPath + '/img/sprite-svg/',
      '!' + appPath + '/img/sprite-svg/**/*',

      '!' + appPath + '/img/css/',
      '!' + appPath + '/img/css/**/*',
    ])
        .pipe(plugins.changed(runPath + '/img/'))
        .pipe(gulp.dest(runPath + '/img/'));

    var ico = gulp.src([appPath + '/*.ico',])
        .pipe(plugins.changed(runPath + '/'))
        .pipe(gulp.dest(runPath + '/'));

    var libs = gulp.src([appPath + '/libs/**/*'])
        .pipe(plugins.changed(runPath + '/libs'))
        .pipe(gulp.dest(runPath + '/libs'));

    var html = gulp.src(appPath + '/index.html')
        .pipe(plugins.changed(runPath + '/'))
        .pipe(gulp.dest(runPath + '/'));

    return merge(html, fonts, images, ico, libs);
  };
};
