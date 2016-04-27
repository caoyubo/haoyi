/**
 *
 * @author apps
 * @date   16-4-19
 * @version
 */
/**
 *
 * @author apps
 * @date   16-4-12
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

describe('post /station/listpage', function(){
  it("/station/listpage", function(done){
    request.post('/station/listpage')
      .send({"currentPage":1,"pageSize":2,"uid":"cd752ce291e09bbc"})
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});

describe('post /station/read', function(){
  it("/station/read", function(done){
    request.get('/station/read?id=1')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
