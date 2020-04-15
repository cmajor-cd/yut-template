/** 
 * 2019-05-15
 * YangYutong
 * 参考样例： https://www.jianshu.com/p/bc8c067575ba
 * */
//const webpack = require('webpack');
const path = require("path");//nodejs中的基本包，处理路径的
const htmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // devtool: 'source-map',
    // mode: "development", // defaut package type is development
    entry: {
        'index':path.join(__dirname,"./src/index.js"),//__dirname代表文件所在的目录
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname,"release"),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: { // compile rule of modules
        rules: [
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }, //jpg file loader
            { //ES6 compile
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["env"]
                        // presets:["es2016"]
                    }
                },
                exclude:path.resolve(__dirname,"node_modules|release|dist"),
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
        // new htmlWebpackPlugin({
        //     filename:'index.html',//打包好后，发布的新建html名字为demo-index.html
        //     template:'./app-template.html',//'./app.html'为模板去创建新的html文件
        //     inject: 'body', //rel.js注入到 html - body 中
        // }),
        new cleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['*.map', '*.js', '*.html'],
        }),
        new copyWebpackPlugin([ // 复制配置文件到发布目录
            { from: path.join(__dirname,'./src/appcfg.js'), to:  path.join(__dirname,'./release/') },
            { from: path.join(__dirname,'./src/HowToUse.txt'), to:  path.join(__dirname,'./release/') },//HowToUse.txt
        ]),
    ]
    
}
