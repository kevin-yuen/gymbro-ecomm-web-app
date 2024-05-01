const express = require("express");
const router = express.Router();

const {getProductReview} = require("../controllers/review");

router.get("/reviews", getProductReview);

module.exports = router;