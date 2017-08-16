/**
 * 功能：渲染性能优化
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-14 22:01:25
 */

var ndList = document.getElementById("list");
console.log(ndList);
//first
/*if (ndList) {
	for(var i = 0; i < 30000; i++){
		const ndItem = document.createElement("li");
		ndItem.innerText = i+1;
		ndList.appendChild(ndItem);
	}

	ndList.addEventListener("lick", function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.tagName === "LI"){
			alert(target.innerText);
		}
	})
}*/

//second
if (ndList) {
	const total = 30000;
	const batchSize = 4;//每次插入的节点数
	const batchCount = total/batchSize;//需批处理多少次
	let bacthDone = 0;//已经完成的批处理个数

	doAppend();

	function doAppend(){
		if (bacthDone < batchCount) {
			window.requestAnimationFrame(doLoad);
		}
	}

	function doLoad(){
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < batchSize; i++)
		{
			const ndItem = document.createElement("li");
			ndItem.innerText = (bacthDone * batchSize) + i + 1;
			fragment.appendChild(ndItem);
		}

		ndList.appendChild(fragment);
		bacthDone += 1;
		doAppend();
	}

	ndList.addEventListener("click", function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.tagName === "LI"){
			alert(target.innerText);
		}
	});
}