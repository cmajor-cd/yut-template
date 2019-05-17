import htmlTemplate from './CGnssView.html';

import $ from 'jquery';
import {yutls, theApp, CView} from 'yut';
// import tools from '../../../js/tools';

class CGnssView extends CView{
    constructor(hParent) {
        // constructor
        super();
        var _this = this;
        //1. internal variant / function
        //init option=> aNodeID [Peremptory], aHtml, aRegCtrlCallBack, aLanguage
        let option = {
            aParent: hParent,
            aNodeID: 'ssvTabGnss',
            aHtml: htmlTemplate, //'./src/views/CSysStatusView/subviews/CGnssView.html',
            aRegCtrlCallBack: this.regCtrlCb,
            aLanguage: {
            language: 'cn',
                htmlMap: { 'cn': _this.cnHtmlMap, 'en': _this.enHtmlMap, },
                jsMap: { 'cn': _this.cnJsMap, 'en': _this.enJsMap, }
            },
            aRenderData: _this.Data,
            aChildViews: [],
            aEvCallback: {},
        };
        // init this class-object
        this.init(option);
        //2. exported variant / function
    }
    regCtrlCb() {
        // demo: get data value from ajax
        $('#ssvTabGnssUpdateBtn').click(() => {
            alert('Update data from server!');
            this.getDatafromServer();
        });
        // demo: get data value from others classs's object
        $('#ssvTabGnssOverObjBtn').click(() => {
            alert('Update data from OTHER OBJECTS!');
            //example: find node to the internal data.
            // let obj = yutls.getHandleByNodeID(theApp.m_hMainWnd, 'ssvTabLan');
            let _this = this;
            function getOtherClassDataCb(node) {
                let viewID = node._strViewID;
                switch (viewID) {
                    case 'ssvTabLan':
                        _this.Data.ssvTabGnssFromLanIP1Val = node.Data.ssvTabLan1IP;
                        _this.Data.ssvTabGnssFromLanDHCPVal = node.Data.ssvTabDHCPStatus;
                        break;
                    case 'sysMaintView':
                        _this.Data.ssvTabGnssCSysMaintViewNtpVal = node.Data.smvTimeVal;
                        break;
                    case 'dashboardView':
                        _this.Data.ssvTabGnssCDashboardFwVal = node.Data.dsvFWVerVal;
                        break;
                }
            }
            //
            theApp.traverseAllViews(getOtherClassDataCb);
        });
    }
    getDatafromServer() {
        let str = {
            "command": "ssvTabGnssUpdateData"
        };
        let parameters = JSON.stringify(str);
        $.ajax({
            type: "POST",
            url: yutls.getDebugURL(),
            data: parameters,
            success: (res) => {
                // 返回参数格式
                //    { "rc": 0/1, "errCode": "xxx"}
                var data = JSON.parse(res);
                if (0 == data.rc) {
                    this.Data.ssvTabGnssFromLanIP1Val = data.dat.ssvTabGnssSatNumVal;
                    this.Data.ssvTabGnssFromLanDHCPVal = data.dat.ssvTabGnssSendNumVal;
                    this.Data.ssvTabGnssCSysMaintViewNtpVal = data.dat.ssvTabGnssSuccNumVal;
                    this.Data.ssvTabGnssCDashboardFwVal = data.dat.ssvTabGnssFailNumVal;
                }
                else {
                    yutls.msgBox(res);
                }
            }
        });
    }
}
// CGnssView.prototype = new CView();
CGnssView.prototype.Data = {
    ssvTabGnssFromLanIP1Val: 0, ssvTabGnssFromLanDHCPVal:1, ssvTabGnssCSysMaintViewNtpVal:2,ssvTabGnssCDashboardFwVal:3,
}

CGnssView.prototype.enHtmlMap = {ssvtgnssInforDemoTitle:"get other's OBJECTS' data + ajx + Html/Js sync",ssvtgnssInforTitle:"OverObject Data",ssvTabGnssSatNum:"LAN page(IP1)",ssvTabGnssSendNum:"LAN page(DHCP)",ssvTabGnssSuccNum:"CSysMaintView Page(NTP)",ssvTabGnssFailNum:"CDashboardPage(FW Ver)",ssvTabGnssUpdateBtn:"Update from server",ssvTabGnssOverObjBtn:"Update from Obj",
};
CGnssView.prototype.cnHtmlMap = {ssvtgnssInforDemoTitle:"跨对象(组件)数据获取 + ajx交互 + Html/Js数据同步",ssvtgnssInforTitle:"跨对象数据",ssvTabGnssSatNum:"LAN page(IP1)",ssvTabGnssSendNum:"LAN page(DHCP)",ssvTabGnssSuccNum:"数据维护Page(网络对时)",ssvTabGnssFailNum:"仪表盘Page(固件版本号)",ssvTabGnssUpdateBtn:"从服务器更新",ssvTabGnssOverObjBtn:"跨对象更新",
};

export default CGnssView;