const express = require("express");
const router = express.Router();
const { uploadTrailer } = require("../controllers/movie");
const { isAuth, isAdmin } = require("../middlewares/user");
const { uploadVideo } = require("../middlewares/multer");

router.post("/upload-trailer", isAuth, isAdmin, uploadVideo.single("trailer"), uploadTrailer);

module.exports = router;
