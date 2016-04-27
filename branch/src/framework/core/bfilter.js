/**
 *  kam
 * @author apps
 * @date   16-3-21
 * @version
 */


exports.bfilter = function (req, res, next) {
  var loginJson = {r:"-1",data:null,tid:"", errmsg:"登录失效，请重新登录", errcode:"0001"};
  //--系统过滤连
  if (checkSysFilter(req)) {
    next();
  } else {

    //--获取cookies
    var cookieUser = req.cookies.user;
    //var cookieToken = req.cookies.token;
    console.log("过滤器cookie-------------" + cookieUser);
    //console.log("过滤器cookie-------------" + cookieToken);
    var sessionUser = req.session.user;
    console.log("过滤器session------------" + sessionUser);
    if (undefined == cookieUser || undefined == sessionUser) {
      res.json(loginJson);
    } else {
      if (sessionUser == cookieUser) {
        console.log("登陆状态-------------");
        next();
      } else {
        console.log("不在登陆状态-------------");
        res.json(loginJson);
      }
    }
  }
}

/**
 * 系统过滤连
 * @param req
 * @returns {boolean}
 */
function checkSysFilter(req) {

  var sysFilters = BConfig.conf('login_filter');
  console.log("定义拦截的接口-------------" + sysFilters);

  for (var i = 0; i < sysFilters.length; i++) {

    if (req.originalUrl.match(sysFilters[i])) {
      console.log("成功拦截----------------："+sysFilters[i]);
      return false;
    }
  }
  console.log("不进行拦截----------------"+req.originalUrl);
  return true;
};
