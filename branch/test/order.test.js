/**
 *
 * @author apps
 * @date   16-3-10
 * @version
 */
var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);


/*describe('get /order findById', function(){
    it('get order findById', function(done){
        request.get('/order/findById?id=605')
            /!*.set('content-type', 'application/x-www-form-urlencoded')
             .set('X-HTTP-Method-Override', 'POST')
             .send({
             username:'lijiamei',
             passwd  :'123456',
             })*!/
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
})


describe('get /order get', function(){
    it('get order get', function(done){
        request.post('/order/get')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('X-HTTP-Method-Override', 'POST')
                .send({
                    currentPage : 1,
                    pageSize    : 1,
                    appid       : 'mall',
                    buyerUid    : '08dba48478f34a46'
                 })
                .end(function(err, res){
                    console.log(JSON.stringify(res));
                    should.not.exists(err);
                    done();
                });
        });
})

describe('get /order getPayList', function(){
    it('get order getPayList', function(done){
        request.get('/order/getPayList')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
})

describe('post /order/pay', function(){
  it('post /order/pay', function(done){
    request.post('/order/pay')
      .send({
        uid             : 1,
        terminalflag    : 'mobile',
        billid          : 'mall',
        callbackurl     : 'http://'
      })
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})

describe('get /getBillOrder', function(){
    it('get getBillOrder', function(done){
        request.get('/order/getBillOrder?id=')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
        });
    });
});


/!*describe('post /order cart create', function(){
  it('post order  cart create', function(done){
    request.post('/order/cartCreate')
      .send(
      {buyerid:"22d41c6b3df5dbf5",
        orderAddressReq:{id:61},
        orderform:"pc",
        paytype:"1",
        carids:[248,249,250]
      }
    )
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});*!/



describe('post /order goodsComment', function(){
  it('post order goodsComment', function(done){
    request.post('/order/goodsComment')
      .send({
        orderId:605,
        reqList:[
          {
            goodsId:187,
            //specId:293,
            score:2,
            comment:"真是物美价廉",
            remark:''
          }]
      })
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})


describe('post /order/gift/pay', function(){
  it('post /order/gift/pay', function(done){
    request.get('/order/gift/pay?id=543')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})*/

describe('post /order create', function(){
  it('post order create', function(done){
    request.post('/order/gift/create')
      .send(
      {"buyerid":"08dba48478f34a46",
        "orderAddressReq":{"id":61},
        "orderform":"pc","specIds":[{"id":360,"goodsnum":1}]
      }
    )
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})

