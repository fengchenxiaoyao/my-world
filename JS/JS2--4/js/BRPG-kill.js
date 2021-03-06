
var m; //声明一个变量用来取数组下标
var gameplayer = []; //创建一个空数组，用于后面创建初始的玩家对象数组
var gamePlayer;  //声明一个变量用于存放变化了的玩家对象数组，与初始数组比只是P大小写不一样

//接收本地存储数据
var f = JSON.parse(localStorage.getItem("f")); //用于判断玩家对象数组是否变化
var visited = JSON.parse(sessionStorage.getItem("visited"));//判断是否杀过人
var impress = JSON.parse(localStorage.getItem("arr"));//玩家分配页面的数据
var x = JSON.parse(localStorage.getItem("x"));//平民已死亡的人数
// console.log(x);
var death = JSON.parse(localStorage.getItem("death"));
// console.log(death);

//创建杀手和平民的对象数组
for (var j = 0; j < impress.length; j++) {
    if (impress[j] === "平民") {
        gameplayer[j] = { };
        gameplayer[j].num = j + 1; //玩家的序号
        gameplayer[j].live = "life"; //玩家的生死状态，包括活着（life）、被杀死（death）、被投死（throw）三种状态
        gameplayer[j].role = "平民"; //玩家当前的身份
    }
    else if (impress[j] === "杀手") {
        gameplayer[j] = { };
        gameplayer[j].num = j + 1;
        gameplayer[j].live = "life";
        gameplayer[j].role = "杀手";
    }
}

// 将玩家分配页面保存的数据展示在页面上
$(document).ready(function() {
    for (var i = 0; i < gameplayer.length; i++) {
        var n = "<div class=\"degree\"> <div class=\"name\"><span class=\"vocation\">\
        水民</span></div><div class=\"ordinal\"><span class=\"name_number\">1号</span></div> </div>";
        $("#main").append(n);
        var a = document.getElementsByClassName("name_number");
        var b = document.getElementsByClassName("vocation");
        var c = document.getElementsByClassName("name");
        a[i].innerHTML = (i + 1) + "号";
        b[i].innerHTML = gameplayer[i].role;
        //如果未杀过人，玩家生死状态就未变化，f初始值为0
        if(f === 0) {
            gamePlayer = gameplayer; //为0就取初始状态的玩家对象数组
        }
        else {
            gamePlayer = JSON.parse(localStorage.getItem("gamePlayer")); //不为0就取本地存储的变化了的玩家对象数组
        }
        //将被杀死和被投死的玩家展示在页面上
        if(gamePlayer[i].live === "death" || gamePlayer[i].live === "throw") {
            $(c[i]).css("background", "#a1a1a1");
        }
    }

    //添加点击事件，使被点击元素发生颜色变化
    var degree = $(".degree");
    var name=$('.name')
    degree.click(function () {
        $(".degree").css("background-color", "#f5c97b"); //当选择另一个玩家时重置上一个被选择的玩家的颜色
        m = $(this).index() - 1; //获取当前元素的数组下标
        //限制不能选择已死亡的玩家
        if(gamePlayer[m].live === "death" || gamePlayer[m].live === "throw") {
            alertMsg("是要鞭尸吗");
            m = null; //用于点击了死亡玩家后清除下标
        }
        //选择平民玩家使颜色变化
        else if (gamePlayer[m].role === "平民") {
            $(this).css("background-color", "blue");
            console.log(this)
        }
        //限制杀手不能自杀
        else if (gamePlayer[m].role === "杀手") {
            alertMsg("本是同根生，相煎何太急");
            m = null; //用于点击了杀手玩家后清除下标
        }
    });

    //限制未杀人就点击确定，如果m=null或者undefined，说明未杀死任何平民玩家
    $("#btn").click(function() {
        if(m === null || m === undefined) {
            alertMsg("官人，选一个再走嘛");
        }
        else {
            window.location.href = "BRPG-flow.html";
            gamePlayer[m].live = "death"; //改变被选择玩家的生死状态
            localStorage.setItem("gamePlayer", JSON.stringify(gamePlayer));
            visited = 1; //杀过人则visited=1，用于流程页面的判断使用,黑夜解密页面会重置为0
            localStorage.setItem("visited", JSON.stringify(visited));
            x = x + 1; //平民死亡人数+1
            localStorage.setItem("x", JSON.stringify(x));
            death.push(gamePlayer[m]);
            localStorage.setItem("death", JSON.stringify(death));
        }
        //判断游戏是否结束，当杀手剩余人数为0或者平民剩余人数小于或等于杀手人数时，游戏结束
        if(killer - y ===0 || (commoner - x) <= (killer - y)||(commoner - x)===0) {
            if(confirm("游戏已经结束，是否要去结果页面查看？")) {
                window.location.href = "BRPGresults-1.html";
            }
        }
    });
});

