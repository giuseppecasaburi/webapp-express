const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController")

router.get("/", appController.index)

router.get("/:slug", appController.show)

router.post("/:id/reviews", appController.storeReview);

module.exports = router;