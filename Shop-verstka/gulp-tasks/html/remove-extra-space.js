'use strict';

module.exports = function (gulp, plugins) {
  return function (done) {
    gulp.src('dist/*.html')
      .pipe( gulp.dest( function(file) {
        let html = file.contents.toString();
        let selfClosing = ['img','input','hr','br','wbr','source','area','col','colgroup','meta','link'];
        html = html.replace( /(<[A-Z][A-Z0-9]*\b[^>]*>)([^<>]*)(<\/[A-Z][A-Z0-9]*>)/gi, function(str, start, content, end) {
          let tag = start.replace( /<|>/gi, '' ).split( ' ' )[0];
          return start + ( ( selfClosing.indexOf( tag ) === -1 ) ? content.trim() : content ) + end;
        });
        file.contents = new Buffer.from( html );
        return 'dist';
      }))
    done();
  };
};
