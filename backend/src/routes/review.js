const express = require("express");
const router = express.Router();

const {
  getProductReview,
  createProductReview,
  deleteProductReview,
  updateProductReview,
  insertReviewData,
} = require("../controllers/review");

const {
  productReviewMiddleware,
} = require("../middleware/productReviewMiddleware");

router.get("/aboutProduct/reviews", getProductReview);
router.post("/createReview", productReviewMiddleware, createProductReview);
router.delete("/deleteReview", deleteProductReview);
router.patch("/updateReview/:productid/:postid", updateProductReview);

// only for inserting mock data
router.get("/insertReviews", insertReviewData);

module.exports = router;
