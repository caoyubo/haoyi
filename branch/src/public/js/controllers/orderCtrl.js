/**
 * Created by ljm on 2016/3/18.
 */

angular.module('orderCtrl', ['ngCookies'])
  .controller('orderCtrl',function($scope,$cookieStore,$ionicActionSheet,$timeout,globalService) {
    $scope.order = {}
    $scope.orderList = [];
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.user = $cookieStore.get('userInfo');
    $scope.state = null;
    $scope.type = 0;
    $scope.moreDataCanBeLoaded = true;

    $scope.request = {
      orderList : function(currentPage,orderStatus){
        //获取支付类型
        var orderstatus = "";
        if(orderStatus != undefined && orderStatus!=null){
            orderstatus = orderStatus;
        }
        var param = {
          appid : grobalUrl.appId,
          buyerUid : $scope.user.uid,
          orderStatus : orderstatus,
          currentPage : currentPage,
          pageSize : constant.PAGESIZE
        }
        globalService.commonPost(grobalUrl.api.orderList,param).then(function(result){
          console.log("订单列表::");
          console.log(result);
          if(result.code == 0){
            $scope.order = result.data;
            if(result.data.list !=undefined && result.data.list != null){
              for(var key in result.data.list){
                $scope.orderList.push(result.data.list[key]);
              }
            }
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }

    /*$scope.request = {
      orderList : function(currentPage,orderStatus){
        //获取支付类型
        globalService.commonGet('data/order.json').then(function(result){
          console.log("订单列表::");
          console.log(result);
          if(result.code == 0){
            $scope.order = result.data;
            if(result.data.list !=undefined && result.data.list != null){
              for(var key in result.data.list){
                $scope.orderList.push(result.data.list[key]);
              }
            }
          }
        },function(error){
          console.log("请求失败！");
          console.log(error);
        });
      }
    }*/

    //获取订单列表
    $scope.request.orderList(1);

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.orderList = [];
      $scope.request.orderList(1);
      $scope.$broadcast("scroll.refreshComplete");
    }

    //上拉加载数据
    $scope.load_more = function(){
      $timeout(function(){
        if($scope.order.hasNextPage){
          $scope.moreDataCanBeLoaded = true;
          $scope.request.orderList((parseInt($scope.order.pageNum)+1),$scope.state);
          $scope.$broadcast("scroll.infiniteScrollComplete");
        }else{
          $scope.moreDataCanBeLoaded = false;
        }
      },500);
    }

    $scope.getOrderByState = function(state,type){
      $scope.type = type;
      $scope.state = state;
      $scope.orderList = [];
      $scope.request.orderList(1,state);
    }

  })

