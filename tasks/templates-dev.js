const gulp = require('gulp');
const fs   = require('fs');
const $    = require('gulp-load-plugins')();


module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.changed('dist', {extension: '.html'}))
      .pipe($.cached('pug'))
      .pipe($.pugInheritance({basedir: 'src/templates', skip: 'node_modules'}))
      .pipe($.filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      }))
      .pipe($.plumber())
      .pipe($.pug({
        pretty: true
      }))
      .pipe($.rename({dirname: ''}))
      .pipe(gulp.dest('./dist'))
  };
};
