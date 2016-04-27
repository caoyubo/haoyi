/**
 * Created by ljm on 2016/3/19.
 */

angular.module('addressCtrl', ['ngCookies'])
  .controller('addressCtrl',function($scope,$cookieStore,$ionicActionSheet,$ionicHistory,globalService) {
    $scope.addressList = [];
    $scope.choice = null;
    $scope.user = $cookieStore.get("userInfo");

    $scope.request = {
      addressList : function(){
        globalService.commonGet(grobalUrl.api.addressList+"?uid="+$scope.user.uid).then(function(result){
          if(result.code == 0){
            console.log("地址列表::");
            console.log(result);
            $scope.addressList = result.data;
            for(var key in $scope.addressList){
              if($scope.addressList[key].pdefault == 1){
                $scope.choice = $scope.addressList[key].id;
              }else{
              }
            }
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      setDefaultAddress : function(param){
        globalService.commonPost(grobalUrl.api.setDefaultAddress,param).then(function(result){
          console.log(result);
          if(result.code == 0){
            console.log("设置默认地址::");
            console.log(result);
            //$scope.getAddressList();
            $ionicHistory.goBack();//返回上一頁
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    //获取地址信息
    $scope.getAddressList = function(){
      $scope.request.addressList();
    }

    $scope.getAddressList();

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.request.addressList();
      $scope.$broadcast("scroll.refreshComplete");
    }

    //设置默认地址
    $scope.setDefaultAddress = function(id){
      var param = {
        uid : $scope.user.uid,
        id : id
      }
      console.log(param);
      $scope.request.setDefaultAddress(param);
    }
  })


