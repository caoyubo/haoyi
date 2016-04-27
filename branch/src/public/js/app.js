// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCookies','ngCordova','ngSanitize','ionic-native-transitions','starter.directive','starter.controllers','loginCtrl',
  'registerCtrl','homeCtrl','userCtrl','categoryCtrl','cartCtrl','searchCtrl','detailCtrl','payCtrl', 'codeCtrl','luishuiCtrl','storeCtrl',
  'storeCategoryCtrl','myFakeScoreCtrl','orderCtrl','addressCtrl','addressEditCtrl','upgradeCtrl', 'setAccountCtrl','referencesCtrl','fakeScoreCtrl',
  'myFakeScoreCtrl','collectCtrl','payShortcutsCtrl','integralChooseCtrl','orderDetailCtrl','messageCtrl','messageDetailCtrl','lotteryCtrl','lotteryReviewCtrl',
  'evaluationListCtrl','evaluationCtrl','payCartCtrl','findCtrl','cardCtrl','cardEditCtrl','widthdrawCtrl','depositCtrl','integralCtrl','billCtrl',
  'payJadeCtrl','starter.services','golbal-service','diamondBillCtrl'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .provider('myCSRF',[function(){
    var headerName = 'X-CSRFToken';
    var cookieName = 'csrftoken';
    var allowedMethods = ['GET'];
        this.setHeaderName = function (n) {
            headerName = n;
        }
        this.setCookieName = function (n) {
            cookieName = n;
        }
        this.setAllowedMethods = function (n) {
            allowedMethods = n;
        }
        this.$get = ['$cookies', function ($cookies) {
            return {
                'request': function (config) {
                    if (allowedMethods.indexOf(config.method) === -1) {
                        // do something on success
                        config.headers[headerName] = $cookies[cookieName];
                    }
                    return config;
                }
            }
        }];
    }])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider) {
        $httpProvider.interceptors.push('myCSRF');

        //设置cookies认证
        $httpProvider.defaults.withCredentials = true;
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');


        // 调用原生页面切换，配置 ionic-native-transitions 属性
        $ionicNativeTransitionsProvider.setDefaultOptions({
            duration: 400, // in milliseconds (ms), default 400,
            slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default4
            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in,default -1
            androiddelay: -1, // same as above but for Android, default -1
            winphonedelay: -1, // same as above but for Windows Phone, default -1,
            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS andAndroid)
            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default0 (iOS and Android)
            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            backInOppositeDirection: true // Takes over default back transition and state backtransition to use the opposite direction transition to go back
        });
        // 配置默认页面切换效果
        $ionicNativeTransitionsProvider.setDefaultTransition({
            type: 'slide',
            direction: 'left'
        });
        // 配置默认页面返回切换效果
        $ionicNativeTransitionsProvider.setDefaultBackTransition({
            type: 'slide',
            direction: 'right'
        });

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'isLoginCtrl'
            })
            //首页
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            //用户中心
            .state('tab.user', {
                url: '/user',
                views: {
                    'tab-user': {
                        templateUrl: 'templates/user.html',
                        controller: 'userCtrl',
                        cache: false
                    }
                }
            })
            //分类
            .state('tab.category', {
                url: '/category',
                views: {
                    'tab-category': {
                        templateUrl: 'templates/category.html',
                        controller: 'categoryCtrl'
                    }
                }
            })
            //购物车
            .state('tab.find', {
                url: '/find',
                views: {
                    'tab-find': {
                        templateUrl: 'templates/find.html',
                        controller: 'findCtrl'
                    }
                }
            })
            //购物车
            .state('cart', {
                url: '/cart/:back',
                templateUrl: 'templates/cart.html',
                controller: 'cartCtrl'
            })
            // Each tab has its own nav history stack:
            //登录
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })
            //注册
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'registerCtrl'
            })
            //提交订单
            .state('pay', {
                url: '/pay',
                templateUrl: 'templates/pay.html',
                controller: 'payCtrl',
                cache: false
            })
            //从购物车提交订单
            .state('pay-cart', {
                url: '/pay-cart/:cartInfo',
                templateUrl: 'templates/pay-cart.html',
                controller: 'payCartCtrl',
                cache: false
            })

            //提交订单
              .state('pay-jade', {
                url: '/pay-jade',
                templateUrl: 'templates/pay-jade.html',
                controller: 'payJadeCtrl',
                cache : false
              })
              //订单处理中......
              .state('info', {
                url: '/info',
                templateUrl: 'templates/info.html',
                controller: ''
              })


            //收货地址
            .state('address', {
                url: '/address',
                templateUrl: 'templates/address.html',
                controller: 'addressCtrl',
                cache: false
            })

            //收货地址
            .state('address-edit', {
                url: '/address-edit/:id',
                templateUrl: 'templates/address-edit.html',
                controller: 'addressEditCtrl'
            })

            //搜索页
            .state('search', {
                url: '/search',
                templateUrl: 'templates/search.html',
                controller: ''
            })
            //商品详情
            .state('detail', {
                url: 'detail/:id:back',
                templateUrl: 'templates/detail.html',
                controller: 'detailCtrl',
                cache: true
            })
            //翡翠商品详情
            .state('detail-jade', {
                url: 'detail-jade/:id',
                templateUrl: 'templates/detail-jade.html',
                controller: 'detailCtrl'
            })
            //我的订单
            .state('order', {
                url: '/order',
                templateUrl: 'templates/order.html',
                controller: 'orderCtrl'
            })

            //订单详情
            .state('order-detail', {
                url: '/order-detail/:id',
                templateUrl: 'templates/order-detail.html',
                controller: 'orderDetailCtrl'
            })
            /*.state('order', {
             url: '/order',
             templateUrl: 'templates/order.html',
             controller: ''
             })*/

            //账户设置
            .state('set-account', {
                url: '/set-account',
                templateUrl: 'templates/set-account.html',
                controller: 'setAccountCtrl'
            })

            //推荐人列表
            .state('getReferences', {
                url: '/getReferences',
                templateUrl: 'templates/getReferences.html',
                controller: 'referencesCtrl'
            })

            //我的收藏
            .state('collect', {
                url: '/collect',
                templateUrl: 'templates/collect.html',
                controller: 'collectCtrl'
            })
            //商家中心
            .state('businessCenter', {
                url: '/businessCenter',
                templateUrl: 'templates/businessCenter.html',
                controller: ''
            })

            //我的假积分
            .state('my-fake-score', {
                url: '/my-fake-score',
                templateUrl: 'templates/my-fake-score.html',
                controller: 'myFakeScoreCtrl'
            })
            //我的积分
            .state('integral', {
                url: '/integral',
                templateUrl: 'templates/integral.html',
                controller: 'integralCtrl'
            })
            //提现
            .state('withdraw', {
                url: '/withdraw',
                templateUrl: 'templates/withdraw.html',
                controller: 'widthdrawCtrl',
                cache:'false'
            })
            //选择账户
            .state('chooseAccount', {
                url: '/chooseAccount',
                templateUrl: 'templates/chooseAccount.html',
                controller: ''
            })
            //钻石账单
            .state('diamond-bill', {
                url: '/diamond-bill',
                templateUrl: 'templates/diamond-bill.html',
                controller: 'diamondBillCtrl',
                cache:'false'
            })
            //积分账单
            .state('bill', {
                url: '/bill',
                templateUrl: 'templates/bill.html',
                controller: 'billCtrl'
            })
            //最近查看
            .state('recent-look', {
                url: '/recent-look',
                templateUrl: 'templates/recent-look.html',
                controller: ''
            })
            //售后服务
            .state('after-service', {
                url: '/after-service',
                templateUrl: 'templates/after-service.html',
                controller: ''
            })
            //我的任务
            .state('my-task', {
                url: '/my-task',
                templateUrl: 'templates/my-task.html',
                controller: ''
            })
            //我的推广用户
            .state('extension-user', {
                url: '/extension-user',
                templateUrl: 'templates/extension-user.html',
                controller: ''
            })
            //我的邀请码
            .state('code', {
                url: '/code',
                templateUrl: 'templates/code.html',
                controller: 'codeCtrl',
                cache: false
            })
            //积分充值
            .state('deposit', {
                url: '/deposit',
                templateUrl: 'templates/deposit.html',
                controller: 'depositCtrl'
            })

            //快速充值
            .state('deposit_2', {
                url: '/deposit_2',
                templateUrl: 'templates/deposit_2.html',
                controller: ''
            })

            //选择充值的账户
            .state('choose-account', {
                url: '/choose-account',
                templateUrl: 'templates/choose-account.html',
                controller: ''
            })

            //会员升级
            .state('upgrade', {
                url: '/upgrade/:level',
                templateUrl: 'templates/upgrade2.html',
                controller: 'upgradeCtrl',
            })

            //流水
            .state('luishui', {
                url: '/luishui/:level',
                templateUrl: 'templates/luishui.html',
                controller: 'luishuiCtrl'
            })
            //升级费用说明
            .state('introductions-cost', {
                url: '/introductions-cost',
                templateUrl: 'templates/introductions-cost.html',
                controller: ''
            })
            //选择积分
            .state('integral-choose', {
                url: '/integral-choose',
                templateUrl: 'templates/integral-choose.html',
                controller: 'integralChooseCtrl'
            })

            //店铺
            .state('store', {
                url: '/store/:shopid',
                templateUrl: 'templates/store.html',
                controller: 'storeCtrl'
            })

            //店铺 分类筛选
            .state('store-category', {
                url: '/store-category/:shopid',
                templateUrl: 'templates/store-category.html',
                controller: 'storeCategoryCtrl'
            })

            //店铺搜索
            .state('store-search', {
                url: '/store-search/:categoryId',
                templateUrl: 'templates/store-search.html',
                controller: 'searchCtrl'
            })
            //开店
            .state('store-register', {
                url: '/store-register',
                templateUrl: 'templates/store-register.html',
                controller: ''
            })

            //绑定支付
            .state('store-register2', {
                url: '/store-register2',
                templateUrl: 'templates/store-register2.html',
                controller: ''
            })

            //选择快捷支付
            .state('pay-shortcuts', {
                url: '/pay-shortcuts',
                templateUrl: 'templates/pay-shortcuts.html',
                controller: 'payShortcutsCtrl'
            })
            //选择银行卡
            .state('bankcard-choose', {
                url: '/bankcard-choose',
                templateUrl: 'templates/bankcard-choose.html',
                controller: ''
            })
            //支付验证
            .state('pay-code', {
                url: '/pay-code',
                templateUrl: 'templates/pay-code.html',
                controller: ''
            })
            //绑定银行卡
            .state('card', {
                url: '/card',
                templateUrl: 'templates/card.html',
                controller: 'cardCtrl',
                cache: false
            })
            //绑定银行卡
            .state('card-edit', {
                url: '/card-edit',
                templateUrl: 'templates/card-edit.html',
                controller: 'cardEditCtrl'
            })

            //假积分兑换抢购
            .state('fake-score', {
                url: '/fake-score',
                templateUrl: 'templates/fake-score.html',
                controller: 'fakeScoreCtrl'
            })

            //假积分兑换商品提交订单
            .state('fake-score-pay', {
                url: '/fake-scorepay',
                templateUrl: 'templates/fake-score-pay.html',
                controller: ''
            })
            //预售
            .state('presale', {
                url: '/presale',
                templateUrl: 'templates/presale.html',
                controller: ''
            })
            //消息列表
            .state('message', {
                url: '/message',
                templateUrl: 'templates/message.html',
                controller: 'messageCtrl',
                cache: false
            })
            //消息详情
            .state('message-detail', {
                url: '/message-detail/:id',
                templateUrl: 'templates/message-detail.html',
                controller: 'messageDetailCtrl'
            })

            //活动
            .state('active', {
                url: '/active',
                templateUrl: 'templates/active.html',
                controller: ''
            })
            //账户与安全
            .state('account-security', {
                url: '/account-security',
                templateUrl: 'templates/account-security.html',
                controller: ''
            })
            //评价列表
            .state('evaluation-list', {
                url: '/evaluation-list/:goodsId',
                templateUrl: 'templates/evaluation-list.html',
                controller: 'evaluationListCtrl'
            })
            //评价
            .state('evaluation', {
                url: '/evaluation/:orderId',
                templateUrl: 'templates/evaluation.html',
                controller: 'evaluationCtrl'
            })
            //物流详情
            .state('detail-logistics', {
                url: '/detail-logistics',
                templateUrl: 'templates/detail-logistics.html',
                controller: ''
            })
            //忘记密码
            .state('forget-password', {
                url: '/forget-password',
                templateUrl: 'templates/forget-password.html',
                controller: ''
            })

            //抽奖
            .state('lottery', {
                url: '/lottery',
                templateUrl: 'templates/lottery.html',
                controller: 'lotteryCtrl'
            })

            //往期回顾
            .state('lottery-review', {
                url: '/lottery-review',
                templateUrl: 'templates/lottery-review.html',
                controller: 'lotteryReviewCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    });
