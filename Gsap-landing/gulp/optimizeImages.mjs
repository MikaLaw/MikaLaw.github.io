import {src, dest} from 'gulp';
import gulpif from 'gulp-if';
import svgo from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import {stacksvg} from 'gulp-stacksvg';
import webp from 'gulp-webp';
import rename from 'gulp-rename';

// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';

const createSprite = () =>
  src('./source/img/sprite/*.svg', {encoding: false})
      .pipe(gulpif(!isDevelopment, svgo()))
      .pipe(
          cheerio({
            run($) {
              $('[fill]').removeAttr('fill');
              $('[stroke]').removeAttr('stroke');
            },
            parserOptions: {
              xmlMode: true,
            },
          })
      )
      .pipe(stacksvg())
      .pipe(rename('sprite.svg'))
      .pipe(dest('./build/img'));

const createWebp = () =>
  src(['source/img/**/*.{png,jpg}', '!source/img/favicon/**/*'], {encoding: false})
      .pipe(webp({quality: 90}))
      .pipe(dest('source/img/'));

export {createSprite, createWebp};
