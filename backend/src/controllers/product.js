const Product = require("../models/product");
const { getEligibleProducts } = require("../utils/products");

// fields to return
const returnFields = {
  brand: 1,
  shortName: 1,
  gender: 1,
  originalPrice: 1,
  discountPrice: 1,
  isOnClearance: 1,
  clearancePercent: 1,
  rating: 1,
  options: 1,
};

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    const cntOfProducts = await Product.countDocuments();

    return products
      ? res
          .status(201)
          .json({ message: "Products found", count: cntOfProducts, products })
      : res.status(404).json({
          message: "No Product found",
          count: cntOfProducts,
          products,
        });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

const getDiscountProducts = async (req, res) =>
  await getEligibleProducts(
    req.params.limit,
    { isDiscounted: true },
    returnFields,
    res
  );

const getTopRatingProducts = async (req, res) =>
  await getEligibleProducts(
    req.params.limit,
    { rating: { $gt: req.params.rating } },
    returnFields,
    res
  );

const getClearanceProducts = async (req, res) =>
  await getEligibleProducts(
    req.params.limit,
    { isOnClearance: true },
    returnFields,
    res
  );

module.exports = {
  getAllProducts,
  getDiscountProducts,
  getTopRatingProducts,
  getClearanceProducts,
};
