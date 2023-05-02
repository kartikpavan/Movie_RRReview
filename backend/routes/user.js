const express = require("express");
const { createUser } = require("../controllers/user");
const router = express.Router();

router.route("/create-user").post(createUser);

module.exports = router;
