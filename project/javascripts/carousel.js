/**
 * 功能：图片轮播类
 */
function Carousel(){
    this.index = 0;//显示图片的当前索引值
    this.circle = 0; //小圆点的位置
    this.ident = 0;
    var self = this;//自身
    /**
     * 功能：根据类名设置图片轮播容器
     * @param String className 类名
     */
    this.setUlNode = function (className) {
        this.ulNode = document.getElementsByClassName(className)[0];
    }
    /**
     * 功能：根据类名设置小圆点的容器
     * @param String className 类名
     */
    this.setRoundNode = function (className) {
        this.roundNode = document.getElementsByClassName(className)[0];
    }
    /**
     * 功能：设置小圆点选中时的className
     */
    this.setCheckedName = function (checkedName) {
        this.ckdName = checkedName;
    }
    /**
     * 功能：加载图片和小圆点
     * @param Array imgList 图片地址数组
     */
    this.init = function(imgList)
    {
        this.len = imgList.length;
        var strHTML = "";
        var roundHTML = "";
        for (var i = 0; i < this.len; i++)
        {
            strHTML += '<li data-url="' + imgList[i]['url'] + '">'+
                '<img src="'+ imgList[i]['imageUrl'] +'">';
            if(imgList[i]['content'] !== undefined)
            {
                strHTML += '<p>' + imgList[i]['content'] + "</p>";
            }
            strHTML += '</li>';
            roundHTML += "<i></i>";
        }
        this.ulNode.innerHTML = strHTML;
        this.roundNode.innerHTML = roundHTML;
        //根据当前的index值设置小圆点被选中
        this.roundNode.children[this.index].className = this.ckdName;
        //为了实现无缝轮播，克隆第一张放到最后一张
        this.ulNode.appendChild(this.ulNode.children[0].cloneNode(true));
        //根据当前的index值设置ul的left值
        this.ulNode.style.left = -this.index*this.liWidth + "px";
        //获取每个li的宽度
        this.liWidth = this.ulNode.children[0].offsetWidth;
    }
    /**
     * 功能：自动轮播
     * @param Number time 轮播间隔时间
     * @param Number startIndex 开始轮播的下标值
     */
    this.autoplay = function(time)
    {
        //间隔time时间轮播一张图片
        this.ident = setInterval(function(){
            self.index++;//索引值+1
            //当轮播到克隆的最后一张图片后，将ul的left值设置为0;
            if(self.index > self.len)
            {
                self.ulNode.style.left = 0;
                self.index = 1;
            }
            //修改ulNode的
            self.animate(self.ulNode, -self.index*self.liWidth);
            //设置圆点选中
            self.circle++;
            if(self.circle > self.len - 1)
            {
                self.circle = 0;
            }
            document.getElementsByClassName(self.ckdName)[0].classList.remove(self.ckdName);
            self.roundNode.children[self.circle].classList.add(self.ckdName);
        }, time);
    }
    //停止自动轮播
    this.stopAutoPlay = function () {
        clearInterval(this.ident);
    }
    /**
     * 功能：将ulNode容器的left值以一定的速度设置为leftValue
     * @param Element ulNode 图片容器
     * @param Number leftValue ul的left值，是一个小于等于0的数
     */
    this.animate = function (ulNode, leftValue) {
        //清除上次的定时器
        clearInterval(ulNode.timer);
        //如果是向右的，则值是负数，否则是正数
        var speed = ulNode.offsetLeft < leftValue ? this.liWidth/5 : -this.liWidth/5;
        ulNode.timer = setInterval(function(){
            ulNode.style.left = ulNode.offsetLeft + speed + "px";
            //处理什么时候该setInterval函数停止
            var result = leftValue - ulNode.offsetLeft;
            if(Math.abs(result) <= Math.abs(speed))
            {
                clearInterval(ulNode.timer);
                ulNode.style.left = leftValue + "px";
            }
        }, this.liWidth/5);
    }
}