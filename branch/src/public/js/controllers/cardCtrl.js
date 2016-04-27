/**
 * Created by ljm on 2016/4/18.
 */

angular.module('cardCtrl', ['ngCookies'])
    .controller('cardCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {
        $scope.user = $cookieStore.get('userInfo');
        $scope.noCard = true;
        $scope.accountBankReq = {
            operatetype : "",
             password : ""
        }
        var accountBank = $scope.accountBank = {
            diamondOperate : function(operatetype){  //
                $scope.accountBankReq.operatetype = operatetype; //设置银行卡的操作类型
                var param = {
                    operatetype : operatetype,
                    password : $scope.accountBankReq.password,
                    bankCardInfoReq : {
                        custCode : $scope.user.uid,
                        bankNum : "" ,
                        bankName : "" ,
                        bankPhone : ""
                    }
                }
                globalService.commonPost(grobalUrl.api.diamondOperate,param).then(function(result){
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
            }
        }
        //查找银行卡信息
        accountBank.diamondOperate('query');
    })

