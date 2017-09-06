/**
 * 功能：服务与支持页面功能模块
 * 作者 卢敏 (mmklzmant@163.com)
 * 最后修改日期 2017-09-06 13:57:37
 */

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能流程
	 //导航样式设置
    setNavStyle();
   
    // ==============================
    // 全局功能工具函数
    // ==============================
   
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：导航样式设置
 */
function setNavStyle(){
	var navList = document.getElementsByClassName("menu-list")[0].getElementsByTagName("a");
    var toIndex = sessionStorage.getItem("toIndex");
    document.getElementsByClassName("active")[0].classList.remove("active");
    navList[toIndex].classList.add("active");
}