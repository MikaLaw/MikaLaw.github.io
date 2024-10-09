export const faviconToFolder = () => {
    return app.gulp.src(`${app.paths.srcFaviconFolder}/**`, { encoding: false })
      .pipe(app.gulp.dest(app.paths.base.build))
  }