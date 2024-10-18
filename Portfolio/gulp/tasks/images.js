export const images = () => {
  return app.gulp.src([ `${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg,webp}`, `!${app.paths.srcImgFolder}/favicon`, `!${app.paths.srcImgFolder}/sprite/**`], { encoding: false })
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};