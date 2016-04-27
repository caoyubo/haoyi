/**
 * Created by ljm on 2016/3/13.
 */

angular.module('codeCtrl', ['ngCookies'])
  .controller('codeCtrl',function($scope,$cookieStore,globalService,$stateParams) {
    $scope.user = $cookieStore.get('userInfo');
    $scope.user.code = $cookieStore.get('tjcode');

      //alert($scope.user.code);

    $scope.levelList = {};
    $scope.level = "";
    $scope.levelInfo = {};

    $scope.stateInfo = {};

    $scope.codeUrl = $cookieStore.get('apihost')+"/user/wx/register?uid="+$scope.user.uid+"&code="+$scope.user.code;
    console.log($scope.codeUrl);

    $('#code-panel').html("");
    $('#code-panel').qrcode({width:200,height:200,text:$scope.codeUrl}); //生成二维码

      $scope.request = {
          getUpLevelList : function(){
              //获取当前等级以及可申请等级，积分
              globalService.commonGet(grobalUrl.api.getUpLevelList+"?uid="+$scope.user.uid).then(function(result){
                  if(result.code == '0'){
                      $scope.levelList = result.data;
                      console.log("levelList::");
                      console.log(result.data);
                      console.log($scope.levelInfo);
                  }
              },function(error){
                  console.log("请求失败！");
                  console.log(error);
              })
          },
          getStatusByUid : function(){
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
          }
      }


      $scope.request.getUpLevelList();
      $scope.request.getStatusByUid();


      //下拉刷新
      $scope.doRefresh = function(){
          $scope.request.getUpLevelList();
          $scope.request.getStatusByUid();
          $scope.$broadcast("scroll.refreshComplete");
      }



  })


