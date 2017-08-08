/**
 * Created by Administrator on 2017/7/15 0015.
 */
var myApp = angular.module("app");
myApp.controller('detailsCtrl',function ($scope,$http,$state,$stateParams,FileUploader) {
    //下拉框常量
    $scope.types = [
        {value:0,text:"首页Banner"},
        {value:1,text:"找职业Banner"},
        {value:2,text:"找精英Banner"},
        {value:3,text:"行业大图"}
    ];
    $scope.industrys = [
        {value:0,text:"移动互联网"},
        {value:1,text:"电子商务"},
        {value:2,text:"企业服务"},
        {value:3,text:"O2O"},
        {value:4,text:"教育"},
        {value:5,text:"金融"},
        {value:6,text:"游戏"}
    ];
    //退出（取消）功能
    $scope.cancle = function () {
        $state.go('index.article-table', {
            page: 1 ,
            size: 10
        }, {reload: true});
    };

    //上传图片部分

    var uploader = $scope.uploader = new FileUploader({
        url: '/carrots-admin-ajax/a/u/img/task',
        queueLimit: 1     //文件个数限制
    });

    var imgurl;//图片url地址
    //取消时图片预览消失
    $scope.imgCancle=function () {
        $scope.imgurl = "undefined";
    };


//编辑部分的功能
    $scope.id = $stateParams.id;
    //先查询ID是否存在；
    if($scope.id){
        document.getElementById("title").innerHTML="编辑Article";
        $http.get('/carrots-admin-ajax/a/article/'+$scope.id)
            .then(function successCallback(response) {
            console.log(response);
            //将返回的数据渲染到页面上
            $scope.title = response.data.data.article.title;
            $scope.type = response.data.data.article.type;
            $scope.status = response.data.data.article.status;
            $scope.imgurl = response.data.data.article.img;
            $scope.content = response.data.data.article.content;
            $scope.url = response.data.data.article.url;
            $scope.industry = response.data.data.article.industry;
            $scope.createAt = response.data.data.article.createAt;
        },function errorCallback(response) {
                bootbox.alert({
                    title: '<p style="color: #47c6e8">提示</p>',
                    message:'请求失败，请稍后重试',
                    buttons: {
                        ok: {
                            label: '确定',
                            className: 'btn-primary'
                        }
                    }
                });

            }
        );
        //编辑立即上线
        $scope.status2 = function (){
            $http({
                method:"PUT",
                url:"/carrots-admin-ajax/a/u/article/"+$scope.id,
                data:$.param({
                    id:$scope.id,
                    title: $scope.title,
                    type: $scope.type,
                    status: 2,
                    img: $scope.imgurl,
                    content: $scope.content,
                    url: $scope.url,
                    industry: $scope.industry,
                    createAt:$scope.createAt
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}//后端接口问题，成为必填项目
            })
                .then(function successCallback(response) {
                    $state.go('index.article-table', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                },function errorCallback() {
                    alert('请求失败，请稍后重试')
                })
        };
        //编辑存为草稿
        $scope.status1 = function (){
            $http({
                method:"PUT",
                url:"/carrots-admin-ajax/a/u/article/"+$scope.id,
                data:$.param({
                    id:$scope.id,
                    title: $scope.title,
                    type:$scope.type,
                    status:1,
                    img:$scope.imgurl,
                    content:$scope.content,
                    url:$scope.url,
                    industry:$scope.industry,
                    createAt:$scope.createAt
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}//后端接口问题，成为必填项目
            })
                .then(function successCallback(response) {
                    $state.go('index.article-table', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                },function errorCallback() {
                    alert('请求失败，请稍后重试')
                })
        };
    }
    //新增立即上线
    else{
        $scope.status2 = function (){
            $http({
                method:"POST",
                url:"/carrots-admin-ajax/a/u/article",
                data:$.param({
                    title: $scope.title,
                    type:$scope.type,
                    status:2,
                    img:imgurl,
                    content:$scope.content,
                    industry:$scope.industry,
                    url:$scope.url
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function successCallback(response) {
                    $state.go('index.article-table', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                },function errorCallback() {
                    alert('请求失败，请稍后重试')
                })
        };
        $scope.status1 = function () {
            $http({
                method: "POST",
                url: "/carrots-admin-ajax/a/u/article",
                data: $.param({
                    title: $scope.title,
                    type: $scope.type,
                    status: 1,
                    img: imgurl,
                    content: $scope.content,
                    industry: $scope.industry,
                    url: $scope.url
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function successCallback(response) {
                    $state.go('index.article-table', {
                        page: 1 ,
                        size: 10
                    }, {reload: true});
                },function errorCallback() {
                    alert('请求失败，请稍后重试')
                })
        }
    }
// FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        imgurl = response.data.url;
        console.log(imgurl);
        $scope.imgurl = imgurl;
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };
    console.info('uploader', uploader);
});
myApp.directive('contenteditable',function () {
    return{
        restrict: 'A',
        require:'?ngModel',
        link:function (scope,element,attrs,ngModel) {
            //初始化编辑内容

            var editor = new wangEditor(element);
            //自定义菜单，去掉地图、图片、视频、表情
            // editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
            //     if (item === 'location') {
            //         return null;
            //     }
            //     if (item === 'img') {
            //         return null;
            //     }
            //     if (item === 'video') {
            //         return null;
            //     }
            //     if (item === 'emotion') {
            //         return null;
            //     }
            //     return item;
            // });

            if(!ngModel){
                return;
            } // 如果没有ng模型，什么也不做
            // 指定如何更新UI
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "")
            };

            //监听更改事件以启用绑定
            element.on('blur keyup change',function () {
                scope.$apply(readViewText);
            });
            // 无需初始化，AngularJS将基于ng模型属性初始化文本
            // 将数据写入模型
            function readViewText() {
                var html=element.html();
                // 当我们清除可编辑的内容时，浏览器会留下一个<br>
                // 如果提供了strip-br属性，那么我们将其删除
                if(attrs.stripBr && html=='<br>') {
                    html='';
                }
                ngModel.$setViewValue(html);
            }
            //创建编辑器
            // // 获取元素
            // var div = document.getElementById('intro-title2');
            // // 生成编辑器
            // var editor = new wangEditor(div);
            editor.create();
        }
    }
});
