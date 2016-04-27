/**
 * Created by ljm on 2016/4/18.
 */

angular.module('messageCtrl', ['ngCookies'])
    .controller('messageCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$timeout,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.moreDataCanBeLoaded = true;
        $scope.bill = {};

        $scope.request = {
            station : function(currentPage){
                var param = {
                    uid : $scope.user.uid,
                    currentPage : currentPage,
                    pageSize : constant.PAGESIZE
                }
                globalService.commonPost(grobalUrl.api.station,param).then(function(result){
                    console.log("站内信息操作::");
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
            }
        }

        //查找钻石信息
        $scope.request.station(1);

        //下拉刷新
        $scope.doRefresh = function(){
            $scope.request.station(1);
            $scope.$broadcast("scroll.refreshComplete");
        }

        //上拉加载数据
        $scope.load_more = function(){
            $timeout(function(){
                if($scope.bill.hasNextPage){
                    $scope.moreDataCanBeLoaded = true;
                    $scope.request.station((parseInt($scope.bill.pageNum)+1));
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                }else{
                    $scope.moreDataCanBeLoaded = false;
                }
            },500);
        }

    })

