const multer = require("multer");
const path = require("path");
// const fs = require('fs');

const crypto = require("crypto");

const secret = "MySecret";

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(
      null,
      crypto
        .createHmac("sha256", secret)
        .update(file.originalname)
        .digest("hex") + path.extname(file.originalname)
    );
  }
});
const upload = multer({
  storage,
  fileFilter: function(req, file, callback) {
    if (req.get("x-test") === file.originalname) {
      return validateFileType(file, callback);
    } else {
      return callback(new Error("Please check your credentials."));
    }
  }
}).single("myImage");

validateFileType = (file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
    return callback(new Error("Only JPG image files are allowed."));
  }
  callback(null, true);
};

module.exports = upload;
