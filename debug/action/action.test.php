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
    }
    else if($command == 'getCfgParameter')
    {
        $params = array(    
            'fpsID' => '8',
            'wifiSSID' => 'YYT',
            'wifiPwd' => 'YYT2',
            'gpsHz' =>  '9',
            'fourGRate' =>  '10',
            'fourGAdress' =>  '192.168.8.8',
            'protectG' =>  '11',
            'delayPotoInterVal' =>  '12');
        $res = fillResCodeTxt(0,'NULL',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }
    else if($command == 'setCfgParameter')
    {
        $params = $myPost['dat'];
        $res = fillResCodeTxt(0,'YYT',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }
    else if($command == 'formatSD')
    {
        $params = 'operation formatSD';
        $res = fillResCodeTxt(0,$params,'');
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'getFlyRecordList')
    {
        // { "rc": 0/1, "errCode": "xxx",
        //     "dat":[
        //       {"filePath":"xxx", "fileName":"xxx", "startDateTime":"20xx-xx-xx", "endDateTime":"20xx-xx-xx"},
        //       {...}
        //     ]
        //   }
        $dat1 = array('filePath' => '/web-app/debug/idxfile/', 'flightName' => 'TEST.001', 'startDateTime'=> '2018-04-23 18:55:49:123', 'endDateTime'=> '2018-04-23 19:55:49:123');
        $dat2 = array('filePath' => '/web-app/debug/idxfile/', 'flightName' => 'TEST.002', 'startDateTime'=> '2018-04-24 18:55:49:123', 'endDateTime'=> '2018-04-24 19:55:49:123');
        $dat3 = array('filePath' => '/web-app/debug/idxfile/', 'flightName' => 'TEST.003', 'startDateTime'=> '2018-04-25 18:55:49:123', 'endDateTime'=> '2018-04-25 19:55:49:123');
        $dat4 = array('filePath' => '/web-app/debug/idxfile/', 'flightName' => 'TEST.004', 'startDateTime'=> '2018-04-25 18:55:49:123', 'endDateTime'=> '2018-04-25 19:55:49:123');
        $params = array($dat1,$dat2,$dat3,$dat4);
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        echo $res;
    }else if($command == 'getUserInfor')
    {
        // { "rc":0/1, "errCode": error msg tx,
        //     "dat":  {"pwd":"xxx"}
        //    }
        $params = array('pwd' => '123');
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        echo $res;
    }else if($command == 'rmFlyRecordList')
    {

        $params = 'rmFlyRecordList';
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'setPWD')
    {
        $params = $myPost['dat']['new'];
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'getIdxParameters')
    {
        // { "rc": 0/1, "errCode": "xxx",
        //     "dat":  {
        //      "start":"xxx",
        //     "end":"xxx",
        //     "fps": "8",
        //     "audiomic": "xxx",
        //     "audiolinein": "xxx",
        //     "video": "xxx"
        //     }
        //   }
        $params = array('start' => '1531817800000', 'end' => '1531817820000', 'fps' => '8', 
                        'video' => '/web-app/debug/video/', 'videoNum' => '2',
                        'audiomic' => '/web-app/debug/audiomic/', 'audiolinein' => '/web-app/debug/audiolinein/',);
        $params1 = $myPost['dat'];
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'testNetSpeed')
    {

        $params = file_get_contents("D:/workspace/VS/FQR-SW/FW-PKG/web/webroot/web-app/debug/testNetSpeed/testNetSpeed.dat");//("/web-app/debug/testNetSpeed/testNetSpeed.dat");
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'getFlightSubRecordInfor')
    {// {"flightName":"xxx", "subRecordName":"xxx", "subRecordPath:"xxxx","startTime:":"xxx", "endTime":"xxx"},
        $dat1 = array('flightName' => 'TEST.航程', 'subRecordName' => 'p00','subRecordPath'=>'/web-app/debug/mediadata/p00/','startTime'=>'1531817800000', 'endTime' => '1531817820000');
        $dat2 = array('flightName' => 'TEST.航程', 'subRecordName' => 'p01','subRecordPath'=>'/web-app/debug/mediadata/p01/','startTime'=>'1531817820000', 'endTime' => '1531817850000');
        $dat3 = array('flightName' => 'TEST.航程', 'subRecordName' => 'p02','subRecordPath'=>'/web-app/debug/mediadata/p00/','startTime'=>'1531817840000', 'endTime' => '1531817880000');
        $params = array($dat1,$dat2,$dat3);
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'createFlyRecordSubPkg')
    {
        // { "rc": 0/1, "errCode": "xxx",
        $res = fillResCodeTxt(0,'createFlyRecordSubPkg','');
        //
        $res = json_encode($res);
        echo $res;
    }else if($command == 'queryCreateSubPkgLink')
    {
        // { "rc": 0/1, "errCode": "xxx"  //0 =>成功/1=>未完成
        //     "dat": {"flightName":"xxx", "subRecordName":"xxx",
        //         "downloadFullPath":"xxx",  //为包括文件名的全路径
        //         "fileSize":"xxx"} //文件size单位为KB
        //   }
        $params = array('flightName' => $myPost['dat']['flightName'], 'subRecordName'=>$myPost['dat']['subRecordName'], 'downloadFullPath' => '/web-app/debug/idxfile/TEST.001.zip', 'fileSize'=>'1024');
        // $params = array('flightName' => 'TEST.001.zip', 'subRecordName'=>'p00', 'downloadFullPath' => '/web-app/debug/idxfile/TEST.001.zip', 'fileSize'=>'1024');
        $res = fillResCodeTxt(0,'',$params);
        //
        $res = json_encode($res);
        echo $res;
    }else if($command == 'resetToDefault')
    {
        $res = fillResCodeTxt(0,'resetToDefault','');
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'reBoot')
    {
        $res = fillResCodeTxt(0,'reBoot','');
        //
        $res = json_encode($res);
        //print_r($res);
        echo $res;
    }else if($command == 'uploadFile')
    {
        $params = 'uploadFile';//$myPost['uptype'];
        $res = fillResCodeTxt(0,$params,'');
        //uploadFile
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
