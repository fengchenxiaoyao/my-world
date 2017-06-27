
// 声明变量
var peopleNumber = document.getElementById("peopleNumber");
var range = document.getElementById("range");
var reduce = document.getElementById("reduce");
var raise = document.getElementById("raise");
var degree = document.getElementsByClassName("degree");
var block = document.getElementsByClassName("block");
var set = document.getElementById("set");
var content = document.getElementsByClassName("num");
var deal = document.getElementById("deal");
var killer;
var commoner;
var impress;

// 采用焦点事件使玩家离开输入框时使滑块和输入框的value值相等
peopleNumber.onblur = function() {
    range.value = peopleNumber.value;
    var z = parseInt(peopleNumber.value);
    if (z < 4 || z > 18) {
        alertMsg("输入数值请在4-18之间"); // 限制输入值在4-18之间
    }
};
range.oninput = function() {
    peopleNumber.value = range.value;
};
// 点击增加减少按钮时使滑块value值改变
var a = 0;
reduce.onclick = function() {
    a = range.value;
    a--;
    if (a < 4) {
        alertMsg("客官，输入值不能再小了哦！", 1);
        a = 4;
    }
    range.value = a;
    peopleNumber.value = a;
};
raise.onclick = function() {
    a = range.value;
    a++;
    if (a > 18) {
        alertMsg("客官，输入值不能再大了哦！", 1);
        a = 18;
    }
    range.value = a;
    peopleNumber.value = a;
};

// 将杀手和平民添加到一个数组之中
function allot() {
    var r = [];
    for (var j = 0; j < killer; j++) {
        r.push("杀手");
    }
    for (var k = 0; k < commoner; k++) {
        r.push("平民");
    }
    return r;
}
// 乱序
function disorder() {
    var sum = allot();
    var len = sum.length;
    for (var p = 0; p < len - 1; p++) {
        var idx = Math.floor(Math.random() * (len - p));//找出一个随机整数idx
        var temp = sum[idx];  // 声明一个中间量temp等于sum中length为idx的元素
        sum[idx] = sum[len - p - 1]; // 将sum[dix]替换为sum里第len-p-1的元素
        sum[len - p - 1] = temp; // 将sum[len-p-1]替换为变化前的sum[idx]
    }
    return sum;
}

set.onclick = function() {
    // 清除内容
    for (var n = 0; n < 18; n++) {
        content[n].innerHTML = "";
        content[n].innerHTML = "<p class=\"block\"></p><span class=\"degree\">平民</span>";
    }
    // 设置杀手和平民的数量
    var num = peopleNumber.value;
    killer = Math.floor(num / 3);
    commoner = num - killer;
    console.log(killer, commoner);
    //保存玩家和杀手的人数用于后面页面判断游戏是否结束
    localStorage.setItem("killer", JSON.stringify(killer));
    localStorage.setItem("commoner", JSON.stringify(commoner));

    disorder();
    // 将乱序后的数组保存在本地浏览器中，用于下一个页面
    impress = disorder();
    console.log(impress);
    localStorage.setItem("arr", JSON.stringify(impress));
    console.log(JSON.stringify(impress));
    /* 乱序另一种好理解一点的方法
     var arr = [];
     while (sum.length > 0) {
     var idx = parseInt(Math.random() * （sum.length-1)); // 在[0, sum.length-1)之间取一个随机整数idx
     arr.push(sum[idx]); // 向arr中添加找到的元素
     sum.splice(idx, 1); // 从sum中删除已经被找到的元素，这里的1代表被删除元素的个数
     }
     console.log(arr);
     这里说下为什么是在[0, length-1)之间取整数，是因为如果是在[0, length)之间取整可能会发生倒着排列
     */
    var sum = impress;
    var len = sum.length;
    for (var m = 0; m < len; m++) {
        if (degree[m].innerHTML === sum[m]) {
            degree[m].style.color = "#a1a1a1";
            block[m].style.backgroundColor = "#fab344";
        }
        else {
            degree[m].innerHTML = "杀手";
            degree[m].style.color = "#a1a1a1";
            block[m].style.backgroundColor = "#29bde0";
        }
    }
};
deal.onclick = function() {
    var h = allot();
    var z = parseInt(peopleNumber.value);
    if (h.length === z) {
        window.location.href = "BRPGsee-Degree.html";
    }
    else {
        alertMsg("请先点击设置身份", 1);
    }
};
