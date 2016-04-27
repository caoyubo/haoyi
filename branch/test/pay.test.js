/**
 *
 * @author apps
 * @date   16-3-28
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
