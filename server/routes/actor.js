const express = require("express");
const router = express.Router();
const {
   createActor,
   updateActor,
   removeActor,
   searchActor,
   latestActors,
   getSingleActor,
} = require("../controllers/actor");
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

router.get("/search", searchActor);
router.get("/latest-uploads", latestActors);
router.get("/actor/:actorId", getSingleActor);

module.exports = router;
