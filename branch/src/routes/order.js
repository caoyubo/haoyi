/**
 *  订单模块
 * @author apps
 * @date   16-3-9
 * @version
 */

module.exports = function(bfw, router){


    //根据id查找订单详情
    router.get('/findById', function(req, res){
        console.log('**************order/findById*************');
        var id      = req.query.id;
        console.log('**************'+id+'*************');
        BDubbo.get('haoyi_order.findById', {id:id}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });


    router.post('/create', function(req, res){
        console.log('**************order/create*************');
        var data    = req.body;
        BDubbo.post('haoyi_order.create', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

  router.post('/gift/create', function(req, res){
    console.log('**************order/create*************');
    var data    = req.body;
    data.paytype = "2";
    BDubbo.post('haoyi_order.create', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });



    router.post('/cartCreate', function(req, res){
      console.log('**************order/cart/create*************');
      var data    = req.body;
      BDubbo.post('haoyi_order.cartCreate', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.post('/get', function(req, res){
        console.log('**************order/get*************');
        var data      = req.body;
        BDubbo.post('haoyi_order.get', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });


    router.get('/getPayList', function(req, res){
        console.log('**************order/getPayList*************');
        BDubbo.get('haoyi_order.getPayList', '', function(result){
          console.log("返回结果"+JSON.stringify(result));
          res.json(result);
    });
  });

    router.post('/pay', function(req, res){
        console.log('**************order/pay*************');
        var data    = req.body;
        BDubbo.post('haoyi_order.pay', data, function(result){
          console.log("返回结果"+JSON.stringify(result));
          res.json(result);
      });
  });

    router.get('/getBillOrder',function(req, res){
        console.log('**************order/getBillOrder*************');
        var id    = req.query.id;
        BDubbo.get('haoyi_order.getBillOrder',{id:id}, function(result){
          console.log("返回结果"+JSON.stringify(result));
          res.json(result);
        });
    });

    router.post('/goodsComment', function(req, res){
        console.log('**************order/goodsComment*************');
        var data  = req.body;
        BDubbo.post('haoyi_integration.goodsComment',data, function(result){
          console.log("返回结果"+JSON.stringify(result));
          res.json(result);
      });
    });

    router.post('/paycallback', function(req, res){
      console.log('**************order/paycallback*************');
      var data  = req.body;
      BDubbo.post('haoyi_order.paycallback',data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.post('/callbackurl', function(req, res){
      console.log('**************order/callbackurl*************');
      var data  = req.body;
      res.render("www/index");
    });

    router.get('/gift/pay', function(req, res){
      console.log('**************order/gift/pay*************');
      var id  = req.query.id;
      BDubbo.get('haoyi_order.gift_pay',{id:id}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
    });
  });


}

