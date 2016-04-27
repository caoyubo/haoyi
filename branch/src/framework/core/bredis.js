/**
 * redis
 * @author jiaming
 * @date 2015-09-09
 */


var conf = {};

function init(){
    var redis_conf = BConfig.conf('redis');
    conf = {
        port : redis_conf.port || 6397 ,
        ip   : redis_conf.ip || '219.129.237.56',
        conf : redis_conf.conf || {}
    };
}


var redis = require('redis');

init();
var client = redis.createClient(conf.port,conf.ip,conf.conf);
client.on('error',function(error){
    console.log('redis error:',error);
});



module.exports = client;

