const { Credentials } = require("aws-sdk");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const config = require("../config/key.js");

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});
function setUpload(bucket) {
  var upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket,
      acl: "public-read-write", //접근 범위
      key: function (req, file, cb) {
        let extention = path.extname(file.originalname); //주어지는 파일 이름에서 확장자명 제거한 온전한 파일 이름 제공
        cb(null, Date.now().toString() + extention);
      },
    }),
  }).single("file");
  return upload;
}

module.exports = setUpload;
