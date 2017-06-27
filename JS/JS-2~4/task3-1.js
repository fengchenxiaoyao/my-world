/**
 * Created by fq on 2017/6/12 0012.
 */
var num = document.getElementById("num");
//获取上个页面all数组的值
var all = sessionStorage.getItem("play");
//var all=localStorage.getItem("play");
all = JSON.parse(all);
var btnNum = 0;//点击次数，判定奇偶循环
var roleNum = 2;//隐藏身份的号码
var a = 0;//all数组下标
var b = 2;//查看身份的号码
//点击跳转函数，依照点击的次数来反复的循环显示与隐藏
function btnClick() {
var t=1;
    if (btnNum > 2 * all.length - 2) {
        window.location.href = "task3-2.html";//跳转到下一个页面
    }
    else {
        if (btnNum % 2 == 0) {//判断条件为偶数的情况

            num.innerHTML=a+1;
            $(".main-show").hide();
            $(".main-hide").show();
            $(".player-role").text("角色:" + all[a]);
            console.log(all[a]);
            a++;
            $("button").text("隐藏并传递给" + roleNum + "号");
            if (roleNum < all.length+1) {
                roleNum++;
            }
            else {
                $("button").text("查看法官台本");
            }
        }
        else {

            num.innerHTML=b;
            $(".main-hide").hide();
            $(".main-show").show();
            //num.innerHTML = roleNum;
            $("button").text("查看" + b + "号身份");
            if (b < all.length) {
                b++;
            }
        }
        btnNum = btnNum + 1;
    }
}