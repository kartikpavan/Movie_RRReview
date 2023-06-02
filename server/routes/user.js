const express = require("express");
const router = express.Router();

const { createUser, verifyEmail, resendOTP, resetPassword } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/Validators");
const { isValidResetPasswordToken } = require("../middlewares/user");

router.post("/createUser", userValidator, validate, createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-OTP", resendOTP);
router.post("/forgot-password", resetPassword);
router.post("/verify-reset-password-token", isValidResetPasswordToken, (req, res) => {
   return res.status(200).json({ msg: { valid: true } });
});

module.exports = router;
