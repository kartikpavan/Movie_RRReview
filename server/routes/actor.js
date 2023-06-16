const express = require("express");
const router = express.Router();
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  latestActors,
  getSingleActor,
  getActors,
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
router.get("/latest-uploads", isAuth, isAdmin, latestActors);
router.get("/actor/:actorId", getSingleActor);
// pagination route
router.get("/get-actors", isAuth, isAdmin, getActors);

module.exports = router;
