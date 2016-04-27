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

describe('post /shop/findById', function(){

    it("shop findById", function(done){
        request.get('/shop/findById?shopId=54')
            /*.set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                username:'lijiamei',
                passwd  :'123456',
            })*/
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


describe('get /shop/fans_select', function(){

  it("shop fans_select", function(done){
    request.get('/shop/fans_select?shopId=68&userId=cd752ce291e09bbc')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('post /shop/fans_create', function(){

  it("shop fans_create", function(done){
    request.post('/shop/fans_create')
      .send({userId:'testuid3',shopId:1,})
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('post /shop/fans_delete', function(){

  it("shop fans_delete", function(done){
    request.get('/shop/fans_delete?shopId=1&userId=testuid2')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('post /shop/fans_count', function(){

  it("shop fans_count", function(done){
    request.get('/shop/fans_count?shopId=1')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
