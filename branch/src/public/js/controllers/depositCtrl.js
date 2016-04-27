/**
 * Created by ljm on 2016/4/18.
 */

angular.module('depositCtrl', ['ngCookies'])
    .controller('depositCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {

        $scope.user = $cookieStore.get('userInfo');
        $scope.diamond = {};
        $scope.PointsWaitDrawalsReq  = {
            point         : "",
            type          : 0,
            remarks       : "",
            ownerid       :$scope.user.uid,
            transpassword :""

        }

        $scope.bankCardInfoReq = {
            custCode : $scope.user.uid,
            bankNum : "" ,
            bankName : "" ,
            bankPhone : ""
        }

        $scope.accountBankReq = {
            operatetype : "",
            password : ""
        }


        $scope.request = {
            diamondOperate : function(operatetype){
                $scope.accountBankReq.operatetype = operatetype; //设置银行卡的操作类型

                var param = {
                    operatetype : $scope.accountBankReq.operatetype,
                    password : $scope.accountBankReq.password,
                    bankCardInfoReq : $scope.bankCardInfoReq

                }
                console.log( param );
                globalService.commonPost(grobalUrl.api.diamondOperate,param).then(function(result){
                    console.log("银行卡操作::");
                    console.log(result);
                    if(result.code == "0"){
                        if(result.data == "该用户没有绑定银行卡"){
                            $scope.noCard = true;
                        }else{
                            $scope.noCard = false;
                            $scope.bankCardInfoReq = result.data;
                        }

                        if(operatetype != 'query'){
                            $ionicViewSwitcher.nextDirection('back');
                            $ionicHistory.goBack();
                        }
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("查询银行卡失败！");
                    console.log(error);
                })
            },
            diamondWithdraw : function(param){
                globalService.commonPost(grobalUrl.api.diamondWithdraw,param).then(function(result){
                    console.log("充值操作::");
                    console.log(result);
                    if(result.code == "0"){

                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log("充值失败！");
                    console.log(error);
                })
            }
        }
        //查找银行卡信息
        $scope.request.diamondOperate('query');

        $scope.showPopup = function(){
            $ionicPopup.show({
                template: '<input type="password" ng-model="PointsWaitDrawalsReq.transpassword">',
                title: '请输入支付密码',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if ($scope.PointsWaitDrawalsReq.transpassword == "") {
                                e.preventDefault();
                            } else {
                                console.log($scope.PointsWaitDrawalsReq);
                                $scope.request.diamondWithdraw($scope.PointsWaitDrawalsReq);
                            }
                        }
                    },
                ]
            });
        }

        $scope.deposit = function(){
            //弹出框，输入支付密码
            if(cardForm.$valid){
                $scope.showPopup();

            }else{
                alert("验证不通过！");
            }


        }

    })

