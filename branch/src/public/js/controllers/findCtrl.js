/**
 * Created by ljm on 2016/4/16.
 */

angular.module('findCtrl', ['ngCookies'])
    .controller('findCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicActionSheet,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.list = [];
        $scope.imgUrl = grobalUrl.imgUrl;

        $scope.request = {
            findResourceByColId : function(colId){
                globalService.commonGet(grobalUrl.api.findResourceByColId+"?colId="+colId).then(function(result){
                    console.log("发现::");
                    console.log(result);
                    if(result.code == "0"){
                        if(result.data != undefined && result.data !=null){
                            $scope.list = result.data;
                        }
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("查询发现失败！");
                    console.log(error);
                })
            }
        }

        $scope.request.findResourceByColId(7);

        //下拉刷新
        $scope.doRefresh = function(){
            $scope.request.findResourceByColId(7);

            $scope.$broadcast("scroll.refreshComplete");
        }

    })

