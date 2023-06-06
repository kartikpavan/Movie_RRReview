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
const { isAuth, isAdmin } = require("../middlewares/user");

router.post(
   "/create",
   isAuth,
   isAdmin,
   uploadImage.single("avatar"),
   actorUploadValidator,
   validate,
   createActor
);
router.post(
   "/update/:actorId",
   isAuth,
   isAdmin,
   uploadImage.single("avatar"),
   actorUploadValidator,
   validate,
   updateActor
);
router.delete("/delete/:actorId", isAuth, isAdmin, removeActor);

router.get("/search", searchActor);
router.get("/latest-uploads", latestActors);
router.get("/actor/:actorId", getSingleActor);

module.exports = router;
