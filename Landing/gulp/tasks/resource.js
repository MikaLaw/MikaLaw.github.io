export const libsToFolder = () => {
    return app.gulp.src(`${app.paths.srcLibsJs}/**/*.*`, { encoding: false })
        .pipe(app.gulp.dest(`${app.paths.buildLibsJs}`))
}