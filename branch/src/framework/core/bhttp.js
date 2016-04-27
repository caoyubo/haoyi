/**
 * http 模块
 * @module bfw
 * @author blank
 * @date   20150608
 * @version 1.0
 */

 
var bhttp  = {} ;

var urlutil    	= require('url');
var querystring = require('querystring');
var request 	= require('request');
//允许请求列表
var methodlist  = [ 'get' , 'post' ];

//入口参数
var utilparam = {
         			req 		: null ,
         			res 		: null ,
         			method      : 'GET' ,
         			url 		: '' ,
					json        : false,
         			params 		: null ,
         			headers 	: null,
         			callback 	: function (error, response, data){
					}
				};

//错误返回数据
var errresult = {
	code	: -1,
	num		: 0,
	mes		: '',
	data	: '',
	version	: '1.0'
};

/**
 * http 工具方法
 * @method httputil
 */
function httputil( param ){
	var p = {} ;
	_.extend( p , utilparam  );
	_.extend( p , param  );

	//BLog.debug( p );
	var options = getOptions( p.method , p.url , p.params , p.headers , p.req , p.json );
	BLog.debug( options );
	//console.log( options );
	request(options, function(error, response, body){
		var data ;

		if (!error && response.statusCode == 200) {
			if (p.json) {
				try {
					data = JSON.parse(body);
				} catch (e) {
					data      = errresult;
					data.mes  = e;
					data.data = body;
				}

			}else{
				data = body;
			}

		}else{
			if (p.json) {
				data      = errresult;
				data.code = response.statusCode;
			}else{
				data = "";
			}
		}
		p.callback(data , error , response, p.req , p.res );
	});
}


function getOptions( method ,  url , params , headers , req , isjson ){
	//设置默认的UA，cookie 
	var options = {
			headers: {
				//'User-Agent'	: req['headers'][ 'user-agent' ],
				//'cookie'        : req.headers.cookie,
				'Content-Type'	: 'application/x-www-form-urlencoded;charset=utf-8' 
		}
	};
	method = method || 'get' ;
	method = method.toUpperCase();

	//带UA和cookie到头里面去
	if(_.isObject(req)){
		options.headers['User-Agent'] = req['headers'][ 'user-agent' ];
		options.headers['cookie']     = req.headers.cookie;
	}

	options.method = method;
	options.url    = url ;
	
	//参数调整
	if ( params ){
		if (method == 'GET' ){
			var urlinfo  = urlutil.parse(url);
			//var tmpquery = urlinfo.query;
			
			var urlstr   = urlinfo.protocol + '//' + urlinfo.host + urlinfo.pathname ;
			var paramsstr= querystring.stringify(_.extend( querystring.parse( urlinfo.query ) , params ));
			
			options.url = urlstr + '?' + paramsstr;
            console.log(urlinfo);
			
		}else if((method == 'POST' )){
			if(_.isObject(params)){
				options.form = params ;
			}else{
				options.body = params;
			}

		}
	}
	
	if ( headers ){
		options.headers = _.extend( options.headers , headers);
	}

	if (isjson == true ){
		options.headers[ 'Content-Type' ] = 'application/json;charset=utf-8';
	}
	
	return options;
}


/**
 * http get方法
 * @method get
 */
bhttp.get = function ( param ){
	param.method = 'GET' ;
	httputil( param ); 
}

/**
 * http post方法
 * @method post
 */
bhttp.post = function ( param ){
	param.method = 'POST' ;
	httputil( param );
}

/**
 * http 指定方法请求
 * @method request
 */
bhttp.request = function ( param ){
	param.method = param.method || 'get' ;
	if (_.indexOf(methodlist , param.method ) == -1 ){
		param.method = 'get';
	}
	httputil( param );
}

/**
 * http getjson方法
 * @method getjson
 */
bhttp.getjson = function ( param ){
	param.method = 'GET' ;
	param.json   = true ;
	httputil( param );
}

/**
 * http postjson方法
 * @method postjson
 */
bhttp.postjson = function ( param ){
	param.method = 'POST' ;
	param.json   = true ;
	httputil( param );
}

/**
 * http 指定方法请求
 * @method requestjson
 */
bhttp.requestjson = function ( param ){
	param.method = param.method || 'get' ;
	if (_.indexOf(methodlist , param.method ) == -1 ){
		param.method = 'get';
	}
	param.json   = true ;
	httputil( param );
}


exports.bhttp = bhttp ; 
