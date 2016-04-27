/**
 * framework框架
 * @module bfw
 * @author blank
 * @date   20150601
 * @version 1.0
 */

var bfw = {
        // 项目ID
        projectid   : '' ,

		//express 模块
		express 	: require('express'),
		app     	: null,
		//路径模块
		path 		: require('path'),

		//url 插件
		url         : require('url'),

		//bodyparse 插件
		bodyParser	: require('body-parser'),

		//端口
		port 		: 50001 ,

		//配置文件
		config  	: null,

		//错误类型
		berror      : null ,

		//log 模块
		blogger     : null,
		logger      : null,

		//http工具类
		bhttp       : null,

		routes      : {},


		//cookies 处理
		cookieParser: require('cookie-parser'),

		//session 处理
		bsession    : null,


    bfilter     : null,

		//核心包路径
		lib_path  	: './core/',

		layout		: require('express-ejs-layouts'),



		CODE_500    : -3 ,
		CODE_200    : -1 ,
		CODE_404    : -2 ,

		/**
		 * 初始化程序
		 * @method init
		 */
		init    : function() {
			this.app = this.express();

			this.init_env() ;
			this.use();
		},

		/**
		 * 初始化环境
		 * @method init_env
		 */
		init_env : function (){
			console.log( "init_env..." );

			//--------------------设置框架---------------
			// 设定views变量，意为视图存放的目录
			this.app.set('views', this.path.join(__dirname + '/../', 'views'));
			// 设定view engine变量，意为网页模板引擎
			this.app.set('view engine', 'html');
			this.app.set('layout','layout');
			this.app.use(this.layout);
			this.app.engine('.html', require('ejs').__express);
			//设置静态文件路径
			this.app.use(this.express.static(__dirname  + '/../' + '/public'));

            this.app.use(this.cookieParser());

			//--------------------设置配置文件------------

			//装载全局变量
			this.L( 'bglobal' ).init(this.projectid);

			//端口配置
			this.port = process.env.APP_PORT || 50001 ;
			if ( this.port == 50001 && this.C( 'port' ) != ''){
				this.port = this.C( 'port' );
			}


			//log模块
            this.blogger = this.L( 'blogger' );
            this.logger  = this.blogger.logger;

            //错误模块
            this.berror  = this.L( 'berror' );

            //session
            this.bsession= this.L( 'bsession' );

            this.bhttp   = this.L( 'bhttp' ).bhttp;

            this.bsession.use(this.app);

            this.bfilter = this.L('bfilter');

			//body-parse
			this.app.use(this.bodyParser.json());
			this.app.use(this.bodyParser.urlencoded({ extended: false }));
      //this.app.use(this.bfilter.bfilter(req,res, next));

			//加入domain捕捉异常
			this.app.use(function(req,res,next){
				//console.log('use domain');
				var domain = require("domain");
				var d = domain.create();
				d.enter();
				d.on("error",function(error){
					console.log('domain catch error:',error);
					res.statusCode = 200;
					res.json({state:false, message: '服务器异常',data:{}});
					d.dispose();
				});
				/*process.on('uncaughtException', function(err) {
					console.log("unknow error : ",err);
				});*/
				d.add(req);
				d.add(res);
				d.run(next);
			});

		},


		/**
		 * 输出
		 * @method error
		 * @param data  需要输出对象
		 * @param type  输出类型 json json格式 , template 模板类型
		 * @param template 模板
		 */
		output : function( req , res , data , type , template ){
			 type = type || 'json' ;
             if(req.query.is_ajax != undefined && req.query.is_ajax > 0){
                 type = 'json';
             }

			 switch( type ){
			 	case 'json' :
					//---blank  20150813  修改抛出的异常
			 		//res.send( 200 , data );
					res.status(200).send(data);
			 		break;
			 	case 'template' :
			 		res.render( template , data );
			 		break;
                 case 'message' :
                     res.render('message',data);
			 	default :
			 		break;
			 }


		},

		/**
		 * 错误信息
		 * @method error
		 */
		error  : function(message , code ){
			throw this.berror.createError( message , code );
		},


		/**
		 * 组件使用，包括路由设置
		 * @method use
		 */
		use : function (){
			var thisobject = this;

			var controller = '';

			//logger
			this.blogger.use(this.app);

			//cookies 支持
			//this.app.use(this.cookieParser());

			//session 支持
			//this.bsession.use(this.app);

            /**
             * 加载语言包
             * @author zxy
             * @data 20150709
             */
            var language = this.C('languages');
            if(language !== undefined){
                for(var i = 0 ; i<language.length ; i++){
                    try{
                        BLang.set(language[i]);
                    }catch(ex){
                        BLog.debug('Error load language '+ language[i]);
                        BLog.debug(ex);
                    }
                }
            }

            /**
             * 注册过滤器
             * @author zxy
             * @data 20150709
             */
            var filter = this.C('filter');
            if(filter !== false){
                var path = filter.path ? filter.path : '/';
                var filter_list = filter.filters;
                if(filter_list != undefined) {
                    for (var i = 0; i < filter_list.length; i++) {
                        try {
                            var item = require(path + '/' + filter_list[i]);
                            this.app.use(item);
                            BLog.debug('Load filter ' + path + '/' + filter_list[i]);

                        } catch (ex) {
                            BLog.debug('Error load  filter ' + filter_list[i]);
                            BLog.debug(ex);
                        }
                    }
                }
            }
      this.app.use(this.bfilter.bfilter);

			var routelist = this.C('routes');
			if ( routelist !== undefined ){
				for(var i = 0; i < routelist.length; i++) {
					try{
						//require( '../routes/' + routelist[i] )(this);
						this.addRouter( routelist[i] );

					} catch(ex){
						BLog.debug( 'err require ' + routelist[i] );
						BLog.debug( ex );
					}
				}
			}


			// 404 处理
			this.app.use('*', function(req, res) {
				BLog.debug('404 Not Found!');
				thisobject.errhandle( req , res , '文件未找到' , -2 );

			});


			//错误异常处理
			this.app.use(function(err, req, res, next){

				  var msg = '服务器异常' ;
				  //自定义类型 ， 设置为自定义信息
				  if (err instanceof BServerError ){
					  //msg = err.message;
					  thisobject.errhandle( req , res , err.message , err.code );
				  }else{
					  console.log(err);
					  thisobject.errhandle( req , res , msg , -3 );
				  }

			});
		},

		/**
	 	* 添加路由
	 	* @param routename
	 	*/
		addRouter : function(routename){

			BLog.debug('../routes/' + routename);
			this.routes[ routename ] = this.express.Router();
			var rname = ( routename == 'index' ) ? '' : routename ;
			require( '../routes/' + routename )(this , this.routes[ routename ]);
			this.app.use( '/' + rname , this.routes[ routename ] );
		},

		/**
		 * 错误处理
		 * @param code
		 * @method errhandle
		 */
		errhandle:function( req , res , msg , code ){

			var result = BFunc.getResult( -1 , null , null , null , msg || 'Internal Server Error' );

			var statuscode = 500 ;
			if ( code === undefined  || code == this.CODE_500){
				statuscode = 500 ;
			}else if(code == this.CODE_200 ){
				statuscode = 200 ;
			}else if(code == this.CODE_404 ){
				statuscode = 404 ;
			}else{
				statuscode  = 200 ;
				result.code = code;
			}

			/**
			 * 统一错误提醒页面
			 * @author jiaming
			 * @date 2015-07-10
			 */
			var thisobject = this;
			res.format({
				html: function(){
					thisobject.output(req,res,{message:result.mes},'template','common/message');
					//res.send( statuscode , result.mes );
				},
				json: function(){
					thisobject.output(req,res,{message:result.mes,code:-1,},'json','common/message');
					//res.send( statuscode , result );
				},
				default : function(){
					thisobject.output(req,res,{message:result.mes},'template','common/message');
					//res.send( statuscode , result.mes );
				}
			});
		},


		//-------------------------------------------------
		//-------------公共函数类---------------------------
		/**
		 * 装载库文件
		 * @method L
		 */
		L : function(libname){
			return require(this.lib_path + libname );
		},



		/**
		 * 配置文件信息处理
		 * @method C
		 */
		C : function ( key , value ){
			 return BConfig.conf( key , value );
		},


		/**
		 * 运行框架
		 * @method run
		 */
		run     : function (pid){
			this.projectid = pid || '';
			this.init();
			//监听端口 , 使用中间件 下面两个方法都行
			this.app.listen(this.port);
			console.log('Server is running on port ' + this.port );
		},
}

//导出运行环境
exports.run = function(pid){
	bfw.run(pid);
}

exports.getApp = function(pid){
	bfw.run(pid);
	return bfw.app;
}

