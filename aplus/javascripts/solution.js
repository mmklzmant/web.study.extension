/**
 * 功能：解决方案功能模块
 * 作者 卢敏 (mmklzmant@163.com)
 * 最后修改日期 2017-09-07
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/


/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能流程
	 //导航样式设置
    setNavStyle();
   
    //加载案例图片
    loadCaseImg("all");
    // ==============================
    // 全局功能工具函数
    // ==============================
    //案例导航按钮点击事件
    caseNavClick();
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

/**
 * 功能：加载案例图片
 */
function loadCaseImg(name)
{
    //imgDataList是所有分类的案例图片数据结构，
    //在solution-data.js文件中定义
    var imgList = imgDataList[name];
    //如果对应的name的数据没有
    //就加载全部的图片
    if(!imgDataList[name])
    {
        loadAllImg();
    }
    else{
        var strHtml = "";
        var ndContainer = document.getElementsByClassName("case-container")[0];
        var len = imgList.length;
        for(var i = 0; i < len; i++){
            strHtml += '<div name="' + imgList[i]["url"] + '">'+
                       '<img src="' + imgList[i]["imgUrl"] + '">'+
                        '</div>';
        }
        ndContainer.innerHTML = strHtml;
    }
}

/**
 * 功能：如果对应的name的数据没有
 * 就加载全部的图片
 */
function loadAllImg(){
    var ndContainer = document.getElementsByClassName("case-container")[0];
    var strHtml = "";
    for(x in imgDataList){
        var itemList = imgDataList[x],
            len = itemList.length;
        for(var i = 0; i < len; i++){
            strHtml += '<div name="' + itemList[i]["url"] + '">'+
                       '<img src="' + itemList[i]["imgUrl"] + '">'+
                        '</div>';
        }
    }
    ndContainer.innerHTML = strHtml;
}

/**
 * 功能：案例导航按钮点击事件
 */
function caseNavClick(){
    var ndList = document.getElementsByClassName("tab")[0]
                .getElementsByTagName("a"),
        len = ndList.length;
    for(var i = 0; i < len; i++)
    {
        ndList[i].onclick = function(){
            loadCaseImg(this.name);
            //设置字体样式
            document.getElementsByClassName("on")[0].classList.remove("on");
            this.classList.add("on");
        }
    }
}