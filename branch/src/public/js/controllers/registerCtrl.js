/**
 * Created by ljm on 2016/1/28.
 */

angular.module('registerCtrl', ['ngCookies'])
  .controller('registerCtrl',function($scope,$cookieStore,$interval,$http,$stateParams,$ionicViewSwitcher,$state,globalService,$cordovaBarcodeScanner) {
    /*$scope.uid = $stateParams.uid;
     $scope.code = $stateParams.code;*/
    console.log("params:"+$stateParams.uid+"&&"+$stateParams.code);
    $scope.rcodeBtnText = "获取验证码";
    $scope.favor = {isChecked :false};
    $scope.user = {
      username:"",
      phone:"",
      passwd:"",
      repasswd:"",
      rcode:"",
      code:""
    };
    var second = 60,
      timePromise = undefined;

    //n秒后重发验证码
    var countdown = function(){
      timePromise = $interval(function(){
        if(second<=0){
          $interval.cancel(timePromise);
          timePromise = undefined;
          second = 60;
          $scope.rcodeBtnText = "重发验证码";
          $scope.isabled = false;
        }else{
          $scope.rcodeBtnText = second + "秒后可重发";
          second--;
          $scope.isabled = true;
        }
      },1000,100);
    }

    //获取验证码
    $scope.getRcode = function(){
      var params = {username:$scope.user.username,phone:$scope.user.phone};

      console.log("isChecked::");
      console.log($scope.isChecked);

      globalService.commonPost(grobalUrl.api.getRcodePost,params).then(function(result){
        if(result.r == 1){
          console.log(result);
          countdown();
        }else{
          alert(result.errmsg);
        }

      },function(error){
        console.log("请求失败！");
        console.log(error);
      })


    }

    //注册
    $scope.register = function(userForm){
      console.log("isChecked::");
      console.log($scope.favor.isChecked);
      if(userForm.$valid){
        console.log("isChecked::");
        console.log($scope.favor.isChecked);
        if($scope.favor.isChecked){
          var params =$scope.user;
          globalService.commonPost(grobalUrl.api.registerPost,params).then(function(result){
            console.log("注册::");
            console.log(result);

            $cookieStore.put('apihost',result.apihost);

            if(result.r == 1){
              alert("注册成功");
              $cookieStore.put('userInfo',result.data); //保存用户信息到cookie
              console.log("注册成功::");
              console.log($cookieStore.get('userInfo'));
              //获取推荐码
              globalService.commonGet(grobalUrl.api.getUserInfo+"?uid="+result.data.uid).then(function(data){
                console.log("==============获取用户信息:");
                console.log(data);

                if (data.code != "0"){
                  alert("获取推荐码失败");
                  //location.href = "#/tab/home";
                  $state.go('tab.user');
                  return;
                }

                if(data.data.code != undefined ||data.data.code !=''||data.data.code != null){
                  //记录推荐码
                  //$rootScope.tjcode = data.data.code;
                  $cookieStore.put("tjcode",data.data.code);
                }
                //alert($rootScope.tjcode);

                $state.go('tab.user');

              },function(err){
                console.log("获取用户信息失败！！");
              });
            }else{
              alert(result.errmsg);
            }
          },function(error){
            console.log("请求失败！");
            console.log(error);
          })
        }else{
          alert("请同意条款!!");
        }
      }else{
        console.log("验证不通过!!");
      }
    }


    //扫描二维码
    $scope.scanCode = function(){
      $cordovaBarcodeScanner.scan().then(function(imageData){
        var url = imageData.text;
        var paramsArr = url.split("?");
        var codeArr = paramsArr[1].split("&");
        var codes = codeArr[1].split("=");
        //alert(codes[1]);
        $scope.user.code = codes[1];
      }, function (error) {
        console("error:"+error);
      });
    }
  })


