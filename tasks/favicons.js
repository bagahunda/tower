'use strict'

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src, {since: $.gulp.lastRun(options.taskName)})
      .pipe($.gulp.dest('./dist'));
  };
};
