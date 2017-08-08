/**
 * Created by Administrator on 2017/6/30 0030.
 */

var app = angular.module('myApp', []);
app.controller('login', function ($scope, $http) {

    $scope.login = function () {
        $scope.tipsPwd="";
        $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/login',
            data: $.param({name: $scope.user, pwd: $scope.password}),
            responseType: JSON,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(function (res) {
                console.log(res);
                var mes = res.data;
                // alert(mes.message);
                console.log(mes);
                if (mes.message === 'success') {
                    window.location.href = "https://www.zhihu.com";
                }
                else{
                    $scope.tipsPwd=mes.message;
                }
            },function () {
                // 接口错误时返回值
                }
            )
    };
    // enter登录 ng-keyup
    function keyLogin(){
        if (event.keyCode===13)  //回车键的键值为13
            $scope.login(); //调用登录按钮的登录事件
    }
});

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
$('#user').blur(function(){
    var name = $('#user').val();//获取用户框的值
    if(name===""){
        $(".tips-name").text("");
    }
});
$('#password').blur(function(){
    var pwd = $('#password').val();//获取用户框的值
    if(pwd===""){
        $('.tips-pwd').text("")
    }
});


// app.controller('login',function($scope,$http){
//    $http.post("/carrots-admin-ajax/a/login",($scope.user,$scope.password)).then(
//        function successCallback(date) {
//            console.log(date);
//            var c=JSON.parse(date);
//            if(c.message==="success"){
//                alert(c.message);
//                window.location.href="https://www.zhihu.com";
//            }
//        },function errorCallback(date){
//            var c=JSON.parse(date);
//            if(c.message==="用户不存在"){
//                $scope.tipsName=c.message
//            }
//            else if(c.message==="密码错误"){
//               $scope.tipsPwd=c.message
//            }
//        }
//    )
// });
