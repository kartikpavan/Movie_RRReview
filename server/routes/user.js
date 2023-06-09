const express = require("express");
const router = express.Router();

const {
   createUser,
   verifyEmail,
   resendOTP,
   forgotPassword,
   resetPasswordTokenStatus,
   resetPassword,
   signIn,
} = require("../controllers/user");
const {
   userValidator,
   validate,
   validateNewPassword,
   signInValidator,
} = require("../middlewares/Validators");
const { isValidResetPasswordToken, isAuth } = require("../middlewares/user");

router.post("/create-user", userValidator, validate, createUser);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-OTP", resendOTP);
router.post("/forgot-password", forgotPassword);
// isValidResetPasswordToken -> middleware, already validating userId and ResetPassword Token
router.post("/verify-reset-password-token", isValidResetPasswordToken, resetPasswordTokenStatus);
// creating new Password
router.post(
   "/reset-password",
   validateNewPassword,
   validate,
   isValidResetPasswordToken,
   resetPassword
);

router.get("/is-auth", isAuth, (req, res) => {
   const { user } = req;
   res.json({
      data: {
         id: user._id,
         name: user.name,
         email: user.email,
         isVerified: user.isVerified,
         role: user.role,
      },
   });
});
module.exports = router;
