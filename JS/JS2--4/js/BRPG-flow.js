

//接收本地存储数据
var kill = document.getElementById("kill");
var p = 0;//用来判断点击流程
day = JSON.parse(localStorage.getItem("day")); //记录天数
var gamePlayer = JSON.parse(localStorage.getItem("gamePlayer"));//玩家对象数组
var visited = JSON.parse(localStorage.getItem("visited"));//用于判断是否已杀过人
var killer = JSON.parse(localStorage.getItem("killer")); //杀手的人数
var commoner = JSON.parse(localStorage.getItem("commoner")); //平民的人数
var x = JSON.parse(localStorage.getItem("x")); //平民已死亡的人数
var y = JSON.parse(localStorage.getItem("y")); //杀手已死亡的人数

//杀手晚上杀人
$(document).ready(function() {
    if(visited === 1) {
        $("#kill").css("color", "#a1a1a1"); //visited=1代表杀过人，杀手杀人按钮颜色变化
    }
    $(kill).click(function() {
        if(visited === 1) {
            alertMsg("今天你已经杀过人了"); //杀过人不能进去杀第二次
        }
        else {
            location.href = "BRPG-kill.html";
            $(this).css("color", "#a1a1a1");
        }
    });
});
$('.day').click(function () {
    $('.content').slideToggle(1000);
})
//展示进行到第几天，day初始值为1
$(document).ready(function() {
    if (day === 1) {
        $("#day").text("第1天");
    }
    else {
        $("#day").text("第" + day + "天");
    }
});

//亡灵发言，visited=1代表已经完成了杀手晚上杀人流程，则可以发表遗言
$(document).ready(function() {
    $("#death").click(function () {
        if(visited === 1) {
            alertMsg("请发表遗言");
            $("#death").css("color", "#a1a1a1");
            p = 1;
        }
        else if(visited === 0) {
            alertMsg("请按流程点击");
        }
    });
});
//玩家发言，visited=1代表已经完成了杀手晚上杀人流程，则可以发言
$(document).ready(function() {
    $("#player").click(function() {
        if(visited === 1 && p === 1) {
            alertMsg("请依序发言");
            $("#player").css("color", "#a1a1a1");
            p = 2;
        }
        else if(visited === 0 || p === 0) {
            alertMsg("请按流程点击");
        }
    });
});

//投票，只有完成杀人流程后才能进入投票页面
$(document).ready(function() {
    $("#vote").click(function() {
        if(visited === 1 && p === 2) {
            window.location.href = "BRPG-vote.html";
        }
        else if(visited === 0 || p === 0 || p === 1) {
            alertMsg("请按流程点击");
        }
    });
});

//判断游戏是否结束，当杀手剩余人数为0或者平民剩余人数小于或等于杀手人数时，游戏结束
if(killer - y ===0 || (commoner - x) <= (killer - y)) {
    if(confirm("游戏已经结束，是否要去结果页面查看？")) {
        window.location.href = "BRPGresults-1.html";
    }
}
