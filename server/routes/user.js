const express = require("express");
const { createUser } = require("../controllers/user");
const { check } = require("express-validator");
const { userValidator, validate } = require("../middlewares/Validators");
const router = express.Router();

router.post("/createUser", userValidator, validate, createUser);

module.exports = router;
