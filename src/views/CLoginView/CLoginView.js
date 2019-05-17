/**
 * Login View的主Class定义
 */
import htmlTemplate from './CLoginView.html';
import './CLoginView.css';

import $ from 'jquery';
import {yutls, theApp, CView} from 'yut';
// import tools from '../js/tools';
class CLoginView extends CView{
    constructor(hParent){
        // supper call before user 'this' pointer.
        super();
        var _this = this;
        //1. internal variant / function
        // _this.Data = {}
        // 多语言实现
        _this.cnHtmlMap = {lgSubmitBtn: "用户登陆", }
        _this.enHtmlMap = {lgSubmitBtn: "Login", }
        // _this.enJsMap = { }
        // _this.cnJsMap = { }
        //init option=> aNodeID [Peremptory], aHtml, aRegCtrlCallBack, aLanguage
        let option = {
            aParent: hParent,
            aNodeID: 'loginView',
            aHtml: htmlTemplate,//'./src/views/CLoginView.html',
            aRegCtrlCallBack: this.regCtrlCb,
            aLanguage: { language: 'cn', 
                        htmlMap: {'cn': _this.cnHtmlMap ,'en': _this.enHtmlMap,},
                        jsMap: {'cn': _this.cnJsMap,'en': _this.enJsMap,} },
            aRenderData: _this.Data,
            aChildViews: [],
            aEvCallback: {evMounted: function(){console.log('CLoginView is mounted!')},},
        };
        // init this class-object
        this.init(option);
        //2. exported variant / function
    }
    //
    regCtrlCb(){
        //初始化中使用原生DOM操作，避免引入库冲突
        document.getElementById("lgSubmitBtn").onclick = function () {
            //login view业务流程
            let str = {
                "command": "login",
                "name": $("#lgUserNameInput").val(),
                "pwd": $("#lgPWDInput").val()
            };
            let parameters = JSON.stringify(str);
            let url = yutls.getDebugURL();
            $.ajax({
                type: "POST",
                url: url,
                data: parameters,
                success: function (res) {
                    /* 返回参数格式
                        {"rc":0/1,  //0 =>成功/1=>失败
                        "errCode": error msg txt //错误代码或消息文本
                        }
                    */
                    var data = JSON.parse(res);
                    console.log(data);
                    if (0 == data.rc) {
                        //1.hide loginview;
                        //2. active maincontent + active sidebar;
                        //3. active dashboardView;
                        theApp.m_hMainWnd.activeView('dashboardView');
                    }
                },
                error: function (errorThrown) { alert("error"); }
            });
        };
    }

}

export default CLoginView;