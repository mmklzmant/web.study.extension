/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-21 21:36:08
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//当前页面位置
var currentPosition = 0;
//当前页码
var pageNow = 1;
/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
	// ==============================
    // 功能流程
    // ==============================
    //绑定触摸事件
    bindTouchEvent();
    // ==============================
    // 全局功能工具函数
    // ==============================
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
function bindTouchEvent(){
    //滑动页面父容器
    var viewContainer = document.getElementsByTagName("main")[0];
    //滑动页面容器
    var viewContents = document.getElementsByClassName("view");
    //每个页面宽度
    var pageWidth = window.innerWidth;
    //滑动到最后一个页面的平移量
    var maxWidth = -pageWidth * (viewContents.length-1);
    //开始滑动位置和结束位置
    var startX, startY;
    //手指按下的屏幕位置
    var initialPos = 0;
    //手指滑动的距离
    var moveLength = 0;
    //滑动方向
    var direction = "left";
    //是否发生左右滑动
    var isMove = false;
    //手指按下去的时间
    var startTime = 0;
    //当前滑动是否结束
    var isTouchEnd = true;

    //手指开始滑动
    viewContainer.addEventListener("touchstart", function(e){
        if(e.touches.length === 1 || isTouchEnd)
        {
            var touch = e.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            //初始化当前位置
            initialPos = currentPosition;
            //取消滑动位置
            viewContainer.style.webkitTransition = "";
            //手指按下时间
            startTime = new Date().getTime();
            //是否发生滑动
            isMove = false;
            //是否滑动结束
            isTouchEnd = false;
        }
    }, false);

    //触摸滑动
    viewContainer.addEventListener("touchmove", function(e){
        var touch = e.touches[0];
        var deltaX = touch.pageX - startX;
        var deltaY = touch.pageY - startY;
        //如果是左右滑动
        if(Math.abs(deltaX) > Math.abs(deltaY))
        {
            e.preventDefault();
            moveLength = deltaX;
            var translate = initialPos + deltaX;
            //如果没有超出边界
            if(translate <= 0 && translate >= maxWidth)
            {
                transform.call(viewContainer, translate);
                isMove = true;
            }
            direction = deltaX > 0 ? "right" : "left";
        }
    }, false);

    //滑动结束
    viewContainer.addEventListener("touchend", function(e){
        //滑动变量
        var translate = 0;
        //计算手指在屏幕上滑动的时间
        var deltaTime = new Date().getTime() - startTime;
        if(isMove && !isTouchEnd)
        {
            isTouchEnd = true;
            //设置过渡效果
            viewContainer.style.webkitTransition = "-webkit-transform 0.3s ease";
            //如果停留的时间小于300ms，则不管滑动多少距离，都停留在下一页
            if(deltaTime < 300)
            {
                //left为向左滑，即滑向一页，right为向右滑，则滑向上一页
                translate = direction === "left" ?
                    currentPosition - pageWidth - moveLength :
                    currentPosition + pageWidth - moveLength;
                //边界值处理
                translate = translate > 0 ? 0 : translate;
                translate = translate < maxWidth ? maxWidth : translate;
            }
            //停留的时间大于300ms,如果滑动距离小于当前屏幕的50%则停留在当前页，否则停留在下一页
            else{
                //滑动距离小于当前屏幕的50%
                if(Math.abs(moveLength/pageWidth) < 0.5)
                {
                    translate = currentPosition - moveLength;
                }
                //滑动距离大于当前屏幕的50%
                else{
                    translate = direction === "left" ?
                        currentPosition - pageWidth - moveLength :
                        currentPosition + pageWidth - moveLength;
                    //边界值处理
                    translate = translate > 0 ? 0 : translate;
                    translate = translate < maxWidth ? maxWidth : translate;
                }
            }
            //执行滑动
            setTimeout(function(){
                transform.call(viewContainer, translate);
            }, 100);
        }
    }, false);
}

function transform(translate)
{
    this.style.webkitTransform = "translate3d(" +
        translate + "px,0,0)";
    currentPosition = translate;
}