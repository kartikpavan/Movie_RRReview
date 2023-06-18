const mongoose = require("mongoose");
const { Schema } = mongoose;

// owner , movie ,rating and review
const ReviewSchema = new Schema({
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   parentMovie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
   },
   content: {
      type: String,
      trim: true,
   },
   rating: {
      type: Number,
      required: true,
   },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
