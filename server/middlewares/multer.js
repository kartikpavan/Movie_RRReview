const multer = require("multer");
const storage = multer.diskStorage({});

// control which image file type to upload
const imageFileFilter = (req, file, cb) => {
   if (!file.mimetype.startsWith("image")) {
      cb("Only image Files are supported", false);
   }
   cb(null, true);
};

// control which image file type to upload
const videoFileFilter = (req, file, cb) => {
   if (!file.mimetype.startsWith("video")) {
      cb("Only Video Files are supported", false);
   }
   cb(null, true);
};

const uploadImage = multer({ storage, fileFilter: imageFileFilter });
const uploadVideo = multer({ storage, fileFilter: videoFileFilter });
module.exports = { uploadImage, uploadVideo };
