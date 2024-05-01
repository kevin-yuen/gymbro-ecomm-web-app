const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  reviews: [
    {
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
      subject: {
        type: String,
      },
      comment: {
        type: String,
        required: true,
      },
      datePosted: {
        type: Date,
        default: new Date(),
        required: true,
      },
    },
  ],
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
