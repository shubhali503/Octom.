const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: "./js/index.js"
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        assetModuleFilename: 'images/[name][ext]',
    },
     
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        },
        {
        test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: [
            {
                loader: miniCss.loader,
            },
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: 'sprite.svg',
          runtimeCompat: true
        }
      }
    ]
  },

    plugins: [
        new miniCss({
            filename: '[name].css'
        }),
        new htmlWebpackPlugin({
            template: "./template.html"
        }),
        new SpriteLoaderPlugin({
          plainSprite: true
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        watchFiles: ["./src/*.html"]
    }
  };