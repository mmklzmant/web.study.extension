/**
 * 功能：右键菜单插件
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-30 11:35:49
 */

function contextMenu(id, itemList) {
    this.node = document.getElementById(id);

    this.createMenu = function() {
        this.node.oncontextmenu = function(e) {
            var e = e || window.event;
            e.preventDefault();

            var x = e.clientX;
            var y = e.clientY;

            var menu = document.getElementsByTagName("context-menu")[0];
            menu.style.left = x + "px";
             menu.style.top = y + "px";

            var htmlStr = "";
            for (var i = 0; i < itemList.length; i++) {
                htmlStr += '<item>' + itemList[i] + "</item>";
            }
            menu.innerHTML = htmlStr;
        }
    }
}

/**
 * 功能：隐藏菜单
 */
function removeMenu(){
	var body = document.getElementsByTagName('body')[0];
	body.onclick = function(){
		var menu = document.getElementsByTagName("context-menu")[0];
		menu.innerHTML = "";
	}
}

/**
 * 功能：为每个子菜单绑定点击事件
 */
function bindItemClick(){

}