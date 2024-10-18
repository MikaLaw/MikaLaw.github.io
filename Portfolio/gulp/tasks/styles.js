import plumber from "gulp-plumber";
import notify from "gulp-notify";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import gulpif from "gulp-if";
import sassGlob from "gulp-sass-glob";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import stylelint from '@ronilaukkarinen/gulp-stylelint';

const sass = gulpSass(dartSass);

export const styles = () => {
  return app.gulp.src(app.paths.srcScss, { sourcemaps: !app.isProd })
	.pipe(plumber(
	  notify.onError({
		title: "SCSS",
		message: "Error: <%= error.message %>"
	  })
	))
	.pipe(stylelint({
		reporters: [
			{
				failAfterError: false,
				formatter: 'string',
				console: true,
			},
		],
		extends: [
			"stylelint-config-rational-order",
			"stylelint-config-standard-scss"
		],
		rules: {
			"scss/at-import-partial-extension": "always",
			"at-rule-no-unknown": null,
			"scss/at-rule-no-unknown": true,
			"no-descending-specificity": null,
			"selector-class-pattern": [
				"^([a-z][a-z0-9]*)(-[a-z0-9]+)*((__([a-z][a-z0-9]*)(-[a-z0-9]+)*)?(_([a-z][a-z0-9]*)(-[a-z0-9]+)*)?)$",
				{
					"message": "Expected custom property name to be lowerCamelCase"
				}
			]
		}
	}))
	.pipe(sassGlob())
	.pipe(sass())
	.pipe(autoprefixer({
	  cascade: false,
	  grid: "autoplace",
	  overrideBrowserslist: ["last 5 versions"]
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulpif(app.isProd, cleanCSS({
	  level: 2
	})))
	.pipe(app.gulp.dest(app.paths.buildCssFolder, { sourcemaps: '.' }))
	.pipe(browserSync.stream());
};