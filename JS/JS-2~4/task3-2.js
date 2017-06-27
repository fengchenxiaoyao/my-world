/**
 * Created by fq on 2017/6/14 0014.
 */
//获取上个页面all数组的值
var all = sessionStorage.getItem("play");
all = JSON.parse(all);
//用for循环函数将所有的box显示出来，player+=''可以将对象都给串起来
var player="";
for (var a = 0; a < all.length; a++){
    player+='<div class="main-box">'+'<div class="main-box-top">'+' <p>'+all[a]+'</p>'
    +'<div class="main-box-bottom">'+(a+1)+'号</div>'+'</div>'+'</div>'
}
//将写的HTML部分添加入main中
document.getElementById("main").innerHTML=player;
//跳转到下一个任务页
function nextPage(){
    window.location.href="task4-1.html";
}