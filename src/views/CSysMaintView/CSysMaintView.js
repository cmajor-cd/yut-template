/**
 * CSysMaintView View的主Class定义
 */
import htmlTemplate from './CSysMaintView.html';

import $ from 'jquery';
import {yutls, CView} from 'yut';
// import tools from '../js/tools';
class CSysMaintView extends CView{
    constructor(hParent) {//-- 构造函数
        // supper call before user 'this' pointer.
        super();
        var _this = this;
        //1.变量+函数
        _this.Data = {
            smvTimeVal: 0,smvHWIpVal:0,smvHWIMEIVal:0,smvFWVerVal:0,
        }
        _this.enHtmlMap = {smvDemoTitle:"Create childView + Html/Js sync",
            smvNTPTitle:"NTP Syn.",smvTime:"Correct time",smvRefreshBtn:"Rrefresh",
            smvTitleGJWH:'Firmware',smvHWIp:'Address',smvHWIMEI:"Hardware Serial",smvFWVer:"Firmware Ver.",
        };
        _this.cnHtmlMap = {smvDemoTitle:"演示childView创建 + Html/Js数据同步",
            smvNTPTitle:"NTP网络对时",smvTime:"网络对时",smvRefreshBtn:"刷新",
            smvTitleGJWH:'固件升级维护',smvHWIp:'设备地址',smvHWIMEI:"硬件设备号",smvFWVer:"固件版本号",
        };
        _this.enJsMap = {
            dsvOptSucc:"Command is successful！", smvUpgradeFileErr:"The upgrade file is incrroect!",  smvUpgradeFileNull:'Please, pick up a upgrade file!', smvUpgradeSucc:'Success to upgrade the FW file, please check the Ver/MD5 before reboot the device!',
            smvRebootConfirm:'[reboot] will reboot the device, please confirm this operation!', smvSetDefaultCfg:'[SetDefault] will delete all personal date from the device, please confirm this operation!',
        };
        _this.cnJsMap = {
            dsvOptSucc:"操作成功！", smvUpgradeFileErr:"服务器收到的升级文件名不一致，请检查！", smvUpgradeFileNull:'上载文件未正确选取!', smvUpgradeSucc:"升级文件已成功上传服务器, 请检查Ver/MD5是否不一致. \n准备就绪后请点击[重启]完成升级!",
            smvRebootConfirm:'[重启]将导致当前业务中断, 确认是否继续!', smvSetDefaultCfg:'[恢复出厂设置]将擦除所有个人信息, 确认是否继续!',
        };
        //
        let option = {
            aParent: hParent,
            aNodeID: 'sysMaintView',
            aHtml: htmlTemplate, //'./src/views/CSysMaintView.html',
            aRegCtrlCallBack: this.regCtrlCb,
            aLanguage: {
            language: 'cn',
                htmlMap: { 'cn': _this.cnHtmlMap, 'en': _this.enHtmlMap, },
                jsMap: { 'cn': _this.cnJsMap, 'en': _this.enJsMap, }
            },
            aRenderData: _this.Data,
            aChildViews: [],
            aEvCallback: { evMounted: _this.myMounted, },
        };
        //2.初始化对象和成员函数
        this.init(option);
    }
    regCtrlCb() {
        // 注册回调
        // NTP同步时间
        $('#smvRefreshBtn').click(() => {
            var selectedData = { "serverIP": $('#smvNTPServerIP').val() };
            //     { "command":"syncDatetime",
            //     "dat":{
            //          "NTP": {"serverIP": "xx" }
            //   }
            var str = {
                "command": "syncDatetime",
                "dat": {
                    "NTP": selectedData
                }
            };
            var parameters = JSON.stringify(str);
            $.ajax({
                type: "POST",
                url: yutls.getDebugURL(),
                data: parameters,
                success: (res) => {
                    // 返回参数格式
                    // "dat":  {"localDatetime":"xxx"} // ms数
                    var data = JSON.parse(res);
                    if (0 == data.rc) {
                        console.log(data.dat);
                        this.Data.smvTimeVal = yutls.getDateByYMD(data.dat.localDatetime);
                        yutls.msgBox(yutls.jsSwitchLang(this._oLanguage, 'dsvOptSucc') + " code: " + data.errCode);
                    }
                    else {
                        yutls.msgBox(data.errCode);
                    }
                },
                error: function (errorThrown) { console.error(errorThrown); }
            });
        });
        //恢复出厂设置
        $('#smvSetDefaultBtn').click(() => {
            if (!confirm(yutls.jsSwitchLang(this._oLanguage, 'smvSetDefaultCfg'))) { //'[恢复出厂设置]将擦除所有个人信息, 确认是否继续!'
                // 点击了[取消]
                return;
            }
            //
            let str = {
                "command": "resetToDefault"
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
                        this.Data.smvHWIpVal = data.dat.hw;
                        this.Data.smvHWIMEIVal = data.dat.imei;
                        this.Data.smvFWVerVal = data.dat.fw;
                        yutls.msgBox(yutls.jsSwitchLang(this._oLanguage, 'dsvOptSucc') + " code: " + data.errCode);
                    }
                    else {
                        yutls.msgBox(res);
                    }
                }
            });
        });
    }
    // evMounted
    myMounted() {
        console.log('CSysMaintView.myMounted is CALLED!');
        //alert('CSysMaintView.prototype.myMounted is CALLED!');
    }
   
}
// CSysMaintView.prototype = new CView();
// CSysMaintView.prototype.Data = {
//     smvTimeVal: 0,smvHWIpVal:0,smvHWIMEIVal:0,smvFWVerVal:0,
// }
// CSysMaintView.prototype.enHtmlMap = {smvDemoTitle:"Create childView + Html/Js sync",
//     smvNTPTitle:"NTP Syn.",smvTime:"Correct time",smvRefreshBtn:"Rrefresh",
//     smvTitleGJWH:'Firmware',smvHWIp:'Address',smvHWIMEI:"Hardware Serial",smvFWVer:"Firmware Ver.",
// };
// CSysMaintView.prototype.cnHtmlMap = {smvDemoTitle:"演示childView创建 + Html/Js数据同步",
//     smvNTPTitle:"NTP网络对时",smvTime:"网络对时",smvRefreshBtn:"刷新",
//     smvTitleGJWH:'固件升级维护',smvHWIp:'设备地址',smvHWIMEI:"硬件设备号",smvFWVer:"固件版本号",
// };
// CSysMaintView.prototype.enJsMap = {
//     dsvOptSucc:"Command is successful！", smvUpgradeFileErr:"The upgrade file is incrroect!",  smvUpgradeFileNull:'Please, pick up a upgrade file!', smvUpgradeSucc:'Success to upgrade the FW file, please check the Ver/MD5 before reboot the device!',
//     smvRebootConfirm:'[reboot] will reboot the device, please confirm this operation!', smvSetDefaultCfg:'[SetDefault] will delete all personal date from the device, please confirm this operation!',
// };
// CSysMaintView.prototype.cnJsMap = {
//     dsvOptSucc:"操作成功！", smvUpgradeFileErr:"服务器收到的升级文件名不一致，请检查！", smvUpgradeFileNull:'上载文件未正确选取!', smvUpgradeSucc:"升级文件已成功上传服务器, 请检查Ver/MD5是否不一致. \n准备就绪后请点击[重启]完成升级!",
//     smvRebootConfirm:'[重启]将导致当前业务中断, 确认是否继续!', smvSetDefaultCfg:'[恢复出厂设置]将擦除所有个人信息, 确认是否继续!',
// };

export default CSysMaintView;