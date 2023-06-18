const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/user");
const {
   postReview,
   updateReview,
   removeReview,
   getReviewsByMovie,
} = require("../controllers/reviews");
const { reviewValidator, validate } = require("../middlewares/Validators");

router.post("/add/:movieId", isAuth, reviewValidator, validate, postReview);
router.patch("/edit/:reviewId", isAuth, reviewValidator, validate, updateReview);
router.delete("/remove/:reviewId", isAuth, removeReview);
router.get("/get-reviews-by-movie/:movieId", getReviewsByMovie);

module.exports = router;
