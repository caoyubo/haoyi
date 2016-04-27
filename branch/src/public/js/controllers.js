angular.module('starter.controllers', ['ngCookies'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope,$stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('isLoginCtrl', function($scope,$rootScope,$cookieStore,$stateParams,$ionicViewSwitcher,$state, publicFunction) {
    $scope.isLogin = function(url){
      var userInfo = $cookieStore.get('userInfo');
      if(userInfo == undefined || userInfo==null){
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('login');
      }else{
       // $ionicViewSwitcher.nextDirection('forward');
        $state.go(url);
      }
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
