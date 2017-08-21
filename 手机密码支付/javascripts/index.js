/**
 * 功能：手机密码支付
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-16
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var currentUserInfo = {
    nickname: "Change...",
    imageUrl: "images/headimg_one.jpg",
    money: ""
}

var objNickName = {
    //支付页面昵称
    payPageNick: document.getElementById("payPageNick"),
    //遮罩层昵称
    maskNickName: document.getElementById("mask-nick"),
    //支付结果页面昵称
    resultNick: document.getElementById("result-nick")
}

//main
var mainRoot = document.getElementById("root");
//遮罩层
var mainChildren = mainRoot.children;
var tempChild = Array.prototype.slice.call(mainChildren).slice(0);

// 密码
var objPwd = {
    correct: "0b0001, 0b0010, 0b0011, 0b0100, 0b0101, 0b0110",
    current: []
}

/*************************************************/
/* 函数调用部分 */
/*************************************************/
window.onload = function() {
    //加载用户列表
    loadUserList();

    //隐藏遮罩层
    removeMask();

    // 返回按钮点击事件绑定
    backPage();

    //首页好友列表点击事件
    bindLiClick();

    //支付按钮点击事件
    payBtnClick();

    //遮罩层取消按钮事件和keyboard 点击事件以及密码回退
    maskItemClick();
}


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 加载用户列表
 */
function loadUserList() {
    var liLabel = document.getElementsByTagName("li");
    userInfo.forEach(function(e, index) {
        var node = (liLabel[index].children)[0];
        node.innerHTML = "<img src=\"" + e.imageUrl + "\">" +
            "<span>" + e.nickname + "</span>" +
            "<span class=\"next\">&gt;</span>";
    });
}

/**
 * li监听事件绑定
 */
function bindLiClick() {
    var liLabel = document.getElementsByTagName("li");
    var len = liLabel.length;

    for (let i = 0; i < len; i++) {
        liLabel[i].onclick = function() {
            //设置当前用户信息
            currentUserInfo = userInfo[i];
            //切换页面
            tabPage(1);
            //设置昵称
            setNickName();
        }
    }
}
/**
 * remove遮罩层
 */
function removeMask() {
    removePwd();
    tempChild.forEach(function(e) {
        if (e.tagName.toLowerCase() === "div") {
            e.remove();
        }
    });
}

/**
 * 显示遮罩层
 */
function showMask() {
    tempChild.forEach(function(e) {
        if (e.tagName.toLowerCase() === "div") {
            mainRoot.append(e);
        }
    });
}

/**
 * 设置昵称
 */
function setNickName(nickname) {
    for (var x in objNickName) {
        objNickName[x].innerText = currentUserInfo.nickname;
    }
}
/**
 * 功能：支付按钮事件绑定
 */
function payBtnClick() {
    //支付金额
    var money = document.getElementById("money");
    //支付按钮 
    var payBtn = document.getElementById("pay");

    payBtn.onclick = function() {
        currentUserInfo.money = money.value;
        if (Number(currentUserInfo.money) === 0) {
            alert("请至少支付0.01元")
        } 
        else if(Number(currentUserInfo.money) > 5000)
        {
            alert("单笔交易额不得超过5000");
        }
        else {
            //显示遮罩层
            showMask();
            //设置金额
            setMoney();
        }

    }
}
/**
 * 功能：设置金额
 */
function setMoney() {
    //遮罩层金额
    var maskMoney = document.getElementById("pay-money");
    //支付金额
    var resultMoney = document.getElementById("payNum");
    //设置支付结果页面金额
    maskMoney.textContent = (Number(currentUserInfo.money).toFixed(2)).toLocaleString();

    resultMoney.textContent = "￥" + (Number(currentUserInfo.money).toFixed(2)).toLocaleString();
}

/**
 * 功能： 遮罩层取消按钮事件和keyboard 
 * 点击事件以及密码回退
 */
function maskItemClick() {

    mainRoot.onclick = function(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;

        //取消按钮事件
        if (target.tagName.toLowerCase() === "span" &&
            target.className === "quit") {
            //隐藏遮罩层
            removeMask();
        }

        //keyboard点击事件
        if (target.tagName.toLowerCase() === "div" &&
            target.className === "num") {
            //输入密码并在输入完成后进行判断
            inputPwd(target);
        }

        //密码回退
        if (target.tagName.toLowerCase() === "div" &&
            target.className === "delkey") {
            //回退密码
            backPwd();
        }
    }
}
/**
 * 判断密码是否相等
 */
function isEqual() {
    var arrCorrectPwd = transCorrectPwd();
    var bool = true;
    objPwd.current.forEach(function(e, index) {
        if (e !== arrCorrectPwd[index]) {
            bool = false;
        }
    });
    return bool;
}

/**
 * 密码转换
 */
function transCorrectPwd() {
    var arr = objPwd.correct.split(", ");
    return arr.map(function(e) {
        return +e;
    });
}

/**
 * 页面切换
 */
function tabPage(index) {
    var page = document.getElementsByTagName("page")[index];
    page.style.left = "0";
}

/**
 * 返回上一个页面
 */
function backPage() {
    var backBtns = document.getElementsByTagName("span");
    var arrBackBtns = Array.prototype.slice.call(backBtns);
    arrBackBtns.forEach(function(e) {
        if (e.getAttribute("data-href") === "index") {
            e.onclick = function() {
                //返回上一个页面
                var currentPage = this.parentElement.parentElement;
                currentPage.style.left = "100%";
            }
        }
    });
}

/**
 * 清空密码
 */
function removePwd() {
    //置空存取密码的数组
    objPwd.current = [];
    //移除i标签
    var arrDivs = document.getElementById("password").getElementsByTagName("div");
    var len = arrDivs.length;
    for (var i = 0; i < len; i++) {
        arrDivs[i].innerHTML = "";
    }
    //重置金额
    money.value = "";
}

/**
 * 回退密码
 */
function backPwd() {
    if (objPwd.current.length > 0) {
        var passwordChild = document.getElementById("password").children;
        (passwordChild[objPwd.current.length - 1]).innerHTML = "";
        objPwd.current.pop();
    }
}

/**
 * 输入密码并在输入完成后进行判断
 */
function inputPwd(target) {

    if (objPwd.current.length < 6) {
        //密码输入错误标签
        var error = document.getElementById("error");

        //隐藏密码错误提示
        error.style.display = "none";

        //输入密码
        objPwd.current.push(Number(target.innerText));
        var passwordChild = document.getElementById("password").children;
        (passwordChild[objPwd.current.length - 1]).innerHTML = "<i></i>";

        //输入完成
        if (objPwd.current.length === 6) {
            //判断密码是否相等
            if (isEqual()) {
                //置空密码
                removePwd();
                //隐藏遮罩层
                removeMask();
                //切换页面
                tabPage(2);
            } else {
                //置空密码
                removePwd();
                //显示密码错误提示
                error.style.display = "block";
            }
        }
    }
}