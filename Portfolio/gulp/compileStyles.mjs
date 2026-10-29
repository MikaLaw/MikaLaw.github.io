import {src, dest} from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import lightningcss from 'postcss-lightningcss';
import sortMediaQueries from 'postcss-sort-media-queries';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps'; // 🔥 Импортируем плагин

const isDevelopment = process.env.NODE_ENV === 'development';

const sass = gulpSass(dartSass);

const compileStyles = () =>
  src('source/styles/*.scss')
      .pipe(gulpif(isDevelopment, sourcemaps.init()))      
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif(
          !isDevelopment,
          postcss([
            sortMediaQueries({
              sort: 'mobile-first' // Варианты: 'mobile-first' (по возрастанию) или 'desktop-first' (по убыванию)
            }),
            lightningcss({
              lightningcssOptions: {
                minify: true,
                sourceMap: false,
              },
            }),
          ]))
      )
      .pipe(rename({suffix: '.min'}))
      .pipe(gulpif(isDevelopment, sourcemaps.write('.')))
      .pipe(dest('build/css'));

export default compileStyles;