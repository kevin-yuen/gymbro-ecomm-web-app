const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getDiscountProducts,
  getTopRatingProducts,
  getClearanceProducts,
  getProductDetails,
  getProductsByGender,
} = require("../controllers/product");

router.get("/all/:limit", getAllProducts); // :limit not used
router.get("/discounts/:limit", getDiscountProducts);
router.get("/topRatings/:rating/:limit", getTopRatingProducts);
router.get("/clearance/:limit", getClearanceProducts);
router.get("/aboutProduct/product", getProductDetails);
router.get("/gender/:gender/:limit", getProductsByGender);  // :limit not used

module.exports = router;
