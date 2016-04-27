/**
 *  过滤器demo
 * @module bfw
 * @author kam
 * @date 20160127
 * @version 1.0.0
 */
module.exports = function (req, res ,next) {
    BLog.debug('这是一个过滤器');
    next();
};
