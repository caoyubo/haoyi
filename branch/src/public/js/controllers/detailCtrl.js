/**
 * Created by ljm on 2016/3/4.
 */

angular.module('detailCtrl', ['ngCookies'])
    .controller('detailCtrl', function ($scope, $cookieStore, $stateParams, $ionicViewSwitcher, $ionicHistory, $state, $ionicModal, $ionicBackdrop, $ionicActionSheet, globalService, publicFunction) {
        $scope.id = $stateParams.id;  //获取商品id
        $scope.historyBack = $stateParams.back;
        $scope.imgUrl = grobalUrl.imgUrl;
        $scope.detail = {};
        $scope.goodsNum = 1;
        $scope.specId = null;
        $scope.orderGoodsReqs = [];
        $scope.orderJson = {};
        $scope.user = $cookieStore.get('userInfo');
        $scope.specText = "";

        //返回到上一级页面
        $scope.backNav = function () {
            $ionicViewSwitcher.nextDirection('back');
            $ionicHistory.goBack();
            // publicFunction.backNav($scope.historyBack,$ionicViewSwitcher,$state);
        }

        $scope.request = {
            getGoodsDetail: function () {
                globalService.commonGet(grobalUrl.api.findById + "?id=" + $scope.id).then(function (result) {
                    if (result.code == 0) {
                        console.log("商品详情信息::");
                        console.log(result);
                        $scope.detail = result.data;
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                })
            },
            cartAdd: function () {
                var param = {
                    userid: $scope.user.uid,
                    goodsid: $scope.detail.goods.id,
                    specid: $scope.specId,
                    goodsnum: $scope.goodsNum
                }
                globalService.commonPost(grobalUrl.api.cartAdd, param).then(function (result) {
                    if (result.code == 0) {
                        console.log(result);
                        alert("加入购物车成功！");
                    } else {
                        console.log("加入购物车失败！");
                        console.log(result);
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            collection: function () {
                var param = {
                    uid: $scope.user.uid,
                    appId: grobalUrl.appId,
                    ptype: 0,
                    collectId: $scope.detail.goods.id
                }
                globalService.commonPost(grobalUrl.api.collection, param).then(function (result) {
                    console.log(result);
                    if (result.code == 0) {
                        console.log(result);
                        alert("收藏商品成功!");
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    console.log("请求失败！");
                    console.log(error);
                });
            }
        }

        $scope.isLogin = function (url) {
            publicFunction.isLogin(url, $scope.user, $ionicViewSwitcher, $state);
        }

        //下拉刷新
        $scope.doRefresh = function () {
            $scope.request.getGoodsDetail();
            $scope.specId = null;
            $scope.$broadcast("scroll.refreshComplete");
        }

        //购买数量-
        $scope.minus = function () {
            if ($scope.goodsNum > 1) {
                $scope.goodsNum--;
            }
        }

        //购买数量+
        $scope.plus = function () {
            if ($scope.goodsNum < 100) {
                $scope.goodsNum++;
            }
        }

        //加入购物车
        $scope.addCart = function () {

            if ($scope.specId == null) {
                alert("请选择规格！")
            } else {
                $scope.closeModal();
                //加入购物车
                $scope.request.cartAdd();
            }
        }

        //收藏商品
        $scope.collect = function () {
            $scope.request.collection();
        }

        //选择规格
        $scope.chooseSpec = function (specId, specAttrId) {
            console.log(specId + "::" + specAttrId);
            var spectext = {};
            $scope.specText = "";
            var specList = $scope.detail.goods_spec;
            for (var key in specList) {
                if (specList[key].id == specId) {
                    var specAttrList = specList[key].attributeValues;
                    for (var i in specAttrList) {
                        if (specAttrList[i].id == specAttrId) {
                            specAttrList[i].selected = true;
                            $scope.specId = specAttrId;
                        } else {
                            specAttrList[i].selected = false;
                        }
                    }
                }
            }
            //获取所有选中的规格
            for (var a in specList) {
                var specname = specList[a].attrname;
                var specAttrList = specList[a].attributeValues;
                for (var j in specAttrList) {
                    if (specAttrList[j].selected) {
                        var specAttrName = specAttrList[j].attrvaluename;
                        spectext[specname] = specAttrName;
                    }
                }
            }

            console.log(spectext);
            for (var b in spectext) {
                $scope.specText += (b + spectext[b] + "  ");
            }
        }


        //立即购买
        $scope.buyNow = function () {
            if ($scope.specId == null) {
                alert("请选择规格！！");
            } else {
                var specAndNum = {
                    specId: $scope.specId,
                    goodsNum: $scope.goodsNum
                }
                $scope.orderJson = {
                    specAndNum: specAndNum,
                    goodsInfo: $scope.detail
                }


                $cookieStore.put('orderJson', $scope.orderJson);
                $scope.closeModal();

                //立即购买前判断是否已经登录了
                $scope.isLogin('pay');

                // $ionicViewSwitcher.nextDirection('forward');
                // $state.go('pay');
            }
        }
        $scope.buyNow_jade = function () {
            if ($scope.specId == null) {
                alert("请选择规格！！");
            } else {
                var specAndNum = {
                    specId: $scope.specId,
                    goodsNum: $scope.goodsNum
                }
                $scope.orderJson = {
                    specAndNum: specAndNum,
                    goodsInfo: $scope.detail
                }

                $cookieStore.put('orderJson', $scope.orderJson);
                $scope.closeModal();

                //立即购买前判断是否已经登录了
                $scope.isLogin('pay-jade');

                //$ionicViewSwitcher.nextDirection('forward');
                //$state.go('pay-jade');
            }
        }

        //获取商品详情信息
        $scope.request.getGoodsDetail();

        $ionicModal.fromTemplateUrl("spec-modal.html", {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
    })



