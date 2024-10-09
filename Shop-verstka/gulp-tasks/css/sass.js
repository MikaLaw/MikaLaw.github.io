'use strict';

const sass = require('gulp-sass')(require('sass'));

module.exports = function (gulp, plugins, appPath, runPath, browserSync) {
  return function (done) {
    gulp
      .src([appPath + '/scss/template.scss', appPath + '/scss/components/user-typography.scss'], { sourcemaps: true })
    // gulp
    //   .src(appPath + '/scss/template.scss', { sourcemaps: true })
      .pipe(
        plugins.plumber({
          errorHandler: plugins.notify.onError(function (err) {
            return {
              title: 'Styles',
              message: err.message,
            };
          }),
        })
      )
      .pipe(plugins.sassGlob()) // позволяет делать импорты всех файлов в одной папке сразу
      .pipe(sass())
      .pipe(gulp.dest(runPath + '/css/', { sourcemaps: '.' }))
      .pipe(browserSync.reload({ stream: true }));

    done();
  };
};
