angular.module('starter.services', ['ngCookies'])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('fromStateServ', function() {
  return {
    data: {},
    setState: function(module, fromState, fromParams) {
      this.data[module] = {
        "fromState": fromState,
        "fromParams": fromParams
      };
    },
    getState: function(module) {
      return this.data[module];
    }
  };
})
.factory('publicFunction',function() {
  return {
    isLogin : function(url,user,$ionicViewSwitcher,$state,param){
      var user = user;
      if(user == undefined || user==null){
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('login');
      }else{
        $ionicViewSwitcher.nextDirection('forward');
        if(param!=undefined ||param!=null||param!=""){
          $state.go(url,param);
        }else{
          $state.go(url);
        }

      }
    },
    backNav : function(historyBack,$ionicViewSwitcher,$state){
      $ionicViewSwitcher.nextDirection('back');
      $state.go(historyBack);
    }
  }
});
