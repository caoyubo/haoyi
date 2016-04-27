/**
 * 这里定义一些常量
 */

/**
 * 初始化,可以设置自定义的global 参数
 * @param pid
 */
exports.init = function( pid ){

}

var CONST = {

    //商品状态 0取消 1为开始 2开始 3完成
    GOODS_STATE_CANCLE      : 0,
    GOODS_STATE_NOT_START   : 1,
    GOODS_STATE_START       : 2,
    GOODS_STATE_FINISH      : 3,
}

var define =  function(name){
        var keyList = name.split('.');
        var values = CONST;
        for(var k in keyList){
            if(typeof values[keyList[k]] == 'undefined'){
                return null;
            }
            values = values[keyList[k]];
        }
        return values;

    };

exports.define = define;