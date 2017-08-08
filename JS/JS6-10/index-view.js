/**
 * Created by Administrator on 2017/7/6 0006.
 */
var myApp = angular.module("app", ['ui.router','ngMessages','oc.lazyLoad','angularFileUpload',
    'ui.bootstrap']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    var _lazyLoad = function(loaded){
        return function($ocLazyLoad){
            return $ocLazyLoad.load(loaded,{serie: true});
        }
    };
    $urlRouterProvider.otherwise("/login");//如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 task6.html

    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "task6.html",
            cache:'false',//配合reload使用，每次跳转页面刷新
            resolve:{
                loadMyFile:_lazyLoad(
                    ['login.js','task6.css']
                )
            }
        })
        .state("index", {//.page1子集，层级结构
            url:"/index",//随便取名，定义路径
            templateUrl: "index.html",//定位到文件
            cache:'false',//配合reload使用，每次跳转页面刷新
            resolve:{
                loadMyFile:_lazyLoad(
                    ['index.js','index.css','index-nav.js']
                )
            }
        })
        .state("index.article-table", {
            url:"/article-table/:page/:size/:startAt/:endAt/:type/:status",
            templateUrl: "article-table.html",
            resolve:{
                loadMyFile:_lazyLoad(
                    ['article-table.js','article-table.css']
                )
            }
        })
        .state("index.article-details", {
            url:"/article-details?id",
            templateUrl: "article-details.html",
            resolve:{
                loadMyFile:_lazyLoad(
                    ['article-details.js','article-details.css','details-directives.js']
                )
            }
        })
});