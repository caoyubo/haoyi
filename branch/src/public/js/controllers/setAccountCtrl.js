/**
 * Created by ljm on 2016/3/22.
 */

angular.module('setAccountCtrl', ["ngCookies"])
  .controller('setAccountCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,globalService) {
    $scope.logout = function(){
      console.log("进入::::");
      globalService.commonGet(grobalUrl.api.logoutGet).then(function(result){
        console.log("用户退出信息::");
        console.log(result);
        if(result != undefined){
          if(result.r == 1){
            $cookieStore.put('userInfo',null);
            $cookieStore.put('tjcode',null);
            location.href = "#/tab/home";
          }
        }
      },function(error){
        console.log("用户退出登录失败！");
        console.log(error);
      })
    }
  })


