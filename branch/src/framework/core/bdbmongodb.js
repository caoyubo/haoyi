/**
 * 数据库mongodb操作类
 * @module bfw
 * @author blank
 * @date   20150624
 * @version 1.0
 */

/**
 * 取链接，必须实现
 * @param dbconf
 */
var mongoose = require('mongoose');
var fs 		 = require('fs');
var conn     = null;
var dburl    = '';


/**
 * 初始化数据库
 * @param dbconf
 */
exports.init = function( dbconf ){
    dburl = 'mongodb://' + dbconf.master[0].host + ':' +  dbconf.master[0].port +   '/' + dbconf.master[0].dbname ;

    mongoose.connect( dburl , dbconf.master[0].options , function(err, res) {
        if(err) {
            BLog.debug('[mongoose log] Error connecting to: ' + dburl + '. ' + err);
        } else {
            BLog.debug('[mongoose log] Successfully connected to: ' + dburl);
        }
    });

    conn    = mongoose.connection;

    conn.on('connected' , function(){
        BLog.debug( 'mongoose connected to ' + dburl );
    });

    conn.on('error' , function(err){
        BLog.debug( 'mongoose connected error: ' + err );
    });

    conn.on('disconnected' , function(){
        BLog.debug( 'mongoose disconnected ');
    });

    process.on( 'SIGINT' , function(){
        conn.close(function(){
            BLog.debug( 'mongoose disconnected through app ' );
            //线程一起退出
            process.exit(0);
        });
    });

    initModel();
}

exports.getConnection = function(){
    return conn;
}

/**
 * 注册model信息
 */
function initModel(){
    if(!fs.existsSync(CONF_PATH + 'schema.js')){
        return ;
    }

    var schemaconf = require( CONF_PATH + 'schema' );
    for( var skey in schemaconf ){
        mongoose.model( skey , new mongoose.Schema( schemaconf[skey] ));
        console.log( skey );
    }

}

/**
 * 取得model对象
 * @param modelname
 * @returns {*}
 */
exports.getModel = function( modelname ){
    return mongoose.model( modelname );
}