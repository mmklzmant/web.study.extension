/**
 * 功能：消费数据改良版
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-14
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/

//存取input标签的数组
//因为获取的input标签和表格的列的顺序不一致，用reSort方法修改一下inputs数组元素的顺序
var inputs = reSort(document.getElementsByTagName("input"));

//存取input的value值的数组
var arrData = [];

//添加按钮
var addBtn = document.getElementById("add");

//存取tbody的html字符串
var html = "";

//总计
var sum = 0;

/*************************************************/
/* 函数调用部分 */
/*************************************************/
//button点击事件
addBtn.addEventListener("click", function() {
    //将数据添加至数组
    pushData();
    
    //tbody标签
    var tbody = document.getElementsByTagName("tbody")[0];

    html += "<tr>";

    //计算总和 加载tbody
    var obj = arrData[arrData.length-1];
    var partSum = 0;
    for (var x in obj) {
        html += "<td>" + "￥" + (obj[x]).toFixed(2) + "</td>";
        partSum += Number(obj[x]);
    }
    sum += partSum;
    html += "</tr>"
    tbody.innerHTML = html;

    //计算平均值

    var average = sum / arrData.length;

    //修改tfoot的值
    var averLabel = document.getElementById("aver");
    var sumLabel = document.getElementById("sum");
    averLabel.textContent = "￥" + average.toFixed(2);
    sumLabel.textContent = "￥" + sum.toFixed(2);
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/

/**
 * 将每个输入框里的值添加至arrData对象里对应的数组里
 */
function pushData() {
    var obj = {};
    //inputs数组的长度
    var len = inputs.length;
    for (var i = 0; i < len; i++) {
        obj["data" + (i + 1)] = Number(inputs[i].value) || 0;
    }
    arrData.push(obj);
}

/**
 * 修改inputs数组元素的顺序和table的列表顺序一致
 * @return 返回修改顺序后的数组
 */
function reSort(arrInput){
    var inputs = Array.prototype.slice.call(arrInput);
    var arr = [];
    //克隆inputs数组
    var arr1 = inputs.slice(0);
    var arr2 = arr1.splice(3);
    var arr3 = arr2.splice(3);
    for(var i = 0; i < arr1.length; i++){
        arr.push(arr1[i], arr2[i], arr3[i]);
    }
    return arr;
}
