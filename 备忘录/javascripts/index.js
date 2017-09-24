/**
 * 功能：备忘录
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var isEdit = false; //是否处于编辑状态
var isAdd = true; //是列表项点击进入编辑页面值为false，是点击添加按钮进入的则值为true
/*************************************************/
/* 函数调用部分 */
/*************************************************/
$(function() {
    //如果本地存储里有数据，则加载列表
    loadList();
    
    // 主页添加备忘录按钮事件
    $("#mainAdd").click(function() {
        isAdd = true;
        $("#saveBtn").attr("disabled", true);
        $("#textArea").attr("disabled", false).focus();
        $(".edit").css("left", "0");
    });
    // 编辑页保存按钮
    $("#saveBtn").click(function() {
        //获取文本
        var text = $("#textArea").val();
        //获取日期，并处理格式
        var date = new Date();
        var dateTime = date.toLocaleTimeString();
        var time = date.toLocaleDateString().replace(/\//g, "-") + " " + date.getHours() +
            dateTime.slice(dateTime.indexOf(":"));
        //临时对象
        var obj = {};
            obj.content = text;
            obj.time = time;
        //点击添加按钮进入编辑页
        if (isAdd) {
            //添加备忘录列表
            addList(text, time);
            // 存储到本地
            addToLocal(obj);
            //修改主页底部内容
            var len = JSON.parse(localStorage.getItem("list")).length;
            $(".main footer h1").text(len + "个备忘录");
        }
        //点击列表项进入编辑页
        else {
            var index = localStorage.getItem("index");
            var oriContent = $("#list li").eq(index)[0].getElementsByTagName("p")[0].textContent;
            //如果原始文本不等于当前文本域的文本
            if(text !== oriContent)
            {
                //改变列表显示
                alterList(index, obj);
                //修改本地存储数据
                alterLocal(index, obj);
            }
        }
        //返回主页
        $(".edit").css("left", "100%");
        $("#textArea").val("");
    });
    // 编辑页返回按钮
    $("#backBtn").click(function() {
        $(".edit").css("left", "100%");
        $("#textArea").val("");
    });

    //文本域键盘事件，修改保存按钮状态
    $("#textArea").keyup(function(e) {
        if ($(this).val() !== "") {
            $("#saveBtn").attr("disabled", false);
        } else {
            $("#saveBtn").attr("disabled", true);
        }
    })

    //主页编辑按钮点击事件
    $("#mainEdit").click(function() {
        //在编辑状态
        isEdit = true;
        //显示选中按钮
        $("#list li div.round").width(48);
        // 头部编辑按钮和取消按钮状态切换
        $("#mainCancle").css("display", "block");
        $(this).css("display", "none");
        //底部删除和添加按钮状态切换
        $("#mainAdd").css("display", "none");
        $("#mainDelete").css("display", "block");
    });
    //主页取消按钮点击事件按钮点击事件
    $("#mainCancle").click(function() {
        //不在编辑状态
        isEdit = false;
        //隐藏选中按钮
        $("#list li div.round").width(0);
        // 头部编辑按钮和取消按钮状态切换
        $("#mainEdit").css("display", "block");
        $(this).css("display", "none");
        //显示底部添加按钮
        $("#mainAdd").css("display", "block");
        //隐藏底部删除按钮
        $("#mainDelete").css("display", "none");
        //清除所有选中的状态
        $(".checked").removeClass("checked");
    });
    // 主页小圆圈选中事件
    $("#list").on("click", ".round", function() {
        $(this).children().toggleClass("checked");
    });
    //底部删除按钮事件
    $("#mainDelete").click(function() {
        var $checked = $(".checked");
        //删除列表
        $checked.closest("li").remove();
        //隐藏选中按钮
        $("#list li div.round").width(0);
        //切换头部按钮状态
        $("#mainCancle").css("display", "none");
        $("#mainEdit").css("display", "block");
        // 切换底部按钮状态
        $(this).css("display", "none");
        $("#mainAdd").css("display", "block");
        //删除本地存储
        var contentArr = getContentArr($checked);
        deleteFromLocal(contentArr);
    });
    //列表项点击事件
    $("#list").on("click", "li", function() {
        //在编辑状态
        if (isEdit) {
            return false;
        }
        //不在编辑状态
        else {
            isAdd = false;
            //存储当前点击的索引值
            localStorage.setItem("index", $(this).index());
            $(".edit").css("left", "0");
            $("#saveBtn").attr("disabled", false);
            var content = $(this).children().eq(1).children().eq(0).text();
            $("#textArea").val(content);
            $("#textArea").attr("disabled", true);
        }
    });
    //编辑页面底部编辑按钮点击事件
    $("#editBtn").click(function() {
        $("#textArea").attr("disabled", false);
        $("#textArea").focus();
    });
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：如果本地存储里有数据，则加载列表
 */
function loadList() {
    var objArr = JSON.parse(localStorage.getItem("list"));
    if (objArr !== null) {
        var len = objArr.length;
        for (var i = 0; i < len; i++) {
            //添加备忘录列表
            addList(objArr[i].content, objArr[i].time);
        }
    }
    //改变主页头部按钮和底部文字
    alterMainText();
}
/**
 * 功能： 添加备忘录到列表
 * @param String content 备忘录内容
 * @param String time   时间
 */
function addList(content, time) {
    if (content !== "") {
        //改变主页编辑按钮状态
        $("button:disabled").removeAttr("disabled");
        // 添加到列表
        $("#list").append(`
            <li>
                <div class="round">
                        <i>√</i>
                    </div>
                    <div class="content">
                        <p>${content}</p>
                        <p>${time}</p>
                    </div>
                </li> 
        `);
    }
}

/**
 * 功能：添加对象值本地存储
 */
function addToLocal(obj) {
    var objs = JSON.parse(localStorage.getItem("list"));
    if (objs !== null) {
        objs.push(obj);
        localStorage.setItem("list", JSON.stringify(objs));
    } else {
        var arr = [];
        arr.push(obj);
        localStorage.setItem("list", JSON.stringify(arr));
    }
}
/**
 * 功能：获取被选中的列表内容
 * @return Array 返回列表内容的数组
 */
function getContentArr($checked) {
    var arr = [];
    var $content = $checked.parent().next(),
        len = $content.length;
    for (var i = 0; i < len; i++) {
        arr.push($content[i].getElementsByTagName("p")[0].textContent);
    }
    return arr;
}
/**
 * 功能：添加对象值本地存储
 */
function deleteFromLocal(contentArr) {
    var len = contentArr.length;
    if (len > 0) {
        var tempArr = [];
        var objs = JSON.parse(localStorage.getItem("list"));
        var localLen = objs.length;
        for (var i = 0; i < localLen; i++) {
            if (contentArr.indexOf(objs[i].content) === -1) {
                tempArr.push(objs[i]);
            }
        }
        localStorage.setItem("list", JSON.stringify(tempArr));
        //改变底部文字和头部按钮
        alterMainText();
    }
}

/**
 * 功能：修改主页头部按钮和底部状态
 */
function alterMainText() {
    var objArr = JSON.parse(localStorage.getItem("list"));
    if (objArr !== null) {
        var len = objArr.length;
        if (len > 0) {
            $("#mainEdit").attr("disabled", false);
            $(".main footer h1").text(len + "个备忘录");
        } else {
            $("#mainEdit").attr("disabled", true);
            $(".main footer h1").text("无备忘录");
        }
    } else {
        $("#mainEdit").attr("disabled", true);
    }
}
/**
 * 功能：修改当前列表的值
 * @param Number index 列表项索引值
 * @param Object obj 包含文本值和日期时间的对象
 */
function alterList(index, obj)
{
    var pNodes = $("#list li").eq(index)[0].getElementsByTagName("p");
    pNodes[0].textContent = obj.content;
    pNodes[1].textContent = obj.time;
}
/**
 * 功能：修改本地数组对象指定下标的对象obj
 * @param  Number index 下标值
 * @param  object obj   包含Content和time属性的对象
 */
function alterLocal(index, obj)
{
    var objArr = JSON.parse(localStorage.getItem("list"));
    objArr.splice(index, 1, obj);
    localStorage.setItem("list", JSON.stringify(objArr));
}