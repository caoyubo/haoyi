/**
 *
 * @author apps
 * @date   16-4-21
 * @version
 */
var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);


describe('post /gift/findGoods', function(){
  it('post /gift/findGoods', function(done){
    request.post('/gift/findGoods')
      .send()
      .end(function(err, res){
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
})
