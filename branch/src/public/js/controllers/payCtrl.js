/**
 * Created by ljm on 2016/3/8.
 */

angular.module('payCtrl', ['ngCookies'])
    .controller('payCtrl', function ($scope, $cookieStore, $ionicActionSheet, $stateParams, $ionicViewSwitcher, $state, globalService,$ionicPopup) {

        $scope.orderJson = $cookieStore.get('orderJson');
        console.log("orderJson::");
        console.log($scope.orderJson);

        $scope.specAndNum = $scope.orderJson.specAndNum;
        $scope.goodsInfo = $scope.orderJson.goodsInfo;
        $scope.specInfo = {};
        $scope.total = 0;

        // $cookieStore.put('orderJson',null);

        for (var key in $scope.goodsInfo.goods_spec) {
            for (var i in $scope.goodsInfo.goods_spec[key].attributeValues) {
                if ($scope.goodsInfo.goods_spec[key].attributeValues[i].id == $scope.specAndNum.specId) {
                    $scope.specInfo = $scope.goodsInfo.goods_spec[key].attributeValues[i]
                    console.log("specInfo::");
                    console.log($scope.specInfo);
                }
            }

        }

        //计算总金额
        $scope.total = (parseFloat($scope.specInfo.shopprice) * parseInt($scope.specAndNum.goodsNum));


        $scope.user = $cookieStore.get('userInfo');
        $scope.payList = [];
        $scope.addressList = [];
        $scope.address = "";
        $scope.addressId = null;

        /*//获取支付类型
         globalService.commonGet(grobalUrl.api.getPayList).then(function(result){
         if(result.code == 0){
         console.log("支付类型::");
         console.log(result);
         $scope.payList = result.data;
         }
         },function(error){
         console.log("请求失败！");
         console.log(error);
         });*/

       $scope.request = {
            addressList: function () { //查询收货地址列表
                globalService.commonGet(grobalUrl.api.addressList + "?uid=" + $scope.user.uid).then(function (result) {
                    if (result.code == 0) {
                        console.log("地址列表::");
                        console.log(result);
                        $scope.addressList = result.data;
                        for (var key in $scope.addressList) {
                            if ($scope.addressList[key].pdefault == 1) {
                                $scope.address = $scope.addressList[key].addressName + $scope.addressList[key].address;
                                $scope.addressId = $scope.addressList[key].id;
                            }
                        }
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            order: function (param) {
                globalService.commonPost(grobalUrl.api.order, param).then(function (result) {
                    console.log("提交订单::");
                    console.log(result);
                    if (result.code == 0) {
                        // location.href = "#/info";
                        //$cookieStore.put('orderJson',null);
                        $ionicViewSwitcher.nextDirection('forward');
                        //$state.go('pay-shortcuts');
                        //$state.go('info');
                        orderHttp(result.data.id);
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            }
        }

        //获取地址信息  85c69c815824bf95
        $scope.request.addressList();

        //提交订单
        $scope.submitOrder = function () {
            if ($scope.addressId == null) {
                alert("请先选择收货地址");
            } else {
                var param = {
                    buyerid: $scope.user.uid,
                    orderAddressReq: {id: $scope.addressId},
                    orderform: constant.CLIENTAGENT,
                    specIds: [{id: $scope.specAndNum.specId, goodsnum: $scope.specAndNum.goodsNum}]
                }

                console.log(param);
                $scope.request.order(param);

            }
        }

        //下拉刷新
        $scope.doRefresh = function () {
            $scope.request.addressList();
            $scope.$broadcast("scroll.refreshComplete");
        }

        $scope.user = $cookieStore.get('userInfo');
        function orderHttp(billid) { //支付
            var param = {
                "uid": $scope.user.uid,
                "terminalflag": "mobile",
                "billid": billid,
                "callbackmallurl": "http://haoyi.yn.com:42000/index#/order"
            }
            console.log(param);
            globalService.commonPost(grobalUrl.api.diamondGetPayData, param).then(function (result) {
                console.log(result);
                if(result.code==0){
                    var payParam = result.data;
                    console.log(payParam);
                  /*  globalService.commonPost(grobalUrl.api.integrationPay, payParam).then(function (result) {
                        console.log(result);
                        if(result.code==0){
                            location.href="";
                        }else{
                            $ionicPopup.alert({
                                title: result.message,
                                okText: '确认',
                            })
                        }
                    }, function (err) {
                        console.log(err)
                        $ionicPopup.alert({
                            title: err,
                            okText: '确认',
                        })
                    });*/
                }
            }, function (error) {
                console.log("请求失败！");
                console.log(error);
            })
        }


    })

