const User = require("../models/user");
const EmailToken = require("../models/emailToken");
const ResetPassword = require("../models/resetPassword");
const { isValidObjectId } = require("mongoose");

const jwt = require("jsonwebtoken");

const isValidResetPasswordToken = async (req, res, next) => {
   const { userId, token } = req.body;
   if (!token || !isValidObjectId(userId)) {
      return res.status(401).json({ error: "Unauthorized Access / Invalid reset-password Token" });
   }
   // checking if reset password token is already present in DB
   const resetToken = await ResetPassword.findOne({ owner: userId });
   if (!resetToken) return res.status(404).json({ error: "Invalid Request / No Token Found" });

   // checking whether the reset-token is valid
   const isMatched = await resetToken.compareToken(token);
   if (!isMatched) return res.status(400).json({ error: "invalid Reset Password Token" });

   // adding resetToken to the incoming request Object
   req.resetToken = resetToken;
   next();
};

const isAuth = async (req, res, next) => {
   const token = req.headers?.authorization;

   const jwtToken = token.split("Bearer ")[1];
   if (!jwtToken) return res.status(404).json({ error: "invalid Token" });
   const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
   const { userId } = decode;

   const user = await User.findById(userId);
   if (!user) return res.status(404).json({ error: "User Not Found" });

   req.user = user;
   next();
};

module.exports = { isValidResetPasswordToken, isAuth };
