/**
 * 功能：首页功能
 * 开发者： 卢敏 (mmklzmant@163.com)
 * 最后修改日期：    2017-09-10
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
//地图相关对象
var map, infoWindow, marker;

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能流程
    // ==============================
    //初始化导航的类名
    setNavClass(0);
    //导航样式设置
    setNavStyle();
    //加载轮播图图片
    loadCarosImg();
    // 轮播图
    runCarousel();

    // ==============================
    // 全局功能工具函数
    // ==============================
    // 服务导航点击事件
    svsNavClick();
    //方案案例卡片点击事件
    caseClick();
    //地图显示与隐藏事件
    toggleMap();
    //显示Map
    initMap();
    //公司信息卡片点击事件
    companyClick();
}


/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
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
 * 功能：公司信息卡片点击事件
 */
function companyClick(){
    var companyList = document.getElementsByClassName("company-list")[0].children,
    len = companyList.length;
    for(var i = 0; i < len; i++){
        companyList[i].index = i;
        companyList[i].onclick = function(){
            //设置当前li的border-bottom样式，
            //清除其它的li的border-bottom样式
            setBorderStyle(companyList, this.index);
            this.style.borderBottom = "4px solid #3c9de5";
            //刷新map
            refreshMap({
                name: this.getAttribute("data-name"),
                addr: this.getAttribute("data-address"),
                lng: this.getAttribute("data-lng"),
                lat: this.getAttribute("data-lat")

            });
        }
    }
}
/**
 * 功能：刷新map
 * @param  object param 包含四个属性值
 * name：公司名称
 * addr：公司地址
 * lng：经度
 * lat：维度
 * @return {[type]}       [description]
 */
function refreshMap(param){
    //处理信息数据
    var name = "艾尔帕斯" + param.name;
    var addr = param.addr;
    var pos = [];
    pos.push(Number(param.lng));
    pos.push(Number(param.lat));
    //根据位置信息刷新地图，标注和信息窗口
    map.setCenter(pos);
    marker.setPosition(pos);
    infoWindow.open(map, pos);
    //设置信息窗口文本内容
    var ndName = document.getElementById("company-name");
    ndName.textContent = name;
    var ndAddr = document.getElementById("company-addr");
    ndAddr.textContent = addr;
}
/**
 * 功能：清除没有被点击的li的border-bottom样式
 * @param Element companyList 公司信息卡片li标签列表
 * @param Number index 当前点击的li的下标
 */
function setBorderStyle(companyList, index){
    var len = companyList.length;
    for(var i = 0; i < len; i++){
        if(i !== index){
            companyList[i].style.borderBottom = "";
        }
    }
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

/**
 * 功能：初始化map，信息窗口和标记
 */
function initMap(){
    map = new AMap.Map('map', {
            pitch:75,
            viewMode:'3D',
            zoom: 18,
            expandZoomRange:true,
            zooms:[3,20],
            resizeEnable: true,
            center:[104.066463,30.546089]
        });
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
    

    infoWindow = new AMap.InfoWindow({
            content: "<div class=\"infowindow-box\">" + 
                    "<span id=\"company-name\">艾尔帕思成都公司</span><br>" + 
                    "<span id=\"company-addr\">新希望国际B座2505</span></div>",
            //基点指向marker的头部位置
            offset: new AMap.Pixel(0, 3),
        });
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        map:map,
        position: map.getCenter(),
    });
     //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker.getPosition());
    });
    infoWindow.open(map, marker.getPosition());
    //成都： 104.066463,30.546089
    //重庆：106.512885,29.522087
    //山东：117.123191,36.681031
}
/**
 * 功能：服务导航点击事件
 */
function svsNavClick(){
    var ndSvsList = document.getElementsByClassName("my-service")[0].children,
        len = ndSvsList.length;
    for(var i = 0; i < len; i++){
        ndSvsList[i].index = i;
        ndSvsList[i].onclick = function(){
            sessionStorage.setItem("svs-index", this.index);
            sessionStorage.setItem("toIndex", 1);
            location.href = "pages/support.html";
        }
    }

}
/**
 * 功能：方案案例卡片点击事件
 */
function caseClick(){
    var caseList = document.getElementsByClassName("case-list")[0].children,
        len = caseList.length;
    for(var i = 0; i < len; i++){
        caseList[i].onclick = function(){
            sessionStorage.setItem("case-name", this.getAttribute("name"));
            sessionStorage.setItem("toIndex", 2);
            location.href = "pages/solution.html";
        }
    }
}