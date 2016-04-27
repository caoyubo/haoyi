/**
 *
 * @author apps
 * @date   16-3-19
 * @version
 */

var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request     = supertest.agent(app);

describe('get /diamond/findByUid', function(){
    it("diamond findByUid", function(done){
        request.get('/diamond/findByUid?uid=fd4c79d98d075c68')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});

describe('post /diamond/getDetail', function(){
  it('post /diamond/getDetail', function(done){
    request.post('/diamond/getDetail')
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('X-HTTP-Method-Override', 'POST')
      .send({
        custCode              : '08dba48478f34a46',
        dealType              : '0001',
        dealStartTime         : '1970-01-01',
        dealEndTime           : '2016-03-29',
        trsAmount             : 0,
      })
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})


describe('post /diamond/getDetail', function(){
  it('post /diamond/getDetail', function(done){
    request.post('/diamond/getDetail')
      .send({
        custCode              : '08dba48478f34a46'
      })
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})



describe('post /diamond/withdraw', function(){
  it('post /diamond/withdraw', function(done){
    request.post('/diamond/withdraw')
      .send({"point":"100","type":0,"remarks":"123","ownerid":"cd752ce291e09bbc","transpassword":"123456",fee:0}
        )
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})


describe('post /diamond/findWithdraw', function(){
  it('post /diamond/findWithdraw', function(done){
    request.post('/diamond/findWithdraw')
      .send(
        {
         "ownerid":"cd752ce291e09bbc",
          pageSize:2,
          currentPage:1,
         }
      )
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})


describe('post /diamond/operate', function(){
  it('post /diamond/operate', function(done){
    request.post('/diamond/operate')
      .send({"bankCardInfoReq":
            { "custCode":"5d8161bbe24b9a44",
              "bankNum":"13456456",
              "bankName":"",
              "bankPhone":"15171846042"},
          "operatetype":"cancel",
          "password":"123456",})
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})
