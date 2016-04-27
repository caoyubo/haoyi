/**
 * 静态资源类, 主要是提供给模板用的相关参数
 * @module bfw
 * @author blank
 * @date 20151118
 * @version 1.0
 */


function Bstatic( key ){
    return BConfig.conf('statics.' + key );
}
module.exports = Bstatic;