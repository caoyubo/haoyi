/**
 * 数据处理模块 
 * @module bfw
 * @author blank
 * @date   20150611
 * @version 1.0
 */


var bhttp   = require( './bhttp' ).bhttp;
var async   = require('async');

module.exports = function(req , res , callback) {
	return new DealData( req , res , callback);
}


function DealData( req , res , dealcallback){
	
	//处理列表
	var datalist = {};
	
	var default_option   = { 
								url 	: '',
								req 	: req ,
								res 	: res , 
								method 	: 'get' 
							}; 
	
	/**
	 * 添加一个数据处理
	 * @method  add
	 */
	this.add = function ( key , options ){
		if ( !_.has(datalist , key) ){
			datalist[key] = options;
		}
	};
	
	/**
	 * 添加多个数据处理、
	 * @method addAll
	 */
	this.addAll = function( options ){
		if( _.isObject(options) ){
			datalist = options;
		}
	};
	
	/**
	 * 处理数据
	 * @method deal
	 */
	this.deal = function(){
		var deallist = {};
		for( var k in datalist){
			var optiondata = datalist[k] ;			
			var dealoption = {} ;
			_.extend(dealoption , default_option  );
			_.extend(dealoption , optiondata  );
			
			deallist[k] = addItem(dealoption);
		}

		//并行处理
		async.parallel(deallist , dealcallback);
		
	}
	
	/**
	 * 添加处理函数
	 * @method addItem
	 */
	function addItem( dealoption )
	{
		return function(cb){
					_.extend(dealoption ,{callback:function(error, response, data){
						console.log('----error1------' , error);
						console.log('----code1------'  , response.statusCode);
						console.log('----info1------'  , data);
						cb( null , data);
					}});
			
					bhttp.request(dealoption);
		};
	}
}
