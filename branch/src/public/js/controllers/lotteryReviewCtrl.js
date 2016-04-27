/**
 * Created by ljm on 2016/3/23.
 */

angular.module('lotteryReviewCtrl', ['ngCookies'])
  .controller('lotteryReviewCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$timeout,$state,globalService) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.lotteryHistory = {};

    $scope.request = {

      findHistoryPage : function(){
        var param = {
          lotterydate :"",
          startcreatetime :"",
          endcreatetime:""
        }
        globalService.commonPost(grobalUrl.api.findHistoryPage,param).then(function(result){
          console.log("开奖历史::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              $scope.lotteryHistory = result.data;
            }else{
              alert(result.mes);
            }
          }
        },function(error){
          console.log("查询信息失败！");
          console.log(error);
        })
      }
    }


    //开奖历史
    $scope.request.findHistoryPage();

  })


