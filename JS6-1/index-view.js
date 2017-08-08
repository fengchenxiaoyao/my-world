/**
 * Created by Administrator on 2017/7/6 0006.
 */
var myApp = angular.module("app", ["ui.router","ngMessages"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/login");//如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 task6.html

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "task6.html"
        })
        .state("index", {//.page1子集，层级结构
            url:"/index",//随便取名，定义路径
            templateUrl: "index.html"//定位到文件
        })
        .state("index.article-table", {
            url:"/article-table",
            templateUrl: "article-table.html"
        })
        // .state("PageTab.Page3", {
        //     url:"/Page3",
        //     templateUrl: "Page3.html"
        // });
});