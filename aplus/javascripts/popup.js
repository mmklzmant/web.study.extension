/**
 * 功能：弹出框
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-28 17:41:33
 */

/**
 * 功能：创建弹出框
 * @param  object param 弹出框信息
 * @return {[type]}       [description]
 */
function createBox(param) {
    var component = document.getElementsByTagName('component')[0];
    param.type = param.type || "text";

    //显示文本框
    if (param.type === "text") {
        param.content = param.content || "显示文本";
        component.style.zIndex = "10";
        component.innerHTML = '<div class="text popup-content">' +
            '<p>' + param.content + '</p>' +
            '<span class="popup-delete" id="text-delete">x</span>' +
            '</div>';
        var cancelBtn = document.getElementById("text-delete");
        cancelBtn.onclick = function() {
            param.cancel();
        }
    } 
	//操作确认
    else if (param.type === "operateSure") {
        component.style.zIndex = "10";
        component.innerHTML = '<div class="popup-content operate">' +
            '<p class="title">' + param.title + '</p>' +
            '<form>' +
            '<button type="button" id="ok">确认</button>' +
            '<button type="button" id="cancel">取消</button>' +
            '</form>' +
            '</div>';
        var okBtn = document.getElementById("ok");
        var cancelBtn = document.getElementById("cancel");

        okBtn.onclick = function() {
            param.confirm();
        }

        cancelBtn.onclick = function() {
            param.cancel();
        }
    } 
    //显示图片
    else if (param.type === "showImg") {
        component.style.zIndex = "10";
        component.innerHTML = '<div class="popup-content img">' +
            '<img src="' + param.imgUrl + '">' +
            '<span class="popup-delete" id="img-cancel">x</span>' +
            '</div> '
        var cancelBtn = document.getElementById("img-cancel");
        cancelBtn.onclick = function() {
            param.cancel();
        }
    } 
	//表单填写
    else if (param.type === "form-fill") {
        component.style.zIndex = "10";
        component.innerHTML = '<div class="popup-content form-fill">' +
            '<form action="#">' +
            '<p>' +
            '<label>用户名：</label>' +
            '<input type="text" name="username" id="username">' +
            '</p>' +
            '<p>' +
            '<label>密码：</label>' +
            '<input type="password" name="pwd" id="pwd">' +
            '</p>' +
            '<p>' +
            '<button type="button" id="login">登录</button>' +
            '<button type="button" id="login-cancel">取消</button>' +
            '</p>' +
            '</form>' +
            '</div> ';
        var login = document.getElementById("login");
        var cancelBtn = document.getElementById("login-cancel");

        login.onclick = function() {
            var pwdVal = document.getElementById("pwd").value;
            var usernameVal = document.getElementById("username").value;
            if (pwdVal === "" || usernameVal === "") {
                alert("请填写登录信息");
            } else {

                param.confirm(usernameVal, pwdVal);
            }
        }
        cancelBtn.onclick = function() {
            param.cancel();
        }
    }
}