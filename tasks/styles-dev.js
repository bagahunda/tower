'use strict'

const poststylus   = require('poststylus');
const lost         = require('lost');
const rupture      = require('rupture');
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano');

module.exports = function(options) {
  return function() {
    return $.gulp
      .src(options.src)
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.stylus({
        use: [rupture(), poststylus(['lost', autoprefixer()])]
      }))
      .pipe($.gp.postcss([cssnano()]))
      .pipe($.gp.sourcemaps.write('.'))
      .pipe($.gulp.dest('./dist/assets/styles'))
      .pipe($.browserSync.stream())
  };
};
