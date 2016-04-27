/**
 * 广告模块
 * @author apps
 * @date   16-3-14
 * @version
 */
module.exports = function(bfw, router){

    router.get('/findResourceByColId', function(req, res){
        console.log("**************findResourceByColId*************");
        var colId       = req.query.colId;
        BDubbo.get('haoyi_cms.findResourceByColId', {colId:colId}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/saveConfig', function(req, res){
        console.log("**************saveConfig*************");
        var config = req.body;
        redis.set('haoyi_cms_config',config, function(err, data){
            console.log("**************save error:"+err);
            res.json(data);
        });
    });

    router.get('/getConfig', function(req, res){
        console.log("**************getConfig*************");
        redis.get('haoyi_cms_config', function (error, data) {
            console.log("**************get error:"+err);
            res.json(JSON.parse(data));
        });
    });

};
