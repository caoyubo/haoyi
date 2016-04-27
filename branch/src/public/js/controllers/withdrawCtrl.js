/**
 * Created by ljm on 2016/4/18.
 * 体现
 */
angular.module('widthdrawCtrl', ['ngCookies'])
    .controller('widthdrawCtrl',function($scope,$cookieStore,$ionicViewSwitcher,$state,$ionicPopup,$ionicActionSheet,$ionicHistory,globalService) {
        $(".button-dark").attr("disabled",true);
        $scope.user = $cookieStore.get('userInfo');
        $scope.diamond = {};
        $scope.PointsWaitDrawalsReq  = {
            point         : "",
            type          : 0,
            remarks       : "",
            ownerid       :$scope.user.uid,
            transpassword :"",
            fee:0
        }
        $scope.bankCardInfoReq = {
            custCode : $scope.user.uid,
            bankNum : "" ,
            bankName : "" ,
            bankPhone : ""
        }
        $scope.accountBankReq = {
            password : ""
        }
        var withdraw = $scope.withdraw = {
            change:function(){
                $(".button-dark").attr("disabled",false);
            },
            diamondOperate : function(operatetype){ //查询该用户是否绑定银行卡
                var param = {
                    operatetype :operatetype,
                    password : $scope.accountBankReq.password,
                    bankCardInfoReq : $scope.bankCardInfoReq
                }
                globalService.commonPost(grobalUrl.api.diamondOperate,param).then(function(result){
                    if(result.code == "0"){
                        if(result.data == "该用户没有绑定银行卡"){
                            $ionicPopup.confirm({
                                title: result.data,
                                cancelText:'取消',
                                okText: '确认',
                            }).then(function (res) {
                                console.log(res);
                                if(res == true){
                                    location.href='#/card'
                                }
                            })
                        }else{
                            $scope.bankCardInfoReq = JSON.parse(result.data);
                            console.log($scope.bankCardInfoReq);
                        }
                    }else{
                        alert(result.mes);
                    }
                },function(error){
                    console.log(error);
                })
            },
            getDiamond: function () {  //查找钻石信息
                globalService.commonGet(grobalUrl.api.diamond+"?uid="+$scope.user.uid).then(function (result) {
                    console.log("钻石积分信息::");
                    console.log(result);
                    if (result.code == 0) {
                        $scope.diamond = result.data.result;
                    } else {
                        alert(result.mes);
                    }
                }, function (error) {
                    console.log("请求失败!");
                    console.log(error);
                });
            },
            embody:function(cardForm){ //体现
                if(cardForm.$valid){
                    withdraw.showPopup();
                }else{
                    $(".button-dark").attr("disabled",'disabled');
                }
            },
            embodyDiamondWithdraw:function(){ //ti
                var param = $scope.PointsWaitDrawalsReq;
                console.log(param);
                globalService.commonPost(grobalUrl.api.diamondWithdraw,param).then(function(result){
                    console.log(result);
                    if(result.code=='0'){
                        $ionicPopup.confirm({
                            title: result.mes,
                            cancelText:'取消',
                            okText: '确认',
                        }).then(function (res) {
                            console.log(res);
                            if(res == true){
                                location.href='#/integral'
                            }
                        })
                    }else{
                        $ionicPopup.confirm({
                            title: result.mes,
                            okText: '确认',
                        })
                    }
                },function(err){
                    console.log(err);
                });
            },
            showPopup:function(){ //支付密码
                $ionicPopup.show({
                    template: '<input type="password" ng-model="PointsWaitDrawalsReq.transpassword" value="">',
                    title: '请输入支付密码',
                    scope: $scope,
                    buttons: [
                        { text: '取消' },
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                console.log($scope.PointsWaitDrawalsReq.transpassword);
                                if ($scope.PointsWaitDrawalsReq.transpassword == "") {
                                    e.preventDefault();
                                }else{
                                    withdraw.embodyDiamondWithdraw();
                                }
                            }
                        },
                    ]
                });
            }

        }
        //查找银行卡信息
        withdraw.diamondOperate('query');
        //查找钻石信息
        withdraw.getDiamond();
    })

