/**
 * 功能：测试
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-14 22:01:25
 */

var ndList = document.getElementById("list");
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
	var total = 30000;//总共加载的li
	var size = 4;//一次加载的次数
	var frequency = total/size;//分批的次数
	var done = 0; //加载完的批次数

	doAppend();

	function doAppend(){
		if(done < frequency)
		{
			window.requestAnimationFrame(doLoad);
		}
	}

	function doLoad(){
		var fragment = document.createDocumentFragment();
		for(var i = 0; i < size; i++){
			const ndItem = document.createElement("li");
			ndItem.innerText = (done * size) + i + 1;
			fragment.appendChild(ndItem);
		}

		ndList.appendChild(fragment);
		done += 1;
		doAppend();
	}

	ndList.addEventListener("click", function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.tagName === "LI"){
			alert(target.innerText);
		}
	})

}