/**
 * 语言包 模块
 * @module bfw
 * @author blank
 * @date   20150609
 * @version 1.0
 */

//语言包对象 
var lang = {};

var languagetype = BConfig.conf( 'language' );
languagetype     = languagetype || 'zh' ;

var path = require( 'path' ) ;
var fs   = require( 'fs' );

//语言包目录
var langpath   = path.join(__dirname , '/../../language/' + languagetype );

//装载默认语言包
var commonpath = langpath + '/common.js' ;

fs.exists( commonpath , function(exists){
	if(exists){
		lang = _.extend(lang , require( commonpath ) ) ;
	 }
});

/**
 * 取语言包信息
 * @method get
 */
exports.get = function (key , values , def ){
	if( _.has( lang , key ) ){
		if (_.isObject(values)){
			return replaceLang(lang[key] , values );
		}
		return lang[key] ;
	}
	return def || '' ;
}

/**
 * 设置语言包 如果是字符串，找文件路径 ， 如果是对象 合并对象
 * @method set
 */
exports.set = function (value){
	if (_.isString(value)){
		var filepath = langpath + '/' + value + '.js'
		fs.exists( filepath , function(exists){
			if(exists){
				lang = _.extend(lang , require( filepath ) ) ;
                BLog.debug('Load language ' + value);
			 }
		});
	}else if (_.isObject(value)){
		lang = _.extend( lang , value );
	}
	
} 

/**
 * 替换信息
 * @method replaceLang
 */
function replaceLang( src , replaceobj ){
	for (var i in replaceobj){
		src = src.replace( new RegExp( '{' + i + '}', 'g'), replaceobj[i] );
	}
	return src;
}

