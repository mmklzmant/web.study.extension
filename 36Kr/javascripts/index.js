/**
 * 功能：Ajax异步加载页面
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-21 21:36:08
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//除底部当行栏的页面容器
var wrapper = document.getElementsByClassName("wrapper")[0];
//当前页面位置
var currentPosition;
//当前页码
var pageNow = 1;
//推荐页面轮播对象
var recomCarousel = new Carousel();
//开氪页面轮播对象
var kaikeCarousel = new Carousel();


/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function () {
    // ==============================
    // 功能流程
    // ==============================
    //初始化主页内容
    getHomeHTML();
    //底部导航点击事
    bottomNavClick();
    // ==============================
    // 全局功能工具函数
    // ==============================
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/

/*************************************************/
/**
 * 功能: 获取主页html并执行相应的逻辑功能函数
 */
function getHomeHTML() {
    getHTML("pages/home.html", function (html) {
        wrapper.innerHTML = html;
        //加载滑动显示的内容
        loadView(1);
        //设置每个页面的宽度
        setPageWidth();
        //头部按钮点击事件
        bindHomeNavClick();
        //绑定滑动内容触摸事件
        bindTouchEvent();
        // 设置头部导航栏的位置
        setNavLinePos(0);

    });

}

/**
 * 功能：快讯界面展开点击事件
 */
function expandClick() {
    var expand = document.getElementsByClassName("other-left"),
        len = expand.length;
    for (var i = 0; i < len; i++) {
        expand[i].onclick = function () {
            if (this.closest(".flash-right-content").classList.contains('show')) {
                this.closest(".flash-right-content").classList.remove('show');
                this.setAttribute("data-txt", "展开");
            }
            else {
                this.closest(".flash-right-content").classList.add('show');
                this.setAttribute("data-txt", "收起");
            }
        }
    }
}

/**
 * 功能：获取开氪页面html并执行相应的功能函数
 */
function getKaikeHTML() {
    getHTML("pages/kaike.html", function (html) {
        wrapper.innerHTML = html;
        getObj("data/kaike-crs-data.json", function (obj) {
            var imgList = Array.prototype.slice.call(obj['images']);
            kaikeCarousel.setUlNode("crsUl");
            kaikeCarousel.setRoundNode("round-icons");
            kaikeCarousel.setCheckedName("round-checked");
            kaikeCarousel.init(imgList);
            kaikeCarousel.autoplay(1500);
        })
    });
}

/**
 * 功能：获取发现页面html并执行相应的功能函数
 */
function getDiscHTML() {
    getHTML("pages/disc.html", function (html) {
        wrapper.innerHTML = html;
    });
}

/**
 * 功能：获取我的页面html并执行相应的功能函数
 */
function getMineHTML() {
    getHTML("pages/mine.html", function (html) {
        wrapper.innerHTML = html;
    });
}

/**
 * 功能：底部导航点击事件
 */
function bottomNavClick() {
    var navs = document.getElementsByClassName("footerNav")[0].children,
        len = navs.length;
    for (var i = 0; i < len; i++) {
        navs[i].index = i;
        navs[i].onclick = function () {
            switch (this.index) {
                case 0:
                    getHomeHTML();
                    break;
                case 1:
                    getKaikeHTML();
                    break;
                case 2:
                    getDiscHTML();
                    break;
                case 3:
                    getMineHTML();
                    break;
                default:
                    break;
            }
            document.getElementsByClassName("checked")[0]
                .classList.remove("checked");
            this.classList.add("checked");
            //停止推荐页面图片轮播
            recomCarousel.stopAutoPlay();
            if (this.index !== 1) {
                //停止开氪页面图片轮播
                kaikeCarousel.stopAutoPlay();
            }
        }
    }
}

/**
 * 功能：设置每个页面的宽度
 */
function setPageWidth() {
    var contentViews = document.getElementsByClassName("content-view"),
        len = contentViews.length;
    var width = window.innerWidth;
    for (var i = 0; i < len; i++) {
        contentViews[i].style.width = width + "px";
    }
}

/**
 * 功能：平移页面
 */
function transform(translate) {
    this.style.webkitTransform = "translate3d(" +
        translate + "px,0,0)";
    currentPosition = translate;
}

/**
 * 功能：头部导航按钮点击事件
 */
function bindHomeNavClick() {
    var liList = document.getElementsByClassName("home-nav")[0]
        .getElementsByTagName("li"),
        len = liList.length;
    var homeContent = document.getElementsByClassName("home-content")[0];
    for(var i = 0; i < len; i++)
    {
        liList[i].index = i;
        liList[i].onclick = function () {
            var pageWidth = window.innerWidth;
            setNavLinePos(this.index);
            if(this.index !== 1)
            {
                recomCarousel.stopAutoPlay();
            }
            loadView(this.index + 1);
            transform.call(homeContent, -pageWidth*(this.index));
        }
    }
}
/**
 * 功能：绑定触摸事件
 */
function bindTouchEvent() {
    currentPosition = 0;
    //滑动页面的父容器
    var viewContainer = document.getElementById("home-content");
    //滑动页面容器
    var viewContents = document.getElementsByClassName("content-view");
    //每个页面宽度
    var pageWidth;
    //滑动到最后一页的平移量
    var maxWidth;
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

    // 手指开始滑动
    viewContainer.addEventListener("touchstart", function (e) {
        // e.preventDefault();
        pageWidth = window.innerWidth;
        maxWidth = -pageWidth * (viewContents.length - 1);
        var target = e.targetTouches[0].target;
        if (!target.closest(".crsUl")) {
            if (e.touches.length === 1 || isTouchEnd) {
                var touch = e.touches[0];
                startX = touch.pageX;
                startY = touch.pageY;
                //初始化当前滑动位置
                initialPos = currentPosition;
                //取消滑动效果
                viewContainer.style.webkitTransition = "";
                // 手指按下的时间
                startTime = new Date().getTime();
                //是否发生滑动
                isMove = false;
                //是否滑动结束
                isTouchEnd = false;
            }
        }
    }, false);
    //触摸滑动
    viewContainer.addEventListener("touchmove", function (e) {
        var target = e.targetTouches[0].target;
        if (!target.closest(".crsUl")) {
            var touch = e.touches[0];
            var deltaX = touch.pageX - startX;
            var deltaY = touch.pageY - startY;

            //如果X方向位移大于Y方向上的位移，则认为是左右滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
                moveLength = deltaX;
                var translate = initialPos + deltaX
                if (translate <= 0 && translate >= maxWidth) {
                    transform.call(viewContainer, translate);
                    isMove = true;
                }
                direction = deltaX > 0 ? "right" : "left";
            }
        }
    }, false);
    // 滑动结束
    viewContainer.addEventListener("touchend", function (e) {
        // e.preventDefault();
        var translate = 0;
        //计算手指在屏幕上滑动的时间
        var deltaTime = new Date().getTime() - startTime;
        if (isMove && !isTouchEnd) {
            isTouchEnd = true;
            //设置过渡效果
            viewContainer.style.webkitTransition = "-webkit-transform 0.3s ease";
            //如果停留时间小于300ms,则不管滑动距离是多少，都停留在下一页
            if (deltaTime < 300) {
                translate = direction === "left" ?
                    currentPosition - (pageWidth + moveLength) : currentPosition + pageWidth - moveLength;
                //边界值处理
                translate = translate > 0 ? 0 : translate;
                translate = translate < maxWidth ? maxWidth : translate;
            }
            //停留时间大于300ms, 如果滑动距离小于当前屏幕的50%则停留在当前页面
            else {
                //滑动距离小于屏幕的50%
                if (Math.abs(moveLength) / pageWidth < 0.5) {
                    translate = currentPosition - moveLength;
                }
                //滑动距离大于屏幕的50%
                else {
                    translate = direction === "left" ?
                        currentPosition - (pageWidth + moveLength) : currentPosition + pageWidth - moveLength;
                    //边界值处理
                    translate = translate > 0 ? 0 : translate;
                    translate = translate < maxWidth ? maxWidth : translate;
                }
            }
            //执行滑动
            setTimeout(function () {
                transform.call(viewContainer, translate);
            }, 100);

            //计算当前页码
            pageNow = Math.round(Math.abs(translate) / pageWidth) + 1;
            //加载当前显示的内容
            loadView(pageNow);
            //设置导航栏的位置
            setNavLinePos(pageNow-1);
        }
    }, false);
}

/**
 * 功能: 设置导航栏的位置
 */
function setNavLinePos(pos) {
    var navs = document.getElementsByClassName("slide-nav");
    document.getElementsByClassName("show")[0].classList.remove("show");
    navs[pos].classList.add("show");
}

/**
 * 功能：加载当前显示的内容
 */
function loadView(index) {
    var url = "";
    var contents = document.getElementsByClassName("content-view");
    switch (index) {
        case 1:
            url = "pages/focus-view-normal.html";
            break;
        case 2:
            url = "pages/recom-view.html";
            break;
        case 3:
            url = "pages/flash-view.html";
            break;
        default:
            break;
    }
    if (index < 4) {
        getHTML(url, function (html) {
            contents[index - 1].innerHTML = html;
            //当为推荐页面时加载轮播图数据
            if (index === 2) {
                getObj("data/recom-crs-data.json", function (obj) {
                    var imgList = Array.prototype.slice.call(obj["images"]);
                    recomCarousel.setUlNode("crsUl");
                    recomCarousel.setRoundNode("round-icons");
                    recomCarousel.setCheckedName("round-checked");
                    recomCarousel.init(imgList);
                    recomCarousel.autoplay(1500);
                    //手指触摸事件
                    cslTouchEvent();
                });
            }
            else {
                if (index === 3) {
                    //快讯界面展开点击事件
                    expandClick();
                }
                //停止轮播
                recomCarousel.stopAutoPlay();
            }
        });
    }
}

/**
 * 功能：轮播图的触摸事件
 */
function cslTouchEvent() {
    //轮播图容器
    var container = document.getElementsByClassName("crsUl")[0];
    //开始位置
    var startX, startY;
    //每张图片的图片宽度
    var imgWidth = window.innerWidth;
    var maxWidth = -imgWidth * (container.children.length);
    //开始时间
    var startTime = 0;
    //滑动结束
    isTouchEnd = true;
    //开始滑动
    container.addEventListener("touchstart", function (e) {
        if (e.touches.length === 1 || isTouchEnd) {
            var touch = e.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            startTime = new Date().getTime();
            isMove = false;
            isTouchEnd = false;
        }
    }, false);
    //滑动
    container.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var deltaX = touch.pageX - startX;
        var deltaY = touch.pageY - startY;
        //如果是左右滑动
        if(Math.abs(deltaX) > Math.abs(deltaY))
        {
            e.preventDefault();

        }
    }, false);
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = xhr.responseText;
            callback(json);
        }
    }
}

/**
 * 功能获取指定路径的html
 */
function getHTML(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var html = xhr.responseText;
            callback(html);
        }
    }
}

/**
 * 功能: ajax获取对象
 * @param   String  url  地址
 * @param  Function callback 回调函数
 */
function getObj(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var obj = JSON.parse(xhr.responseText);
            callback(obj);
        }
    }
}