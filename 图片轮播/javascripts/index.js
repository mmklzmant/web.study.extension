 /**
 * 功能：图片轮播
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-25
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
// 清除setInterval所需的变量
var identInterval;

//当前显示图片的下标值
var currentIndex = 0;

//轮播间隔事件
var time = 5000;

//图片信息数组长度
var len = imagesInfo.length;

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能流程
    // ==============================
    //设置banner的高度
    setBannerHeight();

    // 加载轮播图片和小圆点
    loadImages();

    //初始化图片样式
    initStyle();

    //图片自动轮播
    runCarousels(1);

    // ==============================
    // 全局功能工具函数
    // ==============================
    //鼠标悬浮事件
    mouseOverForStop();

    //鼠标移开事件
    mouseOutForStart();

    //上一张按钮事件
    preBtnClick();

    //下一张按钮事件
    nextBtnClick();

    //小圆点事件
    roundIconsClick();

    // 窗口大小改变事件
    windowResize();
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
/**
 * 功能：设置banner的高度
 */
function setBannerHeight() {
    var ndBanner = document.getElementsByClassName("banner")[0];
    ndBanner.style.height = (Number(innerWidth * 0.8) / 2.7) + "px";
}
/**
 * 功能：加载图片和小圆点
 */
function loadImages() {
    //轮播图容器
    var container = document.getElementsByClassName("images")[0];
    //小圆点容器
    var roundIcons = document.getElementsByClassName("round-icons")[0];

    //图片html
    var imgHtml = "";
    //小圆点html
    var roundIconHtml = "";

    imagesInfo.forEach(function(e, index) {
        imgHtml += '<a href="' + e.url + '">' +
            '<img src="' + e.imageUrl + '"></a>';
        roundIconHtml += "<i index=\"" + index + "\"></i>";
    });

    container.innerHTML = imgHtml;
    roundIcons.innerHTML = roundIconHtml;
}

/**
 * 功能：轮播图片
 * @param  Number nextIndex 下一张图片下标
 */
function runCarousels(nextIndex) {

    //每3秒轮播一次图片
    identInterval = setInterval(function() {
        if (nextIndex === len) {
            nextIndex = 0;
        }
        currentIndex = nextIndex;
        tabImages(nextIndex);
        nextIndex++;
    }, time);
}

/**
 * 功能：初始化图片的样式，使当前显示的图片是
 * 下标为0的图片，并设置它的下一张图片和上一张图片
 * 的left值分别为100%和-100%
 */
function initStyle() {
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");

    arrImgBox[0].className = "trans-none left-to-0";
    arrImgBox[0].style.zIndex = "10";
    var len = arrImgBox.length;
    for (var i = 0; i < len; i++) {
        if (i !== 0 || i !== len - 1 || i !== 1); {
            arrImgBox[i].className = "trans-none left-to-0";
        }
    }
    arrImgBox[len - 1].className = "trans-none left-to-minus-100";
    arrImgBox[1].className = "trans-none left-to-100";
}
/**
 * 功能：设置图片的left属性轮播至下一张图片
 * @param  Number index 将要显示图片的下标值
 */
function tabImages(index) {
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");

    //计算index下标的上上张图片下标、上一张图片下标和下一张图片下标
    var objIndex = calculateIndex(index);
    
    //设置zindex值
    setZindex(index, objIndex.upper_one_index);
   
    //设置小圆点样式
    setRoundIconsStyle(index, objIndex.upper_one_index);

    //设置图片样式达到轮播效果
    //index
    arrImgBox[index].className = "trans-left left-to-0";

    //nextIndex 
    arrImgBox[objIndex.nextIndex].className = "trans-none left-to-100";

    //upper_one_index 
    arrImgBox[objIndex.upper_one_index].className = "trans-left left-to-minus-100";

    //upper_two_index
    arrImgBox[objIndex.upper_two_index].className = "trans-none left-to-0";
}

/**
 * 功能：当鼠标悬浮在图片上的时候停止轮播
 */
function mouseOverForStop() {
    //鼠标悬浮在图片上停止轮播
    var ndImgs = document.getElementsByClassName("images")[0]
        .getElementsByTagName("img");
    for (var i = 0; i < ndImgs.length; i++) {
        ndImgs[i].onmouseover = function() {
            clearInterval(identInterval);
        }
    }
}

/**
 * 功能：当鼠标移开图片时继续轮播
 */
function mouseOutForStart() {
    //鼠标移开图片继续轮播
    var ndImgs = document.getElementsByClassName("images")[0]
        .getElementsByTagName("img");
    
    for (var i = 0; i < len; i++) {
        ndImgs[i].onmouseout = function() {
            var nextIndex = (currentIndex + 1) % len;
            runCarousels(nextIndex);
        }
    }
}

/**
 * 功能：下一张图片按钮事件
 */
function nextBtnClick() {
    var ndNext = document.getElementById("next");
    ndNext.onmouseover = function() {
        clearInterval(identInterval);
    }
    ndNext.onclick = function() {
        clearInterval(identInterval);
        var nextIndex = (currentIndex + 1) % len;
        tabImages(nextIndex);
        currentIndex = nextIndex;
    }
    ndNext.onmouseout = function() {
        var nextIndex = (currentIndex + 1) % len;
        runCarousels(nextIndex);
    }
}

/**
 * 功能：上一张图片按钮事件
 */
function preBtnClick() {
    var ndPrev = document.getElementById("prev");

    ndPrev.onmouseout = function() {
        var nextIndex = (currentIndex + 1) % len;
        runCarousels(nextIndex);
    }
    ndPrev.onmouseover = function() {
        clearInterval(identInterval);
    }
    ndPrev.onclick = function() {
        clearInterval(identInterval);
        //切换至上一张图片
        tabPrevImages(currentIndex);
    }
}

/**
 * 功能：显示上一张图片
 * @param Number index 当前显示的图片下标
 */
function tabPrevImages(index) {
    //小圆点
    var ndRoundIcons = document.getElementsByClassName("round-icons")[0]
        .getElementsByTagName("i");
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");

    //计算index下标的上上张图片下标、上一张图片下标和下一张图片下标
    var objIndex = calculateIndex(index);
   
    //设置zindex值
    setZindex(objIndex.upper_one_index, index);

    //设置小圆点样式
    setRoundIconsStyle(objIndex.upper_one_index, index);
    
    //设置图片样式跳转至上一张图片
    //index
    arrImgBox[index].className = "trans-left left-to-100";

    //nextIndex 
    arrImgBox[objIndex.nextIndex].className = "trans-none left-to-0";

    //upper_one_index 
    arrImgBox[objIndex.upper_one_index].className = "trans-left left-to-0";

    //upper_two_index
    arrImgBox[objIndex.upper_two_index].className = "trans-none left-to-minus-100";

    //设置图片当前显示的下标
    currentIndex = objIndex.upper_one_index;
}

/**
 * 功能：小圆点事件绑定
 */
function roundIconsClick() {
    //小圆点容器
    var ndContainer = document.getElementsByClassName("round-icons")[0];
    //小圆点
    var ndRoundIcons = ndContainer.getElementsByTagName("i");

    //鼠标悬浮事件
    ndContainer.onmouseover = function(e) {
        var e = e || window.event;
        var target = e.target || e.sreElement;

        clearInterval(identInterval);
        if (target.tagName.toLowerCase() === "i") {
            target.style.backgroundColor = "#fff";
        }
    }
    ndContainer.onmouseout = function(e) {
        var e = e || window.event;
        var target = e.target || e.sreElement;
        var nextIndex = (currentIndex + 1) % len;
        runCarousels(nextIndex);
        if (target.tagName.toLowerCase() === "i") {
            if (target === ndRoundIcons[currentIndex]) {
                target.style.backgroundColor = "#fff";
            } else {
                target.style.backgroundColor = "#555554";
            }
        }
    }

    //鼠标按下事件
    ndContainer.onclick = function() {
        var e = e || window.event;
        var target = e.target || e.sreElement;
        if (target.tagName.toLowerCase() === "i") {
            showImage(Number(target.getAttribute("index")))
        }
    }
}

/**
 * 功能：显示指定下标的图片
 * @param  Number index 显示的图片下标
 */
function showImage(index) {
    //小圆点
    var ndRoundIcons = document.getElementsByClassName("round-icons")[0]
        .getElementsByTagName("i");
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");

    //计算index下标的上上张图片下标、上一张图片下标和下一张图片下标
    var objIndex = calculateIndex(index);

    //重置图片样式,如果不重置，可能会出现混乱的滑动
    resetStyle();

    //设置zindex值
    setZindex(index, objIndex.upper_one_index);
   
    //设置小圆点样式
    setRoundIconsStyle(index, currentIndex);
    
    //设置图片样式跳转到指定下标图片
    //index
    arrImgBox[index].className = "trans-none left-to-0";

    //nextIndex 
    arrImgBox[objIndex.nextIndex].className = "trans-none left-to-100";

    //upper_one_index 
    arrImgBox[objIndex.upper_one_index].className = "trans-none left-to-minus-100";

    //upper_two_index
    arrImgBox[objIndex.upper_two_index].style = "trans-none left-to-0";

    //设置当前显示的图片下标
    currentIndex = index;
}

/**
 * 功能：重置图片样式,如果不重置，可能会出现混乱的滑动
 */
function resetStyle(){
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");
    for(var i = 0; i < len; i++)
    {
        arrImgBox[i].className = "trans-none";
    }
}
/**
 * 功能：设置小圆点样式
 * @param Number index   当前显示的图片下标
 * @param Number upper_one_index 上一张图片下标
 */
function setRoundIconsStyle(index, upper_index)
{
     //小圆点
    var ndRoundIcons = document.getElementsByClassName("round-icons")[0]
        .getElementsByTagName("i");
    ndRoundIcons[index].style.backgroundColor = "#fff";
    ndRoundIcons[upper_index].style.backgroundColor = "#555554";
}

/**
 * 功能：计算index下标的上上张图片下标、
 * 上一张图片下标和下一张图片下标
 * @param Number index 将要显示的图片下标
 * @return object 计算的所有下标值
 */
function calculateIndex(index)
{
    var obj = {};
    obj.index = index;
    //上一张图片
    obj.upper_one_index = (index - 1) >= 0 ?
        (index - 1) : (len - Math.abs(index - 1));
    //上上张图片
    obj.upper_two_index = (index - 2) >= 0 ?
        (index - 2) : (len - Math.abs(index - 2));
    //下一张图片
    obj.nextIndex = (index + 1) % len;
    return obj;
}

/**
 * 功能：设置zIndex
 * @param Number currentIndex 将要显示的下标
 * @param Number slideIndex   即将滑出消失的下标
 */
function setZindex(currentIndex, slideIndex) {
    //轮播图片容器数组
    var arrImgBox = document.getElementsByClassName("images")[0]
        .getElementsByTagName("a");
    //设置zindex值
    for (var i = 0; i < len; i++) {
        if (i === currentIndex) {
            arrImgBox[i].style.zIndex = "10";
        } else if (i === slideIndex) {
            arrImgBox[i].style.zIndex = "5";
        } else {
            arrImgBox[i].style.zIndex = "0";
        }
    }
}

/**
 * 功能：浏览器窗口大下改变后改变图片的高度
 */
function windowResize() {
    window.onresize = function() {
        var ndBanner = document.getElementsByClassName("banner")[0];
        ndBanner.style.height = (Number(ndBanner.clientWidth) / 2.7) + "px";
    }
}