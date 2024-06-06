const Review = require("../models/review");

const bralette = require("../src-data/review/gymshark/bralette.json");

const insertReviewData = async () => {
  await Review.insertMany([bralette]);
};

const getProductReview = async (req, res) => {
  try {
    const productReviews = await Review.findOne({
      productId: req.query.productid,
    });

    if (!productReviews)
      return res
        .status(404)
        .json({ message: "No product review", productReviews });
    return res
      .status(201)
      .json({ message: "Product reviews found", productReviews });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createProductReview = async (req, res) => {
  let updateResult;

  try {
    const productsReviews = await Review.findOne({
      productId: req.query.productid,
    });

    if (!productsReviews) {
      updateResult = await Review.insertMany({
        productId: req.query.productid,
        reviews: [req.body],
      });

      return res.status(201).json({ message: "Review added", updateResult });
    }

    updateResult = await Review.updateOne(
      {
        _id: productsReviews._id,
      },
      {
        $push: {
          reviews: req.body,
        },
      }
    );
    return res.status(201).json({ message: "Review added", updateResult });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deleteProductReview = async (req, res) => {
  const { productid, commentid } = req.query;

  try {
    const result = await Review.findOneAndUpdate(
      { productId: productid },
      {
        $pull: {
          reviews: { _id: commentid },
        },
      },
      { returnOriginal: false }
    );

    return res.status(201).json({ message: "Review deleted", result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateProductReview = async (req, res) => {
  console.log("updating review");

  const { newSubjectRequest, newCommentRequest } = req.body;
  const { productid, postid } = req.params;

  try {
    let newComment;

    if (newCommentRequest === "") {
      const reviewResult = await Review.find({
        $and: [
          { productId: productid },
          {
            reviews: {
              $elemMatch: { _id: postid },
            },
          },
        ],
      }).select({
        reviews: {
          $elemMatch: { _id: postid },
        },
      });

      newComment = { ...reviewResult }[0].reviews[0].comment;
    } else {
      newComment = newCommentRequest;
    }

    const updateResult = await Review.findOneAndUpdate(
      {
        $and: [
          { productId: productid },
          {
            reviews: {
              $elemMatch: { _id: postid },
            },
          },
        ],
      },
      {
        $set: {
          "reviews.$.subject": newSubjectRequest,
          "reviews.$.comment": newComment,
          "reviews.$.datePosted": new Date(),
          "reviews.$.isEdited": true
        },
      },
      {
        new: true,
      }
    ).select({
      reviews: {
        $elemMatch: { _id: postid },
      },
    });

    return res
      .status(206)
      .json({ message: "Update success", result: updateResult });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getProductReview,
  createProductReview,
  deleteProductReview,
  updateProductReview,
  insertReviewData,
};
