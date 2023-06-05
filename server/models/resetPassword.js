const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ResetPasswordSchema = mongoose.Schema({
   owner: {
      type: mongoose.Schema.Types.ObjectId, // special type of ID stored in MongoDB
      ref: "User", // reference to the User Schema
      required: true,
   },
   token: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

ResetPasswordSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);
   this.token = await bcrypt.hash(this.token, salt);
});

ResetPasswordSchema.methods.compareToken = async function (hashedToken) {
   const result = await bcrypt.compare(hashedToken, this.token);
   return result;
};

const ResetPassword = mongoose.model("ResetPassword", ResetPasswordSchema);

module.exports = ResetPassword;
