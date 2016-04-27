/**
 * Created by ljm on 2016/4/18.
 */

angular.module('messageDetailCtrl', ['ngCookies'])
    .controller('messageDetailCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$ionicHistory,$timeout,$stateParams,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.moreDataCanBeLoaded = true;
        $scope.bill = {};
        $scope.id = $stateParams.id;

        $scope.request = {
            stationRead : function(currentPage){
                globalService.commonGet(grobalUrl.api.stationRead+"?id="+$scope.id).then(function(result){
                    console.log("阅读站内信息操作::");
                    console.log(result);
                    if(result.code == "0"){
                        $scope.bill = result.data;
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("充值失败！");
                    console.log(error);
                })
            },
            stationDel : function(){
                globalService.commonGet(grobalUrl.api.stationDel+"?id="+$scope.id).then(function(result){
                    console.log("阅读站内信息操作::");
                    console.log(result);
                    if(result.code == "0"){
                        $ionicViewSwitcher.nextDirection('back');
                        $ionicHistory.goBack();
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("充值失败！");
                    console.log(error);
                })
            }
        }

        //阅读站内信息
        $scope.request.stationRead();

        $scope.messageDel = function(){
            $scope.request.stationDel();
        }


    })

