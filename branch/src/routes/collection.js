/**
 *  收藏模块
 * @author apps
 * @date   16-3-7
 * @version
 */

module.exports = function(bfw,router){
    //增加收藏
    router.post('/add',function(req, res){
        console.log('**************collect/add*************');
        var data = req.body;
        BDubbo.post('haoyi_usercenter.col_add',data , function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });
    //删除个人收藏
    router.get('/delete',function(req, res){
        console.log('**************collect/delete*************');
        var id = req.query.id;
        BDubbo.get('haoyi_usercenter.col_',{id:id} , function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    });
    //分页查询收藏
    router.post('/listpage',function(req, res){
        console.log('**************collect/listpage*************');
        var data = req.body;
        var id = data.ptype;
        if(id == 0){
          BDubbo.post('haoyi_integration.findUserGoods',data , function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
          });
        }else if(id == 1){
          BDubbo.post('haoyi_integration.findUserShop',data , function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
          });
        }else{
          res.json({code:-1,msg:"ptype 不存在", data:null});
        }

    });
    //统计收藏量
    router.get('/count', function(req, res){
        console.log('**************collect/count*************');
        var id = req.body.id;
        BDubbo.post('haoyi_usercenter.col_listpage',{id:id} , function(result){
            console.log('result'+JSON.stringify(result));
            res.json(result);
        });
    })
}

