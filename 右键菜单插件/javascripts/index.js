/**
 * 功能：鼠标右键
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-16
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/




/*************************************************/
/* 函数调用部分 */
/*************************************************/
window.onload = function(){
	//鼠标右键事件
	mouseRightEvent();
}

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：为p标签绑定鼠标右键事件
 */
function mouseRightEvent(){
	var menu = new contextMenu();
	menu.createMainMenu("body-text", menuList);
	// menu.createSubMenu("menu-new", menuList);
}

