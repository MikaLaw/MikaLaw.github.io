'use strict';

module.exports = function (gulp, plugins) {
  return function (done) {
    gulp.src([
      'dist/css/*.css',
      '!dist/css/*.min.css',
    ])
      .pipe(plugins.cleanCss({compatibility: 'ie9'}))
      .pipe(plugins.rename(function (path) {
        path.basename += '.min';
      }))
      .pipe(gulp.dest('dist/css'));

    gulp.src([
      'dist/libs/**/*.css',
      '!dist/libs/**/*.min.css',
    ])
      .pipe(plugins.cleanCss({compatibility: 'ie9'}))
      .pipe(plugins.rename(function (path) {
        path.basename += '.min';
      }))
      .pipe(gulp.dest('dist/libs'));
    
    done();
  };
};
