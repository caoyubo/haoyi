/**
 * demo model
 * @module bfw
 * @author kam
 * @date   20160127
 * @version 1.0.0
 */

var util        = require('util');

//构造函数
var Demo = function() {
    this.tablename = 'demo';
    this.db        = BFunc.lib( 'bdb').getDb();

};
//继承
util.inherits(Demo, BaseModel);



module.exports = Demo;