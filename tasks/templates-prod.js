const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

const data = {
  jv0: 'jacascript:void(0);',
  timestamp: +Date.now()
};

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.jade({
        data: data,
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
  };
};