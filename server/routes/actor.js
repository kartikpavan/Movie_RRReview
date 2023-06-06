const express = require("express");
const router = express.Router();
const { createActor, updateActor, removeActor } = require("../controllers/actor");
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
router.delete("/delete/:actorId", removeActor);

module.exports = router;
