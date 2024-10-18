var appPath = 'app';
var runPath = 'runtime';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    rename: {
      'gulp-sass-glob': 'sassGlob',
    },
  }),
  browserSync = require('browser-sync').create();

/* start browserSync */
gulp.task('browser-sync', function (done) {
  browserSyncOpt = {
    server: './' + runPath,
    notify: true,
  };
  browserSync.init(browserSyncOpt);
  console.log('http://localhost:3000/index.html');
  done();
});

gulp.task('browser-sync-reload', function (done) {
  browserSync.reload();
  done();
});
/* end browserSync */

/* start css */
gulp.task(
  'sass',
  require('./gulp-tasks/css/sass')(gulp, plugins, appPath, runPath, browserSync)
);
gulp.task(
  'sass-additional',
  require('./gulp-tasks/css/sass-additional')(
    gulp,
    plugins,
    appPath,
    runPath,
    browserSync
  )
);
gulp.task('postcss', require('./gulp-tasks/css/postcss')(gulp, plugins));
gulp.task('minify-css', require('./gulp-tasks/css/minify-css')(gulp, plugins));
/* end css */

/* start html */
gulp.task(
  'pug',
  require('./gulp-tasks/html/pug')(gulp, plugins, appPath, runPath, browserSync)
);
gulp.task(
  'remove-extra-space',
  require('./gulp-tasks/html/remove-extra-space')(gulp, plugins)
);
/* end html */

/* start js */
gulp.task(
  'js-init',
  require('./gulp-tasks/js/js-init')(gulp, plugins, appPath, runPath)
);
gulp.task(
  'browserify',
  require('./gulp-tasks/js/browserify')(gulp, plugins, appPath, runPath)
);
gulp.task(
  'minify-js',
  require('./gulp-tasks/js/minify-js')(gulp, plugins, appPath)
);
/* end js */

/* start images */
gulp.task(
  'image-min',
  require('./gulp-tasks/image/image-min')(gulp, plugins, runPath, browserSync)
);
/* end images */

/* start util */
gulp.task(
  'shift-static-files-to-dist',
  require('./gulp-tasks/util/shift-static-files-to-dist')(
    gulp,
    plugins,
    runPath,
    browserSync
  )
);
gulp.task(
  'shift-runtime',
  require('./gulp-tasks/util/shift-runtime')(
    gulp,
    plugins,
    appPath,
    runPath,
    browserSync
  )
);
gulp.task('filelist', require('./gulp-tasks/util/filelist')(appPath, runPath));
/* end util */

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

gulp.task('frontend-watch', function () {
  global.watch = true;

  gulp
    .watch(
      appPath + '/views/**/*',
      { usePolling: true },
      gulp.series('pug', 'filelist')
    )
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      };
    });
  gulp.watch(
    [
      appPath + '/scss/**/*.scss',
      '!' + appPath + '/scss/libs.scss',
      '!' + appPath + '/scss/normalize.scss',
    ],
    { usePolling: true },
    gulp.series('sass')
  );
  gulp.watch(
    [appPath + '/scss/libs.scss', appPath + '/scss/normalize.scss'],
    { usePolling: true },
    gulp.series('sass-additional')
  );
  gulp.watch(
    [
      appPath + '/fonts/**/*',
      appPath + '/img/**/*',
      appPath + '/libs/**/*',
      appPath + '/index.html',
    ],
    { usePolling: true },
    gulp.series('shift-runtime', 'browser-sync-reload')
  );
  gulp.watch(
    [appPath + '/scripts/app.js', appPath + '/scripts/components/**/*.js'],
    { usePolling: true },
    gulp.series('browserify', 'browser-sync-reload')
  );
  gulp.watch(
    appPath + '/scripts/init.js',
    { usePolling: true },
    gulp.series('js-init', 'browser-sync-reload')
  );
});

// собираем проект в папке runtime
gulp.task(
  'initialize-app',
  gulp.series(
    gulp.parallel(
      'shift-runtime',
      'pug',
      'js-init',
      'browserify',
      'sass',
      'sass-additional'
    ),
    'filelist'
  )
);

// Запуск проекта
gulp.task(
  'default',
  gulp.series('initialize-app', 'browser-sync', 'frontend-watch')
);

// собираем проект в папке dist
gulp.task(
  'build',
  gulp.series(
    'initialize-app',
    'shift-static-files-to-dist',
    'postcss',
    gulp.parallel('remove-extra-space', 'minify-js', 'minify-css', 'image-min')
  )
);
