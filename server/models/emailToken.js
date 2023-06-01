const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// verification Token
/* 
   owner: _id,
   token: OTP (hashed)
   expiryTime: 1 hour
*/

const EmailTokenSchema = mongoose.Schema({
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
      expires: 3600,
      default: Date.now(),
   },
});

EmailTokenSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);
   this.token = await bcrypt.hash(this.token, salt);
});

EmailTokenSchema.methods.compareToken = async function (hashedToken) {
   const result = await bcrypt.compare(hashedToken, this.token);
   return result;
};

const EmailToken = mongoose.model("EmailToken", EmailTokenSchema);
module.exports = EmailToken;
