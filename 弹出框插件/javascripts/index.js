/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/




/*************************************************/
/* 函数调用部分 */
/*************************************************/
window.onload = function(){
	//绑定监听事件
	bindBtnClick();
}

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
//绑定监听事件
function bindBtnClick(){
	//按钮
	var showText = document.getElementById("showText");
	var operateSure = document.getElementById("operateSure");
	var showImg = document.getElementById("showImg");
	var editForm = document.getElementById("editForm");
	var login = document.getElementById("login");
	var register = document.getElementById("register");
	var component = document.getElementsByTagName('component')[0];

	//文本显示按钮
	showText.onclick = function()
	{
		createBox({
			type: "text",
			content: "观夫巴陵胜状，在洞庭一湖。衔远山，" + 
				"吞长江，浩浩汤汤，横无际涯；朝晖夕阴，" + 
				"气象万千。此则岳阳楼之大观也，前人之述备矣。"+ 
				"然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(){

			}
		});
	}

	//操作确认按钮
	operateSure.onclick = function(){
		createBox({
			type: "operateSure",
			title: "你确认要删除吗？",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(){
				component.style.zIndex = "-1";
				var body = document.getElementsByTagName("body")[0];
				body.style.background = "url(images/bg2.jpg)";
			}
		});
	}

	//图片展示按钮
	showImg.onclick = function(){
		createBox({
			type: "showImg",
			imgUrl: "images/cat.jpg",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(){

			}
		});
	}

	//表单填写
	editForm.onclick = function(){
		createBox({
			type: "form-fill",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(userName, pwd){
				component.style.zIndex = "-1";
				var ndUser = document.getElementsByClassName("user")[0];
				ndUser.textContent = "用户名：" + userName + "  " + "密码：" + pwd;
			}
		});
	}
	//登录
	login.onclick = function(){
		createBox({
			type: "login",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(userName, pwd){
				component.style.zIndex = "-1";
				var ndUser = document.getElementsByClassName("user")[0];
				ndUser.textContent = "用户名：" + userName + "  " + "密码：" + pwd;
			}
		});
	}
	//register
	register.onclick = function(){
		createBox({
			type: "register",
			cancel: function(){
				component.style.zIndex = "-1";
			},
			confirm: function(userName, pwd){
				component.style.zIndex = "-1";
				var ndUser = document.getElementsByClassName("user")[0];
				ndUser.textContent = "用户名：" + userName + "  " + "密码：" + pwd;
			}
		});
	}
}

