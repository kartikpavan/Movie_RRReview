const Movie = require("../models/movie");
const User = require("../models/user");
const Review = require("../models/review");

const getStats = async (req, res) => {
   const movieCount = await Movie.countDocuments();
   const reviewCount = await Review.countDocuments();
   const userCount = await User.countDocuments();

   res.status(200).json({ data: { movieCount, userCount, reviewCount } });
};

module.exports = { getStats };
