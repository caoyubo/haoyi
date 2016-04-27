/**
 *
 * @author kam
 * @date   16-1-28
 * @version
 */
var crypto = require('crypto');
//AES  加密  cbc  -  binary  base64
exports.AES = function(content,key,iv){
    console.log('Original cleartext: ' + content);
    var algorithm = 'aes-128-cbc';
    var clearEncoding = 'binary';
    var cipherEncoding = 'base64';
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var encrypted = cipher.update(content, clearEncoding, cipherEncoding);
    encrypted += cipher.final('base64');
    return encrypted;
}
//md5 加密
exports.md5 = function(content){
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest('hex');
    return d;
}