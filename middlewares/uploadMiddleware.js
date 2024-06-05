var multer = require('multer')
var path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + file.fieldname + path.extname(file.filename)
        cb(null, file.fieldname + uniquesuffix)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};

const uploadPhoto = multer({ storage: storage, fileFilter: multerFilter })

module.exports = { uploadPhoto }