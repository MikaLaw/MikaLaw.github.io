'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/scss/main.scss')
    	.pipe($.gp.plumber({
    		errorHandler: $.gp.notify.onError(function (err) {
      			return {title: 'Style', message: err.message}
    		  })
 		   }))
      .pipe($.gp.util.env.type === 'dev' ?  $.gp.sourcemaps.init(): $.gp.util.noop())      
      .pipe($.gp.sass())
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      .pipe($.gp.rename({suffix: '.min'}))
      .pipe($.gp.csso())
      .pipe($.gp.util.env.type === 'dev' ?  $.gp.sourcemaps.write(): $.gp.util.noop())
      .pipe($.gulp.dest($.config.root + '/css'))
      .pipe($.browserSync.stream());
  });
};

