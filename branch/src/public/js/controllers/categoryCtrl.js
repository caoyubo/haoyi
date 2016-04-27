/**
 * Created by ljm on 2016/2/15.
 */

angular.module('categoryCtrl', ['ngCookies'])
.controller('categoryCtrl',function($scope,$ionicModal,$ionicViewSwitcher,$cookieStore,$state,globalService,publicFunction) {

    $scope.scrollHieght = ((document.documentElement.clientHeight||document.body.clientHeight)-140)+"px";
    $scope.firstClass = [];
    //保存二三级分类的信息
    $scope.SecAndThrClassList = {};
    $scope.SecAndThrClass = {};//当前显示的二三级分类信息

    $scope.user = $cookieStore.get('userInfo');

        $scope.request = {
            findSecAndThrClass : function(classId){
                globalService.commonGet(grobalUrl.api.findSecAndThrClass+"?goodsclassid="+classId).then(function(result) {
                    if (result.code == 0) {
                        /*console.log("获取二三级分类:");
                         console.log(result.data);*/
                        $scope.SecAndThrClassList['SecAndThr_'+classId] = result.data;
                        $scope.SecAndThrClass = result.data;
                        console.log("SecAndThrClass::");
                        console.log($scope.SecAndThrClass);
                    }
                },function(error){
                    console.log(error);
                });
            },
            findFirstClass : function(){
                globalService.commonGet(grobalUrl.api.findFirstClass).then(function(result){
                    if(result.code == 0){
                        $scope.firstClass = result.data;
                        console.log($scope.firstClass[0].selected);
                        $scope.firstClass[0].selected = true;
                        /* console.log("firstClass::");
                         console.log($scope.firstClass);*/

                        //获取二三级分类
                        $scope.getSecAndThrClass($scope.firstClass[0].goods_class.id);

                    }else{
                        console.log("获取一级分类：");
                        console.log(result.mes);
                    }

                },function(error){
                    console.log(error);
                });
            }
        }


    //获取二三级分类数据
    $scope.getSecAndThrClass = function(classId){
      //console.log("classId::"+classId);
      $scope.request.findSecAndThrClass(classId);
    }

    //一级分类点击
    $scope.getChildClass = function(classId){
      console.log("classId::"+classId);
      var firstClass = $scope.firstClass;
      for(var key in firstClass){
        if(firstClass[key].goods_class.id == classId){
          if(firstClass[key].hasOwnProperty('selected')){
            firstClass[key].selected = true;
            $scope.SecAndThrClass = $scope.SecAndThrClassList['SecAndThr_'+classId];
          }else{//如果是第一次点击，去请求数据
            firstClass[key].selected = true;
            $scope.getSecAndThrClass(classId);
          }
        }else{
          if(firstClass[key].hasOwnProperty('selected')){
            firstClass[key].selected = false;
          }else{
          }
        }
      }
    }

    //获取一级分类
        $scope.request.findFirstClass();

    //判断是否登录
    $scope.isLogin = function(url){
        publicFunction.isLogin(url,$scope.user,$ionicViewSwitcher,$state,{back:'tab.category'});
    }

    $ionicModal.fromTemplateUrl("my-modal.html", {
        scope: $scope,
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.removeModal = function() {
        $scope.modal.remove();
    };
  })

