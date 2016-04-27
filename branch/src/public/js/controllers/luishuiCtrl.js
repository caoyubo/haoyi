/**
 * Created by ljm on 2016/3/13.
 */

angular.module('luishuiCtrl', ['ngCookies'])
.controller('luishuiCtrl',function($scope,$cookieStore,globalService,$stateParams) {

    $scope.stateInfo = {};
    $scope.bankname = "中国工商银行";
    $scope.serialnumeric = "432654756875";
    $scope.paytime = new Date();
    $scope.user = $cookieStore.get('userInfo');

    console.log($scope.paytime );
    console.log("======================================" );

    $scope.luishuizhifu = function(){

      var param = {
        id : $scope.stateInfo.id,
        bankname : $scope.bankname,
        serialnumeric : $scope.serialnumeric,
        paytime : $scope.paytime
      }
      console.log(param);
      globalService.commonPost(grobalUrl.api.updateApply,param).then(function(result){
        if(result.code == '0'){
          console.log(result);

          location.href = "#/tab/user";
        }
      },function(error){
        console.log("请求失败！");
        console.log(error);
      })
    }

    //根据用户id查找用户申请状态
    globalService.commonGet(grobalUrl.api.getStatusByUid+"?uid="+$scope.user.uid).then(function(result){
      if(result.code == '0'){
        console.log("查找用户申请状态:");
        console.log(result);
        if(result.data == undefined || result.data.length == 0){
          $scope.stateInfo.verify = 2;//数据问题
          return;
        }
        $scope.stateInfo = result.data[0];
        console.log($scope.stateInfo.verify);
      }
    },function(error){
      console.log("请求失败！");
      console.log(error);
    })
  })


