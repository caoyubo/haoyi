/**
 * Created by ljm on 2016/3/20.
 */

angular.module('upgradeCtrl', ['ngCookies'])
  .controller('upgradeCtrl',function($scope,$cookieStore,$stateParams,globalService) {
    $scope.user = $cookieStore.get('userInfo');
    $scope.levelInfo = {};
    console.log($stateParams.level);

    //获取当前等级以及可申请等级，积分
    globalService.commonGet(grobalUrl.api.getUpLevelList+"?uid="+$scope.user.uid).then(function(result){
      console.log("levelList::");
      console.log(result.data);
      if(result.code == '0'){
        $scope.levelList = result.data;
        console.log("levelList::");
        console.log(result.data);
        console.log($scope.levelInfo);

        if($stateParams.level){
          $scope.level = $stateParams.level;
          console.log("level:"+$scope.level);
          for(var key in $scope.levelList){
            console.log($scope.levelList[key].id);
            if($scope.levelList[key].id == $scope.level){
              $scope.levelInfo = $scope.levelList[key];
            }
          }
          console.log("levelInfo::");
          console.log($scope.levelInfo);
        }
      }
    },function(error){
      console.log("请求失败！");
      console.log(error);
    })




    $scope.agree = function(){
      var param = {
        uid : $scope.user.uid,
        newlevel : $stateParams.level
      }
      console.log("申请升级::");
      console.log(param);
      globalService.commonPost(grobalUrl.api.apply,param).then(function(result){
        console.log("申请升级信息::");
        console.log(result);
        if(result != undefined){
          if(result.code != undefined && result.code == "0"){
            location.href = "#/luishui/"+$stateParams.level;
          }
        }
      },function(error){
        console.log("申请升级失败！");
        console.log(error);
      })
    }
  })


