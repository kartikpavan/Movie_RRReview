const multer = require("multer");
const storage = multer.diskStorage({});

// control which file type to upload
const fileFilter = (req, file, cb) => {
   console.log(file);
   if (!file.mimetype.startsWith("image")) {
      cb("Only image Files are supported", false);
   }
   cb(null, false);
};

const uploadImage = multer({ storage, fileFilter });
module.exports = { uploadImage };
