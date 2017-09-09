/**
 * 功能：载入header和footer
 * 作者 卢敏 (mmklzmant@163.com)
 * 最后修改日期 2017-09-05 09:44:12
 */

//载入header
loadHeader();
//设置网页跳转地址
setHref();
//载入footer
loadFooter();

//导航菜单点击事件
navClick();
 // 登录
loginClick();
//注册
regClick();

/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：载入header
 */
function loadHeader() {
    var ndHeader = document.getElementsByTagName("header")[0];
    var loginStr = sessionStorage.getItem("nick");
    if(!loginStr){
        loginStr = '<button type="button" id="login">登录</button>' +
        '<button type="button" id="register">注册</button>';
    }
    else{
        loginStr = "<p>" + loginStr + "</p>";
    }
    ndHeader.innerHTML = '<div class="logo">' +
        '</div>' +
        '<div class="menu">' +
        '<div class="menu-list">' +
        '<a href="index.html">首页</a>' +
        '<a href="pages/support.html">服务与支持</a>' +
        '<a href="pages/solution.html">解决方案</a>' +
        '<a href="pages/about.html">关于我们</a>' +
        '</div>' +
        '<div class="login">' +
        '<form id="user-form">' + loginStr +
        '</form>' +
        '</div>' +
        '</div>';
     //初始化页面索引值
     if(!sessionStorage.getItem("toIndex"))
     {
        sessionStorage.setItem("toIndex", 0);
     }
     
}
/**
 * 功能：载入footer
 */
function loadFooter() {
    var ndFooter = document.getElementsByTagName("footer")[0];
    ndFooter.innerHTML = '<div class="footer-content">' +
        '<div>' +
        '<span>服务</span>' +
        '<a href="#">软件定制</a>' +
        '<a href="#">软件系统集成</a>' +
        '<a href="#">网络运营</a>' +
        '</div>' +
        '<div>' +
        '<span>运营</span>' +
        '<a href="#">微信运营</a>' +
        '<a href="#">APP运营</a>' +
        '<a href="#">SEM</a>' +
        '<a href="#">SEO</a>' +
        '</div>' +
        '<div>' +
        '<span>产品</span>' +
        '<a href="#">电子商务平台</a>' +
        '<a href="#">数字校园平台</a>' +
        '<a href="#">物联网平台</a>' +
        '<a href="#">数据采集监控平台</a>' +
        '<a href="#">IT计算服务</a>' +
        '</div>' +
        '<div>' +
        '<span>公司</span>' +
        '<a href="#">团队</a>' +
        '<a href="#">职位</a>' +
        '<a href="#">联系</a>' +
        '<a href="#">魏蜀吴</a>' +
        '</div>' +
        '</div>' +
        '<div class="copyright">' +
        '<span>Copy right 2015 成都艾尔帕思科技有限公司 All Rights Reserved 蜀ICP备 15031645号-1</span>' +
        '</div>';
}
/**
 * 功能：导航点击事件
 */
function navClick(){
    var navList = document.getElementsByClassName("menu-list")[0].getElementsByTagName("a"),
        len = navList.length;
    for(var i = 0; i < len; i++){
        navList[i].index = i;
        navList[i].onclick = function(e){
            sessionStorage.setItem("toIndex", this.index);
        }
    }
}
/**
 * 功能: 设置导航a标签href属性
 */
function setHref()
{
    var navList = document.getElementsByClassName("menu-list")[0].getElementsByTagName("a");
    if(location.href.lastIndexOf("index") !== -1)
    {
        navList[0].href = "index.html";
        navList[1].href = "pages/support.html";
        navList[2].href = "pages/solution.html";
        navList[3].href = "pages/about.html";
    }
    else{
        navList[0].href = "../index.html";
        navList[1].href = "support.html";
        navList[2].href = "solution.html";
        navList[3].href = "about.html";
    }
}

/**
 * 功能：点击登录按钮，弹出登录框
 */
function loginClick(){
    var loginBtn = document.getElementById("login");
    if(loginBtn)
    {
        loginBtn.onclick = function(){
        createBox({
            type: "login",
            success: function(){
               document.getElementById("user-form").innerHTML = "<p>" +
                                sessionStorage.getItem("nick") + "</p>";
            }
        })
    }
    }
}

/**
 * 功能：点击注册按钮，弹出注册框
 */
function regClick(){
    var regBtn = document.getElementById("register");
    if(regBtn){
        regBtn.onclick = function(){
        createBox({
            type: "reg",
            success: function(){
                createBox({
                    type: "nick",
                    success: function(){
                        document.getElementById("user-form").innerHTML = "<p>" +
                                sessionStorage.getItem("nick") + "</p>";
                    }
                })
            }
        })
    }
    }
}
/**
 * 功能：首次进入页面初始化导航的类名
 */
function setNavClass(index){
    var navList = document.getElementsByClassName("menu-list")[0].children;
    navList[index].classList.add("active");
}
/**
 * 功能：导航样式设置
 */
function setNavStyle(){
    var navList = document.getElementsByClassName("menu-list")[0].getElementsByTagName("a");
    var toIndex = sessionStorage.getItem("toIndex");
    document.getElementsByClassName("active")[0].classList.remove("active");
    navList[toIndex].classList.add("active");
}
