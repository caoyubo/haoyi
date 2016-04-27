
angular.module('starter.directive',[])
    //返回上一页
.directive('backNav',function(){
  return{
    restrict :'EA',
    scope : {},
    template : '<a class="button button-icon icon ion-ios-arrow-thin-left" ng-click="gotoback()"></a>',
    controller : function($scope,$ionicViewSwitcher,$ionicHistory){
      $scope.gotoback = function(){
        $ionicViewSwitcher.nextDirection('back');
        $ionicHistory.goBack();
      }
    }
  };
})

