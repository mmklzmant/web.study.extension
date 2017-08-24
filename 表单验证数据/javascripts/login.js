/**
 * 功能：登录
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-24 18:01:10
 */

window.onload = function() {
	var loginBtn = document.getElementById("login");
    var nickname = document.getElementById("username");
    var pwd = document.getElementById("password");
    var localName = localStorage.getItem("nickname");
    var localPwd = localStorage.getItem("password"); 
    
    //设置昵称和密码
    nickname.value = localName;
    pwd.value = localPwd;

    //登录按钮点击事件
	loginBtn.onclick = function(){
		if(nickname.value !== localName)
		{
			alert("您的用户名输入错误")
		}
		else if(pwd.value !== localPwd){
			alert("你的密码输入错误");
		}
		else{
			location.href = "welcome.html";
		}
	}
}