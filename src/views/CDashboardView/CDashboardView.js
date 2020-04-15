import htmlTemplate from './CDashboardView.html';
import $ from 'jquery';
import {yutls, CView} from 'yut';
/**
 * CDashboardView View的主Class定义
 * */
class CDashboardView extends CView{
    constructor(hParent){
        // supper call before user 'this' pointer.
        super();
        var _this = this;
        //1. internal variant / function
        _this.Data = {
            dsvLocTimeVal: '1',dsvDurationTimeVal: 2, dsvIMEIVal: '123456789', dsvFWVerVal: '0.0.1',
        }
        // 多语言实现
        _this.enHtmlMap = {dsvSysDemoTitleTxt:"Create childView + Html/Js sync",dsvSysTitleTxt: "System Status", dsvLocTimeTxt: "Local Time", dsvDurationTimeTxt:"Duration Time",dsvIMEITxt: "IMEI",dsvFWVerTxt:"Firmware Ver.",
            dsvModTitleTxt:"Module Status",dsvmtLocTimeTxt:"Local Time",dsvmtDurationTimeTxt:"Duration Time", dsvmtIMEITxt:"IMEI", dsvmtFWVerTxt:"Firmware Ver.",dsvUpdateBtn:"Update",
        }
        _this.cnHtmlMap = {dsvSysDemoTitleTxt:"演示childView创建 + Html/Js数据同步",dsvSysTitleTxt:"系统状态",dsvLocTimeTxt:"本机时间",dsvDurationTimeTxt:"本次开机持续时间",dsvIMEITxt:"硬件设备号",dsvFWVerTxt:"固件版本号",
            dsvModTitleTxt:"模块状态",dsvmtLocTimeTxt:"本机时间",dsvmtDurationTimeTxt:"本次开机持续时间", dsvmtIMEITxt:"硬件设备号", dsvmtFWVerTxt:"固件版本号",dsvUpdateBtn:"更新",
        }
        _this.enJsMap = {
            dsvOptSucc:"Command is successful！",
        }
        _this.cnJsMap = {
            dsvOptSucc:"操作成功！",
        }

        //init option=> aNodeID [Peremptory], aHtml, aRegCtrlCallBack, aLanguage
        let option = {
                aParent: hParent,
                aNodeID: 'dashboardView',
                aHtml: htmlTemplate, //'./src/views/CDashboardView.html',
                aRegCtrlCallBack: this.regCtrlCb,
                aLanguage: { language: 'cn', 
                            htmlMap: {'cn': _this.cnHtmlMap ,'en': _this.enHtmlMap,},
                            jsMap: {'cn': _this.cnJsMap,'en': _this.enJsMap,} },
                aRenderData: _this.Data,
                aChildViews: [],
                aEvCallback: {evMounted: function(){console.log('CDashboardView is mounted!')},},
            };
        // init this class-object
        this.init(option);
        //2. exported variant / function
    }
    //
    regCtrlCb(){
        $('#dsvUpdateBtn').click(()=>{
            this.Data.dsvLocTimeVal = document.getElementById("dsvmtLocTimeVal").value;
            this.Data.dsvDurationTimeVal = document.getElementById("dsvmtDurationTimeVal").value;
            this.Data.dsvIMEIVal = document.getElementById("dsvmtIMEIVal").value;
            this.Data.dsvFWVerVal = document.getElementById("dsvmtFWVerVal").value;
            // console.log(this._viewStore.getRenderData());
        });
        //
        $('#dsvTestBtn').click(()=>{
            yutls.msgBox('This is a test to [CALL yutls class member=>yutls.msgBox]!');
        });
    }
    
}

export default CDashboardView;