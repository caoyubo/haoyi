/**
 * Created by ljm on 2016/2/15.
 */

angular.module('cartCtrl', ['ngCookies'])
  .controller('cartCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$ionicHistory,$stateParams,$state,globalService,publicFunction) {

    $scope.historyBack = $stateParams.back;
    $scope.isCartListNull = false;
    $scope.edit = false;
    $scope.complet = true;
    $scope.cartList = [];
    $scope.cartIds = [];//被选中的商品的购物车id列表
    $scope.imgUrl = grobalUrl.imgUrl;
    $scope.user = $cookieStore.get('userInfo');
    $scope.totalPrice = 0;

    $scope.orderGoodsReqs = [];
    $scope.orderJson = {};

    //返回到上一级页面
    $scope.backNav = function(){
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack();
      //publicFunction.backNav($scope.historyBack,$ionicViewSwitcher,$state);
    }

      //全选
    $scope.all = {
      isChecked : false
    };

    $scope.request = {
      findCartList : function(){
        //购物车列表
        globalService.commonGet(grobalUrl.api.findCartList+"?appId="+grobalUrl.appId+"&userId="+$scope.user.uid).then(function(result){
          if(result.code == 0){
            $scope.cartList = result.data;
            console.log("购物车列表::");
            console.log(result);
            $scope.cartList = result.data;

            //默认购物车里的商品全不选
            $scope.all_isChoose($scope.cartList,false);

            if(result.data.length == 0){
              $scope.isCartListNull = true;
            }

          }else{
            console.log(result);
            console.log(result.mes);
          }

        }, function(error){
          console.log(error);
        });
      },
      updateNumber : function(goods){
        globalService.commonGet(grobalUrl.api.updateNumber+"?id="+goods.id+"&number="+goods.goodsnum).then(function(result){
          console.log("购物车商品数量加减::");
          console.log(result);
          if(result.code == 0){

          }else{
            console.log(result);
            console.log(result.mes);
          }

        }, function(error){
          console.log(error);
        });
      },
      cartDel : function(param){
        globalService.commonPost(grobalUrl.api.cartDel,param).then(function(result){
          console.log("删除选中商品：：");
          console.log(result);
          if(result.code == 0){
            $scope.request.findCartList();  //刷新购物车列表
          }else{
            console.log(result.mes);
          }

        }, function(error){
          console.log(error);
        });
      }
    }

    //下拉刷新
    $scope.doRefresh = function(){
      $scope.request.findCartList();
      $scope.$broadcast("scroll.refreshComplete");
    }

    //批量删除
    $scope.delete_batch = function(){
      var ids = [];
      for(var key in $scope.cartList){
        for(var i in $scope.cartList[key].cartResps){
          if($scope.cartList[key].cartResps[i].isChecked){
            ids.push($scope.cartList[key].cartResps[i].id);
          }
        }
      }
      console.log("ids::");
      console.log(ids);
      var param = {
        ids : ids
      }
      $scope.request.cartDel(param);
      $scope.choose_complet();
    }

    //单个删除
    $scope.delete = function(id){
      var ids = [id];
      var param = {
        ids : ids
      };
      $scope.request.cartDel(param);
    }

    //去结算
    $scope.settlement = function(){
      $scope.getCartIds();
      console.log("去结算::"+$scope.cartIds);
      var cartInfo = {
        cartIds :$scope.cartIds,
        totalPrice :$scope.totalPrice
      }

      $ionicViewSwitcher.nextDirection('forward');
      $state.go('pay-cart',{cartInfo : JSON.stringify(cartInfo)});
    }

      //商品数量减
    $scope.minus = function(goods){
      if(goods.goodsnum>1){
        goods.goodsnum--;
        $scope.request.updateNumber(goods);

        $scope.totalPrice = 0;
        $scope.total();
      }
    }

      //商品数量加
    $scope.plus = function(goods){
      goods.goodsnum++;
      $scope.request.updateNumber(goods);

      $scope.totalPrice = 0;
      $scope.total();
    }

    $scope.choose_edit = function(){
      $scope.edit = true;
      $scope.complet = false;
    }

    $scope.choose_complet = function(){
      $scope.edit = false;
      $scope.complet = true;
    }

      //點擊全選checkbox
    $scope.choose_all = function(){
      if($scope.all.isChecked){
        $scope.all_isChoose($scope.cartList,true);
      }else{
        $scope.all_isChoose($scope.cartList,false);
      }

      $scope.totalPrice = 0;
      $scope.total();
    }

      //點擊店鋪checkbox
    $scope.choose_allinShop = function(shop,isChecked){
      var all = true;

      $scope.shop_isChoose(shop,isChecked);

      if(!isChecked){
        $scope.all.isChecked = isChecked;
        all = false;
      }else{ //判断是否全选了
        for(var key in $scope.cartList){
          if(!$scope.cartList[key].isChecked){
            all = false;
            return;
          }
        }
      }
      if(all){
        $scope.all.isChecked = true;
      }

      $scope.totalPrice = 0;
      $scope.total();
    }

      //點擊每一個商品的checkbox
    $scope.choose_each = function(shop,isChecked){
      var all = true;
      var shopall = true;
      if(!isChecked){
        all = false;
        shopall = false;
        if($scope.all.isChecked){
          $scope.all.isChecked = isChecked;
        }
        if(shop.isChecked){
          shop.isChecked = isChecked;
        }
      }else{
        for(var key in shop.cartResps){
          if(!shop.cartResps[key].isChecked){
            all = false;
            shopall = false;
            return;
          }
        }
        if(shopall){
          shop.isChecked = true;
          for(var key in $scope.cartList){
            if(!$scope.cartList[key].isChecked){
              all = false;
              return;
            }
          }
        }
        if(all){
          $scope.all.isChecked = true;
        }
      }


      $scope.totalPrice = 0;
      $scope.total();
    }

      //商品全选或全不选
    $scope.all_isChoose = function(cartList,isChecked){
      for(var key in cartList){
        cartList[key].isChecked = isChecked;
        for(var i in cartList[key].cartResps){
          cartList[key].cartResps[i].isChecked = isChecked;
        }
      }
    }

     //同一店铺下的商品全选或全不选
    $scope.shop_isChoose = function(shop,isChecked){
      shop.isChecked = isChecked;
      for(var key in shop.cartResps){
        shop.cartResps[key].isChecked = isChecked;
      }
    }

    //获取选中的商品的购物车id
    $scope.getCartIds = function(){
      $scope.cartIds = [];
      for(var key in $scope.cartList){
        for(var i in $scope.cartList[key].cartResps){
          if($scope.cartList[key].cartResps[i].isChecked){
            $scope.cartIds.push($scope.cartList[key].cartResps[i].id);
          }
        }
      }
    }

    //计算总价
    $scope.total = function(){
      for(var key in $scope.cartList){
        for(var i in $scope.cartList[key].cartResps){
          if($scope.cartList[key].cartResps[i].isChecked){
            var price = parseFloat($scope.cartList[key].cartResps[i].shopprice);
            var num = parseInt($scope.cartList[key].cartResps[i].goodsnum);
            $scope.totalPrice += (price*num);
          }
        }
      }
    }

    //请求购物车列表
    $scope.request.findCartList();
  })




