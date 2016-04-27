/**
 * haoyi-node-api
 * @author kam 
 * @date   20160127
 * @version 1.0.0
 */

//设置项目ID
var projectid = process.env.APP_PROJECTID || 'haoyi-node-api' ;

// 运行框架
require('./framework/bfw').run(projectid);
