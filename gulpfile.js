'use strict'

const gulp = require('gulp');

function requireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}

requireTask('styles:dev', './tasks/styles-dev', {
  src: './src/assets/styles/main.styl'
});

requireTask('styles:prod', './tasks/styles-prod', {
  src: './src/assets/styles/main.styl'
});

requireTask('svg', './tasks/svg', {
  src: './src/assets/images/svg/**/*.svg',
  dist: './src/templates/blocks/sprite/'
});

requireTask('scripts:dev', './tasks/scripts-dev', {
  src: ['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js']
});

requireTask('scripts:prod', './tasks/scripts-prod', {
  src: ['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js']
});

requireTask('templates:dev', './tasks/templates-dev', {
  src: './src/templates/**/*.jade'
});

requireTask('templates:prod', './tasks/templates-prod', {
  src: './src/templates/pages/*.jade'
});

requireTask('zip', './tasks/zip', {
  dist: './dist/builds'
});

requireTask('clean', './tasks/clean', {
  dist: './dist'
});

requireTask('serve', './tasks/serve', {
  src: './dist'
});

gulp.task('watch', function() {
  gulp.watch(['./src/assets/styles/main.styl', './src/templates/blocks/**/*.styl'], gulp.series('styles:dev'));
  gulp.watch(['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js'], gulp.series('scripts:dev'));
  gulp.watch('./src/templates/**/*.jade', gulp.series('templates:dev'));
})

gulp.task('build:dev', gulp.series(
  'clean',
  gulp.parallel('styles:dev', 'scripts:dev', 'templates:dev'))
);

gulp.task('dev', gulp.series(
  'build:dev', gulp.parallel('watch', 'serve'))
);

