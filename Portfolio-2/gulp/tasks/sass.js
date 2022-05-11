module.exports = () => {
  $.gulp.task("sass", () => {
    return $.gulp
      .src($.config.src + "/scss/main.scss")
      .pipe(
        $.gp.plumber({
          errorHandler: $.gp.notify.onError((err) => {
            return { title: "Style", message: err.message };
          }),
        })
      )
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.init()))
      .pipe($.gp.rename({ suffix: ".min" }))
      .pipe($.gp.sassGlob())
      .pipe($.sass())
      .pipe(
        $.gp.postcss([
          $.px2rem({
            rootValue: 16,
            unitPrecision: 4,
            propWhiteList: [],
            propBlackList: [],
            exclude: false,
            selectorBlackList: [],
            ignoreIdentifier: false,
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ])
      )
      .pipe(
        $.gp.autoprefixer({
          overrideBrowserslist: ["last 10 versions"],
          cascade: false,
        })
      )
      .pipe($.gp.if($.env === "prod", $.gp.gcmq()))
      .pipe($.gp.if($.env === "prod", $.gp.cleanCSS()))
      .pipe($.gp.if($.env === "dev", $.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.config.root + "/css"))
      .pipe($.browserSync.stream());
  });
};
