import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import { createGulpEsbuild } from "gulp-esbuild";
import browserslistToEsbuild from "browserslist-to-esbuild";



export const scripts = () => { 
  const gulpEsbuild = createGulpEsbuild({ incremental: app.isProd });
  
  return app.gulp.src(app.paths.srcMainJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(gulpEsbuild({
      bundle: true,
      format: 'esm',
      // splitting: true,
      platform: 'browser',
      minify: app.isProd,
      sourcemap: !app.isProd,
      target: browserslistToEsbuild(),
    }))
    .pipe(app.gulp.dest(app.paths.buildJsFolder))
    .pipe(browserSync.stream());
}