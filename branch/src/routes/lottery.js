/**
 * 抽奖模块
 * @author apps
 * @date   16-4-20
 * @version
 */
module.exports = function(bfw, router){

  router.get('/findLotteryToday', function(req, res){
    console.log("**************findLotteryToday*************");
    var data = '';
    BDubbo.get('haoyi_lottery.findLotteryToday', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });

  router.get('/findLotteryYesterday', function(req, res){
    console.log("**************findLotteryYesterday*************");
    var data = '';
    BDubbo.get('haoyi_lottery.findLotteryYesterday', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });

  router.get('/findLotteryByUid', function(req, res){
    console.log("**************findLotteryByUid*************");
    var uid = req.query.uid;
    BDubbo.get('haoyi_lottery.findLotteryByUid', {uid:uid}, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });

  router.post('/findHistoryPage', function(req, res){
    console.log("**************findHistoryPage*************");
    var data = req.body;
    BDubbo.post('haoyi_lottery.findHistoryPage', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });


  router.post('/findUserHistoryPage', function(req, res){
    console.log("**************findUserHistoryPage*************");
    var data = req.body;
    BDubbo.post('haoyi_lottery.findUserHistoryPage', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });


  router.get('/findAllLottery', function(req, res){
    console.log("**************findAllLottery*************");
    var data = "";
    BDubbo.get('haoyi_lottery.findAllLottery', data, function(result){
      console.log("返回结果"+JSON.stringify(result));
      res.json(result);
    });
  });


};
