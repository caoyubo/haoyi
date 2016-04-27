/**
 * Created by ljm on 2016/1/28.
 */
angular.module('searchCtrl', [])
  .controller('searchCtrl',function($scope,$stateParams,$timeout,globalService) {
    $scope.goodsname = "";  //商品名称
    $scope.categoryId = ""; //商品分类Id
    $scope.goodsList = [];
    $scope.goods = {};
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.moreDataCanBeLoaded = true;
    if($stateParams.categoryId){
    $scope.categoryId = $stateParams.categoryId;
    }
    $scope.request = {
      findGoods : function(currentPage){
        var param = {
          goodsname : $scope.goodsname,
          goodsid : $scope.categoryId,
          brandid : "",
          shopid : "",
          currentPage : currentPage,
          pageSize : constant.PAGESIZE
        }
        globalService.commonPost(grobalUrl.api.findGoodsPost,param).then(function(result){
          console.log("goodsList::");
          console.log(result);
          if(result.code == "0"){
            $scope.goods = result.data;
            if(result.data.list !=undefined && result.data.list != null){
              for(var key in result.data.list){
                $scope.goodsList.push(result.data.list[key]);
              }
            }
          }
        },function(error){
          console.log("搜索商品失败！");
          console.log(error);
        })
      }
    }

    if($scope.categoryId != "" || $scope.categoryId != undefined || $scope.categoryId != null){
      $scope.request.findGoods(1);
    }

    $scope.search = function(){
      $scope.request.findGoods(1);
    }

    //上拉加载数据
    $scope.load_more = function(){
      $timeout(function(){
        if($scope.goods.hasNextPage){
          $scope.moreDataCanBeLoaded = true;
          $scope.request.findGoods((parseInt($scope.goods.pageNum)+1));
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else{
          $scope.moreDataCanBeLoaded = false;
        }
      },500);
    }
  })
