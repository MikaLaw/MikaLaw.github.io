'use strict';

module.exports = function() {
  $.gulp.task('js:process', function() {
    return $.gulp.src($.path.app)
    	.pipe($.gp.plumber({
    		errorHandler: $.gp.notify.onError(function (err) {
      			return {title: 'javaScript', message: err.message}
    		})
 		}))
      .pipe($.babel({
        presets: ['@babel/preset-env']
      }))
      // .pipe($.gp.util.env.type === 'dev' ?  $.gp.sourcemaps.init(): $.gp.util.noop())
      // .pipe($.gp.concat('main.js'))
      // .pipe($.gp.util.env.type === 'dev' ?  $.gp.sourcemaps.write(): $.gp.util.noop())      
      .pipe($.gulp.dest($.config.root + '/js'))
  })
};
