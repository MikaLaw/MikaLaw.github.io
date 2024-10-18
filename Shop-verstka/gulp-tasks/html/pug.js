'use strict';

module.exports = function (gulp, plugins, appPath, runPath, browserSync) {
  return function (done) {
    const emitty = require('emitty').setup(appPath + '/views', 'pug', {
      makeVinylFile: true
    });

    var sourceOptions = global.watch ? {read: false} : {};
    gulp.src(appPath + '/views/*.pug', sourceOptions)
      .pipe(plugins.plumber({
        errorHandler: plugins.notify.onError(function (err) {
          return {
            title: 'Pug',
            message: err.message
          };
        })
      }))
      .pipe(plugins.if(global.watch, emitty.stream(global.emittyChangedFile.path, global.emittyChangedFile.stats)))
      .pipe(plugins.pug({
        pretty: true,
        cache:true
      }))
      .pipe(gulp.dest(runPath))
      .pipe(browserSync.reload({stream: true}));
        
    done();
  };
};
