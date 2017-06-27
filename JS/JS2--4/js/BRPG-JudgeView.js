

var impress = JSON.parse(localStorage.getItem("arr"));
console.log(impress);
var day = 0;
var x = 0; //用于记录被杀死的平民的人数
localStorage.setItem("x", JSON.stringify(x));
var y = 0; //用于记录被杀死的杀手的人数
localStorage.setItem("y", JSON.stringify(y));
var death = []; //用于后面存放被杀死的平民
localStorage.setItem("death", JSON.stringify(death));
var vote = []; //用于后面存放被投死的玩家
localStorage.setItem("vote", JSON.stringify(vote));

$(document).ready(function() {
    for (var i = 0; i < impress.length; i++) {
        var n = "<div class=\"degree\"> <div class=\"name\"><span class=\"vocation\">\
        水民</span></div><div class=\"ordinal\"><span class=\"name_number\">1号</span></div> </div>";
        $("#main").append(n);
        var a = document.getElementsByClassName("name_number");
        var b = document.getElementsByClassName("vocation");
        a[i].innerHTML = (i + 1) + "号";
        b[i].innerHTML = impress[i];
    }
});

day = day + 1;
localStorage.setItem("day", JSON.stringify(day));
var visited = 0;
localStorage.setItem("visited", JSON.stringify(visited));
var f = 0;
localStorage.setItem("f", JSON.stringify(f));
