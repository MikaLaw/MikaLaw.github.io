import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import { createGulpEsbuild } from 'gulp-esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import merge from 'merge-stream'; // Добавляем плагин для объединения потоков

const isDevelopment = process.env.NODE_ENV === 'development';
const gulpEsbuild = createGulpEsbuild({ incremental: isDevelopment });

// Вынесем общие настройки esbuild в объект, чтобы не дублировать код
const baseEsbuildConfig = {
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: browserslistToEsbuild(),
  entryNames: '[name].min',
};

const compileMainScripts = () => {
  // 1. Поток для обычных скриптов (исключаем vendor.js)
  const mainScripts = src(['source/scripts/*.js', '!source/scripts/vendor.js'])
    .pipe(plumber({
      errorHandler: function(err) {
        console.error('JS Compilation Error:', err.message);
        this.emit('end');
      }
    }))
    .pipe(gulpEsbuild({
      ...baseEsbuildConfig,
      minify: !isDevelopment, // Минификация включена для продакшена
      sourcemap: isDevelopment,
    }));

  // // 2. Поток конкретно для vendor.js (минификация ВСЕГДА выключена)
  // const vendorScripts = src('source/scripts/vendor.js')
  //   .pipe(plumber({
  //     errorHandler: function(err) {
  //       console.error('Vendor JS Compilation Error:', err.message);
  //       this.emit('end');
  //     }
  //   }))
  //   .pipe(gulpEsbuild({
  //     ...baseEsbuildConfig,
  //     minify: false, // Отключаем минификацию полностью
  //     sourcemap: isDevelopment,
  //   }));

  // Объединяем оба потока и отправляем в папку назначения
  return merge(mainScripts)
    .pipe(dest('build/scripts'));
};

export default compileMainScripts;