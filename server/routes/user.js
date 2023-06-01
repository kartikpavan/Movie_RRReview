const express = require("express");
const { createUser, verifyEmail, resendOTP } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/Validators");
const router = express.Router();

router.post("/createUser", userValidator, validate, createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-OTP", resendOTP);

module.exports = router;
