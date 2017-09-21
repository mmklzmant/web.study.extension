/**
 * 功能：
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */


/*************************************************/
/* 全局变量、对象定义部分 */
/*************************************************/
var objs = [];//存储数据对象



/*************************************************/
/* 函数调用部分 */
/*************************************************/
$(function(){
	// 主页添加备忘录按钮事件
	$("#mainAdd").click(function(){
		$("#saveBtn").attr("disabled", true);
		console.log("com");
		$(".edit").css("left", "0");
	});
	// 编辑页保存按钮
	$("#saveBtn").click(function(){
		//获取文本
		var text = $("#textArea").val();
		//获取日期，并处理格式
		var date = new Date();
		var dateTime =  date.toLocaleTimeString();
		var time = date.toLocaleDateString().replace(/\//g, "-") + " " + date.getHours() + 
				   dateTime.slice(dateTime.indexOf(":"));
		//添加备忘录列表
		addList(text, time);
	});
	// 编辑页返回按钮
	$("#backBtn").click(function(){
		$(".edit").css("left", "100%");
		$("#textArea").val("");
	});
});

/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
function addList(content, time)
{
	if(content !== "")
	{
		//返回主页
		$(".edit").css("left", "100%");
		$("#textArea").val("");
		//改变主页编辑按钮状态
		$("button:disabled").removeAttr("disabled");
		// 添加到列表
		$("#list").append(`
			<li>
        		<div>
        				<i>√</i>
        			</div>
        			<div>
        				<p>${content}</p>
        				<p>${time}</p>
        			</div>
        		</li> 
		`);
		// 存储到本地
		// objs[0].content = content;
		var obj = {};
		obj.content = content;
		obj.time = time;
		objs.push(obj);
		localStorage.setItem("list", JSON.stringify(objs));
	}
}
