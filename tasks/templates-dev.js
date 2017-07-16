'use strict'

const data = {
  jv0: 'jacascript:void(0);',
  timestamp: +Date.now()
};

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.plumber())
      .pipe($.gp.pug({
        data: data,
        pretty: true
      }))
      .pipe( $.gp.rename({dirname: '.'}) )
      .pipe($.gulp.dest('./dist'))
      .on('end', $.browserSync.reload)
  };
};
