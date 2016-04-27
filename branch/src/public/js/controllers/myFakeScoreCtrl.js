/**
 * Created by ljm on 2016/3/18.
 */

angular.module('myFakeScoreCtrl', ['ngCookies'])
  .controller('myFakeScoreCtrl',function($scope,$cookieStore,globalService) {

    $scope.integral = {};
    $scope.jade = {};
    $scope.jadeList = [];
    $scope.user = $cookieStore.get('userInfo');

    $scope.request = {
      findJade : function(){
        globalService.commonGet(grobalUrl.api.findJade+"?uid="+$scope.user.uid).then(function(result){
          if(result.code == "0"){
            console.log("翡翠积分信息::");
            $scope.integral = result.data;
            console.log(result);
          }
        },function(error){
          console.log("查询翡翠积分失败！");
          console.log(error);
        })
      },
      jadeGetDetail : function(){
        globalService.commonPost(grobalUrl.api.jadeGetDetail,{ownerid :$scope.user.uid}).then(function(result){
          console.log("查询翡翠账户交易明细::");
          console.log(result);
          if(result.code == "0"){
            $scope.jade = result.data;
            if(result.data.list!=undefined &result.data.list!=null){
              for(var i in result.data.list){
                $scope.jadeList.push(result.data.list[i]);
              }
            }
          }else{
            alert(result.mes);
          }
        },function(error){
          console.log("查询翡翠账户交易明细失败！");
          console.log(error);
        })
      }
    }

      // 获取假积分信息
      $scope.request.findJade();
      $scope.request.jadeGetDetail();

      //下拉刷新
      $scope.doRefresh = function(){
        $scope.request.findJade();
        $scope.request.jadeGetDetail();
        $scope.$broadcast("scroll.refreshComplete");
      }
  })


