'use strict';
var autoprefixer = require('autoprefixer');
var postcssEmptymediaqueries = require('postcss-emptymediaqueries');
var postcssDiscardComments = require('postcss-discard-comments');

var processors = [
  autoprefixer(),
  postcssEmptymediaqueries(),
  postcssDiscardComments(),
];

module.exports = function (gulp, plugins) {
  return function (done) {
    gulp.src('dist/css/*.css')
        .pipe(plugins.plumber({
          errorHandler: plugins.notify.onError(function (err) {
            return {
              title: 'PostCss',
              message: err.message
            };
          })
        }))
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest('dist/css/'));

    // gulp.src('dist/libs/**/*.css')
    //     .pipe(plugins.plumber({
    //       errorHandler: plugins.notify.onError(function (err) {
    //         return {
    //           title: 'PostCss',
    //           message: err.message
    //         };
    //       })
    //     }))
    //     .pipe(plugins.postcss(processors))
    //     .pipe(gulp.dest('dist/libs/'));

    done();
  };
};
