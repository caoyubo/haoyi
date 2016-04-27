/**
 * demo controller
 * @module bfw
 * @author kam
 * @date   20160127
 * @version 1.0.0
 */

// 用户model
var DemoModel = BFunc.model('demo');

/**
 * 示范
 * @param bfw
 * @param req
 * @param res
 * @param next
 */
exports.index = function( bfw , req , res ,next ){

    DemoModel.find({})
        .exec(function( err , doclist){
            var data = [];
            if(!err) {
                data = doclist;
                console.log(doclist);
            }

            console.log(BFunc.getResult(0, data));
            res.json(BFunc.getResult(0, data));
        });

}
