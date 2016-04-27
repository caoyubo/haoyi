/**
 * 配置文件模块
 * @author kam
 * @date   20160127
 * @version 1.0.0
 *
 */
module.exports = {
  port: 45000,
  isdebug: true,
  islimit: false,
  logger: {
    appenders: [
      {type: 'console'}

    ],
    replaceConsole: true   //替换console.log

  },
  redis :{
    ip:'devredis',
    //ip: '172.16.110.179',
    //port:6397,
    port: 6379,
    prefix : '',//key前缀
    conf : {
      secret: 'ksksksksk',
      resave: true,
      saveUninitialized: true
    }
  },
  session: {

    /*  type: 'local',
     conf: {
     secret: 'ksksksksk',
     resave: false,
     saveUninitialized: true
     }*/
    type : 'redis',
    store: {
      host:'devredis',
      //host: '172.16.110.179',
      //port:6397,
      port: 6379,
      ttl : 60 * 60 * 24,     //过期时间为一天，默认也是一天
      prefix : 'haoyi' //key前缀
    },
    conf : {
      secret : 'ksksksksk',
      resave : true,
      saveUninitialized: true
    }
  },
  db: {
    defaults: {
      type: 'mysql',
      master: [            // 主库列表
        {
          host: '127.0.0.1',
          port: '3306',
          dbname: 'tiger',
          user: 'tiger_dba',
          passwd: 'qwe123',
          prefix: 'tiger_',
          options: {                       //链接池信息
            connectionLimit: 10,
            supportBigNumbers: true
          }
        }
      ],
      slave: []
    }
  },
  routes: [
    'index',
    'user',
    'goods',
    'address',
    'collection',
    'shop',
    'cart',
    'order',
    'cms',
    'gift',
    'jade',
    'diamond',
    'station',
    'lottery'
  ],
  /**
   * 登陆拦截器
   */
  login_filter:[
    '/user/getStatusByUid',         //获取状态
    '/user/getUserByUid',           //获取用户详情信息
    '/user/getUserByParent',        //根据父亲信息获取用户信息

    '/goods/cart_find',             //获取购物车列表


    '/jade/findByUid'
  ],

  api_address_list: {
    /**
     * 商品模块
     */
    haoyi_goods: {
      host: 'goods.api.haoyi',
      port: '35001',
      api: {
        sell                :'goods/get/sell/{{shopid}}',                           //app根据商户id取得可销售商品
        upstock             :'goods/up/stock/{{valueid}}/{{step}}',				          //app用，更新商品库存
        findGoods           :'goods/query',                                         //查找商品
        findByShopId        :'goods/query/shop/goodsclass/{{shopid}}',              //查询指定商户所有商品分类列表
        findFirstGoods      :'goods/query/one/goodsclass',                          //查询一级商品分类列表
        findByParent        :'goods/query/next/goodsclass/{{goodsclassid}}',        //根据上一级商品分类ID查询下一级商品分类列表
        findSecAndThr       :'goods/query/range/goodsclass/{{goodsclassid}}',       //根据第一级id查找第二和第三极分类
        findBrand           :'brand/findpage',                                      //根据品牌查找品牌列表
        findById            :'goods/querydetail/{{id}}',                            //根据id 查找商品详情
        cart_find           :'cart/findIntergrateCart/{{appId}}/{{userId}}',        //查找购物车
        cart_add            :'cart/add',                                            //加入购物车
        cart_del            :'cart/del/{{id}}',                                     //根据id删除购物车
        cart_updateNumber   :'cart/updateCartNumber/{{id}}/{{number}}',             //根据id和数量更新购物车
        cart_del_batch      :'cart/del/batch',                                       //批量删除购物车

        createComment       :'goods/comment/mulCreate',                             //评论商品
        findComment         :'goods/comment/findByGoodsId',                         //根据商品id查找评论列表
        deleteComment       :'goods/comment/delete/{{id}}'                          //根据id删除评论

      }
    },
    //FIXME 翡翠积分和钻石积分
    /**
     * 翡翠积分
     */
    haoyi_jade: {
      host: 'points.api.haoyi',
      port: '32001',
      api: {
        findByUid           :'points/get/{{uid}}',                                  //根据uid查找翡翠积分
        update              :'points/upandlock',                                    //更新库存
      }
    },
    haoyi_diamond:{
      //host: 'points.api.haoyi',
      host:'points.api.haoyi',
      port: '32001',
      api : {
        findByUid           :'account/bank/query/{{uid}}',                              //根据uid查找钻石
        getDetail           :'account/trans/flows',                                     //查询账户交易明细
        operate             :'account/bank/operate',                                    //银行卡操作
        checkPassword       :'account/check/password/{{uid}}/{{pwd}}',                  //校验密码
        modifyPassword      :'account/modify/pay/passwd/{{accname}}/{{oldpwd}}/{{newpwd}}',   //修改密码
        withdraw            :'points/withdrawals/one/save',                             //钻石积分提现
        findWithdraw        :'points/withdrawals/page',                                 //提现分页显示
      }
    },

    /**
     * 礼品模块
     */
    haoyi_gift: {
      host: 'giftgoods.api.haoyi',
      port: '39301',
      api: {
        upstock             :'goods/up/stock/{{valueid}}/{{step}}',				    //app用，更新礼品库存
        findGoods           :'goods/query',
        findFirstGoods      :'goods/query/one/goodsclass',                          //查询一级商品分类列表
        findByParent        :'goods/query/next/goodsclass/{{goodsclassid}}',        //根据上一级商品分类ID查询下一级商品分类列表
        findSecAndThr       :'goods/query/range/goodsclass/{{goodsclassid}}',       //根据第一级id查找第二和第三极分类
        findById            :'goods/querydetail/{{id}}',                            //根据id 查找商品详情
      }
    },

    /**
     * 用户中心
     */
    haoyi_usercenter:{
      host:'usercenter.api.haoyi',
      //host:   '172.16.110.163',
      port:   '36201',
      api :{
        //address router begin
        addr_add                :'address/add',                                     //增加地址
        addr_update             :'address/update',                                  //更新地址
        addr_findByUid          :'address/find/{{uid}}',                              //根据用户uid查找用户地址
        addr_findById           :'address/find/id/{{id}}',                            //根据用户id查找用户地址
        addr_delete             :'address/delete/{{id}}',                             //根据用户id删除用户地址
        addr_setDefault         :'address/set/default',                             //设置默认地址
        addr_getDefault         :'address/default/{{uid}}',                           //获取默认地址
        //address router end

        //collection router begin
        col_add                 :'collection/add',                                  //增加收藏
        col_delete              :'collection/delete/{{id}}',                          //根据id删除
        col_listpage            :'collection/listpage',                             //分页查询
        col_count               :'collection/count/id/{{id}}',                        //统计收藏量
        //collection router end

        code_send               :'smsSendRecord/sendsms/{{sTels}}/{{sContent}}',    //发送信息

        msg_listpage            :'station/listPageByCondition',                     //分页查询
        msg_read                :'station/readMessage/{{id}}',                       //阅读信息
        msg_delete              :'station/delete/{{id}}'                            //删除站内信
      }
    },
    haoyi_sms:{
      host: 'sms.api.haoyi',
      port: '39201',
      api:{
        code_send               :'smsSendRecord/sendsms/{{sTels}}/{{sContent}}',    //发送信息
      }
    },

    haoyi_reg:{
      host: 'hyservice.api.haoyi',
      port: '39101',
      api: {
        add                     :'regUserRelation/add',                             //增加注册信息
        findLevelByUid          :'level/getUpLevelList/{{uid}}',                    //查找可升级等级                           //查看可以升级的等级以及金额
        apply                   :'upLevel/add',                                     //申请
        updateApply             :'upLevel/submitUpLevel',                           //更新
        getStatusByUid          :'upLevel/findUpLevelByUid/{{uid}}',                //根据uid查找
        getUserByUid            :'regUserRelation/findRegUserRelationByUid/{{uid}}',//根据uid查找
        getUserByParent         :'regUserRelation/findMyInviteUserPage/{{uid}}',    //查找被邀请人列表
      }
    },


    haoyi_lottery:{
      host: 'hyservice.api.haoyi',
      port: '39101',
      api: {
        findLotteryToday        :'lotteryInfo/todayLotteryInfo',                    //查找今天的中奖信息
        findLotteryYesterday    :'lotteryInfo/lastLotteryInfo',                     //查找昨天的中奖信息
        findHistoryPage         :'lotteryInfo/page',                                //查找历史中奖分页信息
        findUserHistoryPage     :'lottery/page',                                    //查找个人历史中奖分页信息
        findLotteryByUid        :'lottery/findCuurentLotteryByUid/{{uid}}',         //根据用户查询中奖情况
        findAllLottery          :'jackpot/findByStartJackpot',                      //查找中奖池
      }
    },

    haoyi_cms:{
      host:'cms.api.haoyi',
      port:'39001',
      api :{
        findResourceByColId     :'resource/findResByColId/{{colId}}'           //广告轮转图
      }
    },

    /**
     * 商户模块
     */
    haoyi_shop: {
      host: 'shop.api.haoyi',
      //host: '172.16.110.163',
      port: '35401',
      api: {
        findById                :'gshop/shopId/{{shopId}}',                           //根据Id查找商店信息
        findAllCountry          :'region/all/country',                                //查找所有国家
        region_findByPid        :'region/pid/{{pid}}',                                //根据父亲查找下属

        fans_select             :'shop/fans/select/{{userId}}/{{shopId}}',             //查找关注关系
        fans_create             :'shop/fans/create',                                 //关注商家
        fans_delete             :'shop/fans/delete/{{userId}}/{{shopId}}',
        fans_count              :'shop/fans/countFans/{{shopId}}'                         //查询粉丝数量信息
      }
    },



    haoyi_order:{
      host: 'order.api.haoyi',
      //host:'172.16.110.163',
      port: '35201',
      api: {
        findById                :'order/find/{{id}}',                           //根据Id查找订单详情
        create                  :'order/create',                                //创建订单
        get                     :'order/get',                                   //根据条件分页查询订单列表
        getPayList              :'order/find/paylist',                          //获取支付类型
        pay                     :'account/sys/payment',                         //支付
        getBillOrder            :'order/pay/bill/{{id}}',                       //获取支付订单号信息
        cartCreate              :'order/cart/create',                           //购物车创建订单
        paycallback             :'order/paycallback',                           //回调接口
        gift_pay                :'order/pay/bill/end/{{id}}'                           //积分支付
      }
    },

    haoyi_integration:{
      host: 'integration.api.haoyi',
      port: '37201',
      api: {
        findUserGoods           :'user/goods/findUserGoods',                     //获取收藏的商品
        findUserShop            :'user/shop/findUserShop',                       //获取用户收藏的商店
        goodsComment            :'order/goods/comment/create',                    //增加商品评论
        getPayData              :'account/bill/getEncryptBill',                    //获取支付加密数据
      }
    },


    /**
     * Urs 模块
     */
    urs : {
      host        :'http://u.hy.com', //dev
      //host        :'http://u.haoyi.com',test
      api:{
        login       : '/s/login',//登录
        check_user  : '/s/check_user',//验证用户
        check_phone : '/s/check_phone',//验证手机号码
        verification: '/s/send_reg_verfication',//手机验证码
        register    : '/s/reg',//用户注册
        modify_code : '/s/send_modifypw_code',//修改密码的验证
        modify      : '/s/modify_pw'//修改密码
      }
    }
  },

  callbackurl:'172.16.110.163:42000/order/paycallback',

  urs_params : {
    appid   : '20001' ,
    appname : 'bmss' ,
    key1    : 'jslcns9482wscdfe',
    key2    : 'jru#jsl9*2x12lxp',
    appiv   : '3s_=75jgcq!jrdwp',
    ip      : '172.16.110.150',
    sep     : '@#'
  },

  app_host_params:{
    //host:"http://appapi.hy.com",
    host:"http://haoyi.yn.com:42000"
  },
  cookies_params:{
    domain:".yn.com",
    //domain:'.hy.com',
    path:"/",
    maxAge: 24 * 60 * 60 * 1000
  }

  /*//用户注册 url
   urs_url : {
   host        : 'http://u.yn.com',//域名  线上的时候会变化
   login       : '/s/login',//登录
   check_user  : '/s/check_user',//验证用户
   check_phone : '/s/check_phone',//验证手机号码
   verfication : '/s/send_reg_verfication',//手机验证码
   register    : '/s/reg',//用户注册
   modify_code : '/s/send_modifypw_code',//修改密码的验证
   modify      : '/s/modify_pw'//修改密码
   }*/

};
