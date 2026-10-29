import {src, dest} from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';

const compilePug = () =>
  src('source/view/pages/*.pug')
      .pipe(plumber({
        errorHandler: function(err) {
          console.error('Pug Сompilation Error:', err.message);
          this.emit('end');
        }
      }))
      .pipe(pug({pretty: true, cache: true}))
      .pipe(dest('build'));

export default compilePug;
