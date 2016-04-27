/**
 * 主路由 demo
 * @author kam
 * @date   20160127
 * @version 1.0.0
 * @param app
 */

module.exports = function (bfw , router ) {

	/*router.use(function(req, res, next){
		BLog.debug( 'begin......' );
		next();
	});*/

	router.all('*', function(req, res, next){
    //微信端要注释这个跨域
	/*	res.header("Access-Control-Allow-Credentials", "true");
		res.header("Access-Control-Allow-Origin", "http://172.16.110.150:8100");
		res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,X-CSRFToken");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1');
		res.header("Content-Type", "application/json;charset=utf-8");*/
		next();
	});

	router.get('/', function(req, res, next) {
		res.redirect("/index");
    //res.render('test');
	});

	/**
	 * api路由
	 */
	router.get('/index', function(req, res) {
		res.render("www/index");
    //bfw.output(req,res,{},"template","test");
	});


};
