/**
 * MOCK 调试注意事项！
 * 1. 确保 main.js/index.js 中的调试标记已经打开并正确设置php脚本位置。
 * //------ set debug flag
 * var data = {'noDebug':'/cgi-bin/cgi.cgi',
 *            'mock':'./debug/mock',
 *            'php':'./debug/action/action.test.php'};
 * yutls.setGlobalDebugFlg(data, 'php');
 * //---------------
 * 2. 确保init()中包括了本模块中的mockjs的初始化函数“initMockDebug()”
 * 3. 如果要用file:///模拟服务器文件操作，必须：将 /web-app/.整个目录拷贝到 c: 或 d: 根目录下
 * 4. “文件下载”功能，只有Chrome能够在本地弹出save as对话框，所以测试文件下载功能只能使用Chrome浏览器
*/
import Mock from 'mockjs';

function fillResCodeTxt(rc, errCode, dat){
    var res = {
        "rc": rc,
        "errCode": errCode,
        "dat": dat
    }
    return res;
}

function initMockDebug(){
    //调用mock方法模拟数据
    Mock.mock(
        './debug/mock', function(opt){
            var command = (JSON.parse(opt.body)).command;
            var dat = (JSON.parse(opt.body)).dat;
            // console.log(command);
            var params;
            var res;
            if(command == 'login')
            {
                params = {
                    'username': 'test',
                    'password': 'pwd'
                };
                res = fillResCodeTxt(0,'NULL', params);
                //
                // alert('This is MOCK unit test!');
                return res;
            }else if(command == 'resetToDefault')
            {
                // { "rc": 0/1, "errCode": "xxx" } //0 =>成功/1=>失败
                params = {"hw":"myHW",
                        "imei":"3423d33r",
                        "fw":"1.0.2"
                    };
                res = fillResCodeTxt(0,'resetToDefault',params);
                //
                return res;
            }else if(command == 'syncDatetime')
            {   //1531827890000
                // { "rc":0/1, "errCode": error msg tx,
                //  "dat":  {"localDatetime":"xxx"} // ms数
                // }
                params = {
                    "localDatetime":1531827890000
                };
                res = fillResCodeTxt(0,'syncDatetime',params);
                //
                return res;
            }
            else if(command == 'ssvTabLanUpdateData')
            {
                params = {
                    "ssvTabLan1IP":"172.5.31.10",
                        "ssvTabLan2IP":"172.5.67.20",
                        "ssvTabDHCPStatus":"DHCP"
                    };
                    res = fillResCodeTxt(0,command,params);
                //
                return res;
            }
            else if(command == 'uploadFile')
            {
                // "dat":{"fileName":"xxx",
                // "version":"xxx",
                // "MD5":"xxx"
                // }
                params = {"fileName":"myfile",
                        "version":"1.0.2",
                        "MD5":"12345qazwsx"
                    };
                res = fillResCodeTxt(0,command,params);
                //
                return res;
            }else if(command == 'ssvTabGnssUpdateData')
            {
                params = {
                    "ssvTabGnssSatNumVal":"172",
                        "ssvTabGnssSendNumVal":"67",
                        "ssvTabGnssSuccNumVal":"53",
                        "ssvTabGnssFailNumVal":"12"
                    };
                    res = fillResCodeTxt(0,command,params);
                //
                return res;
            }
        }
    );
}

// init the mockjs for debug
initMockDebug();


export default initMockDebug;