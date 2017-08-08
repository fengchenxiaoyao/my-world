/**
 * Created by Administrator on 2017/7/6 0006.
 */
var myApp = angular.module("app", []);
myApp.controller('article-table',function($http,$scope){
    $scope.list=function () {//发送http请求，获取list数据
        $http({
            method:'get',
            url:'/carrots-admin-ajax/a/article/search',
            responseType: JSON,//是返回数据转移成json格式
        }).then(function successCallback(response){// 请求成功执行代码
                    alert(response)
        },function errorCallback(response){// 请求失败执行代码
                    alert('请求失败，请刷新重试')
        })
    }
    }
);