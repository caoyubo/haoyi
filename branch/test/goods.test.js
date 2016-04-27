/**
 *  商品模块测试
 * @author apps
 * @date   16-3-7
 * @version
 */


var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);

/*

describe('post /goods/save condition', function(){


    /* var app,request;
     before(function(done) {
     app     = require('../src/app');
     request = supertest.agent(app);
     done();/!*
     });*!/

    it("goods condition save", function(done){
        request.post('/goods/saveCondition')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                username:'lijiamei',
                passwd  :'123456',
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


describe('get /goods/get condition', function(){

    it("goods condition get", function(done){
        request.get('/goods/getCondition')
            .end(function(err, res){
                console.log(res.text);
                should.not.exists(err);
                done();
            });
    });
});*/

describe('post /goods/findBrand', function(){
    it("goods findBrand", function(done){
        request.post('/goods/findBrand')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({"appid":"mall","currentPage":1,"keywords":{},"offset":0,"orderByClause":{},"pageSize":10,"startLine":0})
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


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

describe('post /goods/findComment', function(){
  it("goods findComment", function(done){
    request.post('/goods/findComment')
      .send({"currentPage":1,"pageSize":4,goodsId:249})
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});



describe('get /goods/deleteComment', function(){
  it("goods deleteComment", function(done){
    request.get('/goods/deleteComment?id=7')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('get /goods/findSecAndThr', function(){
  it("goods findSecAndThr", function(done){
    request.get('/goods/findSecAndThr?goodsclassid=1')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});

