/**
 * 数据库mysql操作类
 * @module bfw
 * @author blank
 * @date   20150629
 * @version 1.0
 */

/**
 * 取链接，必须实现
 * @param dbconf
 */
var mysql   = require('mysql');
var pool 	= null;
var conf    = {};

/**
 * 初始化数据库
 * @param dbconf
 */
exports.init = function( dbconf ){
    if (pool == null ){
       conf = {
            host                : dbconf.master[0].host,
            user                : dbconf.master[0].user,
            password            : dbconf.master[0].passwd,
            database            : dbconf.master[0].dbname,
            connectionLimit     : dbconf.master[0].options.connectionLimit   || 10,
            supportBigNumbers   : dbconf.master[0].options.supportBigNumbers || true
        };

        pool = mysql.createPool(conf);
    }

}

exports.getConnection = function(callback){
    return pool.getConnection(callback);
}

