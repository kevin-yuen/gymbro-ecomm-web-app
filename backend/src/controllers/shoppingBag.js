const ObjectId = require("mongoose").Types.ObjectId;
const ShoppingBag = require("../models/shoppingBag");
const Product = require("../models/product");

const calculateTotalCount = async (req, res, userid) => {
  const castUserid = new ObjectId(userid);

  try {
    const totalCount = await ShoppingBag.aggregate([
      {
        $match: {
          userid: castUserid,
        },
      },
      {
        $group: {
          _id: { userid: "$userid" },
          total: {
            $sum: { $sum: "$products.unit.quantityInBag" },
          },
        },
      },
    ]);

    return res.status(201).json({ message: "Item added", totalCount });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getLatestCountAfterUpdate = (req, _) =>
  calculateTotalCount(_, _, req.params.userid);

const getLatestCountAfterAuthorized = (req, _) =>
  calculateTotalCount(_, _, req.query.userid);

const getShoppingBagItemDetails = async (req, res) => {
  const { userid } = req.query;
  let detailsOfProductInShoppingBag = [];

  const productsInShoppingBag = await Product.aggregate([
    {
      $lookup: {
        from: ShoppingBag.collection.name,
        localField: "_id",
        foreignField: "products.productid",
        as: "productInBag",
      },
    },
    {
      $match: {
        productInBag: {
          $ne: []
        },
      },
    },
  ]);
};

module.exports = {
  getLatestCountAfterUpdate,
  getLatestCountAfterAuthorized,
  getShoppingBagItemDetails,
};
