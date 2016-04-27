/**
 * Created by ljm on 2016/4/14.
 */

angular.module('evaluationListCtrl', ['ngCookies'])
    .controller('evaluationListCtrl',function($scope,$cookieStore,$stateParams,$ionicViewSwitcher,$state,$ionicActionSheet,$timeout,globalService) {

        $scope.user = $cookieStore.get('userInfo');

        $scope.diamond = {};
        $scope.diam = {
            chooseDiam : 0
        }
        $scope.goodsId = "";
        $scope.evaluationList = [];
        $scope.evaluation = {};
        $scope.moreDataCanBeLoaded = true;
        if($stateParams.goodsId){
          $scope.goodsId = $stateParams.goodsId;
            console.log("goodsId::"+$stateParams.goodsId);
        }

        $scope.request = {
            findComment: function (goodsId,currentPage) {
                var param = {
                    goodsId : goodsId,
                    currentPage : currentPage,
                    pageSize : constant.PAGESIZE
                }
                globalService.commonPost(grobalUrl.api.findComment,param).then(function (result) {
                    console.log("商品评论列表信息::");
                    console.log(result);
                    if (result.code == 0) {
                        $scope.evaluation = result.data;
                        if(result.data.list !=undefined && result.data.list != null){
                            for(var key in result.data.list){
                                $scope.evaluationList.push(result.data.list[key]);
                            }
                        }
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    console.log("请求失败!");
                    console.log(error);
                });
            }
        }

        //查询商品评论列表
        if($scope.goodsId != ""){
            $scope.request.findComment($scope.goodsId,1)
        }

        //上拉加载数据
        $scope.load_more = function(){
            $timeout(function(){
                if($scope.evaluation.hasNextPage){
                    $scope.moreDataCanBeLoaded = true;
                    $scope.request.findComment($scope.goodsId,(parseInt($scope.goods.pageNum)+1));
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                }else{
                    $scope.moreDataCanBeLoaded = false;
                }
            },500);
        }

    })
