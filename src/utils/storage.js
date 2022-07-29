const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { credentials } = require('../config/aws');
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials,
});
const s3 = new AWS.S3({ credentials }); // Pass in opts to S3 if necessary

module.exports = {
  upload: multer({
    storage: multerS3({
      s3: client,
      bucket: process.env.AWS_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  }),
  getFile: async (key) => {
    return s3.getObject({ Bucket: process.env.AWS_BUCKET, Key: key }).createReadStream();
  },
  deleteFile: async (key) => {
    return s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
      if (err) console.log(err);
    });
  },
};
