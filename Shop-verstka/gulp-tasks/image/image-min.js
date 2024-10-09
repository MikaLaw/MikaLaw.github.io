'use strict';

module.exports = function (gulp, plugins, appPath, runPath, browserSync) {
  return function (done) {
    gulp.src([appPath + '/img/**/*', '!' + appPath + '/img/**/*.svg'])
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError(function (err) {
          return {
            title: 'image-min',
            message: err.message
          };
        })
      }))
      .pipe(plugins.changed('dist/img/'))
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('dist/img/'))

    done();
  };
};
