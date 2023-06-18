const express = require("express");
const router = express.Router();
const {
  uploadTrailer,
  createMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  removeMovie,
  getPaginatedMovies,
  methodToPrefillUpdateMovieForm,
  searchMovies,
} = require("../controllers/movie");
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
  // movieUploadValidator,
  // validate,
  createMovie
);
// if you want to update entire document , then use PUT , else PATCH
router.patch(
  "/update-movie-without-poster/:movieId",
  isAuth,
  isAdmin,
  parseMovieData,
  // movieUploadValidator,
  // validate,
  updateMovieWithoutPoster
);
router.patch(
  "/update-movie-with-poster/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseMovieData,
  // movieUploadValidator,
  // validate,
  updateMovieWithPoster
);
router.delete("/delete-movie/:movieId", isAuth, isAdmin, removeMovie);
// pagination route
router.get("/get-movies", isAuth, isAdmin, getPaginatedMovies);
// route to fetch data to pre-fill the Movie Update form
router.get("/get-movie-for-updateform/:movieId", isAuth, isAdmin, methodToPrefillUpdateMovieForm);
// route to search Movies
router.get("/search", isAuth, isAdmin, searchMovies);
module.exports = router;
