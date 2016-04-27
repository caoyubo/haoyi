/**
 * Created by ljm on 2016/3/14.
 */

angular.module('storeCategoryCtrl', [])
  .controller('storeCategoryCtrl',function($scope,$stateParams,$ionicViewSwitcher,$state,globalService) {
    $scope.shopid = $stateParams.shopid;  //获取店铺id
    console.log($scope.shopid);
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.storeInfo = {};
    $scope.goodsList = [];

    $scope.myHref = function(id){
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('detail', {'id': id});
    }

    //查询指定商户所有商品分类列表
    globalService.commonGet(grobalUrl.api.findByShopId+"?shopid="+$scope.shopid).then(function(result){
      if(result.code == 0){
        console.log("店铺商品分类列表::");
        console.log(result);
        $scope.storeInfo = result.data;
      }else{
        console.log("店铺商品分类列表::");
        console.log(result.mes);
      }
    },function(error){
      console.log("请求失败！");
      console.log(error);
    });

  })




