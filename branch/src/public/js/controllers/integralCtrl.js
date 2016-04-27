/**
 * Created by ljm on 2016/4/18.
 */

angular.module('integralCtrl', ['ngCookies'])
    .controller('integralCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.diamond = {};

        $scope.request = {
            getDiamond: function () {
                globalService.commonGet(grobalUrl.api.diamond+"?uid="+$scope.user.uid).then(function (result) {
                    console.log("钻石积分信息::");
                    console.log(result);
                    if (result.code == 0) {
                        $scope.diamond = result.data.result;
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    console.log("请求失败!");
                    console.log(error);
                });
            }
        }
        //查找钻石信息
        $scope.request.getDiamond();

        //下拉刷新
        $scope.doRefresh = function(){
            $scope.user = $cookieStore.get('userInfo');
            console.log("user::");
            console.log($scope.user);
            //获取钻石积分
            $scope.request.getDiamond();
            $scope.$broadcast("scroll.refreshComplete");
        }

    })

