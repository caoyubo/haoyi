/**
 *
 * @author apps
 * @date   16-4-19
 * @version
 */
module.exports = function(bfw, router) {

  router.get('/delete', function (req, res) {
    console.log("**************delete*************");
    var id = req.query.id;
    BDubbo.get('haoyi_usercenter.msg_delete', {id: id}, function(result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    });
  });


  router.get('/read', function (req, res) {
    console.log("**************read*************");
    var id = req.query.id;
    BDubbo.get('haoyi_usercenter.msg_read', {id: id}, function(result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    });
  });


  router.post('/listpage', function (req, res) {
    console.log("**************listpage*************");
    var data = req.body;
    BDubbo.post('haoyi_usercenter.msg_listpage', data, function(result) {
      console.log("返回结果" + JSON.stringify(result));
      res.json(result);
    });
  });

}
