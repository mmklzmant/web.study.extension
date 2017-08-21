/**
 * 功能：手机支付
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-21
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//支付信息
var payObj = {
    name: "",
    money: 0
};
var pwdObj = {
    current: [],
    correct: [1, 2, 3, 4, 5, 6]
};

var component = document.getElementsByTagName("component")[0];

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能函数
    // ==============================
    //隐藏遮罩层
    removeMask();
    //调用“生成列表”函数
    createList(friendData);

    //为列表项绑定页面跳转事件
    toPayPage()

    // 点击支付按钮事件
    passwordComponent();
    // 密码输入事件
    // 设置支付结果页面数据

    // ==============================
    // 全局功能工具函数
    // ==============================
    //返回按钮事件函数调用
    prevPage();

    //支付按钮事件函数调用

}



/*************************************************/
/* 函数调用部分 */
/*************************************************/


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：生成列表
 * 参数: 需要的数据(Array-object)
 */
function createList(data) {
    //获取列表容器
    var friendList = document.getElementById("friend-list");
    var html = "";
    data.forEach(function(e) {
        html += "<li>" +
            "<img src=\"" + e.photo + "\">" +
            "<span>" + e.name + "</span>" +
            "<i data-arrow=\"right\">&gt;</i>" +
            "</li>";
    });
    friendList.innerHTML = html;
}

/**
 * 功能：页面"跳转"
 * 参数：需要跳转到的页面索引（Number）
 */
function nextPage(pageNum) {
    var page = document.getElementsByTagName("page")[pageNum];
    page.style.left = "0";
}
/**
 * 功能：页面返回
 * 参数：需要返回到的页面索引（Number）
 */
function prevPage() {
    var backBtn = document.getElementsByTagName("back");
    var backBtn_len = backBtn.length;
    console.log(backBtn);
    for (var i = 0; i < backBtn_len; i++) {
        backBtn[i].onclick = function() {
            //找到当前返回按钮
            var currentPage = this.parentElement.parentElement;
            currentPage.style.left = "100%";
        }
    }
}
/**
 * 功能: 为列表项绑定页面跳转事件
 * 参数：
 */
function toPayPage() {
    var friendItems = document.getElementsByTagName('li');
    var friendItem_len = friendItems.length;
    //for循环绑定点击事件
    for (var i = 0; i < friendItem_len; i++) {
        friendItems[i].index = i;
        friendItems[i].onclick = function() {
            //页面跳转
            nextPage(1);
            //获取当前用户的昵称
            payObj.name = friendData[this.index].name;
            var payee_1 = document.getElementById("payee_1");
            payee_1.textContent = payObj.name;
        }
    }
}

/**
 * 功能： 调用密码控件
 */
function passwordComponent() {
    //获取支付按钮
    var payBtn = document.getElementById("payMoney");
    payBtn.onclick = function() {
        //获取输入金额
        var numPayMoney = document.getElementById("money");
        var numPayMoney_value = Number(numPayMoney.value);
        //大于5000
        if (numPayMoney_value > 5000) {
            alert("单笔交易额不能大于5000");
            return;
        } else if (numPayMoney_value < 0.01) {
            alert("最低金额不得低于0.01元");
            return;
        }
        //将转账金额存储起来
        payObj.money = numPayMoney_value;
        //显示遮罩层
        showMask();
        //数字键盘事件
        bindNumKey();
    }
}

/**
 * 功能：隐藏遮罩层
 */
function removeMask() {
    var mask = document.getElementsByTagName('component')[0];
    mask.remove();
}
/**
 * 功能：显示遮罩层
 */
function showMask() {
    var main = document.getElementsByTagName('main')[0];
    main.append(component);
}
/**
 * 功能：数字键盘事件
 */
function bindNumKey() {
    var numKeyArr = document.getElementsByClassName("numKeyboard")[0].getElementsByClassName("numKey"),
        numKey_len = numKeyArr.length;
    //获取所有的密码值容器
    var pwdValDiv = document.getElementsByClassName("password");
    if (pwdObj.current.length < 6) {
        for (var i = 0; i < numKey_len; i++) {
            numKeyArr[i].onclick = function() {
                inputPwd(this);
            }
        }
    }

}
/**
 * 功能：输入密码
 */
function inputPwd(target)
{
	if(pwdObj.current.length < 6){
		pwdObj.current.push(Number(target.textContent));

		//密码输入框
		var pwdChild = document.getElementsByClassName("password")[0].children;
		pwdChild[pwdObj.current.length-1].innerHTML = "<i></i>";

		if(pwdObj.current.length === 6)
		{
		}
	}
}
/**
 * 单页应用的好处
 * 不需要加载额外资源
 * 跳转更加灵活
 * 减少网络请求
 */