/**
 * 文件上传
 * @author jiaming
 * @date 2015-07-10
 */

var fs = require("fs");
var path = require("path");

function mkdirsSync(dirname, mode){
    if(!dirname){
        return true;
    }
    model = mode || 0777;
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname), mode)){
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}

/**
 * 检查是否在数组之中
 * @param array
 * @param value
 * @returns {boolean}
 */
function in_array(array,value){
    for(var i=0;i<array.length;i++){
        if(array[i] == value){
            return true;
        }
    }
    return false;
}

/**
 * 随机数
 * @param Min
 * @param Max
 * @returns {*}
 * @constructor
 */
function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}



function upload(){

    // 上传路径
    this.upload_path = BConfig.conf('upload_path');

    //上传临时路径
    this.tmp_upload_path = BConfig.conf('tmp_upload_path');

    //最大大小 单位kb
    this.maxSize = BConfig.conf('max_file_limit') || 1024;

    //错误
    this.error = '上传失败';

    //允许文件后缀
    this.allow_upload_ext = BConfig.conf('allow_upload_ext') || ['.jpg','.gif','.png'];

    //是否设置图片大小
    this.is_resize = true;
    this.resize_width = 620;
    this.resize_height = 620;

    /**
     * 上传插件
     */
    this.multiparty = require("multiparty");
    this.form = new this.multiparty.Form({uploadDir: this.tmp_upload_path});

    mkdirsSync(this.tmp_upload_path);
}

/**
 * 保存上传的文件
 * @param upload_image_obj 上传文件对象
 * @param new_file 指定文件名称
 * @returns 文件名称 or false
 */
upload.prototype.save = function(upload_image_obj,new_file){
    if(upload_image_obj == undefined){
        return false;
    }
    var tmp_file = upload_image_obj.path;
    if(!fs.existsSync(tmp_file)){
        return false;
    }

    //文件大小
    if(upload_image_obj.size > this.maxSize * 1024){
        this.error = "文件不能超过"+this.maxSize+"kb";
        fs.unlink(tmp_file);
        return false;
    }

    //是否允许后缀
    var ext = tmp_file.substr(tmp_file.lastIndexOf('.'));
    if(!in_array(this.allow_upload_ext,ext)){
        this.error = '文件类型有误';
        fs.unlink(tmp_file);
        return false;
    }


    if(new_file != undefined){
        var tmp = new_file;
        new_file = path.join(this.upload_path,new_file);
        var file_path = new_file.substr(0,new_file.lastIndexOf('/'));
        mkdirsSync(file_path);
        fs.renameSync(tmp_file,new_file);
        return tmp;

    }

    //移动文件
    //new_file = this.upload_path;
    var date = new Date();
    //new_file = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + '/';
    var path_array = [GetRandomNum(1,9),GetRandomNum(1,9999),GetRandomNum(1,9999)];
    new_file = path_array.join('/')+ '/';

    if(!mkdirsSync(this.upload_path + new_file)){
        return false;
    }
    var Num="";
    for(var i=0;i<6;i++) {
        Num+=Math.floor(Math.random()*10);
    }
    var ext = tmp_file.substr(tmp_file.lastIndexOf('.'));

    new_file += path_array.join('-')+'-'+date.getTime() + '-' + Num + ext;
    console.log('path:',this.upload_path + new_file);
    fs.renameSync(tmp_file,this.upload_path + new_file);

    if(this.is_resize){
        this.image_resize(this.upload_path + new_file);
    }

    return (BConfig.conf('upload_dir')?BConfig.conf('upload_dir'):'') + new_file;

};

/**
 * 调整图片大小
 * @param file
 */
upload.prototype.image_resize = function(file){
    var width = this.resize_width;
    var height= this.resize_height;

    var gm = require("gm");
    var imageMagick = gm.subClass({ imageMagick : true });
    imageMagick(file).resize(width,height).autoOrient().write(file, function(error){
        if(error){
            console.log("error:",error);
        }
    })
}

/**
 * 设置文件保存目录
 */
upload.prototype.setUpload_path = function(path){
    this.upload_path = path;
};

/**
 * 得到保存路径
 */
upload.prototype.getUpload_path = function(){
    return this.upload_path ;
};

/**
 * 设置临时上传目录
 */
upload.prototype.setTmpUploadPath = function(tmp_upload_path){
    this.tmp_upload_path = tmp_upload_path;
};

/**
 * 得到临时上传目录
 */
upload.prototype.getTmpUploadPath = function(){
    return this.tmp_upload_path;
};

upload.prototype.getError = function(){
    return this.error;
};


module.exports = upload;
