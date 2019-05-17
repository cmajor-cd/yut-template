import htmlTemplate from './CSysStatusView.html';
// yutls.includeJs('./views/CSysStatusView/subviews/CGnssView.js');
// yutls.includeJs('./views/CSysStatusView/subviews/CLanView.js');
import $ from 'jquery';
import {CView} from 'yut';
import CGnssView from './subviews/CGnssView';
import CLanView from './subviews/CLanView';
/**
 * System View的主Class定义
 */
class CSysStatusView extends CView{
    constructor(hParent) { // constructor
        // supper call before user 'this' pointer.
        super();
        var _this = this;
        //1. internal variant / function
        //init option=> aNodeID [Peremptory], aHtml, aRegCtrlCallBack, aLanguage
        let option = {
            aParent: hParent,
            aNodeID: 'sysStatusView',
            aHtml: htmlTemplate, //'./src/views/CSysStatusView/CSysStatusView.html',
            aRegCtrlCallBack: this.regCtrlCb,
            aLanguage: {
            language: 'cn',
                htmlMap: { 'cn': _this.cnHtmlMap, 'en': _this.enHtmlMap, },
                jsMap: { 'cn': _this.cnJsMap, 'en': _this.enJsMap, }
            },
            aRenderData: _this.Data,
            aChildViews: [CGnssView, CLanView],
            aEvCallback: { evMounted: _this.myMounted, },
        };
        // init this class-object
        this.init(option);
        //2. exported variant / function
    }
    regCtrlCb() {
        //init: tab control
        var _this = this;
        $('#ssvTab').delegate(".tab-header-item", "click", function () {
            //set this tab to ".tab-header-selected",others to none
            $(".tab-header .tab-header-item").siblings().removeClass("tab-header-selected");
            var selected = $(this);
            selected.addClass("tab-header-selected");
            var targetid = selected.attr("target");
            //get the "target"
            $(".tab-content .tab-content-view").siblings().addClass("hide");
            $("#" + targetid).removeClass("hide");
            //show the tab subview
            _this.activeView(targetid);
        });
    }
    // evMounted
    myMounted() {
        console.log('CSysStatusView.prototype.myMounted is CALLED!');
        //alert('CSysStatusView.prototype.myMounted is CALLED!');
    }
}
// CSysStatusView.prototype = new CView();
CSysStatusView.prototype.Data = {
    // dsvLocTimeVal: '1',dsvDurationTimeVal: 2,
}
// 多语言实现
CSysStatusView.prototype.enHtmlMap = {ssvTabGnssDemoTitle:"This page demos: create childView + Html/Js sync + event + private css",}
CSysStatusView.prototype.cnHtmlMap = {ssvTabGnssDemoTitle:"演示childView创建 + Html/Js数据同步 + 事件触发 + 私有css",}
CSysStatusView.prototype.enJsMap = {
    dsvOptSucc:"Command is successful！",
}
CSysStatusView.prototype.cnJsMap = {
    dsvOptSucc:"操作成功！",
}

export default CSysStatusView;