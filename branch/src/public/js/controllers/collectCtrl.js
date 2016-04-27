/**
 * Created by ljm on 2016/3/23.
 */

angular.module('collectCtrl', ['ngCookies'])
  .controller('collectCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$timeout,$state,globalService) {

    $scope.user = $cookieStore.get('userInfo');

    $scope.sign = 0;
    $scope.collectGoods = {};
    $scope.collectStore = {};
    $scope.collectGoodsList = [];
    $scope.collectStoreList = [];
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.moreDataCanBeLoaded = true;

    $scope.request = {
      collectList : function(ptype,currentPage){
        var param = {
          uid :$scope.user.uid,
          ptype : ptype,
          currentPage : currentPage,
          pageSize : constant.PAGESIZE
        }
        globalService.commonPost(grobalUrl.api.collectList,param).then(function(result){
          console.log("我的收藏信息::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){
              if(param.ptype == 0){
                $scope.collectGoods = result.data;
                if(result.data.list){
                  console.log(result.data.list);
                  for(var key in result.data.list){
                    $scope.collectGoodsList.push(result.data.list[key]);
                  }
                }
              }
              if(param.ptype == 1){
                $scope.collectStore = result.data;
                if(result.data.list){
                  for(var key in result.data.list){
                    $scope.collectStoreList.push(result.data.list[key]);
                  }
                }
              }

            }
          }
        },function(error){
          console.log("我的收藏失败！");
          console.log(error);
        })
      },
      collectDel : function(id){
        globalService.commonGet(grobalUrl.api.collectionDel+"?id="+id).then(function(result){
          console.log("取消收藏::");
          console.log(result);
          if(result != undefined){
            if(result.code != undefined && result.code == "0"){

            }else{
              alert(result.mes);
            }
          }
        },function(error){
          console.log("取消收藏失败！");
          console.log(error);
        })
      }
    }


    //收藏的商品
    $scope.request.collectList(0,1);

    $scope.myCollect = function(ptype){
      $scope.sign = ptype;
      if(ptype == 0 && $scope.collectGoodsList.length<=0){
        $scope.request.collectList(ptype,1);
      }
      if(ptype == 1 && $scope.collectStoreList.length<=0){
        $scope.request.collectList(ptype,1);
      }
    }



    //上拉加载数据
    $scope.load_more = function(){
      //$scope.$broadcast("scroll.infiniteScrollComplete");
      if($scope.sign == 0){
        $timeout(function(){
          if($scope.collectGoods.hasNextPage){
            $scope.moreDataCanBeLoaded = true;
            $scope.request.collectList(0,(parseInt($scope.collectGoods.pageNum)+1));
            $scope.$broadcast("scroll.infiniteScrollComplete");
          }else{
            $scope.moreDataCanBeLoaded = false;
          }
        },500);
      }
      if($scope.sign == 1){
        $timeout(function(){
          if($scope.collectStore.hasNextPage){
            $scope.moreDataCanBeLoaded = true;
            $scope.request.collectList(1,(parseInt($scope.collectStore.pageNum)+1));
            $scope.$broadcast("scroll.infiniteScrollComplete");
          }else{
            $scope.moreDataCanBeLoaded = false;
          }
        },500);
      }
    }

    $scope.collect_del = function(id){
      $scope.request.collectDel(id);
    }

  })


