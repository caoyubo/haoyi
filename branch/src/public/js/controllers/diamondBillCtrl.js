/**
 * Created by marlowe on 2016/4/22.\
 * ×êÊ¯ÕËµ¥
 */
var diamondBill = angular.module('diamondBillCtrl', ['ngCookies'])
diamondBill.controller('diamondBillCtrl', function ($scope, $cookieStore, $ionicViewSwitcher, $state, $ionicPopup, $ionicActionSheet, $ionicHistory, globalService) {
    $scope.user = $cookieStore.get('userInfo');
    var diamondBillCon = $scope.diamondBillCon = {
        moredata: false,
        currentPage: 1,
        doRefresh: function () {
            $scope.$broadcast('scroll.refreshComplete');
        },
        loadMore: function () {
            globalServiceLoadMore(diamondBillCon.currentPage);
            diamondBillCon.currentPage += 1;
        }
    }
    $scope.items = [];
    function globalServiceLoadMore(currentPage){
        var param ={
            "ownerid":$scope.user.uid,
            "currentPage":currentPage,
            "pageSize":10
        }
        globalService.commonPost(grobalUrl.api.diamondFindWithdraw,param).then(function(result){
            console.log(result)
            var items = result.data.list;
            for (var i in items) {
                items[i]['goods_image'] = grobalUrl.ImgUrl + items[i]['goods_image'];
                $scope.items.push(items[i]);
            }
            if (currentPage < result.data.lastPage) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                diamondBillCon.moredata = true;
            }
        },function(err){
            console.log(err);
        })
    }



})
