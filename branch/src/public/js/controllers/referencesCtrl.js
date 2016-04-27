/**
 * Created by ljm on 2016/3/20.
 */

angular.module('referencesCtrl', ['ngCookies'])
  .controller('referencesCtrl',function($scope,$cookieStore,globalService) {

    $scope.references = {};
    $scope.user = $cookieStore.get('userInfo');

    $scope.request = {
        getUserByParent : function(){
            globalService.commonGet(grobalUrl.api.getUserByParent+"?uid="+$scope.user.uid).then(function(result){
                console.log("推荐人列表信息::");
                console.log(result);

                if(result != undefined){
                    if(result.code != undefined && result.code == "0"){
                        console.log("推荐人列表信息::");
                        $scope.references = result.data;
                    }
                }
            },function(error){
                console.log("查询推荐人列表信息失败！");
                console.log(error);
            })
        }
    }


      $scope.request.getUserByParent();

      //下拉刷新
      $scope.doRefresh = function(){
          $scope.request.getUserByParent();
          $scope.$broadcast("scroll.refreshComplete");
      }

  })


