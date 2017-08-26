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
	runCarousels(5000);
	
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
	
	//初始化图片样式left值
	initStyle(arrImgBox);

	//下一张图片的下标
	var nextIndex = 1;
	// tabImages(arrImgBox, nextIndex);
	//每3秒轮播一次图片
	var ident = setInterval(function(){
		if(nextIndex === len){
			nextIndex = 0;
		}
		tabImages(arrImgBox, nextIndex);
		nextIndex++;
	}, time);
}

/**
 * 功能：初始化图片的样式，使当前显示的图片是
 * 下标为0的图片，并设置它的下一张图片和上一张图片
 * 的left值分别为100%和-100%
 */
function initStyle(arrImgBox){
	arrImgBox[0].style.left = "0";
	arrImgBox[0].style.zIndex = "10";
	var len = arrImgBox.length;
	for(var i = 0; i < len; i++){
		if(i !== 0 || i !== len-1 || i !== 1);
		{
			arrImgBox[i].style.left = "0";
		}
	}
	arrImgBox[len-1].style.left = "-100%";
	arrImgBox[1].style.left = "100%";
}
/**
 * 功能：设置图片的left属性达到轮播效果
 * @param  {[Array]} arrImgBox    [轮播图片的容器标签]
 * @param  {[Number]} currentIndex [将要显示图片的下标值]
 */
function tabImages(arrImgBox, index)
{
	//容器数组长度
	var len = arrImgBox.length;

	//上一张图片的下标
	var upper_one_index = (index-1) >=0 ? 
			(index-1) : (len - Math.abs(index-1));
	//上上张图片
	var upper_two_index = (index-2) >=0 ? 
			(index-2) : (len - Math.abs(index-2));

	//下一张图片下标
	nextIndex = (index+1)%len;

	//设置zindex值
	for(var i = 0; i < len; i++){
		if(i === index)
		{
			arrImgBox[i].style.zIndex = "10";
		}
		else if(i === upper_one_index)
		{
			arrImgBox[i].style.zIndex = "5";
		}
		else{
			arrImgBox[i].style.zIndex = "0";
		}
	}

	//index
	arrImgBox[index].style.transition = "left 3s";
	arrImgBox[index].style.left = "0";

	//nextIndex 
	arrImgBox[nextIndex].style.transition = "none";
	arrImgBox[nextIndex].style.left = "100%";

	//upper_one_index 
	arrImgBox[upper_one_index].style.transition = "left 3s";
	arrImgBox[upper_one_index].style.left = "-100%";

	//upper_two_index
	arrImgBox[upper_two_index].style.transition = "none";
	arrImgBox[upper_two_index].style.left = "0";

}