/**
 *
 * @author apps
 * @date   16-1-29
 * @version
 */
var data = "20001@#jru#jsl9*2x12lxp@#check_user@#1454056986@#172.16.110.163";
var algorithm = 'aes-128-ecb';
var key = 'jslcns9482wscdfe';
var iv = "3s_=75jgcq!jrdwp";
var algorithm = 'aes-128-cbc';
var crypto      = require('crypto');
var cipher = crypto.createCipheriv(algorithm, key, iv)
var encrypted = cipher.update(data, 'binary', 'base64')
encrypted += cipher.final('base64');
console.log(encrypted);
return encrypted;