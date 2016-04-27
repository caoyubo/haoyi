/**
 * 数据库链接接口
 * @module bfw
 * @author blank
 * @date   20150624
 * @version 1.0
 */

var fs  = require( 'fs' );
var dbs = {};

exports.getDb = function( dbname ){
    var name   = dbname || 'defaults';
    var db     = null;
    var dbconf = BConfig.conf( 'db.' + name );

    if (!dbconf){
        return null;
    }

    var type = dbconf.type || '';
    if (type == '' ){
        return null;
    }

    if (_.has( dbs , dbname)){
        return dbs[dbname] ;
    }

    if(fs.existsSync(CORE_PATH + 'bdb' + type + '.js')){
        db = require( CORE_PATH + 'bdb' + type);
        db.init(dbconf);
        dbs[dbname] = db ;
    }

    return db;
}

