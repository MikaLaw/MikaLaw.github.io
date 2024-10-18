import gulp from "gulp";
import browserSync from "browser-sync";

global.app = {
	gulp,
	paths,
	isProd: process.argv.includes('--build'),
}

import { paths } from './gulp/config/paths.js';
import { pugToHtml } from './gulp/tasks/pug.js';
import { clean } from './gulp/tasks/clean.js';
import { faviconToFolder } from './gulp/tasks/favicon.js';
import { fontsToFolder } from './gulp/tasks/fonts.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { svgSprites } from './gulp/tasks/sprite.js';
import { scripts } from './gulp/tasks/scripts.js';


const watcher = () => {
	browserSync.init({
		server: {
		baseDir: `${app.paths.base.build}`
	},
		notify: false,
		port: 3000,
	});

	gulp.watch(`${app.paths.base.src}/**/*.pug`, pugToHtml);
	gulp.watch(app.paths.srcScss, styles);
	gulp.watch(`${app.paths.fontsFolder}/**`, fontsToFolder);
	gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
	gulp.watch(app.paths.srcSvg, svgSprites);
	gulp.watch(app.paths.srcFullJs, scripts);
}

// Запуск проекта
gulp.task('default', gulp.series(
	clean,
	pugToHtml,
	styles,
	faviconToFolder,
	fontsToFolder,
	images,
	svgSprites,
	scripts,
	watcher
));

// Билд проекта
gulp.task('build', gulp.series(
	clean,
	pugToHtml,
	styles,
	faviconToFolder,
	fontsToFolder,
	scripts,
	images
));