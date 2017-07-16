'use strict'

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.plumber())
      .pipe($.gp.babel({
        presets: ['es2015']
      }))
      .pipe($.gp.concat('temp.js'))
      .pipe($.gp.rename('build.js'))
      .pipe($.gp.uglify())
      .pipe($.gulp.dest('./dist/assets/scripts'))
  };
};
