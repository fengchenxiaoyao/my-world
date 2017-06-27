/**
 * Created by fq on 2017/6/2 0001.
 */
var num1;
var num2;
var num3;
var box = document.getElementsByClassName("box");
function randomNum() {
    //随机生成0-8九个整数
    num1 = Math.floor(Math.random() * 9);
    num2 = Math.floor(Math.random() * 9);
    num3 = Math.floor(Math.random() * 9);
    //去除三个数任意相等的情况
    if (num1 == num2 || num1 == num3 || num2 == num3) {
        randomNum()
    }
}
function start() {
//遍历box数组，初始背景色
//    var box=new Array(9);
    for (var i = 0; i < box.length; i++) {
        box[i].style.background = "orange"
    }
    //建一个color的数组
    var color = new Array(3);
    for (var j = 0; j < color.length; j++) {
        color[j] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }//16进制颜色，16的6次方，最大值16777215
    //获取随机颜色（原来的笨方法）
    //var a = Math.floor(Math.random() * 255);
    //b = Math.floor(Math.random() * 255);
    //c = Math.floor(Math.random() * 255);
    //var d = Math.floor(Math.random() * 255);
    //e = Math.floor(Math.random() * 255);
    //f = Math.floor(Math.random() * 255);
    //var g = Math.floor(Math.random() * 255);
    //h = Math.floor(Math.random() * 255);
    //z = Math.floor(Math.random() * 255);
    //
    //color[0] = "rgb("+a+","+b+","+c+")";
    //color[1] = "rgb("+e+","+f+","+d+")";
    //color[2] = "rgb("+g+","+h+","+z+")";
    //console.log("rgb(" + a + "," + b + "," + c + ")");
    randomNum();
    //将取到的随机颜色赋值给格子
    box[num1].style.background = color[0];
    box[num2].style.background = color[1];
    box[num3].style.background = color[2];
    run()
}
var x;
function run() {
    clearInterval(x);//清除定时器效果
    x = setInterval(
        //每1000ms执行一次start函数
        function set() {
            start();
        }, 1000
    );
    //console.log("星期一");
}
function stop(){
    clearInterval(x);
    //重置原始颜色
    for (var i = 0; i < box.length; i++) {
        box[i].style.background = "orange"
    }
}