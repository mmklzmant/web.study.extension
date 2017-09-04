/**
 * 功能：数据操作
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-21 21:36:08
 */

/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/

/**
 * attr1: childCkbox [Element] 复选框
 * attr2: allCk Element 全选框
 * attr3: length Number 子复选框的长度
 * attr4: isCkedBox [Element] 被选中的子复选框
 */
var checkboxObj = {};

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录)*/
/*************************************************/
window.onload = function() {
    // ==============================
    // 功能流程
    // ==============================
    //加载数据按钮事件
    bindLoadBtn();
    //删除选中事件
    bindDeleteBtn();

    // ==============================
    // 全局功能工具函数
    // ==============================
}

/*************************************************/
/* 功能函数及方法定义部分 (函数内容)*/
/*************************************************/
function bindLoadBtn() {
    var loadDataBtn = document.getElementById("loadData");
    loadDataBtn.addEventListener("click", function() {
        //加载数据
        loadData(goodsList);
        //排序事件
        sortEvent();
    }, false);
}

/**
 * 功能：加载动画
 */
function loadAnimation() {
    var ndLoadImg = document.getElementById("loadIcon");
    var ndLoad = document.getElementsByTagName("load")[0];
    ndLoad.style.zIndex = "10";
    ndLoad.style.opacity = "1";

    var deg = 60;
    var ident = setInterval(function() {
        ndLoadImg.style.transform = "translate(-50%, -50%) rotate(" + deg + "deg)";
        deg = deg + 60;
    }, 100);
    //500ms后关闭动画
    setTimeout(function() {
        clearInterval(ident);
        ndLoad.style.opacity = "0";
        ndLoad.style.zIndex = "-1";

    }, 500);

}
/**
 * 功能：加载数据
 */
function loadData(goods) {
    //加载动画
    loadAnimation();


    var tbodyNode = document.getElementsByTagName("tbody")[0];
    //数组长度
    var len = goods.length;

    tbodyNode.innerHTML = "";

    for (var i = 0; i < len; i++) {
        var goodsObj = goods[i];

        var trNode = document.createElement("tr");
        trNode.innerHTML = '<td><input type="checkbox" name="goods"></td>' +
            '<td>' + goodsObj.goodsId + '</td>' +
            '<td>' + goodsObj.name + '</td>' +
            '<td>' + goodsObj.produceDate.toLocaleDateString().replace(/\//g, "-") + '</td>' +
            '<td>' + goodsObj.buyDate.toLocaleDateString().replace(/\//g, "-") + '</td>' +
            '<td>' + (goodsObj.qualityPeriod + '年') + '</td>' +
            '<td>￥' + (goodsObj.price).toFixed(2) + '</td>' +
            '<td>' +
            '<span class="view">查看</span>' +
            '<span class="delete">删除</span>' +
            '</td>';
        tbodyNode.appendChild(trNode);
    }
    //子选框
    var childCkbox = document.getElementsByName("goods");
    //改变全选框的状态
    var allCk = document.getElementById("allCk");
    allCk.style.cursor = "pointer";
    allCk.removeAttribute("disabled");

    //将复选框存取到全局变量checkboxObj
    checkboxObj.childCkbox = childCkbox;
    checkboxObj.allCk = allCk;
    checkboxObj.length = childCkbox.length;

    //复选框事件绑定
    ckBoxEvent();

    //删除单条数据事件
    delSingleDataEvent();
}

/**
 * 功能：复选框事件
 */
function ckBoxEvent() {
    //全选框事件
    allCkEvent();

    //子选框事件
    childCkEvent();
}

/**
 * 功能：删除单条数据事件
 */
function delSingleDataEvent() {
    //弹出框容器
    var component = document.getElementsByTagName("component")[0];
    //获取所有的删除节点
    var ndDel = document.getElementsByClassName("delete"),
        ndDel_len = ndDel.length;
    for (var i = 0; i < ndDel_len; i++) {
        ndDel[i].onclick = function() {
            //设置对应的input标签的checked值
            var ndInput = this.parentElement.parentElement.firstElementChild.firstElementChild;
            ndInput.checked = true;

            //获取当前被选中的checkbox，并把它赋值给全局变量
            checkboxObj.isCkedBox = [ndInput];

            //弹出框
            createBox({
                type: "operateSure",
                title: "你确认要删除选中的数据吗？",
                cancel: function() {
                    component.style.zIndex = "-1";
                },
                confirm: function() {
                    component.style.zIndex = "-1";

                    //删除数据
                    deleteData(checkboxObj.isCkedBox);
                }
            });
        }
    }
}
/**
 * 功能：删除选中事件
 */
function bindDeleteBtn() {
    var component = document.getElementsByTagName("component")[0];
    var deleteBtn = document.getElementById("deleteBtn");

    deleteBtn.onclick = function() {
        //弹出框
        createBox({
            type: "operateSure",
            title: "你确认要删除选中的数据吗？",
            cancel: function() {
                component.style.zIndex = "-1";
            },
            confirm: function() {
                component.style.zIndex = "-1";
                //获取被选中的checkbox
                var isCkedBox = getIsCkedBox();
                //将被选中的checkBox存取到全局变量checkboxObj中
                 checkboxObj.isCkedBox = isCkedBox;
                //删除数据
                deleteData(checkboxObj.isCkedBox);
            }
        });
    }
}

//排序事件
function sortEvent() {
    //获取排序的箭头标签
    var ndArrow = document.getElementsByClassName("arrow"),
        ndArrow_len = ndArrow.length;

    //为每个箭头标签绑定事件
    for (var i = 0; i < ndArrow_len; i++) {
        ndArrow[i].onclick = function() {
            //设置其他箭头标签样式
            setOtherArrowStyle(this);

            //如果当前标签方向向上
            if (this.className === "arrow up") {
                this.className = "arrow down";
                //降序排序
                desSort(this);
            } else {
                this.className = "arrow up";
                //升序排列
                ascSort(this);
            }
        }
    }

}

/**
 * 功能：全选框事件
 */
function allCkEvent() {
    allCk.onchange = function() {
        //全选框状态
        var state = this.checked === true;

        for (var i = 0; i < checkboxObj.length; i++) {
            if (state) {
                checkboxObj.childCkbox[i].checked = true;
            } else {
                checkboxObj.childCkbox[i].checked = false;
            }
        }
        if (state) {
            //获取没有被选中的checkbox
            var isCkedBox = getIsCkedBox();
            //将被选中的checkBox存取到全局变量checkboxObj中
            checkboxObj.isCkedBox = isCkedBox;
        }
    }
}

/**
 * 功能：子选框事件
 */
function childCkEvent() {
    //子选框选中状态改变事件
    for (var i = 0; i < checkboxObj.length; i++) {
        checkboxObj.childCkbox[i].onchange = function() {
            //获取被选中的checkbox
            var isCkedBox = getIsCkedBox();
            //获取被选中的长度
            var ckedLength = isCkedBox.length;
            //将被选中的checkBox存取到全局变量checkboxObj中
            checkboxObj.isCkedBox = isCkedBox;

            //全部选中
            if (ckedLength === checkboxObj.length) {
                checkboxObj.allCk.indeterminate = false;
                checkboxObj.allCk.checked = true;
            }
            //全部没选中
            else if (ckedLength === 0) {
                checkboxObj.allCk.indeterminate = false;
                checkboxObj.allCk.checked = false;
            } else {
                checkboxObj.allCk.indeterminate = true;
            }
        }
    }
}

/**
 * 功能：得到被选中的子选框
 *@return array 返回被选中的子选框
 */
function getIsCkedBox() {
    var childCkbox = document.getElementsByName("goods");
    var childCkbox_len = childCkbox.length;
    var arr = [];

    for (var i = 0; i < childCkbox_len; i++) {
        if (childCkbox[i].checked === true) {
            arr.push(childCkbox[i]);
        }
    }
    return arr;
}

/**
 * 功能：删除数据
 */
function deleteData(isCkedBox) {
    if (isCkedBox) {
        if (isCkedBox.length !== 0) {
            //删除显示的表格数据
            var noCkedLen = isCkedBox.length;
            for (var i = 0; i < noCkedLen; i++) {
                isCkedBox[i].parentElement.parentElement.remove();
            }
            //删除后台数据

        }
    }
    //改变全选框的状态
    changeAllCkStatus();
}

/**
 * 功能：删除完成后改变全选框的状态
 */
function changeAllCkStatus() {
    var allCk = document.getElementById("allCk");
    allCk.indeterminate = false;

    var tbody = document.getElementsByTagName("tbody")[0];
    if (tbody.children.length === 0) {
        allCk.checked = false;
        allCk.style.cursor = "not-allowed";
        allCk.setAttribute("disabled", "disabled");
    }
}

/**
 * 功能：升序排列
 */
function ascSort(node) {
    var str = node.parentElement.textContent;

    switch (str) {
        case "货号":
            sortByGoodsId(true);
            break;
        case "生产日期":
            sortByProduceDate(true);
            break;
        case "进货日期":
            sortByBuyDate(true);
            break;
        case "售价":
            sortByPrice(true);
            break;
        default:
            break;
    }
}

/**
 * 功能：降序排列
 */
function desSort(node) {
    var str = node.parentElement.textContent;

    switch (str) {
        case "货号":
            sortByGoodsId(false);
            break;
        case "生产日期":
            sortByProduceDate(false);
            break;
        case "进货日期":
            sortByBuyDate(false);
            break;
        case "售价":
            sortByPrice(false);
            break;
        default:
            break;
    }
}

/**
 * 功能：按货号进行排序
 * @param boolean flag 如果为true是升序排列, 否则为降序排列
 */
function sortByGoodsId(flag) {
    var tempList = goodsList.slice(0);
    //升序排列
    if (flag) {
        tempList.sort(function(e1, e2) {
            return Number(e1.goodsId.slice(5)) - Number(e2.goodsId.slice(5));
        });
        loadData(tempList);
    }
    //降序排列
    else {
        tempList.sort(function(e1, e2) {
            return Number(e2.goodsId.slice(5)) - Number(e1.goodsId.slice(5));
        });
        loadData(tempList);
    }
}

/**
 * 功能：按生产日期进行排序
 * @param boolean flag 如果为true是升序排列, 否则为降序排列
 */
function sortByProduceDate(flag) {
    var tempList = goodsList.slice(0);
    //升序排列
    if (flag) {
        tempList.sort(function(e1, e2) {
            return e1.produceDate - e2.produceDate;
        });
        loadData(tempList);
    }
    //降序排列
    else {
        tempList.sort(function(e1, e2) {
            return e2.produceDate - e1.produceDate;
        });
        loadData(tempList);
    }
}

/**
 * 功能：按进货日期进行排序
 * @param boolean flag 如果为true是升序排列, 否则为降序排列
 */
function sortByBuyDate(flag) {
    var tempList = goodsList.slice(0);
    //升序排列
    if (flag) {
        tempList.sort(function(e1, e2) {
            return e1.buyDate - e2.buyDate;
        });
        loadData(tempList);
    }
    //降序排列
    else {
        tempList.sort(function(e1, e2) {
            return e2.buyDate - e1.buyDate;
        });
        loadData(tempList);
    }
}

/**
 * 功能：按售价进行排序
 * @param boolean flag 如果为true是升序排列, 否则为降序排列
 */
function sortByPrice(flag) {
    var tempList = goodsList.slice(0);
    //升序排列
    if (flag) {
        tempList.sort(function(e1, e2) {
            return e1.price - e2.price;
        });
        loadData(tempList);
    }
    //降序排列
    else {
        tempList.sort(function(e1, e2) {
            return e2.price - e1.price;
        });
        loadData(tempList);
    }
}
/**
 * 功能：设置其他箭头标签样式
 */
function setOtherArrowStyle(node) {
    //获取排序的箭头标签
    var ndArrow = document.getElementsByClassName("arrow"),
        ndArrow_len = ndArrow.length;
    for (var i = 0; i < ndArrow_len; i++) {
        if (ndArrow[i] !== node) {
            ndArrow[i].className = "arrow";
        }
    }
}