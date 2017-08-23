/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/

var showCode = document.getElementById("showCode");
var showCodeHtml = showCode.innerHTML;		
var codingStr = showCodeHtml.replace(/</g, "&lt;");
codingStr = codingStr.replace(/>/g, "&gt;");
showCode.innerHTML = codingStr;

/*************************************************/
/* 函数调用部分 */
/*************************************************/
//设置标签颜色
setLabelColor(codingStr);

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
function setLabelColor(strCode){
	var arr = removeReptItems(codingStr.match(new RegExp("li|ul", "g")));
	for(var i = 0; i < arr.length; i++){
		var regx = new RegExp(arr[i], "g");
		strCode = strCode.replace(regx, "<span class=\"label\">" + arr[i] + "</span>");
	}
	var attrArr = codingStr.match(new RegExp("\\s\\w+=", "g"));
	for(var j = 0; j < attrArr.length; j++){
		var regx1 = new RegExp(attrArr[j], "g");
		strCode = strCode.replace(regx1, "<span class=\"attr\">" + arr[j] + "</span>")
	}
	showCode.innerHTML = strCode;
}

/**
 * 功能：去除数组中的重复项
 */
function removeReptItems(arr){
	var temp = new Array();
	for(var i = 0; i < arr.length; i++){
		if(arr[i] != "" && temp.indexOf(arr[i]) == -1){
			temp.push(arr[i]);
		}
	}
	return temp;
}

