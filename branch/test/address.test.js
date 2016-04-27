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

describe('get /address/findByUid', function(){
    it("address findByUid", function(done){
        request.get('/address/findByUid?uid=08dba48478f34a46')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});


describe('get /address/findAllCountry', function(){
  it("address findAllCountry", function(done){
    request.get('/address/findAllCountry')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('get /address/findByPid', function(){
  it("address findByPid", function(done){
    request.get('/address/findByPid?pid=1')
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
