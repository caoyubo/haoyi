/**
 *  商品模块
 * @author kam
 * @date   16-2-1
 * @version
 */
var redis = BFunc.import('bredis');
module.exports = function(bfw, router){

    /**
     * 获取可销售的商品
     */
    router.get('/sell',function(req,res){
        console.log("**************sell get*************");
        var shopid  = req.query.shopid;
        var data    = {shopid:shopid};
        BDubbo.get('haoyi_goods.sell',data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 更新商品库存
     */
    router.get('/upstock', function(req, res){
        console.log("**************stock get*************");
        var valueid = req.query.valueid;
        var step    = req.query.step;
        var data    = {valueid:valueid, step:step};
        BDubbo.get('haoyi_goods.upstock', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 搜索商品
     */
    router.post('/findGoods', function(req, res){
        console.log("**************findGoods*************");
        var data = req.body;
        BDubbo.post('haoyi_goods.findGoods', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 根据id查找商品详情
     */
    router.get('/findById',function(req, res){
        console.log("**************findById*************");
        var id = req.query.id;
        BDubbo.get('haoyi_goods.findById',{id:id}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findByShopId', function(req, res){
        console.log("**************findByShopId*************");
        var shopid = req.query.shopid;
        BDubbo.get('haoyi_goods.findByShopId', {shopid:shopid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findFirstGoods', function(req, res){
        console.log("**************findFirstGoods*************");
        var data = '';
        BDubbo.get('haoyi_goods.findFirstGoods',data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    })

    router.get('/findByParent', function(req, res){
        console.log("**************findByParent*************");
        var goodsclassid = req.query.goodsclassid;
        BDubbo.get('haoyi_goods.findByParent',{goodsclassid:goodsclassid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findSecAndThr', function(req, res){
        console.log("**************findSecAndThr*************");
        var goodsclassid = req.query.goodsclassid;
        BDubbo.get('haoyi_goods.findSecAndThr',{goodsclassid:goodsclassid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });


    router.post('/saveCondition', function(req, res){
        console.log("**************saveCondition*************");
        var condition = req.body;
        redis.set('haoyi_goods_condition',condition, function(err, data){
            console.log("save error:"+err);
            res.json(data);
        });
    });

    router.get('/getCondition', function(req, res){
        console.log("**************getCondition*************");
        redis.get('haoyi_goods_condition', function (error, data) {
            res.json(JSON.parse(data));
        });
    });

    router.post('/findBrand', function(req, res){
        console.log("**************findBrand*************");
        var data = req.body;
        BDubbo.post('haoyi_goods.findBrand',data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });


    router.post('/findComment', function(req, res){
      console.log("**************findComment*************");
      var data = req.body;
      BDubbo.post('haoyi_goods.findComment',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });

    router.get('/deleteComment', function(req, res){
      console.log("**************deleteComment*************");
      var id = req.query.id;
      BDubbo.get('haoyi_goods.deleteComment',{id:id}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
   });

};
