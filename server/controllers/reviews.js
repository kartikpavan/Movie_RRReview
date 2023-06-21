const { isValidObjectId } = require("mongoose");
const Review = require("../models/review");
const Movie = require("../models/movie");
const { getAvgRatings } = require("../utils/helper");

const postReview = async (req, res) => {
   const { content, rating } = req.body;
   const { movieId } = req.params;
   const userId = req.user._id;

   if (!isValidObjectId(movieId)) return res.json({ error: "Movie id not Found" });

   //check if the movie exists inside the DB
   const movie = await Movie.findOne({ _id: movieId, status: "public" });
   if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

   //check if user has already reviewed the movie or not
   const isReviewed = await Review.findOne({ owner: userId, parentMovie: movieId });
   if (isReviewed) {
      return res
         .status(404)
         .json({ msg: "Cannot add Another Review,User has already Reviewed the Movie" });
   }

   // create Movie
   const newReview = new Review({
      owner: userId,
      parentMovie: movie._id,
      content: content,
      rating: rating,
   });

   // Linking the review to the associated Movie
   movie.reviews.push(newReview._id);
   await movie.save(); // updating review for movie
   await newReview.save(); // saving new review and

   const reviews = await getAvgRatings(movie._id); // we are getting the avg rating as well to update the UI as soon as someone post a review

   res.status(201).json({ msg: "Your Review has been added", reviews });
};

const updateReview = async (req, res) => {
   const { reviewId } = req.params;
   const { content, rating } = req.body;
   const userId = req.user._id;

   if (!isValidObjectId(reviewId)) return res.json({ error: "Review id not Found" });

   //check if the review exists inside the DB
   const review = await Review.findOne({ owner: userId, _id: reviewId });
   if (!review) return res.status(404).json({ error: "Review Not found inside Database" });

   review.content = content;
   review.rating = rating;
   const editedReview = await review.save();

   res.status(201).json({ msg: "Your Review has been Updated", data: editedReview });
};

const removeReview = async (req, res) => {
   const { reviewId } = req.params;
   const userId = req.user._id;

   if (!isValidObjectId(reviewId)) return res.json({ error: "Review id not Found" });
   //check if the review exists inside the DB
   const review = await Review.findOne({ owner: userId, _id: reviewId });
   if (!review) return res.status(404).json({ error: "Review Not found inside Database" });

   // find the movie where this review exists and delete that review
   const movie = await Movie.findById(review.parentMovie).select("reviews");
   movie.reviews = movie.reviews.filter((r) => r.toString() !== reviewId); //!when comparing id in mongo , convert them into string

   await Review.findByIdAndDelete(reviewId);
   await movie.save();

   res.status(201).json({ msg: "Review Removed successfully" });
};

const getReviewsByMovie = async (req, res) => {
   const { movieId } = req.params;

   if (!isValidObjectId(movieId)) return res.json({ error: "Review id not Found" });

   //! we do population b'coz we are storing the id's of the review inside the single movie , not all the information
   // with populate we can get all the data
   const movie = await Movie.findById(movieId)
      .populate({
         path: "reviews",
         populate: { path: "owner", select: "name" },
      })
      .select("reviews title");
   if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

   const reviews = movie.reviews.map((r) => {
      const { owner, content, rating, _id: reviewId } = r;
      const { name, _id: ownerId } = owner;
      return {
         reviewId,
         name,
         ownerId,
         content,
         rating,
      };
   });

   res.status(201).json({ data: { reviews, title: movie.title } });
};

module.exports = { postReview, updateReview, removeReview, getReviewsByMovie };
