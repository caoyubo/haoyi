/**
 * Created by ljm on 2016/1/28.
 */
angular.module('loginCtrl', ['ngCookies'])
.controller('loginCtrl',function($scope,$cookieStore,$ionicBackdrop,$ionicViewSwitcher,$state,globalService) {
    $scope.user = {
      username:"",
      passwd:""
    }
    $scope.backdrop = false;
    $scope.login = function(userForm){
      if(userForm.$valid){
        $scope.backdrop = true; //点击登录后锁屏
        var params = $scope.user;
        globalService.commonPost(grobalUrl.api.loginPost,params).then(function(result){
          console.log(result);

          $cookieStore.put('apihost',result.apihost);//保存用户信息到cookie

          //登录成功
          if(result.r == 1){
            $scope.backdrop = false;
            $cookieStore.put('userInfo',result.data);//保存用户信息到cookie
            //获取推荐码
            globalService.commonGet(grobalUrl.api.getUserInfo+"?uid="+result.data.uid).then(function(data){
              console.log("==============获取用户信息:");
              console.log(data);

              if(data.data.code != undefined ||data.data.code !=''||data.data.code != null){
                //记录推荐码
                //$rootScope.tjcode = data.data.code;
                 $cookieStore.put("tjcode",data.data.code);
              }
              //alert($rootScope.tjcode);
              //location.href = "#/tab/home";
              $state.go('tab.user');

            },function(err){
              console.log("获取用户信息失败！！");
            });
          }else{
            $scope.backdrop = false;
            alert(result.errmsg);
          }
        },function(error){
          $scope.backdrop = false;
          alert("登录失败");
          console.log("请求失败！");
          console.log(error);
        })
      }else{
        console.log("验证没通过哦！！");
      }
    }
  })
