'use strict';

module.exports = function (gulp, plugins, appPath, runPath) {
  return function (done) {
    gulp.src(appPath + '/scripts/init.js', { sourcemaps: true })
        .pipe(plugins.plumber({
          errorHandler: plugins.notify.onError(function (err) {
            return {
              title: 'js-init',
              message: err.message
            };
          })
        }))
        .pipe(plugins.babel({
          presets: ['@babel/env']
        }))
        .pipe(plugins.stripComments({ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g}))
        .pipe(gulp.dest(runPath + '/js/', { sourcemaps: '.' }));
    
    done();
  };
};
