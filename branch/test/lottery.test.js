/**
 *
 * @author apps
 * @date   16-4-20
 * @version
 */
var mocha = require('mocha');
var should = require('should');
var supertest = require('supertest');
var bfw = require('../src/framework/bfw');
var app = bfw.getApp("haoyi-node-api");
var request = supertest.agent(app);



describe('get /lottery/findLotteryToday', function () {
  it("lottery /lottery/findLotteryToday", function (done) {
    request.get('/lottery/findLotteryToday')
      .end(function (err, res) {
        console.log(res.text);
        should.not.exists(err);
        done();
      });
  });
});

describe('get /lottery/findLotteryYesterday', function () {
  it("lottery /lottery/findLotteryYesterday", function (done) {
    request.get('/lottery/findLotteryYesterday')
      .end(function (err, res) {
        console.log(res.text);
        should.not.exists(err);
        done();
      });
  });
});

describe('get /lottery/findLotteryByUid', function () {
  it("lottery /lottery/findLotteryByUid", function (done) {
    request.get('/lottery/findLotteryByUid?uid="cd752ce291e09bbc"')
      .end(function (err, res) {
        console.log(res.text);
        should.not.exists(err);
        done();
      });
  });
});

describe('get /lottery/findAllLottery', function () {
  it("lottery /lottery/findAllLottery", function (done) {
    request.get('/lottery/findAllLottery')
      .end(function (err, res) {
        console.log(res.text);
        should.not.exists(err);
        done();
      });
  });
});


describe('post /lottery/findHistoryPage', function () {
  it("lottery /lottery/findHistoryPage", function (done) {
    request.post('/lottery/findHistoryPage')
      .send({
      })
      .end(function (err, res) {
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});


describe('post /lottery/findUserHistoryPage', function () {
  it("lottery /lottery/findUserHistoryPage", function (done) {
    request.post('/lottery/findUserHistoryPage')
      .send({
        uid:'cd752ce291e09bbc'
      })
      .end(function (err, res) {
        console.log(JSON.stringify(res));
        should.not.exists(err);
        done();
      });
  });
});
