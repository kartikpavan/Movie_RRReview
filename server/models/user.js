const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true,
   },
   email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   isVerified: {
      type: Boolean,
      required: true,
      default: false,
   },
});

// pre Middleware for hashing Password
UserSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
