/**
 * 功能：载入header和footer
 * 作者 卢敏 (mmklzmant@163.com)
 * 最后修改日期 2017-09-05 09:44:12
 */

// 功能流程
// ==============================
//载入header
loadHeader();

//载入footer
loadFooter();

/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：载入header
 */
function loadHeader() {
    var ndHeader = document.getElementsByTagName("header")[0];
    ndHeader.innerHTML = '<div class="logo">' +
        '<img src="images/common/logo.png">' +
        '</div>' +
        '<div class="menu">' +
        '<div class="menu-list">' +
        '<a href="index.html" class="active">首页</a>' +
        '<a href="pages/support.html">服务与支持</a>' +
        '<a href="pages/solution.html">解决方案</a>' +
        '<a href="pages/about.html">关于我们</a>' +
        '</div>' +
        '<div class="login">' +
        '<form>' +
        '<button type="button" id="login">登录</button>' +
        '<button type="button" id="register">注册</button>' +
        '</form>' +
        '</div>' +
        '</div>';
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