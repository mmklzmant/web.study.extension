/**
 * 功能：物流信息管理
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-07 16:15:08
 */

//获取dom节点
var except = document.getElementById("except");
var except_btn = document.getElementById("except_btn");
var search = document.getElementById("search");
var search_btn = document.getElementById("search_bth");
var reset_btn = document.getElementById("reset");
var tbody = document.getElementsByTagName("tbody")[0];
var tbody_trs = tbody.getElementsByTagName("tr");

//数据
var objs = {
    items_one: ["taobao-001", "单反", "2016-11-11", "2016-11-16", "皮卡丘", "查看"],
    items_two: ["taobao-002", "手机", "2016-11-11", "2016-11-18", "柯南", "查看"],
    items_three: ["taobao-003", "书籍", "2016-11-11", "2016-11-18", "鸣人", "查看"],
    items_four: ["taobao-004", "茶杯", "2016-11-11", "2016-11-19", "路飞", "查看"],
    items_five: ["taobao-005", "电脑", "2016-11-11", "2016-11-21", "悟空", "查看"],
    items_six: ["taobao-006", "衣服", "2016-11-11", "2016-11-23", "黑崎一护", "查看"],

}

//动态加载tbody
for (var x in objs) {
    var str = "<tr>";
    for (var y in objs[x]) {
        str += "<td>" + objs[x][y] + "</td>";
    }
    str += "</tr>";

    tbody.innerHTML += str;
}

// 排除按钮点击事件
except_btn.onclick = function() {
    //获取排除输入框的值value
    var value = except.value;
    //如果为空
    if (!value) {
        for (var i = 0; i < tbody_trs.length; i++) {
            tbody_trs[i].style.display = "table-row";
        }
    }
    //value不为空
    else {
        //获取满足条件的下标
        var arrIndex = getIndexArray(value);
        for (var i = 0; i < arrIndex.length; i++) {
            tbody_trs[arrIndex[i]].style.display = "none";
        }
    }
}

// 搜索按钮点击事件
search_btn.onclick = function() {
    //获取搜索输入框的值value
    var value = search.value;
    //如果为空
    if (!value) {
        for (var i = 0; i < tbody_trs.length; i++) {
            tbody_trs[i].style.display = "none";
        }
    }
    //如果不为空
    else {
        //获取满足条件的下标
        var arrIndex = getIndexArray(value);
        for (var i = 0; i < tbody_trs.length; i++) {
            tbody_trs[i].style.display = "none";
            for (var j = 0; j < arrIndex.length; j++) {
                if (i == arrIndex[j]) {
                    tbody_trs[i].style.display = "table-row";
                }
            }
        }

    }
}

//数据恢复
reset_btn.onclick = function() {
    for (var i = 0; i < tbody_trs.length; i++) {
        tbody_trs[i].style.display = "table-row";
    }
}

/**
 *功能：获取满足条件的下标，以数组的形式返回
 *参数：value 排除输入框的值
 *返回：满足条件的下标数组
 */
function getIndexArray(value) {
    var arrs = new Array();
    var count = 0;
    for (var x in objs) {
        for (var y in objs[x]) {
            if (value === objs[x][y]) {
                arrs.push(count);
                break;
            }
        }
        count++;
    }
    return arrs;
}