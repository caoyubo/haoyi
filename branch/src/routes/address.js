/**
 *  地址管理模块
 * @author apps
 * @date   16-3-7
 * @version
 */

//用户地址管理模块
var redis = BFunc.import('bredis');
module.exports  = function(bfw, router){

    //用户增加地址
    router.post('/add', function(req, res){
        console.log('**************address/add*************');
        var data  = req.body;
        BDubbo.post('haoyi_usercenter.addr_add',data, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/update', function(req, res){
        console.log('**************address/update*************');
        var data = req.body;
        BDubbo.post('haoyi_usercenter.addr_update',data, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findByUid', function(req, res){
        console.log('**************address/find*************');
        var uid = req.query.uid;
        BDubbo.get('haoyi_usercenter.addr_findByUid',{uid:uid}, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findById', function(req, res){
      console.log('**************address/findById*************');
      var id = req.query.id;
      BDubbo.get('haoyi_usercenter.addr_findById',{id:id}, function(result){
        console.log('result'+JSON.stringify(result));
        res.json(result);
      });
    });

    router.get('/delete', function(req, res){
        console.log('**************address/delete*************');
        var id = req.query.id;
        BDubbo.get('haoyi_usercenter.addr_delete',{id:id}, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/setDefault', function(req, res){
        console.log('**************address/set/default*************');
        var data        = req.body;
        BDubbo.post('haoyi_usercenter.addr_setDefault',data, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    //根据uid查找
    router.post('/getDefault', function(req, res){
        console.log('**************address/get/default*************');
        var uid = req.query.uid;
        BDubbo.get('haoyi_usercenter.addr_getDefault',{uid:uid}, function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/findAllCountry', function(req, res){
        console.log('**************address/findAllCountry*************');
        BDubbo.get('haoyi_shop.findAllCountry','', function(result){
          console.log('result'+JSON.stringify(result));
          res.json(result);
        });
    });
    router.get('/findByPid', function(req, res){
      console.log('**************address/findByPid*************');
      var pid   = req.query.pid;
      BDubbo.get('haoyi_shop.region_findByPid',{pid:pid}, function(result){
        console.log('result'+JSON.stringify(result));
        res.json(result);
      });
    });


    /**
     * 保存国家信息
     */
    router.post('/setCountry', function(req, res){
        console.log('**************address/set/country*************');
        var countryJson = req.body;
        redis.set('haoyi_address_country', countryJson, function(err, data){
            console.log("save error:"+err);
            res.json(data);
        });
    });


    router.get('/getCountry', function(req, res){
        console.log('**************address/set/country*************');
        redis.get('haoyi_address_country', function(err, data){
            res.json(JSON.parse(data));
        });
    });


}
