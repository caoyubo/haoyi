/**
 *  钻石积分模块
 * @author apps
 * @date   16-3-19
 * @version
 */

module.exports = function(bfw, router){

    router.get('/findByUid', function(req, res){
        console.log("**************findByUid*************");
        var uid = req.query.uid;
        BDubbo.get('haoyi_diamond.findByUid', {uid:uid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/getDetail', function(req, res){
        console.log("**************getDetail*************");
        var data    = req.body;
        BDubbo.post('haoyi_diamond.getDetail', data, function(result){
          console.log("返回结果"+JSON.stringify(result));
          res.json(result);
        });
    });


    router.post('/operate', function(req, res){
      console.log("**************operate*************");
      var data    = req.body;
      BDubbo.post('haoyi_diamond.operate', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.get('/checkPassword', function(req, res){
      console.log("**************checkPassword*************");
      var uid     = req.query.uid;
      var pwd     = req.query.pwd;
      BDubbo.get('haoyi_diamond.checkPassword', {uid:uid,pwd:pwd}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.get('/modifyPassword', function(req, res){
      console.log("**************checkPassword*************");
      var accname = req.query.accname;
      var oldpwd  = req.query.oldpwd;
      var newpwd  = req.query.newpwd;
      BDubbo.get('haoyi_diamond.modifyPassword', {accname:accname,oldpwd:oldpwd, newpwd:newpwd}, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.post('/withdraw', function(req, res){
      console.log("**************withdraw*************");
      var data    = req.body;
      BDubbo.post('haoyi_diamond.withdraw', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.post('/findWithdraw', function(req, res){
      console.log("**************findWithdraw*************");
      var data    = req.body;
      BDubbo.post('haoyi_diamond.findWithdraw', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
        res.json(result);
      });
    });


    router.post('/getPayData', function(req, res){
      console.log("**************getPayData*************");
      var data          = req.body;
      data.callbackurl  = BConfig.conf('callbackurl');
      BDubbo.post('haoyi_integration.getPayData', data, function(result){
        console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });


}
