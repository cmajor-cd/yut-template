# App Demo for yut
这个Demo完整的演示了一个应用yut框架的app
# 如何手工初始化app
1. npm init yourProject  //使用npm初始化您的项目  
2. npm install yut       //安装yut框架  
3. 构建项目目录  
   您可以直接copy本demo作为您的项目骨架；也可以按照自己的习惯构建目录。  
4. 定制自己的 webpack.config.js  
   本demo的 webpack.config.js提供了最基本的run命令以及打包配置，主要的特点是：  
   a. 按照SPA的要求组织文件  
   b. 单一入口 index.js  
   c. 所有资源都打包为单一文件：demo.rel.js  
   d. 提供发布用index样例模板：app-template.html  
   e. 缺省将 dev-server 启动在 http://localhost:5008  
# 为容易理解代码, demo代码中特别说明的部分
1. 为简洁起见，除了CLanView将html/css/js做了全分割以外，其他的view的css都统一放在 main.css中。  
2. 所有的view都挂接在主框架视图:mainFrm中。  
3. view分离的html和css使用import命令进行加载  
    import htmlTemplate from './CLanView.html';  
    import './CLanView.css'  
4. 一些特殊的view，如：loginView的处理与普通的subview有些不一样，具体如下：  
    a. 它同样是挂载到mainFrm<推荐做法>上，但它们在mainFrm.html中具体位置可以<div id="mainContent">中也可以在其外，以您的习惯为准灵活处理。  
    b. 在本demo中显示这些特殊的view时并没有deactive<即：hidden>其他subview是利用该view的css来保证其覆盖在其他view之上，以此来简化代码。  
    c. 这类view在退出时使用了CView的成员函数CView::activeView('otherViewClass')，该函数会自动将其隐藏。具体请见 CLoginView 中的 "theApp.m_hMainWnd.activeView('dashboardView');"  
# 关于路由
    与其他js框架不同，yut中没有路由的概念.  
    因为yut是按照C++的窗体/视概念在组织页面的，您也可以将“路由”理解为view的active和deactive。具体的细节如下：  
        1. 每个view都维护了一个本view的subViews的对象树，通过操作这些对橡树上的view object就可以操作该view。
           具体到“路由”上，需要显示一个view或组件时只要在它的【父view】对象上使用 activeView()函数即可。如：parentViewObj.activeView('sysMaintView')。  
        2. 同样theAPP全局对象上也将mainFrm作为自己的subView进行为维护，也就是说您可以通过theApp来操作所有的view或组件。theApp提供了一个强大的API函数：traverseAllViews(yourCallbackFunc) 来完成这个工作。  
