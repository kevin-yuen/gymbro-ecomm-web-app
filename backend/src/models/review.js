const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  reviews: [
    {
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: mongoose.Schema.Types.String,
        ref: "user",
        required: true,
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
      isEdited: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
