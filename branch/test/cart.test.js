/**
 *
 * @author apps
 * @date   16-3-9
 * @version
 */
var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);



describe('cart find',function(){
    it('get cart find' ,function(done){
        request.get('/cart/findCart?appId=mall&userId=c1e115a17056bcb1')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
        });
    });
});


describe('get /cart add', function(){
  it('get cart add', function(done){
    request.post('/cart/add')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('X-HTTP-Method-Override', 'POST')
      .send({
        userid      :'22d41c6b3df5dbf5',
        goodsid     : 277,
        specid      : 320,
        goodsnum    : 1,
      })
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})

describe('get /goods/findById', function(){
  it("goods findById", function(done){
    request.get('/goods/findById?id=166')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
