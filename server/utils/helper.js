const crypto = require("crypto");

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
module.exports = { generateRandomBytes, parseMovieData, averageRatingPipeline };
