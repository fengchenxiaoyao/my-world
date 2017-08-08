/**
 * Created by Administrator on 2017/7/3 0003.
 */
var myApp = angular.module('app', ['ngMessages']);
myApp.controller('login', function ($scope, $http) {

    $scope.login = function () {
        $scope.tipsPwd = "";
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

                    console.log(mes);
                    if (mes.message === 'success') {
                        window.location.href="index.html"
                    }
                    else {
                        alert(mes.message);
                        $scope.tipsPwd = mes.message;
                    }
                }, function () {
                    // 接口错误时返回值
                }
            )
    };
    // enter登录 ng-keyup
    function keyLogin() {
        if (event.keyCode === 13){//回车键的键值为13
            $scope.login();//调用登录按钮的登录事件
        }

    }
});