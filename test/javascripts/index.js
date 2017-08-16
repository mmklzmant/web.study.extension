/**
 * 功能：一段动画采用setInterval与requestAnimationFrame，分别给出了webKit下调用刷新的次数
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-16
 */

animate(book, {
    left: 50,
    duration: 2000
})

function animate(elem, options) {
    //动画初始值
    var start = 500
    //动画结束值
    var end = options.left
    //动画id
    var timerId;
    var createTime = function() {
        return (+new Date)
    }
    //动画开始时间
    var startTime = createTime();

    var i = 0;

    function tick() {
        i++;
        several.innerHTML = 'setInterval调用次数:' + i;
        //每次变化的时间
        var remaining = Math.max(0, startTime + options.duration - createTime())
        var temp = remaining / options.duration || 0;
        var percent = 1 - temp;
        var stop = function() {
            //停止动画
            clearInterval(timerId);
            timerId = null;
        }
        var setStyle = function(value) {
            elem.style['left'] = value + 'px'
        }
        //移动的距离
        var now = (end - start) * percent + start;
        if (percent === 1) {
            setStyle(now)
            stop();
        } else {
            setStyle(now)
        }
    }

    //开始执行动画
    var timerId = setInterval(tick, 13);
}
>>>>>>> 8ea231a623ef753e8104261b03037d9656b1a754
