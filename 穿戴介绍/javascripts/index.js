/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */

var list = document.getElementsByClassName("list")[0];
/*************************************************/
/* 加载完成后执行 */
/*************************************************/
window.onload = function() {
    //小圆点点击事件
    pointClick();
    //列表点击事件
    listClick();
}

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：小圆点点击事件
 */
function pointClick() {
    document.getElementById("clothes").onclick = function() {
        getObj("clothes", function(data) {
            showDetail(data);
        });
    }
    document.getElementById("pants").onclick = function() {
        getObj("pants", function(data) {
            showDetail(data);
        });
    }
    document.getElementById("shoes").onclick = function() {
        getObj("shoes", function(data) {
            showDetail(data);
        });
    }
}
/**
 * 功能：list点击事件
 */
function listClick() {
    list.onclick = function() {
        this.style.top = "-100%";
    }
}
/**
 * 功能：获取相应的对象,获取成功后执行回调函数
 * @param String prop 
 */
function getObj(prop, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/data.json");
    xhr.send();
    xhr.onreadystatechange = function() {
    	if(xhr.readyState === 4){
    		if(xhr.status === 200){
    			var jsonStr = xhr.responseText;
        		var obj = (JSON.parse(jsonStr))[prop];
        		callback(obj);
    		}
    	}
    }
}

function showDetail(data) {
    var detail = document.getElementsByClassName("detail");
    var i = 0;
    for(x in data)
    {
		if(x === "price"){
			detail[i++].textContent = "$" + data[x];
		}
		else{
			detail[i++].textContent = data[x];
		}
    }
    list.style.top = "0";
}