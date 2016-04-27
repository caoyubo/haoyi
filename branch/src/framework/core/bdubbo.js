/**
 * dubbo请求模块
 * @module bdubbo
 * @class bdubbo
 * @author blank
 * @date 20151118
 * @version 1.0
 */


/**
 * 配置api配置文件
 * @property config
 * @type {*|{secret, resave, saveUninitialized}}
 */
var config = BConfig.conf( 'api_address_list' );
if (config === ''){
    config = {};
}

//错误返回数据
/**
 * 返回的错误json对象 模板
 * @property errresult
 * @type {{code: number, num: number, mes: string, data: string, version: string}}
 */
var errresult = {
    code	: -1,
    num		: 0,
    mes		: '',
    data	: '',
    version	: '1.0'
};

/**
 * 允许请求列表
 * @property methodlist
 * @type {string[]}
 */
var methodlist  = [ 'get' , 'post' ];


/**
 * http操作对象
 * @property bhttp
 * @type {null|*|bhttp}
 */
var bhttp = BFunc.lib( 'bhttp').bhttp;

/**
 * 取url
 * @method getUrl
 * @param api
 * @param param
 * @returns {string}
 */
function getUrl( api , param ){
    var url      = '';
    var apiarray = api.split('.', 2);
    var dubbo    = apiarray[0].trim() ;
    var dubboapi = apiarray[1].trim() ;

    if (dubbo === '' || !_.has(config,dubbo)){
        return '';
    }

    if (dubboapi === '' || !_.has(config[dubbo],'api') || !_.has(config[dubbo].api,dubboapi) ){
        return '';
    }

    //请求协议
    var protocol = 'http';
    if (_.has(config[dubbo],'protocol')){
        protocol = config[dubbo].protocol;
    }

    var reg = new RegExp("^http[s]?://");
    if (!reg.test(config[dubbo].host)){
        url = protocol + "://";
    }

    url += config[dubbo].host ;

    if (_.has(config[dubbo],'port') && (config[dubbo].port !== '' || config[dubbo].port != 80) ){
        url += ':' + config[dubbo].port ;
    }

    url += '/' + config[dubbo].api[ dubboapi ] ;

    if (_.isObject(param)){
        for(var key in param){
            url = url.replace('{{'+key+'}}',param[key]);
        }
    }

    return url;
}

/**
 * 请求通用方法
 * @method requestDubbo
 * @param api
 * @param method
 * @param param
 * @param callback
 * @param req
 * @param res
 * @param conf 配置文件对象
 */
function requestDubbo ( api , method , param , callback , req , res , conf ){
    method = method || 'get' ;
    if (_.indexOf(methodlist , method ) == -1 ){
        method = 'get';
    }

    var c = {
        datajsonToString: true
    };
    _.extend( c , conf  );

    var url = getUrl(api,param);

    //--- blank modify 20160131 ---
    if (c.datajsonToString){
        //如果是对象 直接转换成字符串的json作为参数
        if (_.isObject(param) && method != 'get' ){
            param = JSON.stringify(param);
        }
    }

    bhttp.requestjson({
        url     : url,
        method  : method,
        params  : param ,
        callback: callback ,
        req     : req ,
        res     : res});
}


//************ 对外接口 ****************

/**
 * get 请求
 * @method get
 * @param api
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.get = function( api , param , callback , req , res ){
    requestDubbo( api , 'get' , param , callback , req , res , {} );
};

/**
 * post 请求
 * @method post
 * @param api
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.post = function( api , param , callback , req , res ){
    requestDubbo( api , 'post' , param , callback , req , res , {} );
};

/**
 * request 请求
 * @method request
 * @param api
 * @param method
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.request = function( api , method , param , callback , req , res){
    requestDubbo(api, method , param , callback , req , res , {});
};


/**
 * get web请求
 * @method getweb
 * @param api
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.getweb = function( api , param , callback , req , res ){
    requestDubbo( api , 'get' , param , callback , req , res , {datajsonToString: false} );
};

/**
 * post web请求
 * @method postweb
 * @param api
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.postweb = function( api , param , callback , req , res ){
    requestDubbo( api , 'post' , param , callback , req , res , {datajsonToString: false} );
};

/**
 * request web请求
 * @method requestweb
 * @param api
 * @param method
 * @param param
 * @param callback
 * @param req
 * @param res
 */
exports.requestweb = function( api , method , param , callback , req , res){
    requestDubbo(api, method , param , callback , req , res , {datajsonToString: false});
};
