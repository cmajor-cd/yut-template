<?php
/**
 * PHP 调试注意事项！
 * 1. 确保 main.js/index.js 中的调试标记已经打开并正确设置php脚本位置。
 * // set debug flag
 * var data = {'noDebug':'/cgi-bin/cgi.cgi',
 *            'mock':'./debug/mock',
 *            'php':'./debug/action/action.test.php'};
 * yutls.setGlobalDebugFlg(data, 'php');
 * 
*/

//action.login.php
function fillResCodeTxt($rc, $errCode, $dat)
{
    $res['rc'] = $rc;
    $res['errCode'] = $errCode;
    $res['dat'] = $dat;
    return $res;
}
/*
* work on user requirement
*/
// $rawCommand = json_decode($HTTP_RAWmyPost_DATA);
// echo json_encode($rawCommand);
$myPost = '';
$command = 'NA';
// if(empty($_POST['command'])){}
$rawdata = file_get_contents("php://input");
$myPost = json_decode($rawdata,true);
{
    $command = $myPost['command'];
    if($command == 'login')
    {
        $params = array(
            'username' => $myPost['name'],
            'password' => $myPost['pwd']);
        $res = fillResCodeTxt(0,'NULL',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }
    else if($command == 'getSystemValue')
    {
        // { 'rc': 0/1, 'errCode': 'xxx',
        //     'dat':[
        //         {'address':'xxx'},
        //         {'serial':'xxx'},
        //         {'version':'xxx'}
        //     ]
        //    }
        $params = array(    
            'address' => '10.10.0.1',
            'serial' => 'TEST.001.002.003.004',
            'version'=> '1.0.12.1');
        $res = fillResCodeTxt(0,'NULL',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'resetToDefault')
    {
        $res = fillResCodeTxt(0,'resetToDefault','');
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'getLogLink')
    {
        // { "rc": 0/1, "errCode": "xxx",
        //     "dat":[
        //       {"filePath":"xxx", "fileName":"xxx"},
        //       {...}
        //     ]
        //   }
        $dat1 = array('filePath' => '/web-app/debug/idxfile/', 'fileName' => 'TEST.001.zip');
        $dat2 = array('filePath' => '/web-app/debug/idxfile/', 'fileName' => 'TEST.002.zip');
        $dat3 = array('filePath' => '/web-app/debug/idxfile/', 'fileName' => 'TEST.003.zip');
        $dat4 = array('filePath' => '/web-app/debug/idxfile/', 'fileName' => 'TEST.004.zip');
        $params = array($dat1,$dat2,$dat3,$dat4);
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        echo $res;
    }
    return;
}
echo json_encode('POST failed from PHP!');

?>
