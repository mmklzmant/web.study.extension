/**
 * 功能：欢迎页面
 * @authors mmklzmant (mmklzmant@163.com)
 * @date    2017-08-24 18:15:27
 */

var nickname = document.getElementById("nickname");
console.log(nickname);
nickname.textContent = localStorage.getItem("nickname");