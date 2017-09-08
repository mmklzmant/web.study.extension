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
    //如果component存在，则移除component
    var temp = document.getElementsByTagName("component")[0];
    if (temp) {
        temp.remove();
    }
    var component = document.createElement("component");
    document.body.appendChild(component);
    param.type = param.type || "reg";

    //登录
    if (param.type === "login") {
        component.style.zIndex = "999";
        component.innerHTML = '<div class="popup-content login">' +
            '<span class="popup-delete iconfont icon-quxiao" id="delete"></span>' +
            '<form>' +
            '<div class="login-title">' +
            '<i></i>' +
            '<span>请登录</span>' +
            '<i></i>' +
            '</div>' +
            '<div>' +
            '<input type="text" name="count" id="count" placeholder="请输入您的邮箱/手机号">' +
            '<em class="iconfont icon-user"></em>' +
            '</div>' +
            '<div>' +
            '<input type="password" name="pwd" id="pwd" placeholder="请输入您的密码">' +
            '<em class="iconfont icon-pwd"></em>' +
            '</div>' +
            '<div>' +
            '<button type="button" id="loginBtn">登录</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        var login = document.getElementById("loginBtn");
        var cancelBtn = document.getElementById("delete");

        login.onclick = function() {

        }
        cancelBtn.onclick = function() {
            component.remove();
        }
    } else if (param.type === "reg") {
        component.style.zIndex = "999";
        component.innerHTML = '<div class="popup-content register">' +
            '<span class="popup-delete iconfont icon-quxiao" id="delete"></span>' +
            '<form>' +
            '<div class="login-title">' +
            '<i></i>' +
            '<span>注册</span>' +
            '<i></i>' +
            '</div>' +
            '<div>' +
            '<p></p>' +
            '<input type="text" name="username" id="username" placeholder="请输入您的手机号或者邮箱">' +
            '<em class="iconfont icon-user"></em>' +
            '</div>' +
            '<div>' +
            '<p></p>' +
            '<input type="password" name="reg-pwd" id="reg-pwd" placeholder="请设置您的密码">' +
            '<em class="iconfont icon-pwd"></em>' +
            '</div>' +
            '<div>' +
            '<p></p>' +
            '<input type="password" name="reg-repwd" id="reg-repwd" placeholder="请重新输入您的密码">' +
            '<em class="iconfont icon-pwd"></em>' +
            '</div>' +
            '<div>' +
            '<p></p>' +
            '<input type="text" name="verify" id="verify" placeholder="请输入验证码">' +
            '<span id="verCode">' + createValiCode(5) + '</span>' +
            '</div>' +
            '<div>' +
            '<button type="button" id="regBtn">注册</button>' +
            '</div> ' +
            '</form>' +
            '</div>';
        //点击验证码，重新生成验证码
        document.getElementById("verCode").onclick = function() {
            this.textContent = createValiCode(5);
        }
        // 判断输入框值是否合法
        regInputJudge(param);
        //取消
        var cancelBtn = document.getElementById("delete");
        cancelBtn.onclick = function() {
            component.remove();
        }
    }
    else if(param.type === "nick")
    {
        component.style.zIndex = "999";
        component.innerHTML = '<div class="popup-content popup-nick">'+
                    '<form>'+
                        '<div class="login-title">'+
                            '<i></i>'+
                            '<span>请设置昵称</span>'+
                            '<i></i>'+
                        '</div>'+
                         '<div><p></p>'+
                            '<input type="text" name="nick" id="nick" placeholder="请设置您的昵称">'+
                            '<em class="iconfont icon-nicheng"></em>'+
                        '</div>'+
                        '<div>'+
                            '<button type="button" id="sureBtn">确认</button>'+
                        '</div> '+
                    '</form>'+
                '</div>';
        //判断昵称格式是否正确
        nickJudeg();
}

/*************************************************/
/*昵称格式判断*/
/*************************************************/
function nickJudeg(){
    var input = document.getElementById("nick")
        inputStatus = false;
    input.onblur = function(){
       inputStatus = regxVerify(
            this,
            /^\S{6,16}$/g,
            "昵称格式不正确"
        );
    }
    input.onfocus = function(){
        resetStyle(this);
    };

    //确认按钮事件
    document.getElementById("sureBtn").onclick = function(){
            if(inputStatus)
            {
                sessionStorage.setItem("nick", input.value);
                param.success();
            }
            else{
                input.onblur();
            }
        }
    }
}
/*************************************************/
/*注册框事件处理*/
/*************************************************/
/**
 * 功能: 生成随机验证码
 * @param  Number count 验证码的个数
 * @return String   随机验证码
 */
function createValiCode(count) {
    var verCode = "";
    var strCode = "ABC2DEF3G0HI5JK2LMN91OPQ80RS4TU3VWX7YZabc4defg9hi5jk8lm5nop6qrst7uvwx8yz";
    for (var i = 0; i < count; i++) {
        verCode += strCode[Math.floor(Math.random() * strCode.length)];
    }
    return verCode;
}

/**
 * 功能：输入框失去焦点事件
 * @param object param 弹出框信息的对象
 */
function regInputJudge(param) {
    var count = document.getElementById("username"),
        countStatus = false,
        pwd = document.getElementById("reg-pwd"),
        pwdStatus = false,
        repwd = document.getElementById("reg-repwd"),
        repwdStatus = false,
        isEqual = false,
        verify = document.getElementById("verify"),
        verifyStatus = false;

    //用户名
    count.onblur = function() {
        //验证邮箱
        if (this.value.indexOf("@") !== -1) {
            countStatus = regxVerify(
                this,
                /^[\w\-]+@[\w\-]+(.[\w\-]+)+$/g,
                "手机号或邮箱格式错误"
            );
        }
        //验证电话号码
        else {
            countStatus = regxVerify(
                this,
                /^1\d{10}$/g,
                "手机号或邮箱格式错误"
            );
        }
    }
    count.onfocus = function() {
        resetStyle(this);
    }
    //密码
    pwd.onblur = function() {
        pwdStatus = regxVerify(
            this,
            /^[0-9a-zA-Z_]{6,16}$/g,
            "密码格式错误"
        );
        isEqual = checkPwd(this, pwdStatus, repwdStatus);
    }
    pwd.onfocus = function() {
        if(repwdStatus && pwdStatus)
        {
            resetPwdStyle();
        }
        else{
            resetStyle(this);
        }
    }
    //重新输入密码
    repwd.onblur = function() {
        repwdStatus = regxVerify(
            this,
            /^[0-9a-zA-Z_]{6,16}$/g,
            "密码格式错误"
        );
        isEqual = checkPwd(this, pwdStatus, repwdStatus);
    }
    repwd.onfocus = function() {
        if(repwdStatus && pwdStatus)
        {
            resetPwdStyle();
        }
        else{
            resetStyle(this);
        }
    }
    //验证码
    verify.onblur = function() {
        verifyStatus = checkVerify(this);
    }
    verify.onfocus = function() {
        resetStyle(this);
    }

    //注册按钮事件
    document.getElementById("regBtn").onclick = function() {
        //所有表单格式正确
        if (countStatus && pwdStatus && repwdStatus &&
            isEqual && verifyStatus) {
            //存储用户名和密码
            sessionStorage.setItem("user", count.value);
            sessionStorage.setItem("pwd", pwd.value);
            param.success();

        } else {
            count.onblur();
            pwd.onblur();
            repwd.onblur();
            verify.onblur();
        }
    }

}

/**
 * 功能：验证输入框是否满足格式regx，并设置
 * 相应的输入框样式和错误信息提示
 * @param  Element input 对应的输入框节点
 * @param  Regx regx  正则表达式对象
 * @param  String mes   格式不正确时的信息提示
 * @return boolean  如果格式匹配则返回true， 否则返回false
 */
function regxVerify(input, regx, mes) {
    var value = input.value;
    //错误提示节点
    var errorMes = input.previousElementSibling;
    //图标
    var icon = input.nextElementSibling;
    //格式正确
    if (regx.test(value)) {
        input.style.borderColor = "#999";
        errorMes.textContent = "";
        icon.style.color = "#A3A5A4";
        return true;
    }
    //格式不正确
    else {
        input.style.borderColor = "#e00";
        errorMes.textContent = mes;
        icon.style.color = "#e00";
        return false;
    }
}

/**
 * 功能：重置输入框样式
 */
function resetStyle(input) {
    //错误提示节点
    var errorMes = input.previousElementSibling;
    //图标
    var icon = input.nextElementSibling;
    input.style.borderColor = "#999";
    errorMes.textContent = "";
    icon.style.color = "#3c9ce6";
}
/**
 * 功能：重置密码框的样式
 */
function resetPwdStyle() {
    //错误提示节点
    var pwd = document.getElementById("reg-pwd");
    var repwd = document.getElementById("reg-repwd");
    var pwdErrorMes = pwd.previousElementSibling;
    var repwdErrorMes = repwd.previousElementSibling;
    //图标
    var pwdIcon = pwd.nextElementSibling;
    var repwdIcon = repwd.nextElementSibling;

    pwd.style.borderColor = "#999";
    pwdErrorMes.textContent = "";
    pwdIcon.style.color = "#3c9ce6";
    repwd.style.borderColor = "#999";
    repwdErrorMes.textContent = "";
    repwdIcon.style.color = "#3c9ce6";
}


/**
 * 功能：检查两次输入密码是否一致
 * @param Element input  输入框节点
 * @param  boolean pwdStatus   输入密码状态
 * @param  boolean repwdStatus 重新输入密码状态
 * @return boolean 如果两次密码输入一致则返回true，否则返回false  
 */
function checkPwd(input, pwdStatus, repwdStatus) {
    var thisErrorMes = input.previousElementSibling;
    var pwd = document.getElementById("reg-pwd");
    var repwd = document.getElementById("reg-repwd");
    var pwdErrorMes = pwd.previousElementSibling;
    var repwdErrorMes = repwd.previousElementSibling;

    if (pwdStatus && repwdStatus) {
        //两次密码输入不一致
        if (pwd.value !== repwd.value) {
            thisErrorMes.textContent = "两次密码输入不一致";
            input.style.borderColor = "#e00";
            return false;
        }
        //两次密码输入一致
        else {
            pwdErrorMes.textContent = "";
            repwdErrorMes.textContent = "";
            pwd.style.borderColor = "#999";
            repwd.style.borderColor = "#999";
            return true;
        }
    }
}
/**
 * @params Element 输入框节点
 * 功能：检查验证码是否一致
 */
function checkVerify(input) {
    //错误提示节点
    var errorMes = input.previousElementSibling;
    //随机验证码
    var verCode = document.getElementById("verCode");
    var strCode = verCode.textContent.toLowerCase();

    //输入框的值
    var value = input.value.toLowerCase();

    if (strCode === value) {
        errorMes.textContent = "";
        input.style.borderColor = "#999";
        return true;
    } else {
        errorMes.textContent = "验证码不一致";
        input.style.borderColor = "#e00";
        verCode.textContent = createValiCode(5);
        return false
    }
}

