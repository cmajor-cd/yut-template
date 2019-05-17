/** 
 * 2019-05-15
 * YangYutong
 * 参考样例：打包SPA的组件
 *   https://www.jianshu.com/p/bc8c067575ba
*/

const path = require("path");//nodejs中的基本包，处理路径的
// const fs = require("fs");//nodejs中的基本包，处理文件的
const htmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件

module.exports = {
    devtool: 'source-map', // debug tools: map error to source code
    mode: "development", // defaut package type is development
    entry: path.join(__dirname,"src/index.js"),//__dirname代表文件所在的目录
    // entry: (readDirSync(path.join(__dirname,"src"))).js,//__dirname代表文件所在的目录
    output: {
        filename: "demo.rel.js",
        path: path.join(__dirname,"release"),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: { // compile rule of modules
        rules: [
            // { test: /\.(png|jpg|gif)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } }, //jpg file loader
            { //ES6 compile
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["env"]
                        // presets:["es2016"]
                    }
                },
                exclude:path.resolve(__dirname,"node_modules|release"),
                include:path.resolve(__dirname,"src")
            },
            { // html files
                test:/\.html$/,
                use: [
                    {
                    loader: 'html-loader'
                    }
                ]
            },
            { // style css files
                test: /\.css$/,
                use: [
                  { // style file loader
                    loader: 'style-loader'
                  },
                  { // css file loader
                    loader: 'css-loader'
                  }
                ]
            },
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'demo-index.html',//打包好后，发布的新建html名字为demo-index.html
            template:'./app-template.html',//'./app.html'为模板去创建新的html文件
            inject: 'body' //rel.js注入到 html - body 中
        })
    ]
    
}
