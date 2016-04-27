/**
 * Created by ljm on 2016/3/14.
 */

angular.module('storeCtrl', ['ngCookies'])
  .controller('storeCtrl',function($scope,$stateParams,$cookieStore,$ionicViewSwitcher,$state,globalService,publicFunction) {
    $scope.shopid = $stateParams.shopid;  //获取店铺id
    console.log($scope.shopid);
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.storeInfo = {};
    $scope.goodsList = [];
    $scope.shopFans = []
    $scope.user = $cookieStore.get('userInfo');
    $scope.fans = 0;
    $scope.select = {};


    $scope.request = {
      collection : function(param){
        globalService.commonPost(grobalUrl.api.collection,param).then(function(result){
          console.log(result);
          if(result.code == 0){
            console.log(result);
            alert("收藏店铺成功!");
          }else{
            alert(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      findStoreInfo : function(){
        globalService.commonGet(grobalUrl.api.findStoreInfo+"?shopId="+$scope.shopid).then(function(result){
          if(result.code == 0){
            console.log("店铺详细信息::");
            console.log(result);
            $scope.storeInfo = result.data;
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      goodsByShopId : function(){
        globalService.commonGet(grobalUrl.api.goodsByShopId+"?shopid="+$scope.shopid).then(function(result){
          if(result.code == 0){
            console.log("店铺销售商品列表::");
            console.log(result);
            $scope.goodsList = result.data;
          }else{
            console.log(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      fans_select : function(){
        globalService.commonGet(grobalUrl.api.fans_select+"?shopId="+$scope.shopid+"&userId="+$scope.user.uid).then(function(result){
          console.log("粉丝关系::");
          console.log(result);
          if(result.code == 0){
            $scope.select = result.data;
          }else{
            console.log(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      fans_count : function(){
        globalService.commonGet(grobalUrl.api.fans_count+"?shopId="+$scope.shopid).then(function(result){
          console.log("店铺粉丝数::");
          console.log(result);
          if(result.code == 0){
            $scope.fans = result.data;
          }else{
            console.log(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      fans_create : function(){
        var param = {
          shopId : $scope.shopid,
          userId : $scope.user.uid
        }
        globalService.commonPost(grobalUrl.api.fans_create,param).then(function(result){
          console.log("关注店铺::");
          console.log(result);
          if(result.code == 0){
            alert(result.mes);
            $scope.request.fans_select();
            $scope.request.fans_count();
          }else{
            console.log(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      },
      fans_delete : function(){
        globalService.commonGet(grobalUrl.api.fans_delete+"?shopId="+$scope.shopid+"&userId="+$scope.user.uid).then(function(result){
          console.log("取消关注店铺::");
          console.log(result);
          if(result.code == 0){
            $scope.request.fans_select();
            $scope.request.fans_count();
          }else{
            console.log(result.mes);
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    $scope.myHref = function(id){
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('detail', {'id': id});
    }

    //判断是否登录
    $scope.isLogin = function(url){
      publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'store'});
    }

      //收藏店铺
    $scope.collectStore = function(){

      if($scope.user == undefined || $scope.user==null){
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('login');
      }else{
        var param = {
          uid : $scope.user.uid,
          appId : grobalUrl.appId,
          ptype : 1,
          collectId : $scope.storeInfo.id
        }
        $scope.request.collection(param);
      }
    }

    //关注店铺
    $scope.follow = function(){
      $scope.request.fans_create();
    }

    //取消关注店铺
    $scope.canel = function(){
      $scope.request.fans_delete();
    }

    //获取店铺详情信息
      $scope.request.findStoreInfo();

    //取得指定商户的可销售商品列表
      $scope.request.goodsByShopId();

      $scope.request.fans_count();

      if($scope.user!=undefined && $scope.user!==null){
        $scope.request.fans_select();
      }
  })



