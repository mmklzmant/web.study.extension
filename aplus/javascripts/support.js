/**
 * 功能：服务与支持页面功能模块
 * 开发者 卢敏 (mmklzmant@163.com)
 * 最后修改日期 2017-09-10
 */

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
     //初始化导航的类名
    setNavClass(1);
	//导航样式设置
    setNavStyle();
    
    //设置服务导航底部线条位置以及宽度
   	setNavLine(sessionStorage.getItem("svs-index"));
   	//显示对应的服务详情
	showService(sessionStorage.getItem("svs-index"));
   	//服务导航按钮点击事件
   	serviceNavClick();
    // ==============================
    // 全局功能工具函数
    // ==============================
    //窗口大小改变
    //设置服务导航底部线条位置以及宽度
    resizeWindow();
   
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：窗口大小改变
 * 调整服务导航底部线条位置以及宽度
 */
function resizeWindow(){
	window.onresize = function(){
		setNavLine(sessionStorage.getItem("svs-index"));
	}
}
/**
 * 功能：设置服务导航底部线条位置以及宽度
 */
function setNavLine(index){
	var ndLine = document.getElementById("line");
	var ndServiceNav = document.getElementsByClassName("tab")[0]
					   .getElementsByTagName("a"),
		len = ndServiceNav.length;
	//设置服务导航宽度
	for(var i = 0; i < len; i++){
		if(ndServiceNav[0].offsetLeft === 0){
			ndServiceNav[i].style.width = (innerWidth * 0.2) + "px";
		}
		else{
			ndServiceNav[i].style.width = "250px";
		}
	}
	//设置服务导航字体颜色
	document.getElementsByClassName("on")[0].classList.remove("on");
			ndServiceNav[index].classList.add("on");
	//设置底部线条样式
	ndLine.style.left = ndServiceNav[index].offsetLeft + "px";
	ndLine.style.width = ndServiceNav[index].offsetWidth + "px";
}
/**
 * 功能：服务导航按钮点击事件
 */
function serviceNavClick(){
	
	var ndServiceNav = document.getElementsByClassName("tab")[0]
					   .getElementsByTagName("a"),
		len = ndServiceNav.length;
	for(var i = 0; i < len; i++){
		ndServiceNav[i].index = i;
		ndServiceNav[i].onclick = function(){
			sessionStorage.setItem("svs-index", this.index);
			//设置标签字体颜色
			document.getElementsByClassName("on")[0].classList.remove("on");
			this.classList.add("on");
			//设置底部滑动线条
			var ndLine = document.getElementById("line");
			ndLine.style.left = this.offsetLeft + "px";
			//设置对应的banner图和详细服务
			showService(this.index);
		}
	}

}
/**
 * 功能：设置对应的banner图和详细服务显示
 * @param Number index 当前应该显示的下标
 */
function showService(index){
	//隐藏显示的内容
	document.getElementsByClassName("banner-show")[0].classList.remove("banner-show");
	document.getElementsByClassName("detail-show")[0].classList.remove("detail-show");
	//详细服务页面
	var ndDetail = document.getElementsByClassName("detail");
	//banner图
	var ndBanner = document.getElementsByClassName("banner");
	//显示对应index下标的bannner图和详细服务内容
	ndDetail[index].classList.add("detail-show");
	ndBanner[index].classList.add("banner-show");
}