import {src, dest, parallel} from 'gulp';
import gulpif from 'gulp-if';
import svgo from 'gulp-svgmin';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import mozJpeg from 'imagemin-mozjpeg';
import pngQuant from 'imagemin-pngquant';

const isDevelopment = process.env.NODE_ENV === 'development';

const copySvg = () =>
  src([
    'source/img/**/*.svg',
    '!source/img/sprite/**/*'
  ], {
    base: 'source',
    encoding: false,
  })
    .pipe(dest('build'));

const copyImages = () =>
  src('source/img/**/*.{png,jpg,jpeg,webp,avif}',
      {
        base: 'source',
        encoding: false,
      })
      .pipe(dest('build'));

const isOptimizeJPGImg = (file) => (file.extname === '.jpg' || file.extname === '.jpeg') && !isDevelopment;

const isOptimizePNGImg = (file) => file.extname === '.png' && !isDevelopment;

const isOptimizeSvgImg = (file) => file.extname === '.svg' && !isDevelopment;

const copyMain = () => src([
  'source/fonts/**',
  'source/img/**',
  'source/video/**',
  '!source/img/sprite/**',
  '!source/img/favicon/favicon.ico',
], { base: 'source', encoding: false })
  .pipe(plumber())
  .pipe(gulpif(isOptimizeJPGImg, imagemin([mozJpeg({quality: 90, progressive: true})])))
  .pipe(gulpif(isOptimizeSvgImg, svgo()))
  .pipe(gulpif(isOptimizePNGImg, imagemin([
    pngQuant({
      speed: 1,
      strip: true,
      dithering: 1,
      quality: [0.8, 0.9],
    })])))
  .pipe(dest('build'));

const copyFavicon = () => src('source/img/favicon/favicon.ico', { 
  base: 'source/img/favicon', 
  encoding: false 
})
  .pipe(dest('build'));


const copy = parallel(copyMain, copyFavicon); 

export {copy, copyImages, copySvg};
