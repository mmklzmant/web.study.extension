/**
 * 功能：右键菜单插件
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-30 11:35:49
 */

function contextMenu() {
    var self = this;

    //创建主菜单
    this.createMainMenu = function(id, itemList) {
        //主菜单
        this.mainMenu = document.getElementById(id);
        this.mainMenu.oncontextmenu = function(e) {
            var e = e || window.event;
            e.preventDefault();

            var x = e.clientX;
            var y = e.clientY;

            var menu = document.getElementsByTagName("context-menu")[0];
            menu.style.left = x + "px";
            menu.style.top = y + "px";

            if (menu.children.length === 0) {
                menu.appendChild(self.createMemu(itemList));
                self.bindItemEvent(itemList, x);
            }
            self.removeMenu();
        }
    }

    //当点击其他地方时 隐藏菜单
    this.removeMenu = function() {
        var body = document.getElementsByTagName('body')[0];
        body.onclick = function() {
            var menu = document.getElementsByTagName("context-menu")[0];
            menu.innerHTML = "";
        }
    }

    /**
     * 功能：根据数据列表创建菜单
     * @param  Array itemList 菜单数据列表
     * @return DocumentFragment 菜单文档片段    
     */
    this.createMemu = function(itemList) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < itemList.length; i++) {
            var group = document.createElement("group"),
                item = itemList[i],
                len = item.length;
            var htmlStr = "";

            for (var j = 0; j < len; j++) {
                htmlStr += '<item id="' + item[j]['id'] + '"><i>' + item[j]['text'] + '</i>';

                if (item[j]['icon']) {
                    htmlStr += '<img src="' + item[j]['icon'] + '">';
                }
                if (item[j]['type'] === "hover") {
                    htmlStr += '<span>&gt;</span>';
                }
                htmlStr += "</item>";
            }
            group.innerHTML = htmlStr;
            fragment.appendChild(group);
            var ndSpan = document.createElement('span');
            fragment.appendChild(ndSpan);
        }
        return fragment;
    }

    //创建子菜单
    this.createSubMenu = function(x) {
       /* var node = document.getElementById(id);
        node.onmouseenter = function() {
            console.log("新建");
        }*/
        console.log(x);
    }

    /**
     * 功能：为每个itemList里面的每个菜单绑定事件
     * @param  Array itemList 菜单数据列表
     * @param  Number x   主菜单左上角x坐标值
     */
    this.bindItemEvent = function(itemList, x) {

        for(var i = 0; i < itemList.length; i++){
            var item = itemList[i];
            for(var j = 0; j < item.length; j++){
                var node = document.getElementById(item[j]['id']);
                node.temp = item[j];
                node.x = x;
                if(item[j]['type'] === "hover")
                {
                    node.addEventListener('mouseenter', function(e){
                        this.temp['event'](this.x);
                    },false);
                }
                if(item[j]['type'] === "click")
                {
                    node.addEventListener('click', function(){
                        this.temp['event']();
                    },false);
                }
            }
        }
    }
}