/**
 * Created by marlowe on 2016/4/21.
 */
/**
 * Created by ljm on 2016/4/18.
 */

angular.module('cardEditCtrl', ['ngCookies'])
    .controller('cardEditCtrl', function ($scope, $cookieStore, $ionicViewSwitcher, $state, $ionicPopup, $ionicActionSheet, $ionicHistory, globalService) {
        $scope.user = $cookieStore.get('userInfo');
        $scope.diamond = {};
        $scope.bankCardInfoReq = {
            custCode: $scope.user.uid,
            bankNum: "",
            bankName: "",
            bankPhone: ""
        }
        $scope.accountBankReq = {
            operatetype: "",
            password: ""
        }
        $scope.noCard = true;
        var accountBank = $scope.accountBank = {
            diamondOperate: function (operatetype) {  //设置银行卡的操作类型 请求
                $scope.accountBankReq.operatetype = operatetype;
                var param = {
                    operatetype: $scope.accountBankReq.operatetype,
                    password: $scope.accountBankReq.password,
                    bankCardInfoReq: $scope.bankCardInfoReq
                }
                console.log(param);
                globalService.commonPost(grobalUrl.api.diamondOperate, param).then(function (result) {
                    console.log("银行卡操作::");
                    console.log(result);
                    console.log(operatetype);
                    if (result.code == "0") {
                        switch (operatetype) {
                            case 'query': //查询
                                //  var queryData=JSON.parse(result.data);
                                if (typeof(result.data) == 'string') {
                                    $scope.noCard = true;
                                    if (result.data == '该用户没有绑定银行卡') {
                                        console.log('11');
                                    } else {
                                        $scope.noCard = false;
                                        $scope.bankCardInfoReq = JSON.parse(result.data);
                                    }
                                } else {
                                    console.log(11);
                                    $scope.noCard = false;
                                    $scope.bankCardInfoReq = JSON.parse(result.data);
                                }
                                break;
                            case 'update': //更新
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
                                break;
                            case 'cancel': //解绑
                                $ionicPopup.confirm({
                                    title: result.data,
                                    cancelText:'取消',
                                    okText: '确认',
                                }).then(function (res) {
                                    if(res == true){
                                        location.href='#/card'
                                    }
                                })
                                break;
                            case 'bind'://绑卡
                                $scope.noCard = false;
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
                                break;
                        }
                    } else {
                        $ionicPopup.alert({
                            title: result.mes,
                            okText: '确认',
                        })
                    }
                }, function (error) {
                    console.log("查询银行卡失败！");
                    console.log(error);
                    $ionicPopup.alert({
                        title: error,
                        okText: '确认',
                    })
                })
            },
            showPopup: function (operateType) {
                $ionicPopup.show({
                    template: '<input type="password" ng-model="accountBankReq.password">',
                    title: '请输入支付密码',
                    scope: $scope,
                    buttons: [
                        {text: '取消'},
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if ($scope.accountBankReq.password == "") {
                                    e.preventDefault();
                                } else {
                                    accountBank.diamondOperate(operateType);
                                }
                            }
                        },
                    ]
                });
            },
            operate: function (operateType, cardForm) {
                //弹出框，输入支付密码
                if (operateType == 'cancel') {
                    accountBank.showPopup(operateType);
                } else {
                    if (cardForm.$valid) {
                        console.log("gergtryhrt");
                        accountBank.showPopup(operateType);
                    } else {
                        alert("验证不通过！");
                    }
                }
            }
        }
        //查找银行卡信息
        accountBank.diamondOperate('query');
    })

