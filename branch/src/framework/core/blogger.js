/**
 * log 模块
 * @module bfw
 * @author blank
 * @date   20150602
 * @version 1.0
 */

var log4js 		= require('log4js');
//var config 		= require('./bconfig');
//不使用express log 信息
//var morgan  	= require('morgan');

/**
 * 初始化log
 * @method init
 */
function init(){
	
	//修改为全局变量
	//var logconfig = config.C( 'logger' );
	var logconfig = BConfig.conf( 'logger' );
	
	if( logconfig ){
		console.log( 'logger init config ...' );
		log4js.configure(logconfig);
	}else{
		console.log( 'logger init default ...' );
		log4js.configure({  
							appenders: [
							            	{ 	type: 'console' }
							            ],  
							replaceConsole: true   //替换console.log

		});
	}
}

init();

//log 对象
var logger           = log4js.getLogger('normal');
logger.setLevel(log4js.levels.DEBUG);
exports.logger       = logger;

//设置中间件，设置整体log方案  
exports.use = function(app) {
	//不使用express log 信息
	//app.use(morgan('dev'));
    //页面请求日志,用auto的话,默认级别是WARN  
    app.use(log4js.connectLogger(logger, {level:'debug',format:':remote-addr - - ":method :url HTTP/:http-version" :status :content-length :response-time ":referrer" ":user-agent"'}));
}

/**
 * 打印debug信息
 * @method debug 
 * @date 20150609
 */
exports.debug = function(msg) {
	if( BConfig.conf( 'isdebug' ) ){
		logger.debug(msg);
	}
} 




