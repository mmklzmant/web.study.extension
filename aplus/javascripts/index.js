/**
 * 功能：首页功能
 * 开发者： 卢敏 (mmklzmant@163.com)
 * 最后修改日期：    2017-08-21 21:36:08
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
    // ==============================
    //导航样式设置
    setNavStyle();
    //加载轮播图图片
    loadCarosImg();
    // 轮播图
    runCarousel();

    // ==============================
    // 全局功能工具函数
    // ==============================
    
    //地图显示与隐藏事件
    toggleMap();
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
 * 功能：加载轮播图片
 */
function loadCarosImg() {
    var ndImgContainer = document.getElementsByClassName("slider"),
        len = ndImgContainer.length;
    for (var i = 0; i < len; i++) {
        ndImgContainer[i].style.background = "url(" + carouselInfo[i]['imgUrl'] + ")";
    }
}

/**
 * 功能：轮播图片功能
 */
function runCarousel() {

    setInterval(function() {
        var ndImgContainer = ndImgContainer = document.getElementsByClassName("show")[0];
        if (ndImgContainer.nextElementSibling) {
            //隐藏上一张
            ndImgContainer.className = "slider";
            //显示下一张
            ndImgContainer.nextElementSibling.className = "slider show";

            //图片内容延迟500秒
            delayAnim(ndImgContainer.nextElementSibling.children[0],
            			ndImgContainer.children[0]);
        } else {
            var ndCarosChild = document.getElementsByClassName("carousel")[0].firstElementChild;
            //显示下一张
            ndCarosChild.className = "slider show";
            //隐藏上一张
            ndImgContainer.className = "slider";

            //图片内容延迟500秒
            delayAnim(ndCarosChild.firstElementChild,
            			ndImgContainer.firstElementChild);
        }
    }, 4000);
}

/**
 * 功能：设置图片内容动画延迟500ms显示
 * @param  Element current  当前显示的图片容器div标签
 * @param  Element pre  即将隐藏的图片的容器div标签
 */
function delayAnim(current, pre) {
    setTimeout(function() {
        current.className = "move";
        pre.className = "";
    }, 500)

}

/**
 * 功能：地图显示与隐藏事件
 */
function toggleMap(){
	var ndMapToggle = document.getElementById("map-tip");
	ndMapToggle.onclick = function(){
		var ndMap = document.getElementById("map");
		if(ndMap.clientHeight === 150)
		{
			ndMap.style.height = "400px";
			this.setAttribute("data-tip", "收起艾尔帕斯成都公司地图");
		}
		else{
			ndMap.style.height = "150px";
			this.setAttribute("data-tip", "展开艾尔帕斯成都公司地图");
		}
		this.classList.toggle("up");
	}  
}