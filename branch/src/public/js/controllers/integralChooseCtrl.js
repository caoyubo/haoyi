/**
 * Created by ljm on 2016/3/29.
 */

angular.module('integralChooseCtrl', ['ngCookies'])
  .controller('integralChooseCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicActionSheet,globalService) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.diamond = {};
    $scope.diam = {
      chooseDiam : 0
    }

    $scope.request = {
      getDiamond: function () {
        globalService.commonGet(grobalUrl.api.diamond+"?uid="+$scope.user.uid).then(function (result) {
          if (result.code == 0) {
            console.log("钻石积分信息::");
            console.log(result);
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

    $scope.request.getDiamond();

    $scope.submitDiam = function(){
      if($scope.diamond.availBal){
        if(parseFloat($scope.diamond.availBal)<parseFloat($scope.diam.chooseDiam)){
          alert("填写积分不能大于可用积分！");
        }else{
          $ionicViewSwitcher.nextDirection('back');
          $state.go('pay', {'bigDecimal': $scope.diam.chooseDiam});
        }
      }else{
        alert("填写积分不能大于可用积分！");
      }
    }

  })
