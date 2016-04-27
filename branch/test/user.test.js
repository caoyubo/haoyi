/**
 *
 * @author apps
 * @date   16-1-29
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

/*describe('test add', function () {
    console.log("coming");
    it('1 + 1 should be equal to 2', function (done) {
        console.log("!!!!!");
        var user = {
            name: 'tj'
            , pets: ['tobi', 'loki', 'jane', 'bandit']
        };

        user.should.have.property('name', 'tj');
        user.should.have.property('pets').with.lengthOf(4);
        done();
    });
});

var name = "zhaojian";

describe("name", function () {
    it("the name should be zhaojian", function () {
        name.should.eql("zhaojian");
    });
});

describe('post /user/checkUser', function(){


   /!* var app,request;
    before(function(done) {
        app     = require('../src/app');
        request = supertest.agent(app);
        done();
    });*!/

    it("checkUser task", function(done){
        request.post('/user/checkUser')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                username:'kamzhuyuqing'
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});*/

describe('post /user/verify', function(){


    /* var app,request;
     before(function(done) {
     app     = require('../src/app');
     request = supertest.agent(app);
     done();
     });*/

    it("checkUser task", function(done){
        request.post('/user/verify')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                username:'kamzhuyuqing22',
                phone   :'13726931018',
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


describe('post /user/register', function(){


    /* var app,request;
     before(function(done) {
     app     = require('../src/app');
     request = supertest.agent(app);
     done();
     });*/

    it("register task", function(done){
        request.post('/user/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('X-HTTP-Method-Override', 'POST')
            .send({
                username:'kamzhuyuqing22',
                phone   :'13726931018',
                passwd  :'123456',
                repasswd:'123456',
                rcode   :'123456'
            })
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


describe('post /user/login', function(){


    /* var app,request;
     before(function(done) {
     app     = require('../src/app');
     request = supertest.agent(app);
     done();
     });*/

    it("login task", function(done){
        request.post('/user/login')
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


describe('post /user/modifyCode', function(){
    it("login task", function(done){
        request.post('/user/modifyCode')
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

describe('get /user/sendCode', function(){
    it("login task", function(done){
        request.get('/user/sendCode?sTels=13726931016')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});

describe('get /user/getUserByParent', function(){
    it("getUserByParent task", function(done){
        request.get('/user/getUserByParent?uid=08dba48478f34a46')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});

describe('get /user/logout', function(){
  it("logout task", function(done){
    request.get('/user/logout')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
