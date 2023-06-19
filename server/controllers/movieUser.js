const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");
const { averageRatingPipeline } = require("../utils/helper");

const getLatestMoviesForUsers = async (req, res) => {
   const latestMovies = await Movie.find({ status: "public" }).sort("-createdAt").limit(4);

   const results = latestMovies.map((m) => {
      return {
         _id: m._id,
         title: m.title,
         poster: m.poster?.url,
         trailer: m.trailer?.url,
         storyLine: m.storyLine,
      };
   });

   res.status(200).json({ data: results });
};

const getSingleMovieForUsers = async (req, res) => {
   const { movieId } = req.params;
   if (!isValidObjectId(movieId)) return res.json({ error: "Movie id not Found" });

   //check if the movie exists inside the DB
   const movie = await Movie.findById(movieId).populate("director writers cast.actor");
   if (!movie) return res.status(404).json({ error: "Movie Not found inside Database" });

   //! What is Aggregation
   /* 
   Aggregation in MONGO is like a conveyer belt in a factory,
   where we can perform multiple operations in multiple stages ,aka, pipeline
   and the result of one pipeline is passed into another pipeline

   Review => ratings => parentMovie => Avg of all Ratings
   */
   const [aggregateResponse] = await Review.aggregate(averageRatingPipeline(movie._id));
   console.log(aggregateResponse);

   const reviews = {};
   if (aggregateResponse) {
      const { ratingAvg, reviewCount } = aggregateResponse;
      reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
      reviews.reviewCount = reviewCount;
   }

   const {
      _id,
      title,
      storyLine,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      director,
      language,
      trailer,
      writers,
      poster,
   } = movie;
   res.json({
      data: {
         _id,
         title,
         storyLine,
         releaseDate,
         status,
         type,
         language,
         genres,
         tags,
         poster: poster?.url,
         trailer: trailer?.url,
         cast: cast.map((c) => {
            return {
               _id: c._id,
               profile: {
                  actorId: c.actor._id,
                  name: c.name,
                  avatar: c.avatar?.url,
               },
               roleAs: c.roleAs,
               leadActor: c.leadActor,
            };
         }),
         director: {
            _id: director.id,
            name: director.name,
         },
         writers: writers.map((w) => {
            return {
               _id: w._id,
               name: w.name,
            };
         }),
         reviews: { ...reviews },
      },
   });
};

module.exports = { getLatestMoviesForUsers, getSingleMovieForUsers };
