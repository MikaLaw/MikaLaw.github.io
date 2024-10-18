'use strict';

var merge = require('merge-stream');

module.exports = function (gulp, plugins, runPath) {
  return function () {
    var fonts = gulp.src(runPath + '/fonts/**/*')
        .pipe(plugins.changed('dist/fonts/'))
        .pipe(gulp.dest('dist/fonts/'));

    var images = gulp.src(runPath + '/img/**/*.svg')
        .pipe(plugins.changed('dist/img/'))
        .pipe(gulp.dest('dist/img/'));

    var html = gulp.src([runPath + '/*.html', runPath + '/filelist.json'])
        .pipe(plugins.changed('dist/'))
        .pipe(gulp.dest('dist/'));

    var js = gulp.src([runPath + '/js/**/*.js', runPath + '/js/**/*.map'])
        .pipe(plugins.changed('dist/js/'))
        .pipe(gulp.dest('dist/js/'));

    var libs = gulp.src([runPath + '/libs/**/*'])
        .pipe(plugins.changed('dist/libs'))
        .pipe(gulp.dest('dist/libs'));

    var css = gulp.src([
      runPath + '/css/*.css',
      runPath + '/css/*.css.map',
    ])
        .pipe(plugins.changed('dist/css'))
        .pipe(gulp.dest('dist/css'));

    return merge(fonts, images, html, js, libs, css);
  };
};
