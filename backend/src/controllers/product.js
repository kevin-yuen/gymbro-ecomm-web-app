const Product = require("../models/product");
const { getEligibleProducts } = require("../utils/products");

const croptop_seamless = require("../src-data/product/gymshark/to import/croptop_seamless.json");
const croptop_towel = require("../src-data/product/gymshark/to import/croptop_towel.json");
const hoodie_sweats = require("../src-data/product/gymshark/to import/hoodie_sweats.json");
const joggers_club_joggers = require("../src-data/product/gymshark/to import/joggers_club_joggers.json");
const shorts_running = require("../src-data/product/gymshark/to import/shorts_running.json");
const shorts_seamless = require("../src-data/product/gymshark/to import/shorts_seamless.json");
const sports_bras_bralette = require("../src-data/product/gymshark/to import/sports_bras_bralette.json");
const sports_bras_longline = require("../src-data/product/gymshark/to import/sports_bras_longline.json");
const tanks_seamless = require("../src-data/product/gymshark/to import/tanks_seamless.json");
const croptop = require("../src-data/product/gymshark/croptop.json");
const legging_marl_seamless = require("../src-data/product/gymshark/legging_marl_seamless.json");
const legging_seamless_2 = require("../src-data/product/gymshark/legging_seamless_2.json");
const legging_seamless = require("../src-data/product/gymshark/legging_seamless.json");
const shorts_mesh = require("../src-data/product/gymshark/shorts_mesh.json");
const shorts_speed = require("../src-data/product/gymshark/shorts_speed.json");
const tank_legacy = require("../src-data/product/gymshark/tank_legacy.json");
const tank_react = require("../src-data/product/gymshark/tank_react.json");
const tshirt_fraction_oversized = require("../src-data/product/gymshark/tshirt_fraction_oversized.json");
const tshirt_oversized = require("../src-data/product/gymshark/tshirt_oversized.json");
const legging_crop = require("../src-data/product/lululemon/legging_crop.json");
const legging_tight = require("../src-data/product/lululemon/legging_tight.json");
const jacket_parka = require("../src-data/product/underarmour/jacket_parka.json");
const tshirt_campus = require("../src-data/product/underarmour/tshirt_campus.json");

const getData = async () => {
  // await Product.deleteMany();

  await Product.insertMany([
    croptop_seamless,
    croptop_towel,
    hoodie_sweats,
    joggers_club_joggers,
    shorts_running,
    shorts_seamless,
    sports_bras_bralette,
    sports_bras_longline,
    tanks_seamless,
    croptop,
    legging_marl_seamless,
    legging_seamless_2,
    legging_seamless,
    shorts_mesh,
    shorts_speed,
    tank_legacy,
    tank_react,
    tshirt_fraction_oversized,
    tshirt_oversized,
    legging_crop,
    legging_tight,
    jacket_parka,
    tshirt_campus
  ]);
}


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
  getData,
};
