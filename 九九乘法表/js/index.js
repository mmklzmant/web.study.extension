/**
 * 功能：九九乘法表
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-07 09:27:47
 */

var body = document.getElementsByTagName("body")[0];
var line = document.getElementsByClassName("line");
var saveValue;//保存div的textContent

//动态生成div标签
for(var i = 0; i < 9; i++)
{
    body.innerHTML += "<div class = 'line'></div>";
    for(var j = 0; j <= i; j++)
    {
        line[i].innerHTML += "<div>" + (i+1) + "x" + (j+1) + "</div>";
    }
}

//鼠标悬浮
body.onmouseover = function(e)
{
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.tagName.toLowerCase() === "div" && target.className !== "line")
    {
        saveValue = target.textContent;
        var valueArr = saveValue.split("x");
        var value = valueArr[0]*valueArr[1];
        target.textContent = value;
        target.style.transform = "rotate(-10deg)";
        target.style.zIndex = 99;
    }
}

//鼠标移开
body.onmouseout = function(e)
{
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.tagName.toLowerCase() === "div" && target.className !== "line")
    {
        target.textContent = saveValue;
        target.style.transform = "rotate(0deg)";
        target.style.background = "linear-gradient(145deg, #53a3eb, #096dc7)"
        target.style.zIndex = 0;
    }
}