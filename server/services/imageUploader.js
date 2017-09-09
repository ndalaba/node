var multer = require('multer');
var path = require('path');

class ImageUploader {

    upload(destination) {
        var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, __dirname + '/../public/uploads/' + destination);
            },
            filename: function (req, file, callback) {
                let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
                callback(null, filename);
            }
        });
        return multer({
            storage: storage,
            fileFilter: function (req, file, cb) {
                let extension = path.extname(file.originalname);
                if (extension !== '.jpg' && extension !== '.JPG' && extension !== '.png' && extension !== '.jpeg') {
                    return cb(new Error('Image non valide '+extension))
                }
                cb(null, true)
            }
        });
    }

}

module.exports = new ImageUploader()