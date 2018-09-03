const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: './js/bundle.js',
    path: distPath
  },
  module: {
    rules: [
    {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
      },
    },
    {
      test: /\.js$/,
      exclude:  path.join(process.cwd(), 'node_modules'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, 
    {
      test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.scss$/,
      exclude:  path.join(process.cwd(), 'node_modules'),
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: isProduction
          }
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins() {
              // post css plugins, can be exported to postcss.config.js
              return [
                precss,
                autoprefixer
              ];
            }
          }
        },
        {
          loader: 'sass-loader' // compiles SASS to CSS
        },
        {
          loader: 'resolve-url-loader'
        }
      ]
    }, 
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
          mozjpeg: {
            progressive: true,
            quality: 70
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      },
      ],
    }, 
    {
      test: /font-awesome\.config\.js/,
      use: [
        { loader: 'style-loader' },
        { loader: 'font-awesome-loader' }
      ]
    },
    {
      test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',  
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util' 
    }),
    // new ExtractTextPlugin({filename: '../css/app.css', allChunks: true}),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/blog.html',
      filename: './blog.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      filename: './contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/table.html',
      filename: './table.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: './template.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/test.html',
      filename: './test.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/carousel1.html',
      filename: './carousel1.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/carousel2.html',
      filename: './carousel2.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/shadow.html',
      filename: './shadow.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/megamenu.html',
      filename: './megamenu.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/buynow.html',
      filename: './buynow.html'
    }),
    
    new HtmlWebpackPlugin({
      template: './src/addtocart.html',
      filename: './addtocart.html'
    })   
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            warnings: false,
            drop_console: true,
            unsafe: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: distPath,
    port: 3000,
    compress: true,
    open: true
  }
};

module.exports = config;
