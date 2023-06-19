const crypto = require("crypto");
const Review = require("../models/review");
const Movie = require("../models/movie");

const generateRandomBytes = () => {
   return new Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
         if (err) return reject(err);
         const bufferString = buff.toString("hex");
         resolve(bufferString);
      });
   });
};

const parseMovieData = (req, res, next) => {
   const { trailer, cast, genres, tags, writers } = req.body;

   if (trailer) req.body.trailer = JSON.parse(trailer);
   if (cast) req.body.cast = JSON.parse(cast);
   if (genres) req.body.genres = JSON.parse(genres);
   if (tags) req.body.tags = JSON.parse(tags);
   if (writers) req.body.writers = JSON.parse(writers);

   next();
};

const averageRatingPipeline = (movieId) => {
   return [
      // Stage 1
      {
         //*(NOTE : All these records like rating ,_id needs to be inside the same DB)
         $lookup: {
            from: "Review", // looking inside Review Collection
            localField: "rating", // we are working with the rating field here
            foreignField: "_id", // passing the id of the particular review
            as: "avgRating", // alias name
         },
      },
      // Stage 2
      {
         // match all the records from lookup stage and,
         // fiter records that match the parent movie ID / particular movie
         $match: {
            parentMovie: movieId,
         },
      },
      //  Stage 3
      {
         // grouping all the data
         $group: {
            _id: null,
            // calculating the average rating
            ratingAvg: {
               $avg: "$rating", // localField prop name
            },
            reviewCount: {
               $sum: 1,
            },
         },
      },
   ];
};

const relatedMoviesPipeline = (movieId, genres) => {
   return [
      // Stage1
      {
         $lookup: {
            from: "Movie", // looking inside Movie Collection
            localField: "genres", // we are working with the rating field here
            foreignField: "_id", // passing the id of the particular review
            as: "relatedMovies", // alias name
         },
      },
      //Stage 2
      {
         // checking if the tags are similar
         $match: {
            genres: { $in: [...genres] }, // check if the tags include the tags from the incoming movieId
            _id: { $ne: movieId }, //  ne=>not equal to, we are excluding current movie from the related movie list
         },
      },
      // Stage 3
      {
         // similar to map function in JS,
         // we only want these 3 information out of this aggregate function
         $project: {
            _id: 1,
            title: 1, // true
            poster: "$poster.url",
         },
      },
      // Stage 4
      {
         // we only want 5 records not all movies with similar tags
         $limit: 5,
      },
   ];
};

const topRatedMoviesPipeline = (type) => {
   return [
      // Stage1
      {
         $lookup: {
            from: "Movie", // looking inside Movie Collection
            localField: "reviews", // we are working with the review field here
            foreignField: "_id", // passing the id of the particular review
            as: "topRated", // alias name
         },
      },
      //Stage 2
      {
         // checking if the rating exists
         $match: {
            reviews: { $exists: true },
            status: { $eq: "public" },
            type: { $eq: type },
         },
      },
      // Stage 3
      {
         // similar to map function in JS,
         // we only want these information out of this aggregate function
         $project: {
            title: 1, // true
            poster: "$poster.url",
            reviewCount: { $size: "$reviews" }, // counting length of the review to sort the movies in the descending order later
         },
      },
      // Stage 4
      {
         $sort: { reviewCount: -1 }, // sorting better reviewed movie in descending order
      },
      // Stage 5
      {
         // we only want 5 records not all movies with similar tags
         $limit: 5,
      },
   ];
};

const getAvgRatings = async (movieId) => {
   const [aggregateResponse] = await Review.aggregate(averageRatingPipeline(movieId));

   const reviews = {};
   if (aggregateResponse) {
      const { ratingAvg, reviewCount } = aggregateResponse;
      reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
      reviews.reviewCount = reviewCount;
   }
   return reviews;
};
module.exports = {
   generateRandomBytes,
   parseMovieData,
   getAvgRatings,
   averageRatingPipeline,
   relatedMoviesPipeline,
   topRatedMoviesPipeline,
};
