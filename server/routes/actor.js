const express = require("express");
const router = express.Router();
const { createActor, updateActor } = require("../controllers/actor");
const { uploadImage } = require("../middlewares/multer");
const { actorUploadValidator, validate } = require("../middlewares/Validators");

router.post("/create", uploadImage.single("avatar"), actorUploadValidator, validate, createActor);
router.post(
   "/update/:actorId",
   uploadImage.single("avatar"),
   actorUploadValidator,
   validate,
   updateActor
);

module.exports = router;
