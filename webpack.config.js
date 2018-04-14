const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const CopyWebPackPlugin = require('copy-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const ext = parts[1]
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${ext}`),
      inject: false
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/templates/pages')

module.exports = {
  entry: [
    './src/assets/scripts/main.js',
    './src/assets/styles/main.styl'
  ],
  output: {
    filename: './assets/js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/assets/scripts'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        // test: /\.styl$/,
        // include: path.resolve(__dirname, 'src/assets/styles'),
        // use: ExtractTextPlugin.extract({
        //   use:
        //   [
        //     'css-loader',
        //     {
        //       loader: 'stylus-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     }
        //   ]
        // })
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          query: {} // Can be empty
        }
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, './src/assets/svg'),
        loader: 'svg-sprite-loader',
        options: {
          extract: true
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new ExtractTextPlugin({
    //   filename: './assets/styles/style.css',
    //   allChunks: true
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "./assets/styles/style.css"
    }),
    new CopyWebPackPlugin(
      [
        {
          from: './src/assets/fonts',
          to: './assets/fonts'
        },
        {
          from: './src/assets/images',
          to: './assets/images'
        },
        {
          from: './src/assets/favicons',
          to: './'
        },
        {
          from: './src/assets/uploads',
          to: './assets/uploads'
        }
      ]
    ),
    new SpriteLoaderPlugin()
  ].concat(htmlPlugins)
}
