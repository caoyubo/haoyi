/**
 * 错误 模块
 * @module bfw
 * @author blank
 * @date   20150605
 * @version 1.0
 */


/**
 * 错误类
 * @class BServerError
 */
function BServerError( message , t_code ) {
	this.code 		= t_code  ||  -1   ;
	this.message 	= message || "berror";
	this.name 		= "BServerError";
}

BServerError.prototype             = new Error();
BServerError.prototype.constructor = BServerError;

//设置类型
exports.BServerError       = BServerError;

exports.createError = function( message , code ){
	return new BServerError( message , code );
}

