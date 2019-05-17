/**
 * tools for demo.js
 * most of them are included in yutls lib.
 * --------------
 * YangYutong
 * 2018-4-12
 */ 

class tools{
    constructor() {
        this.gDebug = 0;
        this.gMock = 0;
    }
    //设置调试开关
    static setGlobalDebugFlg(flg){
        this.gDebug = flg;
    }
    static setMockDebugFlg(flg){
        this.gMock = flg;
    }
    
    static msgBox(strMsg){
        alert(strMsg);
    }
    //
    static msgDebug(strMsg){
        console.debug(strMsg);
    }
    static includeJs(src) {
        document.write("<script type=\"text/javascript\" src=\"" + src + "\"></script>");
    }
    // Includes a style sheet by writing a style tag.
    static includeCss(src) {
        // document.write("<style type=\"text/css\"> @import url(\"" +  src + "\"); </style>");
        var _style = document.createElement('style');
        _style.innerHTML = ' @import url(\"' +  src + '\");';
        document.getElementsByTagName('head')[0].appendChild(_style);
    }
    /**
     * 对数字转字符串进行补0操作
    */
   static getzf(num){
    if(parseInt(num) < 10){
        num = '0' + num;
    }
    return num;
    }
    /**
     * parse the time to yyyy-mm-dd hh:mm:ss
    */
   static getDateByYMD(ms){
        var timeMs = Number(parseInt(ms));
        var oDate = new Date(timeMs),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
        return oTime;
    }
    /**
     * parse the time to hh:mm:ss
    */
   static getDateByHMS(ms){
        var timeMs = Number(parseInt(ms));
        var oHour = parseInt(timeMs / (1000 * 60 * 60));
        var oMin = parseInt((timeMs % (1000 * 60 * 60)) / (1000 * 60));
        var oSen = parseInt((timeMs % (1000 * 60)) / 1000);
        var oTime = getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);
        return oTime;
    }
    /**
     * check browser type
    */
   static getBrowser() {
        var ua = window.navigator.userAgent; 
        //var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1; 
        var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
        var isFirefox = ua.indexOf("Firefox") != -1;
        var isOpera = window.opr != undefined;
        var isChrome = ua.indexOf("Chrome") && window.chrome;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isIE) {
            return "IE";
        } else if (isFirefox) {
            return "Firefox";
        } else if (isOpera) {
            return "Opera";
        } else if (isChrome) {
            return "Chrome";
        } else if (isSafari) {
            return "Safari";
        } else {
            return "Unkown";
        }
    }
    //
    static getURL(){
        if(this.gDebug){
            if(this.gMock)
                return './debug/mock';
            else
                return './debug/action/action.test.php';
        }
        else
            return '/cgi-bin/cgi.cgi';
    }
}


export default tools;