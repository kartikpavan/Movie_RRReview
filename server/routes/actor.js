const express = require("express");
const router = express.Router();
const { createActor } = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");

router.post("/create", uploadImage.single("avatar"), createActor);

module.exports = router;
