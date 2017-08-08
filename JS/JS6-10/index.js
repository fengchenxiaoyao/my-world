/**
 * Created by Administrator on 2017/7/5 0005.
 */
var myApp = angular.module("app");
myApp.controller("indexController",function ($scope,$state,$http,$rootScope,$stateParams) {
    // $scope.state = $state;
    // $rootScope.$state = $state;
    // $rootScope.$stateParams = $stateParams;
    // $state.includes('index.article-table');
    // $rootScope.nameURL = $state.includes("index.article-table");
    $scope.logout=function () {
            $http.post('/carrots-admin-ajax/a/logout/')
                .then(function successCallback(res) {
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'退出成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                    $state.go('login')
                },function errorCallback(res) {
                    alert(res.data.message)
                })
    };
});


// var myApp = angular.module("app", ["ui.router"]);

// myApp.config(function ($stateProvider, $urlRouterProvider) {
//
//     // $urlRouterProvider.when("", "welcome");
//
//     $stateProvider
//         .state("article", {
//             url: "/article",
//             templateUrl: "article-table.html"
//         })
//         .state("PageTab.Page1", {//.page1子集，层级结构
//             url:"/Page-1",//随便取名，定义路径
//             templateUrl: "Page1.html"//定位到文件
//         })
//         .state("PageTab.Page2", {
//             url:"/Page2",
//             templateUrl: "Page2.html"
//         })
//         .state("PageTab.Page3", {
//             url:"/Page3",
//             templateUrl: "Page3.html"
//         });
// });

