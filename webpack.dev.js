/** webpack.dev.js
 * 2019-05-15
 * YangYutong
 * 参考样例： https://www.jianshu.com/p/bc8c067575ba
*/

const path = require("path");//nodejs中的基本包，处理路径的
const merge = require('webpack-merge');
const common = require('./webpack.config');
const htmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件

module.exports = merge(common, {
    devtool: 'source-map',
    mode: "development", // defaut package type is development
    devServer:{
        //"start": "webpack-dev-server --inline --open --port 5008"
        // contentBase:path.join(__dirname,"./release"),
        port:'5008',
        inline: true,
        hot: true,
        open: 'Chrome',
        // publicPath:"/release", // 重新设置 所有的 路径都要通过public路径去访问
        // historyApiFallback:{  // 然后 index 手动加上路径/public
        //     index:"/release/demo-index.html"
        // },
        // 在编译过程中有错误，给予窗口提示
        overlay:{
            errors:true
        }
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',//注意: webpack-dev-server缺省使用index.html，所以必须配置成index.html!!!
            template:'./app-template.html',//'./app.html'为模板去创建新的html文件
            inject: 'body', //rel.js注入到 html - body 中
        }),
    ]
})
