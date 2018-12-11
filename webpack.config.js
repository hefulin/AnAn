var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    main:'./src/main.js',
    // 提取第三方库
    vendor:['vue','vue-router','vue-amazeui','vue-datepicker-local','lodash','vue-indicator']
  },
  externals:{
     echarts:'echarts',
     indicator:'indicator'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // 这个地方生产环境和测试环境不能使用同样的信息
    publicPath: process.env.NODE_ENV == 'production'?'./':'/',
    filename: 'js/build-[hash:8].js',
    chunkFilename:'chunks/[name]-[chunkhash:8].js'
  },
  resolve: {
  	extensions: ['.js', '.vue'], 
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, 'src'), 
      'img': path.resolve(__dirname, 'statics/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // 提取CSS
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader",publicPath:"../"})
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot:true,
    inline:true
  },
  plugins:[
    new ExtractTextPlugin("css/app.css"),
    /*
     * 这里配合上面的提取第三方库
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename:"js/common.js"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
    // new webpack.ProvidePlugin({
    //   $:"jquery",
    //   jQuery:"jquery",
    //   "window.jQuery":"jquery"
    // })
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
      compress: {
        warnings: false,
        drop_console:true,
        pure_funcs:['console.log'],
         // 内嵌定义了但是只用到一次的变量
         collapse_vars: true,
         // 提取出出现多次但是没有定义成变量去引用的静态值
         reduce_vars: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  //   ,
  //   new CompressionPlugin({
  //     asset: "[path].gz[query]",
  //     algorithm: "gzip",
  //     test: /\.js$|\.css$|\.html$/,
  //     threshold: 10240,
  //     minRatio: 0
  // })
  ])
}
