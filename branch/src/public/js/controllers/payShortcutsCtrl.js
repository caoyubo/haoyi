/**
 * Created by ljm on 2016/3/29.
 */

angular.module('payShortcutsCtrl', ['ngCookies'])
  .controller('payShortcutsCtrl',function($scope,$cookieStore,$ionicActionSheet,globalService) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.payList = [];

    $scope.request = {
      getPayList : function(){
        globalService.commonGet(grobalUrl.api.getPayList).then(function(result){
          if(result.code == 0){
            console.log("支付类型::");
            console.log(result);
            $scope.payList = result.data;
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    /*//获取支付类型
     */
    $scope.request.getPayList();

  })


