/**
 * 功能：右键菜单数据
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-30 15:15:13
 */

/*var lever_one_item_one_next = [
	{
		icon: "images/icon_one.png",
		text: "文件夹",
		click: function(){
			alert("hello");
		},
	},
	{
		icon: "images/icon_two.png",
		text: "文本文档",
		click: function(){
			alert("文本文档");
		},
	},
	{
		icon: "images/icon_three.png",
		text: "联系人",
		click: function(){
			alert("联系人");
		},
	}
];
var lever_one_item_three_next = [
	{
		icon: "images/icon_one.png",
		text: "文件夹",
		click: function(){
			alert("hello");
		},
	},
	{
		icon: "images/icon_two.png",
		text: "文本文档",
		click: function(){
			alert("文本文档");
		},
	},
	{
		icon: "images/icon_three.png",
		text: "联系人",
		click: function(){
			alert("联系人");
		},
	}
];*/

var menuList = [
	[
		{
			id: "memu-new",
			icon: "images/icon_one.png",
			text: "新建",
			type: "hover",
			event: function(x){
				var menu = new contextMenu();
				menu.createSubMenu(x);
			}
		},
		{
			id: "menu-sort",
			text: "排序方式",
			type: "click",
			event: function(){
				console.log("排序方式");
			}
		}
	],
	[
		{
			id: "menu-reload",
			icon: "images/icon_two.png",
			text: "刷新",
			type: "click",
			event: function(){
				console.log('刷新');
			}
		},
	],
	[
		{
			id: "menu-view",
			icon: "images/icon_three.png",
			text: "查看",
			type: "hover",
			event: function(x){
				console.log(x);
			}
		}
	]
];


