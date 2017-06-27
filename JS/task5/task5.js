/**
 * Created by fengqiang on 2017/6/24 0024.
 */
// var name = $('#user').val();//获取用户框的值
// var pwd = $('#password').val();//获取密码框的值
$('#login').click(function () {
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         alert(xhr.responseText);
    //     }
    // }
    // xhr.open('post', '/carrots-admin-ajax/a/login', true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.send('name='+name+'&pwd='+pwd);


    // var name = $('#user').val();//获取用户框的值
    // var pwd = $('#password').val();//获取密码框的值
    // if(name===""||pwd===""){
    //     $(".tips-pwd").text("请完善账号密码");
    // }
    var name = $('#user').val();//获取用户框的值
    var pwd = $('#password').val();//获取密码框的值
    $.post("/carrots-admin-ajax/a/login",{//发送post请求
            name:name,
            pwd:pwd,
            // url:"http://dev.admin.carrots.ptteng.com/"
        },function (date) {//返回数据date，进行JSON转译
            var c=JSON.parse(date);
            console.log(date)
            $(".tips-name").text("");
            $(".tips-pwd").text("");
            if (c.message==="success") {//对返回的数据进行判断，"success","用户不存在"，"密码错误"，
                // 这些信息是postman测试接口返回的数据，不是自定义的
                alert(c.message);
                window.location.href="https://www.zhihu.com";
            }
            else if(c.message==="用户不存在"){
                $(".tips-name").text(c.message);//输出
            }
            else if(c.message==="密码错误"){
                $(".tips-pwd").text(c.message);//输出
            }
        }
    )
})
$("#user").keydown(function () {//keydown事件，每一次键盘输入按下的瞬间都会触发事件，还有一个keyup事件与之相对，每次弹起触发
    $(".tips-name").text("");
    var name = $('#user').val();//获取用户框的值
    if(!(/^([0-9a-zA-Z]{4,10})$/.test(name))) {//正则表达式，判断输入的字符是不是符合要求
        $(".tips-name").text("*只能输入4-10位的数字或字母");//输出
    }
});
$("#password").keydown(function () {
    $(".tips-pwd").text("");
    var pwd = $('#password').val();//获取密码框的值
    if (!(/^([0-9a-zA-Z]{5,10})$/.test(pwd))) {//区间范围，左开右闭
        $(".tips-pwd").text("*只能输入6-10位的数字或字母");//输出
    }
});
$('#user').blur(function(){//失焦验证，输入框内容为空的时候，tips-name,tips-pwd不显示内容
    var name = $('#user').val();//获取用户框的值
    if(name===""){
        $('.tips-name').text("")
    }
})
$('#password').blur(function(){
    var pwd = $('#password').val();//获取用户框的值
    if(pwd===""){
        $('.tips-pwd').text("")
    }
})