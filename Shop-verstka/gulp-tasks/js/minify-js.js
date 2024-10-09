'use strict';

module.exports = function (gulp, plugins) {
  return function (done) {
    gulp.src([
      'dist/js/*.js',
      '!dist/js/*.min.js',
    ])
      .pipe(plugins.plumber())
      .pipe(plugins.uglify())
      .pipe(plugins.stripComments({ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g}))
      .pipe(plugins.rename(function (path) {
        path.basename += '.min';
      }))
      .pipe(gulp.dest('dist/js'));

    // gulp.src([
    //   'dist/libs/**/*.js',
    //   '!dist/libs/**/*.min.js',
    // ])
    //   .pipe(plugins.plumber())
    //   .pipe(plugins.uglify())
    //   .pipe(plugins.stripComments({ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g}))
    //   .pipe(plugins.rename(function (path) {
    //     path.basename += '.min';
    //   }))
    //   .pipe(gulp.dest('dist/libs'));
    
    done();
  };
};
