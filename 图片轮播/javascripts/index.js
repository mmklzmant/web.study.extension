/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-21 21:36:08
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
    // 加载轮播图片和小圆点
    loadImages();
	//图片自动轮播
	runCarousels(3000);
	
    // ==============================
    // 全局功能工具函数
    // ==============================
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：加载轮播图片
 */
function loadImages(){
	//轮播图容器
	var container = document.getElementsByClassName("images")[0]; 
	//小圆点容器
	var roundIcons = document.getElementsByClassName("round-icons")[0];
	
	//图片html
	var imgHtml = "";
	//小圆点html
	var roundIconHtml = "";

	imagesInfo.forEach(function(e, index){
		imgHtml += '<a href="' + e.url + '" class="img' + (index+1) + '">' +
                    '<img src="' + e.imageUrl + '"></a>';
        roundIconHtml += "<i></i>";
	});

	container.innerHTML = imgHtml;
	roundIcons.innerHTML = roundIconHtml;
}

/**
 * 功能：轮播图片
 * @param  {[Number]} time [轮播间隔时间]
 */
function runCarousels(time){
	//轮播图片容器数组
	var arrImgBox = document.getElementsByClassName("images")[0]
					.getElementsByTagName("a");
	//容器数组长度
	var len = arrImgBox.length;
	
	//当前图片的下标
	var currentIndex = 0;

	//每3秒轮播一次图片
	var ident = setInterval(function(){
		if(currentIndex === len-1){
			currentIndex = 0;
		}
		tabImages(arrImgBox, currentIndex);
		currentIndex++;
	}, time);
}

/**
 * 功能：设置图片的left属性达到轮播效果
 * @param  {[Array]} arrImgBox    [轮播图片的容器标签]
 * @param  {[Number]} currentIndex [当前显示图片的下标值]
 */
function tabImages(arrImgBox, currentIndex)
{
	//设置当前图片left值为100%;
	arrImgBox[currentIndex].style.left = "100%";
	//容器数组长度
	var len = arrImgBox.length;
	//设置下一张图片left值为0
	if(currentIndex === 5){
		arrImgBox[0].style.left = "0";
	}
	else if(currentIndex === 0){
		arrImgBox[len-1].style.left = "0"
	}
	else{
		arrImgBox[currentIndex+1].style.left = "0";
	}
}