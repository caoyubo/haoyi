/**
 * 商店模块
 * @author apps
 * @date   16-2-1
 * @version
 */
module.exports = function(bfw, router){

    /**
     * 根据商店id查找商店信息
     */
    router.get('/findById', function(req, res){
        console.log("**************findById*************");
        var shopId = req.query.shopId;
        console.log("**************"+req.query.shopId+"*************");
        BDubbo.get('haoyi_shop.findById', {shopId:shopId}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/fans_select', function(req, res){
      console.log("**************select*************");
      var shopId = req.query.shopId;
      var userId = req.query.userId;
      BDubbo.get('haoyi_shop.fans_select', {userId:userId,shopId:shopId}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
  });


    router.get('/fans_delete', function(req, res){
      console.log("**************delete*************");
      var shopId = req.query.shopId;
      var userId = req.query.userId;
      BDubbo.get('haoyi_shop.fans_delete', {userId:userId,shopId:shopId}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
  });

    router.post('/fans_create', function(req, res){
      console.log("**************create*************");
      var data = req.body;
      BDubbo.post('haoyi_shop.fans_create', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
  });

  router.get('/fans_count', function(req, res){
    console.log("**************count*************");
    var shopId = req.query.shopId;
    BDubbo.get('haoyi_shop.fans_count', {shopId:shopId}, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });

};
