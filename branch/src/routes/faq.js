/**
 * faq  模块
 * @author apps
 * @date   16-3-11
 * @version
 */

module.exports = function(bfw, router){

    router.post('/setFaq', function(req, res){
        console.log('**************faq/set/faq*************');
        var faqJson = req.body;
        redis.set('haoyi_faq_json', faqJson, function(err, data){
            console.log("save error:"+err);
            res.json(data);
        });
    });


    router.get('/getFaq', function(req, res){
        console.log('**************faq/get/faq*************');
        redis.get('haoyi_faq_json', function(err, data){
            res.json(JSON.parse(data));
        });
    });

};