
var m; //声明一个变量用来取数组下标

//接收本地存储数据
var day = JSON.parse(localStorage.getItem("day"));
var gamePlayer = JSON.parse(localStorage.getItem("gamePlayer"));
var x = JSON.parse(localStorage.getItem("x"));
console.log(x);
var y = JSON.parse(localStorage.getItem("y"));
console.log(y);
var vote = JSON.parse(localStorage.getItem("vote"));
console.log(vote);

// 将玩家状态变化了的数据展示在页面上
$(document).ready(function() {
    for (var i = 0; i < gamePlayer.length; i++) {
        var n = "<div class=\"degree\"> <div class=\"name\"><span class=\"vocation\">\
        水民</span></div><div class=\"ordinal\"><span class=\"name_number\">1号</span></div> </div>";
        $("#main").append(n);
        var a = document.getElementsByClassName("name_number");
        var b = document.getElementsByClassName("vocation");
        var c = document.getElementsByClassName("name");
        a[i].innerHTML = (i + 1) + "号";
        b[i].innerHTML = gamePlayer[i].role;
        //将被杀死和被投死的玩家展示在页面上
        if(gamePlayer[i].live === "death" || gamePlayer[i].live === "throw") {
            $(c[i]).css("background", "#a1a1a1");
        }
    }
    //添加点击事件，使被点击元素发生颜色变化
    var degree = $(".degree");
    degree.click(function () {
        $(".degree").css("background-color", "#f5c97b"); //当选择另一个玩家时重置上一个被选择的玩家的颜色
        m = $(this).index() - 1; //获取当前元素的数组下标
        //限制不能选择已死亡的玩家
        if(gamePlayer[m].live === "death" || gamePlayer[m].live === "throw") {
            alertMsg("他已经死了");
            m = null; //用于点击了死亡玩家后清除下标
        }
        else {
            $(this).css("background-color", "#9932cc");  //选择活着的玩家使颜色变化
        }
    });
});

//限制未投票就点击确定，如果m=null或者undefined，说明未投死任何活着的玩家
$("#btn").click(function() {
    if(m === null || m === undefined) {
        alertMsg("请投票后再点确定");
    }
    else {
        window.location.href = "BRPG-decrypt.html";
        gamePlayer[m].live = "throw"; //改变被投死玩家的生死状态
        localStorage.setItem("gamePlayer", JSON.stringify(gamePlayer));
        day = day + 1; //一天的流程结束，天数+1
        localStorage.setItem("day", JSON.stringify(day));
        vote.push(gamePlayer[m]);
        localStorage.setItem("vote", JSON.stringify(vote));
        //如果是平民，则平民死亡人数+1
        if(gamePlayer[m].role === "平民") {
            x = x + 1;
            localStorage.setItem("x", JSON.stringify(x));
        }
        //如果是杀手,则杀手死亡人数+1
        else {
            y = y + 1;
            localStorage.setItem("y", JSON.stringify(y));
        }
        //判断游戏是否结束，当杀手剩余人数为0或者平民剩余人数小于或等于杀手人数时，游戏结束
        if(killer - y ===0 || (commoner - x) <= (killer - y)||(commoner - x)===0) {
            if(confirm("游戏已经结束，是否要去结果页面查看？")) {
                window.location.href = "BRPGresults-1.html";
            }
        }
    }
});
