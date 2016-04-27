/**
 * Created by ljm on 2016/1/28.
 */

angular.module('userCtrl', ['ngCookies'])
  .controller('userCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,globalService,publicFunction) {

    $scope.integral = {};
    $scope.diamond = {};
    $scope.level = {};
    $scope.user = $cookieStore.get('userInfo');
    console.log($scope.user);

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
      },

      getJade : function(){
        globalService.commonGet(grobalUrl.api.findJade+"?uid="+$scope.user.uid).then(function(result){
          console.log("翡翠积分信息::");
          console.log(result);

          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.integral = (result.data==undefined||result.data==null)?{point:0}:result.data;
            }
          }
        },function(error){
          console.log("查询翡翠积分失败！");
          console.log(error);
        })
      },
      getLevel : function(){
        globalService.commonGet(grobalUrl.api.getUserInfo+"?uid="+$scope.user.uid).then(function(result){
          console.log("获取用户等级信息::");
          console.log(result);

          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.level = result.data;
            }
          }
        },function(error){
          console.log("获取用户等级信息失败！");
          console.log(error);
        })
      }
    }

    $scope.isLogin = function(url){
      publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'tab.user'});
    }

    //获取钻石积分
    $scope.request.getDiamond();
    //获取翡翠积分
    $scope.request.getJade();

    //获取等级信息
    $scope.request.getLevel();

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.user = $cookieStore.get('userInfo');
      console.log("user::");
      console.log($scope.user);
      //获取钻石积分
      $scope.request.getDiamond();
      //获取翡翠积分
      $scope.request.getJade();
      //获取等级信息
      $scope.request.getLevel();
      $scope.$broadcast("scroll.refreshComplete");
    }
  })

