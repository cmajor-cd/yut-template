/** include framework lib */
import {yutls,theApp} from 'yut';

/** include lib */
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
var data = {'noDebug':'/cgi-bin/cgi.cgi',
            'mock':'./debug/mock',
            'php':'./debug/action/action.test.php'};
yutls.setGlobalDebugFlg(data, 'mock');

//2. mainpage's init()
function initMain()
{
    // init the mockjs for debug
    initMockDebug();
    // init the mainFrm by yut lib API.
    theApp.setAppName(appName);
    theApp.attachMainFrm(CMainFrm);
}
initMain();

