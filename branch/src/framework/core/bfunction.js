/**
 *  公共函数模块
 * @module bfw
 * @author blank
 * @date   20150623
 * @version 1.0
 */

var fs   = require( 'fs' );

/**
 * 取controller对象
 * @param req
 * @param res
 * @param next
 */
exports.controller = function( bfw , req, res, next ){
    var act  = req.params.act || '';
    var op   = req.params.op  || 'index';
    var regx = /^[0-9a-zA-Z_-]+$/g;

    //限制字符
    act  = act.match(regx) ? act :  '' ;
    op   = op.match(regx)  ? op  :  'index' ;

    if ( act != '' && fs.existsSync( BASE_PATH + 'core/controller/' + '/' + act + '.js'  )){
        var controllerobject = require( BASE_PATH + 'core/controller/' + '/' + act );
        if( _.isFunction( controllerobject[ op ] ) ) {
            controllerobject[ op ].apply( controllerobject , [ bfw , req , res , next ] );
        }else{
            next(BError( 404 ));
        }
    }else{
        next(BError( 404 ));
    }
}

/**
 * 取model
 * @param name
 * @returns {Object}
 */
exports.model = function(name){
    var modelclass = null;
    if (name == '' ){
        modelclass = require( CORE_PATH + 'bmodel' );
        return new modelclass();
    }

    if( fs.existsSync( BASE_PATH + 'core/model/' + name + '.js')){
        modelclass = require( BASE_PATH + 'core/model/' + name );
        return new modelclass();
    }else{
        modelclass = require( CORE_PATH + 'bmodel' );
        return new modelclass(name);
    }
}

/**
 * 取返回结果对象
 * @method getResult
 * @return Object
 */
exports.getResult  = function(code , data , num , version , mes ){

    var result = {
        code 		: -1 		, // 返回码 -1 为默认错误，  0为成功 ， 不等于0的 视为错误码
        mes  		: 'success' , // 描述信息
        num  		: 0  		, // 接口编号
        version 	: '0.1'		, // 接口版本
        data        : {}          // 返回数据
    } ;

    result.code    = (code !== undefined )  ? code : result.code ;
    result.mes     = mes     || result.mes ;
    result.num     = num     || result.num ;
    result.version = version || result.version ;
    result.data    = data    || result.data ;

    //语言包
    if (mes){
        result.mes     = BLang.get( mes , null , mes );
        if ( result.mes != mes ) {
            result.code = mes ;
        }
    }

    return result ;
}

/**
 * 装载自定义库
 * @param libname
 */
exports.lib = function( libname ){
    return require( CORE_PATH + libname );
}

/**
 * 取时间戳秒
 */
exports.getTime = function(){
    return Math.floor((new Date()).getTime()/1000);
}

//认购状态 0取消  1未开始 2进行中 3已完成
exports.getGoodsDesc = function(state){
    state = parseInt(state);
    var desc = '';
    switch (state){
        case 0 : desc = "取消" ; break;
        case 1 : desc = "未开始" ; break;
        case 2 : desc = "进行中" ; break;
        case 3 : desc = "已完成" ; break;
        default : desc = "未开始" ; break;
    }
    return desc;
};

/**
 * 判断对象是否为空
 * @author jiaming
 * @date 2015-07-09
 * @param obj 对象
 */
exports.objIsEmpty = function(obj){
    if(typeof obj == "undefined"){
        return true;
    }
    for(var i in obj){
        return false;
    }
    return true;

};

/**
 * 得到url
 * @author jiaming
 * @date 2015-07-09
 * @param url 例如 'manager/index'
 * @param params obj
 * @returns string
 */
exports.getUrl = function(url,params){
    url = url || 'index';
    var domain = '';//BConfig.conf('domain') || '/';
    url = domain + url;
    if(params && !_.isEmpty(params)){
        url += '?';
        for(var key in params){
            url += key + '=' + params[key] + '&';
        }
        url = url.substr(0,url.length-1);
    }
    return url;
};

/**
 * 得到格式化的时间格式
 * @author jiaming
 * @date 2015-07-13
 * @param time 时间戳 单位：秒或毫秒
 * @param format 返回时间格式 默认格式是2015-05-10 10：04：20
 * @return String 日期字符串
 */
exports.getDateFormat = function(time,format){
    if(time.toString().length == 10){
        time = time * 1000;
    }
    format = format || "yyyy-MM-dd hh:mm:ss";
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };
    return new Date(time).format(format);
};

/**
 * 得到一个上传图片对象
 * @returns {*}
 */
exports.upload = function(){
    var upload = require(BASE_PATH + '/framework/core/bupload');
    upload = new upload();
    return upload;
}

/**
 * 错误输出
 * @author blank
 * @date 2015-07-17
 */
exports.error  = function(message , code ){
    throw BError( message , code );
};

/**
 * 显示页面
 * @author blank
 * @date 20151119
 */
exports.show  = function( req , res , data , template ){

};

/**
 * 显示json结果
 * @author blank
 * @date 20151119
 * @param req
 * @param res
 * @param data
 * @param num
 * @param version
 */
exports.showjson  = function( req , res , data , num , version  ){
    var result = jsonresult( 0 , data , num , '' , version );

    //输出结果
    res.status(200).send(result);
};

/**
 * 显示json错误结果
 * @author blank
 * @date 20151119
 * @param req
 * @param res
 * @param code
 * @param num
 * @param mes
 * @param version
 */
exports.showerrjson  = function( req , res , code , num , mes , version ){
    var result = jsonresult( code , {} , num , mes , version );

    //输出结果
    res.status(200).send(result);
};

/**
 * 返回json结果数据
 * @author blank
 * @date 20151119
 * @param code
 * @param data
 * @param num
 * @param mes
 * @param version
 * @returns {{code: number, mes: string, num: number, version: string, data: {}}}
 */
function jsonresult( code , data , num , mes , version ){
    var result = {
        code 		: -1 		, // 返回码 -1 为默认错误，  0为成功 ， 不等于0的 视为错误码
        mes  		: 'success' , // 描述信息
        num  		: 0  		, // 接口编号
        version 	: '0.1'		, // 接口版本
        data        : {}          // 返回数据
    } ;

    result.code    = (code !== undefined )  ? code : result.code ;
    result.mes     = mes     || result.mes ;
    result.num     = num     || result.num ;
    result.version = version || result.version ;
    result.data    = data    || result.data ;

    //语言包
    var message = BLang.get( code ) ;
    if (message != '' && result.mes != 'success' ){
        if( result.mes == ''){
            result.mes = message;
        }
    }

    return result;
}

/**
 * 输出信息
 * @author blank
 * @date 20151119
 * @param res
 * @param data
 */
exports.output  = function( res , data ){
    res.status(200).send(data);
};

/**
 * 装载自定义信息
 * @author blank
 * @date 20151119
 * @param libname
 * @returns {*}
 */
exports.tool = function (libname){
    return require( BASE_PATH + '/core/common/' + libname );
};

/**
 * 得到framework/lib
 * @author jiaming
 * @date 2015-09-09
 * @param libname
 * @returns {*}
 */
exports.import = function (libname){
    return require( BASE_PATH + '/framework/core/' + libname );
};

/**
 * 日期转时间戳
 * @param date_string   时间 如：2015-10-10 21：21：21
 * @returns {*}
 */
exports.dateToString = function(date_string){
    if(!date_string){
        return 0;
    }
    var date_int = Date.parse(new Date(date_string));
    date_int = date_int / 1000;
    return date_int;
}
/**
 * 随机生成数字
 */
exports.createRandom = function(max){
    var num = '';
    for(var i=0;i<max;i++){
        num += Math.floor(Math.random()*10);
    }
    return num;
}


