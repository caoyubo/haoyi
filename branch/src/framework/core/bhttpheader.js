/*
 @require  nodejs  请求头
 @copyright  marlowe
 *list   rest
 */

function counts(req, urls) {
    var con = BConfig.conf('conf');
    //BLog.debug("*****************************************get发送请求头********************************************");
    //BLog.debug("url:" + urls);
    urls = encodeURI(urls);
    BLog.debug("encosndeURI url:" + urls);
    var json = {
        hostname: con.apiHttpurl,
        port: con.apiPorts,
        path: urls,
        method: "GET",
        agent: false,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cache-Control': 'max-age=2222',
            'X-Requested-With': 'XMLHttpRequest',
            'signature': "username=marlowe"
        }
    }
    BLog.debug(json);
    return json;
}

function httpSendDateToGet(req, res, urls, dealFunction) {
    BLog.debug("*****************************************get发送请求头********************************************");
    var http = require('http');
    var httpheaders = counts(req, urls);  //接收函数传过来的值
    http.get(httpheaders, function (reqq) {
        reqq.setEncoding('utf8');
        var chunks = "";
        //循环获取数据
        reqq.on('data', function (chunk) {
            chunks += chunk;
        });
        //获取数据后的处理
        reqq.on("end", function () {
            console.log('返回数据：' + chunks);
            dealFunction(chunks, req, res);
            /*if (chunks == '') {
             BLog.debug("chunks为空");
             return;
             } else {
             BLog.debug("chunks" + chunks);
             var sessions = JSON.parse(chunks).session;
             if (sessions == false) {
             var logo = global.urls + "/";
             BLog.debug(logo);
             res.redirect(logo);
             return;
             } else {
             dealFunction(chunks, req, res);
             }
             }*/
        });
    });
}
exports.counts = counts;
exports.httpSendDateToGet = httpSendDateToGet;

/*
 * marlowe
 * post
 * urs post 请求
 */
function httpSendDateTopost(req, res, urls, dealFunction, data) {
    var http = require('http');
    var con = BConfig.conf('conf');
    var opt = {
        method: "POST",
        host: con.httpurl,
        port: con.ports,
        path: urls,
        headers: {
            "Content-Type": 'application/json',
            "Content-Length": data.length
        }
    };
    var reqq = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug(body);
                dealFunction(body, req, res);
            });
        }
        else {
            res.send(500, "error");
        }
    });
    reqq.write(data + "\n");
    reqq.end();
}
exports.httpSendDateTopost = httpSendDateTopost;

/*
 * marlowe
 * post  rest
 * api post 请求
 */

function httpSendDateToGetrestpost(res, req, urls, dealFunction, data) {
    var http = require('http');
    var con = BConfig.conf('conf');
    var opt = {
        method: "POST",
        host: con.apiHttpurl,
        port: con.apiPorts,
        path: urls,
        headers: {
            "Content-Type": 'application/json',
            //"Content-Length": data.length
        }
    };
    var reqq = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug(body);
                dealFunction(body, req, res);
            });
        }
        else {
            console.log('statusCode:',serverFeedback.statusCode);
            res.send(500, "error");
        }
    });
    console.log('data:',data);
    reqq.write(data + "\n");
    reqq.end();
}
exports.httpSendDateToGetrestpost = httpSendDateToGetrestpost;


/**
 * rest请求
 * option 字段 (host:请求地址 port:端口  或配置文件的字段name) url:路径 data:请求数据 method:请求方法
 * callback 参数 error:是否出错 data:返回的数据 req res
 */
exports.httpRestRequest = function (req,res,option,callback){
    var host  = option.host || BConfig.conf('api_adress_list')[option.name].host;
    var port = option.port || BConfig.conf('api_adress_list')[option.name].port;
    var data = _.isObject(option.data) ? JSON.stringify(option.data) : option.data;
    var http = require('http');

    var opt = {
        method: option.method || 'POST',
        host: host,
        port: port,
        path: option.url,
        headers: {
            "Content-Type": 'application/json',
            //"Content-Length": data.length
        }
    };
    var reqq = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug(body);
                body = JSON.parse(body);
                callback('',body, req, res);
            });
        }
        else {
            BLog.debug('statusCode:'+serverFeedback.statusCode);
            callback('error','', req, res);
        }
    });

    BLog.data(data);
    if(data){
        reqq.write(data + "\n");
    }

    reqq.end();
}


exports.httpRequest = function(req,res,option,callback){
    var http = require('http');


    var reqq = http.request(opt, function (serverFeedback) {
        if (serverFeedback.statusCode == 200) {
            var body = "";
            serverFeedback.on('data', function (data) {
                body += data;
            });
            serverFeedback.on('end', function () {
                BLog.debug(body);
                body = JSON.parse(body);
                callback('',body, req, res);
            });
        }
        else {
            BLog.debug('statusCode:'+serverFeedback.statusCode);
            callback('error','', req, res);
        }
    });

};


