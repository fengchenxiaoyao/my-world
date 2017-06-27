
var btn = document.getElementById("btn");
var content = document.getElementById("content");

//接收本地存储数据
var gamePlayer = JSON.parse(localStorage.getItem("gamePlayer"));
console.log(gamePlayer);
var day = JSON.parse(localStorage.getItem("day"));
console.log(day);
var visited = JSON.parse(localStorage.getItem("visited"));
console.log(visited);

//将被杀死的人的信息展示出来
for (var i = 0; i < gamePlayer.length; i++) {
    if (gamePlayer[i].live === "death") {
        var a = document.createElement("p");
        var b = document.createTextNode((i + 1) + "号被杀手杀死，" + (i + 1) + "号是平民");
        a.appendChild(b);
        content.appendChild(a);
    }
    if (gamePlayer[i].live === "throw") {
        var c = document.createElement("p");
        var d = document.createTextNode((i + 1) + "号被全民投死，" + (i + 1) + "号是" + gamePlayer[i].role);
        c.appendChild(d);
        content.appendChild(c);
    }
}
//设置按钮的文本，提示接下来进入第几天
btn.innerHTML = "进入第" + day + "天";

//进入流程页
btn.onclick = function() {
    window.location.href = "BRPG-flow.html";
    visited = 0; //重置归0，用于流程页面判断，开始新的一天游戏流程
    localStorage.setItem("visited", JSON.stringify(visited));
    f = 1; //用于杀手杀人页面的判断，玩家状态变化，则f=1
    localStorage.setItem("f", JSON.stringify(f));
};
