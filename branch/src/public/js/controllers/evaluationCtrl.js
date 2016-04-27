/**
 * Created by ljm on 2016/4/15.
 */

/**
 * Created by ljm on 2016/4/14.
 */

angular.module('evaluationCtrl', ['ngCookies'])
    .controller('evaluationCtrl',function($scope,$cookieStore,$stateParams,$ionicViewSwitcher,$state,$ionicActionSheet,$ionicHistory,$timeout,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.orderId = $stateParams.orderId;
        $scope.orderDetail = {};
        $scope.request = {
            orderDetail : function(){
                globalService.commonGet(grobalUrl.api.orderDetail+"?id="+$scope.orderId).then(function(result){
                    console.log("订单详情::");
                    console.log(result);
                    if(result.code == 0){
                        if(result.data.orderGoods){
                          for(var key in result.data.orderGoods){
                              result.data.orderGoods[key].score = 5;
                              result.data.orderGoods[key].comment = "";
                          }
                        }
                        $scope.orderDetail = result.data;
                        console.log(result.data);
                    }
                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                });
            },
            createComment : function(param){
                globalService.commonPost(grobalUrl.api.goodsComment,param).then(function(result){
                    console.log("评论::");
                    console.log(result);
                    if(result.code == 0){
                        $ionicViewSwitcher.nextDirection('back');
                        $ionicHistory.goBack();
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("请求失败！");
                    console.log(error);
                });}

        }

        //获取订单详情
        if($stateParams.orderId){
            $scope.request.orderDetail();
        }

        $scope.evaluate = function(){
            console.log("orderGoods::");
            console.log($scope.orderDetail.orderGoods);

            var reqList = [];
            for(var key in $scope.orderDetail.orderGoods){
                var req = {};
                   req.specId = $scope.orderDetail.orderGoods[key].specId;
                   req.score = $scope.orderDetail.orderGoods[key].score;
                   req.comment = $scope.orderDetail.orderGoods[key].comment;
                reqList.push(req);
            }

            var param = {
                orderId : $scope.orderId,
                reqList : reqList
            }

            console.log("evaluate::");
            console.log(param);
            $scope.request.createComment(param);
        }
    })

