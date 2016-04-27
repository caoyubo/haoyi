/**
 * config 模块
 * @module bfw
 * @author blank
 * @date   20150602
 * @version 1.0
 */

//配置文件对象
//var config 	= {};
var config 	= require( CONF_PATH + 'config');
/*var fs 		  	= require("fs");

//配置文件路径
var conf_path 	= '/apps/project/node/conf/';

//配置文件默认路径
var default_conf_path = '../../conf/';

//项目ID 
var projectid   = '';*/

/**
* 初始化配置文件
* @method init
*/
/*exports.init = function( pid ){
	
	if( pid !== undefined ){
		projectid = pid ;
		conf_path = conf_path + projectid + '/';
	}

	//需要同步判断
	if(fs.existsSync(conf_path + 'config.js')){
		config = require( conf_path + 'config');
	}else{
		config = require( default_conf_path + 'config');
	}
}*/

/**
* 配置文件信息处理
* @method conf
*/
	
exports.conf  = function(key , value ){
	//如果有值 就设置值
	if ( value !== undefined ){
		config[ key ] = value;
		return value;
	}else{
		var confvalue = config;
		var keylist   = key.split('.');
		
		for(var k in keylist){
			if ( confvalue[keylist[k]] === undefined ){
				return false;
			}
			
			confvalue = confvalue[keylist[k]];
		}
		
		return confvalue ;
	}
}



 
