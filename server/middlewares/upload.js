const multer = require("multer");
const path = require("path");

// Define storage
// destination - Defines the folder where the uplodeed files should go
// req - the current HTTP request
// file - contents of the uploaded file
// cb - a callback function to tell multer what to do
// filename - Defines how each uploaded file should be named on the disk
// multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/*
// Filters which files are accepted before saving
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("/image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowes!"), false);
  }
};
*/

const upload = multer({ storage });

module.exports = upload;