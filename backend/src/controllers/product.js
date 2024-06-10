const Product = require("../models/product");
const { getEligibleProducts } = require("../utils/products");

// fields to return
const returnFields = {
  brand: 1,
  shortName: 1,
  name: 1,
  gender: 1,
  originalPrice: 1,
  discountPrice: 1,
  isOnClearance: 1,
  clearancePercent: 1,
  rating: 1,
  options: 1,
};

const getAllProducts = async (_, res) =>
  await getEligibleProducts(undefined, {}, returnFields, res);

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

const getProductDetails = async(req, res) => {
  try {
    const productDetails = await Product.findOne({_id: req.query.productid});

    if (!productDetails) return res.status(404).json({message: "Product not exist", productDetails});
    return res.status(201).json({productDetails});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllProducts,
  getDiscountProducts,
  getTopRatingProducts,
  getClearanceProducts,
  getProductDetails,
};
