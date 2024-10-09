export const images = () => {
  return app.gulp.src([ `${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg,mp4,webm}`, `!${app.paths.srcImgFolder}/favicon`, `!${app.paths.srcImgFolder}/sprite/**`], { encoding: false })
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};