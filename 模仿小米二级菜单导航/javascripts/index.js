/**
 * 功能：二级菜单导航
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//主菜单menu
var menu = document.getElementById("menu");
var submenu = document.getElementById("submenu");


/*************************************************/
/* 函数调用部分 */
/*************************************************/
//加载主菜单
// console.log(goodsNav);
createMenu();

// 主菜单hover事件 冒泡
/*menu.onmouseover = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() == "li") {
        var str = target.textContent;
        //加载子菜单
        createSubmenu(str.slice(0, str.indexOf("&")));
    }
}*/
/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

/**
 * 功能： 加载主菜单
 */
function createMenu() {
    //主菜单长度
    var len = goodsNav.length;
    //html
    var html = "";
    for (var i = 0; i < len; i++) {
        html += "<li><a href=\"#\">" +
            goodsNav[i].classfiy + "<i class=\"iconfont\">&#xe6a7;</i></a>";
    }
    menu.innerHTML = html;
    
    //绑定鼠标事件
    for (var j = 0; j < len; j++) {
        var menu_li = menu.getElementsByTagName("li")[j];
        menu_li.index = j;
        menu_li.onmouseenter = function() {

            createSubmenu(this.index);
        }
    }
}

//生成子菜单
function createSubmenu(index) {
    var goodsItem = goodsNav[index].goods;
    var html = "";
    var goods_len = goodsItem.length;
    for (var j = 0; j < goods_len; j++) {
        html += "<li><img src=\"" + goodsItem[j].imgUrl +
            "\"><a href=\"#\">" + goodsItem[j].name + "</a></li>";
    }
    submenu.innerHTML = html;
}

//事件冒泡
/*function createSubmenu(text) {
    var len = goodsNav.length;
    for (var i = 0; i < len; i++) {
        if (text === goodsNav[i].classfiy) {
        	var goodsItem = goodsNav[i].goods;
        	var html = "";
            var goods_len = goodsItem.length;
            for (var j = 0; j < goods_len; j++) {
				html += "<li><img src=\"" + goodsItem[j].imgUrl +
				"\"><a href=\"#\">" + goodsItem[j].name + "</a></li>";
            }
            console.log(html);
            submenu.innerHTML = html;
        }
    }
}*/