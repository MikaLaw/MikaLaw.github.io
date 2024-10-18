import pug from "gulp-pug";
import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

export const pugToHtml = () => {
	return app.gulp.src([`${app.paths.srcPug}/*.pug`])
		.pipe(plumber(
			notify.onError({
			title: "Pug",
			message: "Error: <%= error.message %>"
			})
		))
		.pipe(pug({}))
		.pipe(app.gulp.dest(app.paths.base.build))
		.pipe(browserSync.stream());
}