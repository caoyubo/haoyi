/**
 * Created by ljm on 2016/1/28.
 */
angular.module('homeCtrl', ['ngCookies'])
  .controller('homeCtrl',function($scope,$ionicModal,$ionicViewSwitcher,$cookieStore,$timeout,$state,globalService,publicFunction) {

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
      },
      findResourceByColId : function(colId){
        globalService.commonGet(grobalUrl.api.findResourceByColId+"?colId="+colId).then(function(result){
          if(colId == 1){
            console.log("首页轮番图::");
            console.log(result);
            if(result.code == "0"){
              $scope.slideImgList = result.data;
              $scope.isSlide = true;
            }
          }
          if(colId == 8){
            console.log("商品推廣::");
            console.log(result);
            if(result.code == "0"){
                if(result.data != undefined && result.data !=null){
                  $scope.spreadGoods = result.data;
                }
            }
          }
        },function(error){
          console.log("查询首页轮番图失败！");
          console.log(error);
        })
      }
    }

    $scope.request.findGoods(1);

    $scope.request.findResourceByColId(1);
    //商品推广
    $scope.request.findResourceByColId(8);

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.request.findGoods(1);
      $scope.request.findResourceByColId(8);
      //$scope.request.findResourceByColId();
      $scope.$broadcast("scroll.refreshComplete");
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

    $scope.myHref = function(id){
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('detail', {'id': id});
    }

      //判断是否登录
      $scope.isLogin = function(url){
        publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'tab.home'});
      }

    $ionicModal.fromTemplateUrl("my-modal.html", {
      scope: $scope,
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.removeModal = function() {
      $scope.modal.remove();
    };

  })
