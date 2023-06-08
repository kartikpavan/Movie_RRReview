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

module.exports = { generateRandomBytes, parseMovieData };
