/**
 * Created by Administrator on 2017/7/6 0006.
 */
var myApp = angular.module("app");
myApp.controller('article-table', function ($http, $scope, $log, $stateParams, $state) {
    $scope.currentPage = $stateParams.page || 1;//当前页码
    $scope.itemsPerPage = $stateParams.size || 10;
    $scope.startTime = parseInt($stateParams.startAt) || "";//将搜索之后的值在搜索后还显示出来
    $scope.endTime = parseInt($stateParams.endAt) || "";//将搜索之后的值在搜索后还显示出来
    $scope.types = $stateParams.type || "";//将搜索之后的值在搜索后还显示出来
    $scope.statuss = $stateParams.status || "";//将搜索之后的值在搜索后还显示出来
    // var start1 = $scope.startTime;
    // var start2 = Date.parse(new Date(start1));
    // var end1 = $scope.endTime;
    // var end2 = Date.parse(new Date(end1));
//发送http请求，获取list数据
    $scope.list = function () {
        $http.get('/carrots-admin-ajax/a/article/search?page=' + $scope.currentPage + '&size=' + $scope.itemsPerPage
            + '&startAt=' + $scope.startTime + '&endAt=' + $scope.endTime + '&type=' + $scope.types + '&status=' + $scope.statuss
        )
            .then(function successCallback(response) {// 请求成功执行代码
                console.log(response.data.data.articleList);
                $scope.records = response.data.data.articleList;
                $scope.totalItems = response.data.data.total;
                $scope.pageNum = Math.ceil(($scope.totalItems) / ($scope.itemsPerPage));//计算分页的页数
                // $scope.currentPage = response.data.data.page;
                //判断暂无数据是否出现的条件，当totalItems为0或者未定义时出现
                $scope.showFlag = !$scope.totalItems;
            }, function errorCallback(response) {// 请求失败执行代码
                alert('请求失败，请刷新重试')
            })
    };
    $scope.list();//调用上面创建的list（）函数
// 翻页部分

    $scope.pageNo = 1;//给输入框一个默认值
    $scope.setPage = function () {
        $scope.currentPage = $scope.pageNo;//将跳转输入框的值赋给分页
        if ($scope.pageNo < 1) {// 输入验证判断
            $scope.pageNo = 1;
            $scope.currentPage = 1;
            alert("请输入正确的值")
        }
        else if ($scope.pageNo > $scope.pageNum) {
            $scope.pageNo = $scope.pageNum;
            $scope.currentPage = $scope.pageNo;
            bootbox.alert({
                title: '<p style="color: #47c6e8">提示</p>',
                message:'请输入正确的值',
                buttons: {
                    ok: {
                        label: '确定',
                        className: 'btn-primary'
                    }
                }
            });
        }
        $scope.list();
    };

    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 4;//页面分页显示的最大值，最多给你显示4页，其他超出的折叠隐藏起来
    // $scope.bigTotalItems = 175;
    // $scope.bigCurrentPage = 1;


// 时间插件
//     $scope.today = function() {
//         $scope.startTime = new Date();
//         $scope.endTime=new Date();
//     };
//     $scope.today();

    // $scope.clear = function () {
    //     $scope.startTime = null;
    //     $scope.endTime = null;
    // };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    //时间验证，并将日期转化为时间戳（毫秒）
    $scope.timeTransform = function () {
        if ($scope.startTime !== "") {
            $scope.dateOptionsEnd.minDate = $scope.startTime;//禁选startTime之前的日期
            var start1 = $scope.startTime;
            var start2 = Date.parse(new Date(start1));
            $scope.startTime = start2;
        }
        if ($scope.endTime !== "") {
            $scope.dateOptions.maxDate = $scope.endTime;
            var end1 = $scope.endTime;
            var end2 = Date.parse(new Date(end1));
            $scope.endTime = end2+86399999;
            console.log(typeof Date(end1));
        }
    };

    $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // // Disable weekend selection不可选周末日期
    // function disabled(data) {
    //     var date = data.date,
    //         mode = data.mode;
    //     return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    // }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };
    // 时间格式选择
    // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    // $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

//搜索功能
    $scope.search = function () {
        $state.go('index.article-table', {
            page: 1,
            size: $scope.itemsPerPage,
            startAt: $scope.startTime,
            endAt: $scope.endTime,
            type: $scope.types,
            status: $scope.statuss
        }, {reload: true});


    };
//清空功能
    $scope.clear = function () {
        $state.go('index.article-table', {
            page: 1,
            size: 10,
            startAt: "",
            endAt: "",
            type: "",
            status: ""
        }, {reload: true});
    };

//上下线功能
    $scope.offline = function () {
        id = this.record.id;
        if (this.record.status === 1) {
            $http.put('/carrots-admin-ajax/a/u/article/status?id=' + id + '&status=' + 2)
                .then(function successCallback(res) {
                    $state.go('index.article-table',
                        {page: $scope.currentPage
                        }, {reload: true});
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'上线成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }, function errorCallback(res) {// 请求失败执行代码
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
                })
        }
        else if (this.record.status === 2){
            $http.put('/carrots-admin-ajax/a/u/article/status?id=' + id + '&status=' + 1)
                .then(function successCallback(res) {
                    $state.go('index.article-table',
                        {page: $scope.currentPage
                        }, {reload: true});
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'下线成功',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                }, function errorCallback(res) {// 请求失败执行代码
                    bootbox.alert({
                        title: '<p style="color: #47c6e8">提示</p>',
                        message:'请求失败，请刷新重试',
                        buttons: {
                            ok: {
                                label: '确定',
                                className: 'btn-primary'
                            }
                        }
                    });
                })
        }
    };
//删除功能
    $scope.delete = function () {
        var id=this.record.id;
        bootbox.setDefaults("locale","zh_CN");
        bootbox.confirm({
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-warning'
                }
            },
            message: '是否确认删除',
            callback: function(result) {
                if(result) {
                    $http.delete('/carrots-admin-ajax/a/u/article/'+id)
                        .then(function successCallback(response) {
                        console.log(response);
                        $state.go('index.article-table', {
                            page: $scope.currentPage
                        }, {reload: true});
                    });
                }
            },
            title: '<p style="color: #47c6e8">提示</p>'
        });
    };
//     $scope.delete=function () {
//         var id=this.record.id;
//         $http.delete('/carrots-admin-ajax/a/u/article/'+id)
//             .then(function successCallback() {
//                 $state.go('index.article-table',
//                     {page:$scope.currentPage},
//                     {reload:true}
//                     );
//                     bootbox.alert({
//                         title: '<p style="color: #47c6e8">提示</p>',
//                         message:'删除成功',
//                         buttons: {
//                             ok: {
//                                 label: '确定',
//                                 className: 'btn-primary'
//                             }
//                         }
//                     });
//             },function errorCallback() {
//                 bootbox.alert({
//                     title: '<p style="color: #47c6e8">提示</p>',
//                     message:'请求失败，请稍后重试',
//                     buttons: {
//                         ok: {
//                             label: '确定',
//                             className: 'btn-primary'
//                         }
//                     }
//                 });
//                 }
//             )
//     };

    //跳转至新增页面
    $scope.details=function () {
        $state.go('index.article-details')
    };
    //编辑功能,跳转到新增页面并把id这个参数传递过去
    $scope.editor = function () {
        console.log(this.record.id);
        // console.log(this.x);
        $state.go('index.article-details', {
            id : this.record.id
        }, {reload: true});
    };

});

myApp.filter("typeChange", function () {
    // return function (type) {
    return function (type) {
        switch (type) {
            case 0:
                return "首页banner";
                break;
            case 1:
                return "找职位banner";
                break;
            case 2:
                return "找精英banner";
                break;
            case 3:
                return "行业大图";
                break;
            case "":
                return "";
                break
        }
    }
});
myApp.filter("statusChange", function () {
    return function (status) {
        switch (status) {
            case 1:
                return "草稿";
                break;
            case 2:
                return "上线";
                break;
            case "":
                return "";
                break
        }
    }
});
//上下线的切换
myApp.filter("lineChange", function () {
    return function (status) {
        switch (status) {
            case 1:
                return "上线";
                break;
            case 2:
                return "下线";
                break;
        }
    }
});
