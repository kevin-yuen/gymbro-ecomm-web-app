const express = require("express");
const router = express.Router();

const { getAllProducts, getDiscountProducts, getTopRatingProducts, getClearanceProducts } = require("../controllers/product");

router.get("/all", getAllProducts);
router.get("/discounts/:limit", getDiscountProducts);
router.get("/topRatings/:rating/:limit", getTopRatingProducts);
router.get("/clearance/:limit", getClearanceProducts);

module.exports = router;