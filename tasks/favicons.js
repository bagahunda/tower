'use strict'

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.size({gzip: true, showFiles: true}))
      .pipe($.gulp.dest('./dist'))
  };
};
