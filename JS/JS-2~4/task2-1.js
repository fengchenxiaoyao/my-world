/**
 * Created by fq on 2017/6/7 0007.
 */
//获取输入框和滑动条的值
var num = document.getElementById("num");//全局变量
var range = document.getElementById("range");

var all = [];
var player = '';
//num.value=range.value;
function rangeChange() {


    num.value = range.value;//将滑动条的值赋给输入框
    //range.value = num.value;

}
//rangeChange();
//var minus = document.getElementById("minus");
//var plus = document.getElementById("plus");
function numChange() {

    if (num.value < 6) {
        num.value = 6;
        range.value=num.value;
        alert("人数超出范围,不能进行游戏哦")
    }
    else if (num.value > 18) {
        num.value = 18;
        range.value=num.value;
        alert("人数超出范围,不能进行游戏哦")
    }
    else {
        range.value = num.value;
    }
}
//为减号按钮设置函数，并让输入框的值随着滑动条的值而改变�
function del() {

    if (range.value > 6) {
        range.value--;
    }
    else if (range.value = 6) {

        alert("人数少于6人，不能开始游戏哦");
        range.value = 6
    }
    rangeChange()
}
//为加号按钮设置函数
function add() {

    if (range.value < 18) {
        range.value++;
    }
    else if (range.value = 18) {
        range.value = 18;
        alert("人数大于18人，不能开始游戏哦");
    }
    rangeChange()
}
//为点击设置按钮设置函数，使点击时将"list"中的内容显示在HTML中
function setBtn() {
    var num = document.getElementById("num");
    var list = document.getElementById("list");
    var z = num.value;
    var killer = [];
    var people = [];
    //清空list中的内容
    list.innerHTML = "";
    //设置num.value不同范围中killer数组的长度
    if (z >= 6 && z <= 8) {
        killer.length = 1;
    }
    else if (z >= 9 && z <= 11) {
        killer.length = 2;
    }
    else if (z >= 12 && z <= 14) {
        killer.length = 3;
    }
    else if (z >= 15 && z <= 18) {
        killer.length = 4;
    }
    else {
        alert("人数超出范围,不能进行游戏哦");

    }

    //设置平民数组的长度
    people.length = z - killer.length;
    //为数组killer和people填充元素
    for (var i = 0; i < killer.length; i++) {//不能在<号后面加=号，否则会变成死循环，成为一段病毒！！！！！！！！！！！！！！！！
        killer[i] = "杀手";
    }
    for (var j = 0; j <people.length; j++) {
        people[j] = "平民";
    }
    //console.log(people);
    all = killer.concat(people);
    //console.log(people);
    //console.log("++++++++++++++++++all++++++++++++"+all);
    //添加洗牌算法，随机打乱all数组
    function shuffle(all) {
        var m = all.length;
        console.log(all);
        var t;
        var b;
        while (m) {
            b = Math.floor(Math.random() * m--);
            t = all[m];
            all[m] = all[b];
            all[b] = t;
        }
        return all;
    }

    //一定记得调用函数
    shuffle(all);
    //player="";
    //for (var a = 0; a < all.length; a++) {
    //
    //    //将打乱的数组输出至"list"中
    //    if (all[a] == '杀手') {
    //        player += "<li><span></span>" + (a + 1) + "号" + "&nbsp;&nbsp;" + all[a] + "</li>";
    //    } else {
    //        player += "<li><i></i>" + (a + 1) + "号" + "&nbsp;&nbsp;" + all[a] + "</li>";
    //    }
    //
    //    list.innerHTML = player;
    //}
    player = '';
    player = "<li><span></span>" + "杀手" + killer.length + "人" + "</li>" + "<li><i></i>" + "平民" + people.length + "人" + "</li>";
    list.innerHTML = player;
    //function next(){
    //    if(player!=null){
    //        window.location.href = "#";
    //    }
    //    else{
    //        alert("请点击设置身份哦")
    //    }
    //}
    console.log(player);
    //storage=window.sessionStorage;
    //storage.all=all;
    //console.log(storage.all);
    all=JSON.stringify(all);
    sessionStorage.setItem("play",all);
    //localStorage.setItem("play",all)
}
function next() {

    //console.log(all);
    //console.log(typeof player);
    if (player == "") {
        alert("请点击设置身份哦")
    }
    else {
        window.location.href = "task3-1.html";
    }
    //if(all==null){
    //    alert("23333");
    //}
    //else {window.location.href = "#";}
}
//}
