const express = require("express");
const router = express.Router();

const {
  getProductReview,
  createProductReview,
  deleteProductReview,
  updateProductReview
} = require("../controllers/review");

const {
  productReviewMiddleware,
} = require("../middleware/productReviewMiddleware");

router.get("/aboutProduct/reviews", getProductReview);
router.post("/createReview", productReviewMiddleware, createProductReview);
router.delete("/deleteReview", deleteProductReview);
router.patch("/updateReview/:productid/:postid", updateProductReview);

module.exports = router;
