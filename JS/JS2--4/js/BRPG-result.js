

//接收本地存储的数据
var killer = JSON.parse(localStorage.getItem("killer"));
var commoner = JSON.parse(localStorage.getItem("commoner"));
console.log(killer, commoner);
var x = JSON.parse(localStorage.getItem("x"));
console.log(x);
var y = JSON.parse(localStorage.getItem("y"));
console.log(y);
var death = JSON.parse(localStorage.getItem("death"));
console.log(death);
var vote = JSON.parse(localStorage.getItem("vote"));
console.log(vote);

//判断是平民还是杀手胜利
$(document).ready(function() {
   if(killer - y === 0) {
       $("#degree").text("平民胜利");
   }
   else if((commoner - x) <= (killer - y)) {
       $("#degree").text("杀手胜利");
   }
   $("#accent").text("杀　手" + killer + "人");
   $("#accent-1").text("平　民" + commoner + "人");
});

//将游戏过程展示在页面上
$(document).ready(function() {
    for(var i = 0; i < death.length; i++) {
        var n = "<div class=\"list\"><p class=\"data\">第1天</p>"
            + "<p class=\"letter\"></p>"
            + "<p class=\"fate\"></p></div>";
        $("#course").append(n);
        var a = $(".data");
        $(a[i]).text("第" + (i + 1) + "天");
    }
    for(var j = 0; j < death.length; j++) {
        var b = $(".letter");
        $(b[j]).text("晚上：" + death[j].num + "号被杀手杀死，" + death[j].num + "号是" + death[j].role);
    }
    for(var k = 0; k < vote.length; k++) {
        var m = $(".fate");
        $(m[k]).text("白天：" + vote[k].num + "号被全民投死，" + vote[k].num + "号是" + vote[k].role);
    }
});
// $('#btn').click(function () {
//     localStorage.clear();
//     sessionStorage.clear();
// })
