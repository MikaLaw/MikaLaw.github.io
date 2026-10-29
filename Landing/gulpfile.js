import {series, parallel, watch} from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';
import compilePug from './gulp/compilePug.mjs';
import compileStyles from './gulp/compileStyles.mjs';
import {createSprite, createWebp} from './gulp/optimizeImages.mjs';
import compileScripts from './gulp/compileScripts.mjs';
import {copy, copyImages, copySvg} from './gulp/copyAssets.mjs';

const server = browserSync.create();

const clean = () => deleteAsync('build');
const refresh = (done) => {
  server.reload();
  done();
};

const syncServer = () => {
  server.init({
    server: 'build/',
    notify: false,
    index: 'index.html',
    open: true,
    cors: true,
    ui: false,
  });

  const streamStyles = () => compileStyles().pipe(server.stream());

  const streamScripts = () => compileScripts().pipe(server.stream({once: true}));

  watch('source/view/**/*.pug', series(compilePug, refresh));
  watch('source/styles/**/*.scss', streamStyles);
  watch('source/scripts/**/*.{js,json}', streamScripts);
  watch('source/img/**/*.svg', series(copySvg, createSprite, refresh));
  watch('source/img/**/*.{png,jpg,webp}', series(copyImages, refresh));
};

const coreTasks = series(
    clean,
    createWebp,
    createSprite,
    copy,
    parallel(
        compileStyles,
        compileScripts,
        compilePug
    )
);

const start = series(
    coreTasks,
    syncServer
);

const build = coreTasks;

export {start, build};
