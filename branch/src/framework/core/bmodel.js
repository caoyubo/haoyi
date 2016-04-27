/**
 * model 基类
 * @module bfw
 * @author blank
 * @date   20150629
 * @version 1.0
 */

function BaseModel ( name ){
    this.tablename = name || '';
    this.db        = BFunc.lib( 'bdb').getDb();
}

/**
 * 取数据库表名称
 * @returns {string}
 */
BaseModel.prototype.getTable = function(){
    if (this.tablename !== undefined ){
        return this.tablename;
    }

    return  '';
}

/**
 *
 * @param name
 * @returns {*}
 */
BaseModel.prototype.setTable = function( name ){
    this.tablename = name || '';
}

/**
 * 取数据库对象
 *
 */
BaseModel.prototype.getDb = function(){
    return BFunc.lib( 'bdb').getDb();
}
/**
 * 查询信息
 * @param options
 * @author zxy
 */

BaseModel.prototype.selectItem = function (options) {
    BLog.debug('model select');
    if(this.getTable() == ''){
        return 0;
    }

    var fields = null;
    if(_.has(options,'fields')){
        fields = options.fields;
    }

    var wheres = null;
    if(_.has(options,'wheres')){
        wheres = options.wheres;
    }

    var orders = null;
    if(_.has(options,'orders')){
        orders = options.orders;
    }

    var limit = null;
    if(_.has(options,'limit')){
        limit = options.limit;
    }

    var curpage = null;
    if(_.has(options,'curpage')){
        curpage = options.curpage;
    }

    var page    = null;
    if(_.has(options,'page')){
        page    = options.page;
    }
    var join    = null;
    if(_.has(options,'join')){
        join    = options.join;
    }

    var callback = null;

    if(_.has(options , 'callback') && _.isFunction(options.callback)){
        callback = options.callback;
    }else{
        callback = resultcallback;
    }
    var sql = 'SELECT ';
    if(fields != null){
        var comma = '';
        for(var k in fields){
            sql += comma+'`'+fields[k]+'`';
            comma = ' , '
        }
    }else{
        sql += ' * ';
    }
    sql += ' FROM ' + this.getTable() + ' AS a ';

    if(join != null){
        sql += 'LEFT JOIN ' + join.table + ' AS b ';
        sql += 'ON a.' + join.on1 + join.op + 'b.' + join.on2;
    }

    var params = [];


    if (wheres != null && !BFunc.objIsEmpty(wheres)){
        sql += ' WHERE ';
        var comma = '';

        for(var k in wheres){
            if(k == 'ext'){
                sql += comma  + wheres[k];
                comma = ' AND ';
                continue;
            }
            sql += comma + '`' + k + '` = ? '
            comma = ' AND ';
            params.push(wheres[k]);
        }
    }

    if (orders != null){
        sql += ' ORDER BY ';
        var comma = '';
        for(var k in orders){
            sql += comma + '`' + k + '` ' + orders[k];
            comma = ' , ';
        }
    }

    if (limit != null){
        sql += ' LIMIT '+ limit;
    }
    if (limit == null && curpage != null){
        var eachNumber  = page >0 ? page : 10 ;
        var curPage     = curpage > 0 ? curpage : 1;

        var start   = (curPage-1) * eachNumber;
        sql += ' LIMIT ' + start + ',' + eachNumber;
    }

    BLog.debug( sql );

    this.db.getConnection(function(err, connection){
        connection.query(sql, params , callback);
        connection.release();

    });
};

/**
 * 更新信息
 * @param options
 * @returns {number}
 */
BaseModel.prototype.updateitem = function(options){
    BLog.debug( 'model update' );
    if (this.getTable() == '' ){
        return 0 ;
    }

    if (!_.has(options , 'data') ){
        return 0 ;
    }

    var sets  = options.data ;
    var wheres = null ;
    if (_.has(options , 'wheres') ){
        wheres = options.wheres ;
    }

    var callback = null ;
    if (_.has(options , 'callback') && _.isFunction( options.callback ) ){
        callback = options.callback ;
    }else{
        callback = resultcallback;
    }

    var sql = 'UPDATE `' + this.getTable()  + '`  SET ' ;
    var params = [] ;

    var comma = '';

    for(var k in sets){
        if(k == 'ext'){
            sql += comma  + sets[k];
            continue;
        }
        sql += comma + '`' + k + '` = ? '
        comma = ',';
        params.push(sets[k]);
    }

    if (wheres != null ){
        sql += ' WHERE '
        comma = '';

        for(var k in wheres){
            sql += comma + '`' + k + '` = ? '
            comma = ' AND ';
            params.push(wheres[k]);
        }
    }

    BLog.debug( sql );

    this.db.getConnection(function(err, connection){
        connection.query(sql, params , callback);
        connection.release();

    });
};

/**
 * 添加信息
 * @param options
 * @returns {number}
 */
BaseModel.prototype.additem = function(options){
    BLog.debug( 'model add' );
    if (this.getTable() == '' ){
        return 0 ;
    }

    if (!options || !options.data){
        return 0 ;
    }

    var sql = 'INSERT INTO `' + this.getTable()  + '`' ;

    var fields = _.keys(options.data);
    var keys   = fields.join( '`,`') ;
    var values = ' VALUES(';

    if ( keys != '' ){
        keys = '(`' + keys + '`)';
        var comma = '';
        for(var i = 0 ; i < fields.length ; i++){
            values += comma + '?' ;
            comma  = ',';
        }
        values += ')';
    }

    sql += keys + values;
    BLog.debug(sql);
    var params = _.values(options.data);

    var callback = null ;
    if (_.has(options , 'callback') && _.isFunction( options.callback ) ){
        callback = options.callback ;
    }else{
        callback = resultcallback;
    }

    this.db.getConnection(function(err, connection){
        connection.query(sql, params , callback);
        connection.release();

    });

};

/**
 * 删除信息
 * @param options
 * @returns {number}
 */
BaseModel.prototype.deleteitem = function(options){
    BLog.debug( 'model delete' );
    if (this.getTable() == '' ){
        return 0 ;
    }

    var wheres = null ;
    if (_.has(options , 'wheres') ){
        wheres = options.wheres ;
    }

    var sql = 'DELETE FROM `' + this.getTable()  + '`  ' ;
    var params = [] ;

    var comma = '';


    if (wheres != null ){
        sql += ' WHERE '
        comma = '';

        for(var k in wheres){
            sql += comma + '`' + k + '` = ? '
            comma = ' AND ';
            params.push(wheres[k]);
        }
    }

    BLog.debug( sql );

    var callback = null ;
    if (_.has(options , 'callback') && _.isFunction( options.callback ) ){
        callback = options.callback ;
    }else{
        callback = resultcallback;
    }

    this.db.getConnection(function(err, connection){
        connection.query(sql, params , callback);
        connection.release();

    });



};

/**
 * 通用回调结果
 * @param err
 * @param result
 */
function resultcallback(err, result){
    if (err) {
        BLog.debug('[model query] - :'+err);
    }
    BLog.debug('model query result : ' );
    BLog.debug(result);
}


module.exports = BaseModel;


