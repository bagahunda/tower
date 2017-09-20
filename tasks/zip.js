'use strict'

module.exports = function(options) {
  return function() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let min = date.getMinutes();

    if (dd < 10) {
      mm = '0' + mm;
    }

    let today = dd + '_' + mm + '_' + yyyy + '_' + hh + '-' + min;
    return $.gulp
      .src('./dist/**/*')
      .pipe($.gp.zip('Build-' + today + '.zip'))
      .pipe($.gulp.dest(options.dist))
  }
}
