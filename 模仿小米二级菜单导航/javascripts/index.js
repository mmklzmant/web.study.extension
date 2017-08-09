/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//主菜单menu
var menu = document.getElementById("menu");


/*************************************************/
/* 函数调用部分 */
/*************************************************/
//加载主菜单
createMenu();

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

/**
 * 功能： 加载主菜单
 */
function createMenu(){
	//主菜单长度
	var len = goodsNav.length;
	//html
	var html = "";
	for(var i = 0; i < len; i++)
	{
		html += "<li><a href=\"#\">" + 
		     goodsNav[i].classfiy + "</a>";
		//goods
		var goods = goodsNav[i].goods;
		var goods_len = goods.length;
		html += "<ul id=\"submenu\">"
		/*for(var j = 0; j < goods_len; j++)
		{
			html += "<li><a href=\"#\">" + goods[j].name + "</a></li>"
		}*/
		html += "</ul>";
	}
	
	menu.innerHTML = html;
}
