const express = require("express");
const router = express.Router();

const {
   createUser,
   verifyEmail,
   resendOTP,
   forgotPassword,
   resetPasswordTokenStatus,
   resetPassword,
} = require("../controllers/user");
const { userValidator, validate, validateNewPassword } = require("../middlewares/Validators");
const { isValidResetPasswordToken } = require("../middlewares/user");

router.post("/createUser", userValidator, validate, createUser);
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

module.exports = router;
