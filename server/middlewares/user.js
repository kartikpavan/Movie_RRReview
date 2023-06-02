const User = require("../models/user");
const EmailToken = require("../models/emailToken");
const ResetPassword = require("../models/resetPassword");
const { isValidObjectId } = require("mongoose");

const isValidResetPasswordToken = async (req, res, next) => {
   const { userId, token } = req.body;
   if (!token.trim() || !isValidObjectId(userId)) {
      return res.status(401).json({ msg: "Unauthorized Access / Invalid reset-password Token" });
   }

   // checking if reset password token is already present in DB
   const resetToken = await ResetPassword.findOne({ owner: userId });
   if (!resetToken) return res.status(404).json({ msg: "Invalid Request / No Token Found" });

   // checking whether the reset-token is valid
   const isMatched = await resetToken.compareToken(token);
   if (!isMatched) return res.status(400).json({ msg: "invalid Reset Password Token" });

   // adding resetToken to the incoming request Object
   req.resetToken = resetToken;
   next();
};

module.exports = { isValidResetPasswordToken };
