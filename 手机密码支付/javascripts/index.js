/**
 * 功能：手机密码支付
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-16
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//前往支付按钮
var gotoPay = document.getElementById("gotoPay");
//支付页面支付按钮
var payBtn = document.getElementById("pay");
//支付页面返回按钮
var payBackBtn = document.getElementById("payBack");
//支付结果页面返回按钮
var resultBackBtn = document.getElementById("resultBack");


//page页面
var pages = document.getElementsByTagName("page"); 
//支付按钮点击事件
gotoPay.onclick = function(){
	pages[0].style.display = "none";
	pages[0].style.right = "-100%";
	pages[1].style.right = "0";
}

//支付页面支付按钮点击事件
payBtn.onclick = function(){
	pages[1].style.display="none";
	pages[1].style.right="-100%";
	pages[2].style.right="0";
}

//支付页面返回按钮点击事件
payBackBtn.onclick = function(){
	pages[0].style.display = "";
	pages[0].style.right="0"
	pages[1].style.right="-100%";
}

//支付结果页面返回按钮点击事件
resultBackBtn.onclick = function(){
	pages[1].style.display = "";
	pages[1].style.right = "0";
	pages[2].style.right = "-100%";
}
/*************************************************/
/* 函数调用部分 */
/*************************************************/


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/


