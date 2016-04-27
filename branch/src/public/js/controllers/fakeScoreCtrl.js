/**
 * Created by ljm on 2016/1/28.
 */
angular.module('fakeScoreCtrl', ['ngCookies'])
  .controller('fakeScoreCtrl',function($scope,$ionicModal,$ionicViewSwitcher,$cookieStore,$timeout,$state,globalService,publicFunction) {

    $scope.user = $cookieStore.get('userInfo');
    $scope.goodsList = [];
    $scope.goods = {};
    $scope.slideImgList = [];
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.isSlide = false;
    $scope.spreadGoods = [];  //推廣商品
    $scope.moreDataCanBeLoaded = true;

    $scope.request = {
      findGoods : function(currentPage){
        var param = {
          goodsname : "",
          goodsid : "",
          brandid : "",
          shopid : "",
          currentPage : currentPage,
          pageSize : constant.PAGESIZE
        }
        globalService.commonPost(grobalUrl.api.gift_findGoods,param).then(function(result){
          console.log("查询翡翠商品::");
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

    $scope.request.findGoods(1);

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.request.findGoods(1);
      $scope.$broadcast("scroll.refreshComplete");
    }

      //上拉加载数据
     $scope.load_more = function(){
       $timeout(function(){
         if($scope.goods.hasNextPage){
           $scope.moreDataCanBeLoaded = true;
           console.log((parseInt($scope.goods.pageNum)+1));
           $scope.request.findGoods((parseInt($scope.goods.pageNum)+1));
           $scope.$broadcast("scroll.infiniteScrollComplete");
         }else{
           $scope.moreDataCanBeLoaded = false;
         }
       },500);
     }

    $scope.myHref = function(id){
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('detail-jade', {'id': id});
    }

      //判断是否登录
      $scope.isLogin = function(url){
        publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'tab.home'});
      }
  })
