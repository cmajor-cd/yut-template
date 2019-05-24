/** webpack.prod.js
 * 2019-05-15
 * YangYutong
 * 参考样例： https://www.jianshu.com/p/bc8c067575ba
 * */

const path = require("path");//nodejs中的基本包，处理路径的
const merge = require('webpack-merge');
const common = require('./webpack.config');
const htmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件

module.exports = merge(common, {
    mode: "production", // defaut package type is production
    // devtool: 'source-map',
    plugins: [
        new htmlWebpackPlugin({
            filename:'index.html',//打包好后，发布的新建html名字为demo-index.html
            template:'./app-template.html',//'./app.html'为模板去创建新的html文件
            inject: 'body', //rel.js注入到 html - body 中
            hash:true,      //为静态资源生成hash值
            minify:{        //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true //删除空白符与换行符
            }
        }),
    ]
})

