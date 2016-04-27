/**
 * session 模块
 * @module bsession
 * @author blank
 * @date   20150606
 * @version 1.0
 */

var session    		= require('express-session');
//var config 		    = require('./bconfig');
var RedisStore 		= null;

var sessionconfig 	= BConfig.conf( 'session' ) || {
												type : 'local',
												conf : { 	
													secret: 'ksksksksk',
													resave: true,
													saveUninitialized: true }
											} ;



//设置中间件，设置session方案  
exports.use = function(app) {
	
	//根据类型处理
	switch( sessionconfig.type ){
		case 'redis' :
			RedisStore 					= require('connect-redis')(session);
			sessionconfig.conf.store 	= new RedisStore( sessionconfig.store );
			app.use(session( sessionconfig.conf ));
			break;
		default :
			app.use(session( sessionconfig.conf ));
			break;
	};
}  
		