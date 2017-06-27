/**
 * Created by Administrator on 2017/6/17 0017.
 */
//获取上个页面all数组的值
var all = sessionStorage.getItem("play");
all = JSON.parse(all);

var player = "";
var f = 0;//设置变量控制被杀人数
var day = 1;
var gamePlayer = [];//创建一个数组，用来存放玩家的各种信息
var statePlayer = [];//声明一个变量用于存放变化了的玩家对象数组
var m; //声明一个变量用来取数组下标
var f = JSON.parse(localStorage.getItem("f")); //用于判断玩家对象数组是否变化
var visited = JSON.parse(sessionStorage.getItem("visited"));//判断是否杀过人
var x = JSON.parse(localStorage.getItem("x"));
var death = JSON.parse(localStorage.getItem("death"));
//创建杀手和平民的对象，赋值属性和值
$(document).ready(function () {
    for (var a = 0; a < all.length; a++) {//用for循环函数将所有的box显示出来，player+=''可以将对象都给串起来
        player += '<div class="main-box">' + '<div class="main-box-top">' + ' <p class="role">' + all[a] + '</p>'
            + '<div class="main-box-bottom">' + (a + 1) + '号</div>' + '</div>' + '</div>';
        gamePlayer[a] = {};
        gamePlayer[a].num = a + 1;//玩家的序号
        gamePlayer[a].live = "life";//玩家的生死状态，包括活着（life）、被杀死（killed）、被投死（voted）三种状态
        gamePlayer[a].role = all[a];//玩家当前身份
        //将写的HTML部分添加入main中

    }
    $('.body-top').append(player);
    if (f === 0) {//如果未杀过人，玩家生死状态就未变化，f初始值为0
        statePlayer = gamePlayer;//为0就取初始状态的玩家对象数组
    }
    else {//不为0就取本地存储的变化了的玩家对象数组
        statePlayer = json.parse(sessionStorage.getItem('statePlayer'));
    }
});
var roleColor = document.getElementsByClassName('role');
for (var k = 0; k < statePlayer.length; k++) {
    if (statePlayer[k].live === 'killer' || statePlayer[k].live === 'voted') {
        roleColor.style.background = "darkgray";
    }
}
//添加点击事件，是被点击元素发生颜色改变
$('.role').click(
    function () {
        $('.role').css('background-color', '#f5c97b');//当选择另一个玩家时重置上一个被选择的玩家颜色
        m = $(this).index() - 1;//获取玩家当前元素的数组下标
        //限制不能选择已死亡的玩家
        if (gamePlayer[m].live === 'killed' || gamePlayer[m] === 'voted') {
            alert('这么残忍还要再杀一次吗');
            m = null;//用于点击了死亡玩家后清除下标
        }
        //选择平民玩家时颜色发生变化
        else if (gamePlayer[m] === '平民') {
            $(this).css('background-color', 'darkgray');
        }
        else if (gamePlayer === '杀手') {
            alert('本是同根生，相煎何太急');
            m = null;//用于点击了杀手玩家后清除下标
        }
    }
);
//限制未杀人就点击确定，如果m=null，说明杀手未选择任何平民玩家
$('.footer-text').click(function () {
        if (m = null) {
            alert('官人，选一个再走嘛');
        }
        else {
            window.location.href = 'task4-1.html';//跳转至法官台本页面
            gamePlayer[m].live = 'killed';//改变玩家的生存状态
            sessionStorage.setItem('gamePlayer', JSON.stringify(gamePlayer));//存储玩家数组状态，留至后面备用
            visited = 1; //杀过人则visited=1，用于流程页面的判断使用,黑夜解密页面会重置为0
            localStorage.setItem("visited", JSON.stringify(visited));
            x = x + 1; //平民死亡人数+1
            localStorage.setItem("x", JSON.stringify(x));
            death.push(gamePlayer[m]);
            localStorage.setItem("death", JSON.stringify(death));
        }
    }
);