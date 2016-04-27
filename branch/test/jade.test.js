/**
 *
 * @author apps
 * @date   16-3-17
 * @version
 */
var mocha       = require('mocha');
var should      = require('should');
var supertest   = require('supertest');
var bfw         = require('../src/framework/bfw');
var app         = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);

describe('jade findByUid',function(){
    it('get cart findByUid' ,function(done){
        request.get('/jade/findByUid?uid=fd4c79d98d075c68')
            .end(function(err, res){
                console.log(JSON.stringify(res));
                should.not.exists(err);
                done();
            });
    });
});
