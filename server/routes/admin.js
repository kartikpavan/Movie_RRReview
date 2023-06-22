const express = require("express");
const { getStats } = require("../controllers/admin");
const { isAuth, isAdmin } = require("../middlewares/user");
const router = express.Router();

router.get("/stats", isAuth, isAdmin, getStats);

module.exports = router;
