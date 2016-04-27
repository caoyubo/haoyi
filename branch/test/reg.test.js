/**
 *
 * @author apps
 * @date   16-3-12
 * @version
 */
var mocha       = require('mocha');
var should      = require('should');
var add         = require('./add');
var supertest   = require('supertest');
//    express = require('express');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);

describe('/reg  apply', function(){

    it('/reg apply', function(done){
        request.post('/user/apply')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                uid     : '567051837dbb0875',
                newlevel: '2'
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });

});

describe('get /reg findLevelByUid', function(){
    it('get /reg findLevelByUid', function(done){
        request.get('/user/findLevelByUid?uid=60d303aaf24784e6')
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


describe('/reg  applySubmit', function(){

    it('/reg applySubmit', function(done){
        request.post('/user/updateApply')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                id              : 2,
                bankname        : '中国人民银行',
                serialnumeric   : '130120121',
                paytime         :  new Date()
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });

});


describe('get /reg getStatusByUid', function(){
    it('get /reg getStatusByUid', function(done){
        request.get('/user/getStatusByUid?uid=567051837dbb0875')
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


describe('get /reg getUserByUid', function(){
    it('get /reg getUserByUid', function(done){
        request.get('/user/getUserByUid?uid=567051837dbb0875')
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


describe('get /user/getUserByParent', function(){
  it("getUserByParent task", function(done){
    request.get('/user/getUserByParent?uid=a25485aeb8265af3')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
