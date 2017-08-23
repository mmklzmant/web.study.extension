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
//设置颜色
setColor(codingStr);


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
function setColor(strCode){
	// 设置属性的颜色
	var attrArr = removeReptItems(strCode.match(new RegExp("\\s\\w+=", "g")));
	for(var j = 0; j < attrArr.length; j++){
		var regxAttr = new RegExp(attrArr[j], "g");
		strCode = strCode.replace(regxAttr, "<span style=\"color:#AE81FF\">" + attrArr[j] + "</span>");
	}
	
	// 设置属性值的颜色
	var attrValueArr = removeReptItems(strCode.match(new RegExp("\"\\w+(-?\\w+)?\"", "g")));
	console.log(attrValueArr);
	for(var k = 0; k < attrValueArr.length; k++){
		var regx = new RegExp(attrValueArr[k], "g");
		strCode = strCode.replace(regx, "<span style=\"color:#A6C628\">" + attrValueArr[k] + "</span>");
	}
	// 设置标签的颜色
	var labelArr = removeReptItems(strCode.match(new RegExp("&lt;li|&lt;ul|&lt;\/ul|&lt;\/li|&gt;", "g")));
	for(var i = 0; i < labelArr.length; i++){
		var regx = new RegExp(labelArr[i], "g");
		strCode = strCode.replace(regx, "<span style=\"color:#F94989\">" + labelArr[i] + "</span>");
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

