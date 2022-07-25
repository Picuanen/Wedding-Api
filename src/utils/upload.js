const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log();
    const type = file.mimetype.split('/')[0] + 's';

    cb(null, 'public/' + type);
  },
  filename: function (req, file, cb) {
    const type = file.mimetype.split('/')[0] + 's';

    cb(null, type + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
