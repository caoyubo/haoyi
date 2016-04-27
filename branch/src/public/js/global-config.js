/**
 * Created by ubuntu on 16-1-26.
 */

/**
 * HTTP请求方式
 */
var requestMethod={
  POST:"POST",
  GET:"GET",
  PUT:"PUT",
  DELETE:"DELETE",
  HEAD:"HEAD",
  OPTION:"OPTION"
};

var constant = {
  PAGESIZE  : 10,
  CLIENTAGENT : 'pc'   //客户端标志 pc 或 mobile 或其他类型
}

var grobalUrl={
  url :"",  //http://hyapi.yn.com:42000/
  imgUrl :"http://imagehaoyi.nzlm.cn/",
  registerUrl :"http://172.16.110.150:8100/#/register",
  appId : "mall",
  api : {

    /* 用户模块 */

    registerPost            :"user/reg",//用户注册
    loginPost               :"user/login", //用户登录
    logoutGet               :"user/logout",//用户登出
    getUserFromSession      :"user/getUserFromSession",  //从session获取用户信息
    getRcodePost            :"user/verify",// http://node.tiger.com:4002/mytest3 http://172.16.110.163:42000/user/verify"
    getUpLevelList          :"user/findLevelByUid", //获取当前等级以及可申请等级，积分
    updateApply             :"user/updateApply" ,   //付款后提交升级申请信息
    getStatusByUid          :"user/getStatusByUid", //根据用户id查找用户申请状态
    getUserInfo             :"user/getUserByUid", //根据用户id查找用户申请状态
    apply                   :"user/apply",   //申请升级
    getUserByParent         :"user/getUserByParent", //根据用户id查找邀请人列表

    diamond                 :"diamond/findByUid",  //查询当前用户的钻石
    findJade                :"jade/findByUid",  //按照用户uid查询翡翠积分
    diamondOperate          :"diamond/operate", //银行卡相关操作
    diamondWithdraw         :"diamond/withdraw", //提现申请
    diamondFindWithdraw     :'diamond/findWithdraw',//钻石积分提现申请列表
    diamondGetPayData       : 'diamond/getPayData',//获取支付加密数据
    integrationPay          :'http://gateway.hy.com/integration/pay',//支付

    addressList             :"address/findByUid", //查询收货地址列表
    setDefaultAddress       :"address/setDefault", //设置默认地址
    findAddressById         :"address/findById",    //根据id查找地址
    addAddress              :"address/add",  //新增地址
    editAddress             :"address/update", //修改地址
    deleteAddress           :"address/delete",//根据id删除地址
    findByPid               :"address/findByPid", //根据上级id查找下级地区信息
    findAllCountry          :"address/findAllCountry", //查找所有的国家

    collectList             :"collection/listpage",  //我的收藏
    collection              :"collection/add", //添加收藏
    collectionDel           :"collection/delete", //取消收藏
    station                 :"station/listpage" ,  //站内信息接口
    stationRead             :"station/read" , //阅读站内信
    stationDel              :"station/delete", //删除站内信



    /* 商品模块 */
    findGoodsPost           :"goods/findGoods", //根据条件搜素商品
    findById                :"goods/findById",  //根据商品ID查询商品信息(商品详情)
    findByShopId            :"goods/findByShopId",  //查询指定商户所有商品分类列表 (店铺商品)
    findStoreInfo           :"shop/findById", //根据商店ID查询商店详细信息（前台）
    goodsByShopId           :"goods/sell",  //取得指定商户的可销售商品列表
    findFirstClass          :"goods/findFirstGoods",  //查询一级商品分类列表
    findSecAndThrClass      :"goods/findSecAndThr",  //根据一级商品分类ID查询二三级商品分类列表
    updateNumber            :"cart/updateNumber", //根据商品id 更新商品数量
    findCartList            :"cart/findCart",  //购物车列表
    cartAdd                 :"cart/add",  //加入购物车
    cartDel                 :"cart/deleteBatch", //批量删除
    findResByColId          :"goods/findResByColId",//商品推广
    findResourceByColId     :"cms/findResourceByColId",   //根据colId查找广告栏信息
    findComment             :"goods/findComment",    //商品评论列表
    goodsComment            :"order/goodsComment",  //商品评论
    fans_select             :"shop/fans_select",  //查询粉丝信息
    fans_count              :"shop/fans_count" ,  //查询粉丝数量信息
    fans_create             :"shop/fans_create",  //关注店铺
    fans_delete             :"/shop/fans_delete", //取消关注
    gift_findGoods          :"gift/findGoods", //根据条件搜索商品

    /* 订单模块 */
    order                   :"order/create",   //创建订单
    order_gift              :"order/gift/create",//翡翠商品创建订单
    orderByCart             :"order/cartCreate",//从购物车创建订单
    getPayList              :"order/getPayList", //获取支付类型
    orderList               :"order/get",  //根据条件查找订单列表
    orderDetail             :"order/findById" , //根据订单id查找订单详情

    /* 抽奖模块 */
    findLotteryToday        :"/lottery/findLotteryToday", //今日抽奖
    findLotteryYesterday    :"/lottery/findLotteryYesterday" , //上期开奖情况
    findHistoryPage         :"/lottery/findHistoryPage", //查询开奖历史
    findLotteryByUid        :"/lottery/findLotteryByUid",//查询本期个人中奖情况
    findUserHistoryPage     :"/lottery/findUserHistoryPage",//查询个人中奖历史
    findAllLottery          :"/lottery/findAllLottery" //查询奖池
  },
  testGet:"http://node.tiger.com:4002/mytest1",
  testPost:"http://node.tiger.com:4002/mytest3"
}

var variable = {
  hideTabs:false
}











