/**
 * 功能：表单验证数据基础
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-04 10:03:35
 */

// 输入框
var email = document.getElementById("email"),
    emailStatus = false,
    emailFormatSta = false,
    nickname = document.getElementById("nicename"),
    nicknameStatus = false,
    nameFormatSta = false,
    pwd = document.getElementById("pwd"),
    pwdStatus = false,
    repwd = document.getElementById("repwd"),
    repwdStatus = false,
    tel = document.getElementById("tel"),
    telStatus = false,
    telFormatSta = false;
birthday = document.getElementById("birthday"),
    birthdayStatus = false, birthFormatSta = false,
    profession = document.getElementById("profession"),
    professionStatus = false,
    isEqual = false;

// 按钮
var submit = document.getElementById("submit");

// submit按钮点击事件
submit.onclick = function() {
    email.onblur();
    nickname.onblur();
    pwd.onblur();
    repwd.onblur();
    tel.onblur();
    birthday.onblur();
    profession.onblur();

    if ((emailStatus && emailFormatSta) && (nicknameStatus && nameFormatSta) && pwdStatus && repwdStatus &&
        (telStatus && telFormatSta) && (birthdayStatus && birthFormatSta) && professionStatus && isEqual) {
        localStorage.setItem("nickname", nickname.value);
        localStorage.setItem("password", pwd.value);
        location.href = "pages/login.html";
    } else {
        alert("请检查，表单没有填写完整！");
    }
}

// 输入框事件绑定
email.onblur = function() {
    emailStatus = blurHandle(this, "请输入邮箱");
    emailFormatSta = judgeEmailFormat(this);
}
email.onkeyup = function() {
    emailStatus = blurHandle(this, "请输入邮箱");
}
nickname.onblur = function() {
    nicknameStatus = blurHandle(this, "请输入昵称");
    nameFormatSta = judgeUserFormat(this);
}
nickname.onkeyup = function() {
    nicknameStatus = blurHandle(this, "请输入昵称");
}
pwd.onblur = function() {
    pwdStatus = blurHandle(this, "请输入密码");
    checkPwd(this);
}
pwd.onkeyup = function() {
    pwdStatus = blurHandle(this, "请输入密码");
    checkPwd(this);
}
repwd.onblur = function() {
    repwdStatus = blurHandle(this, "请验证密码");
    checkPwd(this);
}
repwd.onkeyup = function() {
    repwdStatus = blurHandle(this, "请验证密码");
    checkPwd(this);
}
tel.onblur = function() {
    telStatus = blurHandle(this, "请输入电话号码");
    telFormatSta = judgeTelFormat(this);
}
tel.onkeyup = function() {
    telStatus = blurHandle(this, "请输入电话号码");
}
birthday.onblur = function() {
    birthdayStatus = blurHandle(this, "请输入你的生日");
    birthFormatSta = judgeBirthFormat(this);
}
birthday.onkeyup = function() {
    birthdayStatus = blurHandle(this, "请输入你的生日");
}
profession.onblur = function() {
    professionStatus = blurHandle(this, "请选择你的职业");
}
profession.onchange = function() {
    professionStatus = blurHandle(this, "请选择你的职业");
}

/**
 *功能：当input失去焦点时，改变边框颜色，显示提示文本
 *参数：input:当前输入框，mes:提示文本
 */
function blurHandle(input, mes) {
    // 提示文本p标签
    var errorMes = input.previousElementSibling.previousElementSibling;
    // 输入框的值
    var text = input.value;
    // 判断是否为空
    if (text == "") {
        input.style.borderColor = "#e00";
        errorMes.textContent = mes;
        return false;
    } else if (text == "未选择") {
        input.style.borderColor = "#e00";
        errorMes.textContent = mes;
        return false;
    } else {
        input.style.borderColor = "#999";
        errorMes.textContent = "";
        return true;
    }
}

/**
 * 判断用户名输入格式是否正确
 * @param  需要进行格式匹配的字符串
 * @return bool 是否匹配成功
 */
function judgeUserFormat(input) {
     // 提示文本p标签
    var errorMes = input.previousElementSibling.previousElementSibling;
    // 输入框的值
    var text = input.value;
    if (text !== "") {

        //匹配用户名
        var regxUser = /^[0-9a-zA-Z_]{4,16}$/g;
       
        if (regxUser.test(text)) {
            input.style.borderColor = "#999";
            errorMes.textContent = "";
            return true;
        } 
        else {
            input.style.borderColor = "#e00";
            errorMes.textContent = "请输入4-16个字母数字或下划线";
            return false;
        }
    }
}
/**
 * 判断邮箱输入格式是否正确
 * @param  需要进行格式匹配的字符串
 * @return bool 是否匹配成功
 */
function judgeEmailFormat(input) {
     // 提示文本p标签
    var errorMes = input.previousElementSibling.previousElementSibling;
    // 输入框的值
    var text = input.value;
    if (text !== "") {
        //匹配邮箱
        var regxEmail = /^\w+@\w+(.\w+)+$/g;
        if (regxEmail.test(text)) {
            input.style.borderColor = "#999";
            errorMes.textContent = "";
            return true;
        } 
        else {
            input.style.borderColor = "#e00";
            errorMes.textContent = "邮箱格式错误";
                return false;
        }
    }
}
/**
 * 判断电话号码输入格式是否正确
 * @param  需要进行格式匹配的字符串
 * @return bool 是否匹配成功
 */
function judgeTelFormat(input) {
     // 提示文本p标签
    var errorMes = input.previousElementSibling.previousElementSibling;
    // 输入框的值
    var text = input.value;
    if (text !== "") {

        var regxPhone = /^1[0-9]{10}$/g;

        if (regxPhone.test(text)) {
            input.style.borderColor = "#999";
            errorMes.textContent = "";
            return true;
        } 
        else {
            input.style.borderColor = "#e00";
            errorMes.textContent = "手机号码格式错误";
            return false;
            
        }
    }
}
/**
 * 判断生日日期输入格式是否正确
 * @param  需要进行格式匹配的字符串
 * @return bool 是否匹配成功
 */
function judgeBirthFormat(input) {
     // 提示文本p标签
    var errorMes = input.previousElementSibling.previousElementSibling;
    // 输入框的值
    var text = input.value;
    if (text !== "") {

        //匹配生日
        var regxBirth = /^[1|2][0-9]{3}[\/|-]([0|1])?[0-9][\/|-][0-3]?[0-9]$/g;
        
        if (regxBirth.test(text)) {
            input.style.borderColor = "#999";
            errorMes.textContent = "";
            return true;
        } 
        else {
            input.style.borderColor = "#e00";
            errorMes.textContent = "如xxxx-xx-xx或者xxxx/xx/xx";
            return false;
        }
    }
}
/**
 *功能：两次密码输入是否一致验证
 *参数：input文本框
 */
function checkPwd(input) {
    var thisErrorMes = input.previousElementSibling.previousElementSibling;
    var pwdErrorMes = pwd.previousElementSibling.previousElementSibling;
    var repwdErrorMes = repwd.previousElementSibling.previousElementSibling;

    if (pwdStatus && repwdStatus) {
        if (pwd.value !== repwd.value) {
            thisErrorMes.textContent = "两次密码不一致，请重新输入";
            input.style.borderColor = "e00";
            isEqual = false;
        } else {
            pwdErrorMes.textContent = "";
            repwdErrorMes.textContent = "";
            isEqual = true;
        }
    }
}