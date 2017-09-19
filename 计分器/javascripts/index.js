/**
 * 功能：计分器
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-09 10:01:13
 */

/*************************************************/
/* 页面加载完成之后执行的功能 (函数目录) */
/*************************************************/
window.onload = function() {
    //题数
    var subNum = document.getElementById("subNum");
    //总分
    var originScore = document.getElementById("originScore");
    //控制输入框父容器的显示
    var parent = document.getElementById("form").children[1];
    // 单个题目的最高分
    var maxScore = document.getElementById("maxScore");

    //为确定按钮绑定事件
    document.getElementById("sure").onclick = function(){

        var sub = Number(subNum.value);
        var score = Number(originScore.value);
        var maxScoreVal = Number(maxScore.value);

        if(sub !== 0 || score !== 0)
        {
            //new一个SumInput对象
            var sumInput = new SumInput();
            //调用sumInput对象init方法加载指定个数的input标签
            sumInput.init(sub, score, maxScoreVal);
            //显示
            parent.classList.add("show");
            //执行相应的函数功能
            sumInput.excute();
        }
        else{
            alert("请输入正确题数和总分！！！");
        }
    }
    
}


/*************************************************/
/* 功能函数及方法定义部分 */
/*************************************************/
/**
 * 功能：SumInput对象
 */
function SumInput() {
    //输入框父容器
    this.inputContainer = document.getElementsByClassName("input")[0];
    //重置按钮
    this.resetBtn = document.getElementById("reset");
    //计算按钮
    this.sumBtn = document.getElementById("sum");
    //分数显示
    this.scoreShow = document.getElementById("score");
    //输入框
    this.inputs = document.getElementsByName("input");
    //自身
    var self = this;

    /**
     * 功能：加载指定个数的input标签
     * @param  Number n input标签个数
     * @param  Number score 总分
     * @param  Number maxScore 单个题目的最高分
     */
    this.init = function(n, score, maxScore) {
        //input输入框的个数
        this.count = n;
        this.totalScore = score;
        this.maxScore = maxScore;

        var htmlStr = "";
        for (var i = 0; i < n; i++) {
            htmlStr += '<p>' +
                '<input type="text" name="input">' +
                '<label>' + (i + 1) + '.' + '</label>' +
                '</p>'
        }
        this.inputContainer.innerHTML = htmlStr;
        document.getElementById("score").textContent = this.totalScore;
    }
    /**
     * 功能：执行相应的功能函数
     */
    this.excute = function() {
        //input输入框失去焦点
        this.inputBlur();
        //重置按钮绑定事件
        this.resetClick();
        //计算按钮点击事件
        this.sumClick();
        //键盘输入事件
        this.keyPress();
    }
    
    /**
     * 功能：输入框失去焦点事件
     */
    this.inputBlur = function()
    {
        var inputs = document.getElementsByName("input");
        for(let i = 0; i < this.count; i++)
        {
            inputs[i].onblur = function()
            {
                if(Number(this.value) > 10)
                {

                    alert("请重新输入,输入的值不能大于" + self.maxScore);
                    this.value = "";
                    this.focus();
                }
            }
        }
    }
    /**
     * 功能：键盘输入相应的值时执行相应的功能
     */
    this.keyPress = function() {
        document.onkeyup = function(e) {
            switch(e.keyCode)
            {
                case 37:
                    self.leftKey();
                    break;
                case 39:
                    self.rightKey();
                    break;
                case 32:
                    self.spaceKey();
                    break;
                case 13:
                    self.enterKey();
                    break;
                default: 
                    // self.dealData(e.keyCode);
                    break;
            }
        }
    }
    /**
     * 功能：重置按钮点击事件
     */
    this.resetClick = function()
    {
        this.resetBtn.onclick = function()
        {
            self.inputContainer.firstElementChild.firstElementChild.focus();
            self.scoreShow.textContent = self.totalScore;
        }
    }
    /**
     * 功能：计算按钮点击事件
     */
    this.sumClick = function()
    {
        this.sumBtn.onclick = function()
        {
            var sum = 0;
            for(var i = 0; i < self.count; i++)
            {
                if(Number(self.inputs[i].value) !== 0)
                {
                    sum += Number(self.inputs[i].value);
                }
            }
            self.scoreShow.textContent = self.totalScore - sum;
        }
    }
    /**
     * 功能：左方向键事件处理
     */
    this.leftKey = function(){
        var node = document.activeElement;
        if(node.tagName.toLowerCase() === "input")
        {
            try{
                node.parentElement.previousElementSibling.firstElementChild.focus();
            }
            catch(error)
            {
                console.error("错误信息：" + error);
            }
        }
    }
    /**
     * 功能：右方向键事件处理
     */
    this.rightKey = function(){
        var node = document.activeElement;
        if(node.tagName.toLowerCase() === "input")
        {
            try{
                node.parentElement.nextElementSibling.firstElementChild.focus();
            }
            catch(error)
            {
                console.error("错误信息：" + error);
            }
        }
    }
    /**
     * 功能：空格键事件处理
     */
    this.spaceKey = function(){
        this.resetBtn.click();
    }
    /**
     * 功能：回车键事件处理
     */
    this.enterKey = function(){
        var node = document.activeElement;
        if(node.tagName.toLowerCase() === "input")
        {
            node.onblur();
        }
        this.sumBtn.onclick();
    }
    /**
     * 功能：当输入的数据值大于5时则处理为输入数值5
     */
    this.dealData = function(keyCode){
        var node = document.activeElement;
        if(keyCode > 53 && keyCode < 58)
        {
            node.value = this.maxScore;
        }
    }
}

