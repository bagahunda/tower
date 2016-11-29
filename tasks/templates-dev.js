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
      .pipe($.plumber())
      .pipe($.pug({
        data: data,
        pretty: true
      }))
      .pipe( $.rename({dirname: '.'}) )
      .pipe(gulp.dest('./dist'))
  };
};
