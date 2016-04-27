/**
 *
 * @author apps
 * @date   16-1-28
 * @version
 */
var crypto = require('crypto');
var data = "20001@#jru#jsl9*2x12lxp@#check_user@#1454056986@#172.16.110.163";
var algorithm = 'aes-128-cbc';
var key = 'jslcns9482wscdfe';
var clearEncoding = 'binary';
var iv = "3s_=75jgcq!jrdwp";
//var cipherEncoding = 'hex';
//If the next line is uncommented, the final cleartext is wrong.
var cipherEncoding = 'base64';
var cipher = crypto.createCipheriv(algorithm, key, iv);
var cipherChunks = [];
cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
cipherChunks.push(cipher.final(cipherEncoding));
console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));

var decipher = crypto.createDecipheriv(algorithm, key, iv);
var plainChunks = [];
for (var i = 0; i < cipherChunks.length; i++) {
    plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));

}
plainChunks.push(decipher.final(clearEncoding));
console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
var content = "ssssssss"
var md5 = crypto.createHash('md5');
md5.update(content);
var d = md5.digest('hex');

console.log("ddddd"+d);