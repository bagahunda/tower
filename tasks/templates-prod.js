const gulp = require('gulp');
const fs   = require('fs');
const $    = require('gulp-load-plugins')();


module.exports = function(options) {
  return function() {
    // let assets = require('../manifest/webpack.json');
    // let data = {
    //   jv0: 'jacascript:void(0);',
    //   timestamp: +Date.now(),
    //   assets: assets
    // };
    const dataFile = './manifest/webpack.json'
    return gulp
      .src(options.src)
      .pipe($.plumber())
      .pipe($.data(function(file) {
        return {"data": JSON.parse(fs.readFileSync(dataFile))}
      }))
      .pipe($.pug({
        pretty: true
      }))
      // .pipe( $.rename({dirname: '.'}) )
      .pipe(gulp.dest('./dist'))
  };
};
