const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    maxLength: 32,
  },
  gender: {
    type: String,
    required: true,
  },
  fitType: {
    type: String,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  isOnClearance: {
    type: Boolean,
    default: false,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  clearancePercent: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  numOfReviews: {
    type: Number,
  },
  options: [
    {
      color: {
        type: String,
        required: true,
      },
      size: {
        type: Array,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      imgSrc: {
        type: Array,
        required: true,
      },
    },
  ],
  description: {
    type: Array,
    required: true,
  },
  spec: {
    type: Array,
    required: true,
  },
  fitAndCare: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
