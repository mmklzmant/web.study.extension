/**
 * 功能：电梯程序，可进行预约
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-09-20
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/

var attrObj = {
    floorNum: 10, //电梯层数
    time: 1000, //单位时间
    curentIndex: 2
}
var evalArr = []; //存储当前点击的层数
var flag = false; //电梯是否在运行状态
/*************************************************/
/* 函数调用部分 */
/*************************************************/
$(function() {
    //生成电梯层数
    init(attrObj.floorNum);
    //按钮点击事件
    dirClick();
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：生成电梯层数
 */
function init(num) {
    for (var i = num - 1; i > -1; i--) {
        $(".right").append(`
            <div class="eval eval-${i+1}">
                    <span>↑</span>
                    <span>↓</span>
                    <h4>${i+1}</h4>
                </div>
        `);
    }
    // 设置左边box的高度
    var heightVal = $(".box").height();
    $(".left").height(heightVal * attrObj.floorNum);
    $(".box").css({
        "display": "block",
        "bottom": (attrObj.curentIndex - 1) * heightVal + "px"
    });
}

/**
 * 功能：电梯键点击事件
 */
function dirClick() {
    $("span").click(function() {
        //点击的层数
        var floor = attrObj.floorNum - $(this).parent().index();
        // 为按钮添加点击背景
        $(this).addClass("checked");
        //将当前点击的层数添加至数组
        evalArr.push(floor);

        if (!flag) {
            animation(evalArr);
        }
    });
}

/**
 * 功能：执行电梯动画
 */
function animation(arr) {
    //电梯不在运行状态
    while (arr.length > 0 && !flag) {
        var floor = arr.shift();
        flag = true; //标志电梯在运行状态
        
        //当前点击的层数与上一次层数的差值
        var diff = Math.abs(attrObj.curentIndex - floor);
        //动画开始时间
        var times = diff * attrObj.time;

        //设置电梯bottom值
        $(".box").css("transitionDuration", times / 1000 + "s");
        $(".box").css("bottom", $(".box").height() * (floor - 1) + "px");
        //延时times秒后为电梯添加开门效果，并移除按钮点击样式
        setTimeout(function() {
            //打开电梯门
            $(".leftDoor, .rightDoor").addClass("toggle");
            //清除按钮样式
            $(".right .eval-" + floor).children().removeClass("checked");
            //等打开电梯动画执行完再去响应下一次运行
            setTimeout(function() {
                // 清除电梯开门动画
                $(".leftDoor, .rightDoor").removeClass("toggle"); 
                // 电梯关门动画
                $(".leftDoor, .rightDoor").addClass("close");
                
            }, 3000);
            setTimeout(function(){
                flag = false; //电梯一次运行结束
                // 清除电梯关门动画
                $(".leftDoor, .rightDoor").removeClass("close");
                animation(arr);
            }, 5000);
        }, times);

        //修改当前的电梯层数
        attrObj.curentIndex = floor;
    }
}