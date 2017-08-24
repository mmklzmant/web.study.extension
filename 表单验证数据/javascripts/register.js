/**
 * 功能：数据验证基础
 * 日期：2017-8-3
 **/
// 输入框
var email = document.getElementById("email"),
    nickname = document.getElementById("nicename"),
    pwd = document.getElementById("pwd"),
    repwd = document.getElementById("repwd"),
    tel = document.getElementById("tel"),
    birthday = document.getElementById("birthday"),
    profession = document.getElementById("profession");

// 按钮
var submit = document.getElementById("submit");

// submit按钮点击事件绑定,判断必填输入框是否为空
submit.onclick = function() {
    var text;
    //邮箱为空
    if (text = isNull(email.value, "email")) {
        alert(text);
        email.previousElementSibling.previousElementSibling.textContent = text;
        email.focus();
    }
    // 邮箱不为空
    else {
        // 昵称为空
        if (text = isNull(nickname.value, "nickname")) {
            alert(text);
            nickname.previousElementSibling.previousElementSibling.textContent = text;
            nickname.focus();
        }
        // 昵称不为空
        else {
            // 密码为空
            if (text = isNull(pwd.value, "pwd")) {
                alert(text);
                pwd.previousElementSibling.previousElementSibling.textContent = text;
                pwd.focus();
            }
            // 密码不为空
            else {
                //验证密码为空
                if (text = isNull(repwd.value, "repwd")) {
                    alert(text);
                    repwd.previousElementSibling.previousElementSibling.textContent = text;
                    repwd.focus();
                }
                //验证密码不为空
                else {
                    //两次密码输入不相同
                    if (pwd.value !== repwd.value) {
                        alert("两次密码输入不同，请重新输入！")
                        repwd.previousElementSibling.previousElementSibling.textContent = "请重新输入！";
                        repwd.focus();
                    }
                    // 两次密码输入不相同
                    else {
                        //手机号为空
                        if (text = isNull(tel.value, "tel")) {
                            alert(text);
                            tel.previousElementSibling.previousElementSibling.textContent = text;
                            tel.focus();
                        }
                        // 手机号不为空
                        else {
                            //生日为空
                            if (text = isNull(birthday.value, "birthday")) {
                                alert(text);
                                birthday.previousElementSibling.previousElementSibling.textContent = text;
                                birthday.focus();
                            }
                            // 生日不为空
                            else {
                                //职业没有选择
                                if (text = isNull(profession.value, "profession")) {
                                    alert(text);
                                    profession.previousElementSibling.previousElementSibling.textContent = text;
                                    profession.focus();
                                }
                                // 职业已经选择
                                else
                                {
                                    location.href = "https://www.baidu.com";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
// 为所有的input框绑定onchange事件
//使p标签的提示消失
email.onchange = function(){
    email.previousElementSibling.previousElementSibling.textContent = "";
}
nickname.onchange = function(){
    nickname.previousElementSibling.previousElementSibling.textContent = "";
}
pwd.onchange = function(){
    pwd.previousElementSibling.previousElementSibling.textContent = "";
}
repwd.onchange = function(){
    repwd.previousElementSibling.previousElementSibling.textContent = "";
}
tel.onchange = function(){
    tel.previousElementSibling.previousElementSibling.textContent = "";
}
birthday.onchange = function(){
    birthday.previousElementSibling.previousElementSibling.textContent = "";
}
profession.onchange = function(){
    profession.previousElementSibling.previousElementSibling.textContent = "";
}


/**
 *功能：判断传入的值是否为空,并返回一个提示文本，
 *参数：text文本框的value值，type文本框类型
 *返回值：当text为空时返回提示文本，否则返回"",
          对于profession做特别处理，因为它的初始值为"未选择"
 **/
function isNull(text, type) {
    if (text === "") {
        switch (type) {
            case "email":
                return "请输入你的邮箱";
            case "nickname":
                return "请输入你的昵称";
            case "pwd":
                return "请输入你的密码";
            case "repwd":
                return "请确认你的密码";
            case "tel":
                return "请输入你的电话号码";
            case "birthday":
                return "请输入你的生日";
            default:
                break;
        }
    } 
    else if(text === "未选择")
    {
        return "请选择你的职业";
    }
    else {
        return "";
    }
}