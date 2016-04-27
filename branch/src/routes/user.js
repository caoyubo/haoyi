/**
 * 用户模块
 * @author kam
 * @date   20160127
 * @version 1.0.0
 * @param app
 **/
var urs_params  = BConfig.conf('urs_params');
var redis       = BFunc.import('bredis');
module.exports = function (bfw , router ) {

    function getContent(op, timestamp){
        var content = urs_params.appid+urs_params.sep+urs_params.key2+urs_params.sep
                      +op+urs_params.sep+timestamp+urs_params.sep+urs_params.ip;

        return content;
    }

    /**
     * 检测用户是否存在
     */
    router.post('/checkUser', function(req, res){
        console.log('***************checkUser***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'check_user';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var username    = req.body.username;
        var dataJson    = {username:username, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.check_user', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 检测手机号是否存在
     */
    router.post('/checkPhone', function(req, res){
        console.log('***************checkPhone***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'check_phone';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var phone       = req.body.phone;
        var dataJson    = {phone:phone, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.check_phone', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 验证码
     */
    router.post('/verify', function(req, res){
        console.log('***************verify***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'send_reg_verfication';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        console.log(JSON.stringify(req.headers));
        var username    = req.body.username;
        var account     = req.body.phone;
        console.log("username:"+username);
        console.log("phone:"+account);
        var dataJson    = {username:username,account:account, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.verification', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 注册接口
     */
    router.post('/register', function(req, res){
        console.log('***************register***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'reg';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var username    = req.body.username;
        var account     = req.body.phone;
        var rcode       = req.body.rcode;
        var passwd      = req.body.passwd;
        var repasswd    = req.body.repasswd;
        var dataJson    = {username:username,account:account,passwd:passwd,repasswd:repasswd,
                            rcode:rcode, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.register', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/reg', function(req, res){
        console.log('***************reg***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'reg';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var username    = req.body.username;
        var account     = req.body.phone;
        var rcode       = req.body.rcode;
        var passwd      = req.body.passwd;
        var repasswd    = req.body.repasswd;
        var code        = req.body.code;
        var dataJson    = {username:username,account:account,passwd:passwd,repasswd:repasswd,
            rcode:rcode, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.register', postData, function(result){
            console.log(JSON.stringify(result));
            if(result.r == 1){
                console.log('***************注册成功***************');
                var uid     = result.data.uid;
                var regJson = {uid:uid, code:code, uname:username, phone:account};
                BDubbo.post('haoyi_reg.add', regJson, function(data){
                    console.log('***************绑定关系***************');
                    console.log(JSON.stringify(result));

                    res.cookie('user', username, BConfig.conf('cookies_params'));
                    console.log(req.cookies.user);
                    // res.cookie('userInfo', result, BConfig.conf('cookies_params'));
                    req.session.user      = username;

                    result.apihost = BConfig.conf('app_host_params').host;
                    res.json(result);
                });
            }else{
                console.log('***************注册失败***************');
                res.json(result);
            }
        });
    });


    router.post('/reg1', function(req, res){
        console.log('***************reg***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'reg';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var username    = req.body.username;
        var account     = req.body.phone;
        var rcode       = req.body.rcode;
        var passwd      = req.body.passwd;
        var repasswd    = req.body.repasswd;
        var code        = req.body.code;
        var dataJson    = {username:username,account:account,passwd:passwd,repasswd:repasswd,
            rcode:rcode, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.register', postData, function(result){
            console.log(JSON.stringify(result));
            if(result.r == 1){
                console.log('***************注册成功***************');
                var uid     = result.data.uid;
                var regJson = {uid:uid, code:code, uname:username, phone:account};
                BDubbo.post('haoyi_reg.add', regJson, function(data){
                    console.log('***************绑定关系***************');
                    console.log(JSON.stringify(result));

                    result.apihost = BConfig.conf('app_host_params').host;
                    res.json(result);
                });
            }else{
                console.log('***************注册失败***************');
                res.json(result);
            }
        });
    });



    router.get('/wx/register', function(req, res){
        console.log('***************wx/register***************');
        var code  = req.query.code;
        if (code == undefined || code == null){
            code = "";
        }
        var host = BConfig.conf('app_host_params').host;
        res.render('www/register',{code:code,host:host});
    });



    /**
     * 登陆接口
     */
    router.post('/login', function(req, res){
        console.log('***************login***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'login';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var username    = req.body.username;
        var passwd      = req.body.passwd;
        var dataJson    = {username:username,passwd:passwd, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        var user        = new Buffer(username, 'base64').toString();
        BDubbo.postweb('urs.login', postData, function(result){
            console.log(JSON.stringify(result));
            res.cookie('user', username, BConfig.conf('cookies_params'));
            console.log(req.cookies.user);
           //res.cookie('userInfo', result, BConfig.conf('cookies_params'));
            req.session.user      = username;
            req.session.userInfo  = JSON.stringify(result);
            result.apihost        = BConfig.conf('app_host_params').host;
            res.json(result);
        });
    });

    /**
     * 用户登出
     */
    router.get('/logout', function(req, res){
        console.log('***************logout***************');
        req.session.user      = undefined;
        res.cookie('user',     undefined, BConfig.conf('cookies_params'));
        //res.cookie('userInfo', undefined, BConfig.conf('cookies_params'));
        req.session.userInfo  = undefined;
        res.json({r:"1", data:null, tid:"", errmsg:"成功登出", errcode:"0002"});
    });

    /**
     * 从session里面获取用户信息
     */
    router.get('/getUserFromSession', function(req, res){
        console.log('***************getUserFromSession***************');
        var userInfo    = req.session.userInfo;
        if(userInfo == undefined){
          res.json({r:"-1",data:null, tid:"", errmsg:"登录信息不存在", errcode:"0001"});
        }else{
          console.log("userInfo:"+userInfo);
          var data = JSON.parse(userInfo);
          res.json(data);
        }
    });

    /**
     * 修改密码验证码
     */
    router.post('/modifyCode', function(req, res){
        console.log('***************modifyCode***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'send_modifypw_code';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var account     = req.body.phone;
        var dataJson    = {account:account, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.modify_code', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 修改密码
     */
    router.post('/modify', function(req, res){
        console.log('***************modify***************');
        var timestamp   = parseInt(new Date().getTime() / 1000) + '';
        var op          = 'modify_pw';
        var content     = getContent(op,timestamp);
        var sign        = BCrypto.md5(content);
        var account     = req.body.phone;
        var code        = req.body.code;
        var dataJson    = {account:account,code:code, time:timestamp, ip:urs_params.ip, a:op,sign:sign};
        var dataAes     = BCrypto.AES(JSON.stringify(dataJson),urs_params.key1,urs_params.appiv);
        var postData    = {appid:urs_params.appid, data:dataAes};
        BDubbo.postweb('urs.modify', postData, function(result){
            console.log(JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 申请
     */
    router.post('/apply', function(req, res){
        console.log('***************apply***************');
        var data        = req.body;
        BDubbo.post('haoyi_reg.apply', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });
    /**
     * 更新申请
     */
    router.post('/updateApply', function(req, res){
        console.log('***************updateApply***************');
        var id              = req.body.id;
        var bankname        = req.body.bankname;
        var serialnumeric   = req.body.serialnumeric;
        var time            = req.body.paytime;
        var paytime         = parseInt(new Date(time).getTime() / 1000) + '';
        var data            = {id:id,bankname:bankname, serialnumeric:serialnumeric, paytime:paytime};
        BDubbo.post('haoyi_reg.updateApply', data, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 获取当前等级以及可以申请的等级和金额
     */
    router.get('/findLevelByUid', function(req, res){
        console.log('***************findLevelByUid***************');
        var uid         = req.query.uid;
        BDubbo.get('haoyi_reg.findLevelByUid', {uid:uid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 根据uid获取升级状态
     */
    router.get('/getStatusByUid', function(req, res){
        console.log('***************getStatusByUid***************');
        var uid         = req.query.uid;
        BDubbo.get('haoyi_reg.getStatusByUid', {uid:uid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /**
     * 根据uid获取升级状态
     */
    router.get('/getUserByUid', function(req, res){
        console.log('***************getUserByUid***************');
        var uid         = req.query.uid;
        BDubbo.get('haoyi_reg.getUserByUid', {uid:uid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.get('/getUserByParent', function(req, res){
        console.log('***************getUserByParent***************');
        var uid         = req.query.uid;
        BDubbo.get('haoyi_reg.getUserByParent', {uid:uid}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    /*router.get('/sendCode', function(req, res){
        console.log('***************getUserByUid***************');
        var sTels               = req.query.sTels;
        var sContent            = BFunc.createRandom(4);
        var key                 = req.session.id;
        redis.set(key, sContent, function(err, data){
            redis.expire(key, 90*1000);
        })
        console.log('***************'+sContent+'***************');
        BDubbo.get('haoyi_sms.code_send', {sTels:sTels, sContent:sContent}, function(result){
            console.log("返回结果"+JSON.stringify(result));
            res.json(result);
        });
    });

    router.post('/verifyCode', function(req, res){
        console.log('***************getUserByUid***************');
        redis.get(req.session.id, function(err, data){

        });
    })
*/
}
