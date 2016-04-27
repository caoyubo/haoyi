/**
 * Created by ljm on 2016/4/18.
 */

angular.module('billCtrl', ['ngCookies'])
    .controller('billCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.billList = [];
        $scope.bill = {};
        $scope.AccountQueryDealLogCustCodeRequest  = {
            custCode : $scope.user.uid,
            dealType : "",
            dealStartTime :"",
            dealEndTime :"",
            monthDate : "",
            trsAmount : ""
        }


        $scope.request = {
            diamondGetDetail : function(){
                globalService.commonPost(grobalUrl.api.diamondGetDetail,$scope.AccountQueryDealLogCustCodeRequest).then(function(result){
                    console.log("查询账户交易明细::");
                    console.log(result);
                    if(result.code == "0"){
                        $scope.bill = result.data;
                        if(result.data.content!=undefined &result.data.content!=null){
                            for(var i in result.data.content){
                                $scope.billList.push(result.data.content[i]);
                            }
                        }
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("查询账户交易明细失败！");
                    console.log(error);
                })
            }
        }

        //查询账户交易明细
        $scope.request.diamondGetDetail();

        //下拉刷新
        $scope.doRefresh = function(){
            $scope.user = $cookieStore.get('userInfo');
            console.log("user::");
            console.log($scope.user);
            //获取钻石积分
            $scope.request.diamondGetDetail();
            $scope.$broadcast("scroll.refreshComplete");
        }

    })

