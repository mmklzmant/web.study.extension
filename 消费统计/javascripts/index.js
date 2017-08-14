/**
 * 功能：消费数据
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-14
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var objLabel = {
    eating: document.getElementById("eating"),
    traffic: document.getElementById("traffic"),
    insurance: document.getElementById("insurance"),
    shopping: document.getElementById("shopping"),
    entertainment: document.getElementById("entertainment"),
    medical: document.getElementById("medical"),
    life: document.getElementById("life"),
    humanity: document.getElementById("humanity"),
    other: document.getElementById("other")
}
var arrData = {
    eating: [],
    traffic: [],
    insurance: [],
    shopping: [],
    entertainment: [],
    medical: [],
    life: [],
    humanity: [],
    other: []
}

var addBtn = document.getElementById("add");
var html = "";
addBtn.addEventListener("click", function() {
    //将数据添加至数组
    pushData();

    var tbody = document.getElementsByTagName("tbody")[0];
    html += "<tr>";

    //计算总和 加载tbody
    var sum = 0;
    var len = arrData[Object.keys(arrData)[0]].length;
    for (x in arrData) {
        sum += arrData[x].reduce(function(e1, e2) {
            return e1 + e2;
        });
        html += "<td>" + "￥" + parseFloat(arrData[x][len - 1]).toFixed(2) + "</td>";
    }
    html += "</tr>"
    tbody.innerHTML = html;

    //计算平均值

    var average = sum / len;
    console.log(average);


    //修改tfoot的值
    var averLabel = document.getElementById("aver");
    var sumLabel = document.getElementById("sum");
    averLabel.textContent = "￥" + average.toFixed(2);
    sumLabel.textContent = "￥" + parseFloat(sum).toFixed(2);
});

/*************************************************/
/* 函数调用部分 */
/*************************************************/

/**
 * 将每个输入框里的值添加至arrData对象里对应的数组里
 */
function pushData() {
    arrData.eating.push(parseInt(objLabel.eating.value) || 0);
    arrData.traffic.push(parseInt(objLabel.traffic.value) || 0);
    arrData.insurance.push(parseInt(objLabel.insurance.value) || 0);
    arrData.shopping.push(parseInt(objLabel.shopping.value) || 0);
    arrData.entertainment.push(parseInt(objLabel.entertainment.value) || 0);
    arrData.medical.push(parseInt(objLabel.medical.value) || 0);
    arrData.life.push(parseInt(objLabel.life.value) || 0);
    arrData.humanity.push(parseInt(objLabel.humanity.value) || 0);
    arrData.other.push(parseInt(objLabel.other.value) || 0);
}

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/