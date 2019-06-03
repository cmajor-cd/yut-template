/** include framework lib */
import {yutls,theApp} from 'yut';

/** include lib */
//! 如果要使用mock必须包括这个库，以便于mock自己初始化(初始化函数在 mock.test.js 中)
import initMockDebug from '../debug/mock/mock.test'
// import tools from './js/tools';
import {appName,releaseVer} from './version';
/** include my views */
import CMainFrm from './views/CMainFrm';
/** include main css stryle */
import './css/main.css';
import './css/tab.css';

/**
 * the main entery
 * 1. set debug flag.
 * 2. mainpage's init()
 */
//1. set debug flag
//!!! you can change the cfg in ./appcfg.js !!!
// var appCfg = {
//     //1. set debug flag -------
//     debugCfg:{
//         type: 'mock',   //!!! IMPORTANT, 根据您的需求设置该值. e.g.实际量产时填写 'real'
//         link: {         //!!! 请将以下链接改写为自己的真实链接 !!!
//             'real':'/cgi-bin/cgi.cgi',
//             'mock':'./debug/mock',
//             'php':'./debug/action/action.test.php'}
//     }
// };
yutls.setGlobalServerLinkData(appCfg.debugCfg);

//2. mainpage's init()
function initMain()
{
    // init the mainFrm by yut lib API.
    theApp.setAppName(appName);
    theApp.attachMainFrm(CMainFrm);
}
initMain();

