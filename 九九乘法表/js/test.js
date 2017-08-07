/**
 * 功能：for in遍历
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-07 14:24:21
 */

var obj1 =
{
    "mainboard": "主板",
    "cpu": "CPU",
    "internalStrage": "内存",
    "graphicsCard": "显卡",
    "soundCard": "声卡",
    "hardDisk": "硬盘",
    "caseAndPower": {
        "computerCase": "机箱",
        "power": "电源"
    },
    "dispay": "显示器",
    "keyboard": "键盘",
    "mouse": "鼠标",
    "loudspeaker": "音箱"
}

for( x in obj1)
{
    if(typeof(obj1[x]) == "object")
    {
        for(y in obj1[x])
        {
            console.log(obj1[x][y]);
        }
    }
    else{
        console.log(obj1[x]);
    }
}