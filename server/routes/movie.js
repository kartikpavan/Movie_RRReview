const express = require("express");
const router = express.Router();
const { uploadTrailer, createMovie } = require("../controllers/movie");
const { isAuth, isAdmin } = require("../middlewares/user");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { movieUploadValidator, validate } = require("../middlewares/Validators");
const { parseMovieData } = require("../utils/helper");

router.post("/upload-trailer", isAuth, isAdmin, uploadVideo.single("trailer"), uploadTrailer);
router.post(
   "/create",
   isAuth,
   isAdmin,
   uploadImage.single("poster"),
   parseMovieData,
   movieUploadValidator,
   validate,
   createMovie
);

module.exports = router;
