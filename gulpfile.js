'use strict'

const gulp = require('gulp');
const webpack            = require('webpack');
const AssetsPlugin       = require('assets-webpack-plugin');
const path               = require('path');
const gulplog            = require('gulplog');
const notifier           = require('node-notifier');

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
  src: './src/templates/**/*.pug'
});

requireTask('templates:prod', './tasks/templates-prod', {
  src: './src/templates/pages/*.pug'
});

requireTask('images', './tasks/images', {
  src: './src/assets/images/*.{png,jpg}'
});

requireTask('fonts', './tasks/fonts', {
  src: './src/assets/fonts/**/*'
});

requireTask('zip', './tasks/zip', {
  dist: './builds'
});

requireTask('clean', './tasks/clean', {
  dist: ['./dist', './builds']
});

requireTask('serve', './tasks/serve', {
  src: './dist'
});

requireTask('validate', './tasks/validate', {
  src: './dist/*.html'
});

gulp.task('watch', function() {
  gulp.watch(['./src/assets/styles/*.styl', './src/templates/_blocks/**/*.styl'], gulp.series('styles:dev'));
  // gulp.watch(['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js'], gulp.series('scripts:dev'));
  gulp.watch('./src/templates/**/*.pug', gulp.series('templates:dev'));
  gulp.watch('./src/assets/images/svg/*.svg', gulp.series('svg', 'templates:dev'));
  gulp.watch('./src/assets/images/*.{png,jpg}', gulp.series('images'));
  gulp.watch('./src/assets/fonts/**/*', gulp.series('fonts'));
})

gulp.task('webpack', function(callback) {

  let options = {
    entry: {
      build: './src/assets/scripts/main'
    },
    output: {
      path: path.resolve('./dist/assets/scripts/'),
      publicPath: '/scripts/',
      filename: '[name].js'
    },
    watch:   true,
    devtool: 'cheap-module-inline-source-map',
    module:  {
      loaders: [{
        test:    /\.js$/,
        include: path.join(__dirname, "/dist/assets"),
        loader:  'babel?presets[]=es2015'
      }]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin() // otherwise error still gives a file
    ]
  };

  // https://webpack.github.io/docs/node.js-api.html
  webpack(options, function(err, stats) {
    if (!err) { // no hard error
      // try to get a soft error from stats
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      });

      gulplog.error(err);
    } else {
      gulplog.info(stats.toString({
        colors: true
      }));
    }

    // task never errs in watch mode, it waits and recompiles
    if (!options.watch && err) {
      callback(err);
    } else {
      callback();
    }

  });


});

gulp.task('build:dev', gulp.series(
  'clean',
  gulp.parallel('styles:dev', 'webpack', 'templates:dev', 'svg', 'images', 'fonts'))
);

gulp.task('dev', gulp.series(
  'build:dev', gulp.parallel('watch', 'serve'))
);

gulp.task('build:prod', gulp.series(
  'clean',
  gulp.parallel('styles:prod', 'scripts:prod', 'templates:prod', 'svg', 'images', 'fonts'))
);

gulp.task('prod', gulp.series(
  'build:prod', 'zip')
);
