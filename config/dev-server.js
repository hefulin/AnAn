var express = require("express");
var app = express();
//本地测试
// var port = process.env.PORT || 3001;
var port = process.env.PORT || 3001;
var router = express.Router();
/**
* 引入webpack 及其 配置config
*/
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");
//调用配置,生成 compiler instance
var compiler = webpack(webpackConfig);
 
//这里是重点，使用 webpack-dev-middleware 插件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
publicPath: '/',
stats: {
colors: true,
chunks: false
}
})
// 注册中间件
app.use(devMiddleware);
 
// 使用静态资源
app.use(express.static(__dirname+'/'));
 
app.listen(port, function (err){
if (err) {
throw err;
}
console.log('Listening at http://localhost:' + port + '\n')
})

// 注册JSON 数据
var mapsData = require('../data/map.json')
router.get("/map", function (req,res) {
  res.json(mapsData) 
})
app.use('/api',router)



