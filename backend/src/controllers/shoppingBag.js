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

    if (totalCount.length < 1)
      return res.status(404).json({ message: "No item found", totalCount });

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

  try {
    const productsInShoppingBag = await Product.aggregate([
      {
        $lookup: {
          from: ShoppingBag.collection.name,
          localField: "_id",
          foreignField: "products.productid",
          pipeline: [{ $match: { userid: new ObjectId(userid) } }],
          as: "productInBag",
        },
      },
      {
        $match: {
          productInBag: {
            $ne: [],
          },
        },
      },
    ]);

    if (productsInShoppingBag.length < 1)
      return res
        .status(404)
        .json({ message: "No item found", bagItems: productsInShoppingBag });
    return res
      .status(201)
      .json({ message: "Items found ", bagItems: productsInShoppingBag });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deleteShoppingBagItem = async (req, res) => {
  const { userid, productid, unitid } = req.params;

  try {
    const remainItems = await ShoppingBag.findOneAndUpdate(
      {
        userid: new ObjectId(userid),
      },
      {
        $pull: {
          products: {
            $and: [
              { productid: new ObjectId(productid) },
              { "unit.unitid": new ObjectId(unitid) },
            ],
          },
        },
      },
      { returnOriginal: false }
    );

    return res.status(201).json({ message: "Deletion success", remainItems });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deductItemQuantity = async (req, res) => {
  const { shoppingBagItems } = req.body;

  for await (const shoppingBagItem of shoppingBagItems) {
    console.log(shoppingBagItem);

    try {
      await Product.findOneAndUpdate(
        {
          options: {
            $elemMatch: {
              unit: {
                $elemMatch: {
                  _id: new ObjectId(shoppingBagItem.unitid),
                },
              },
            },
          },
        },
        {
          $inc: {
            "options.$.unit.$[j].quantity":
              shoppingBagItem.totalRequestedQuantity / -1,
          },
        },
        {
          arrayFilters: [
            {
              "j._id": new ObjectId(shoppingBagItem.unitid),
            },
          ],
        }
      );
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  return res.status(201).json({ message: "Quantity update complete" });
};

// for MVP, temporarily clearing customer's shopping bag upoon payment is successfully made
const clearUserShoppingBagItem = async (req, res) => {
  const { userid } = req.params;

  try {
    await ShoppingBag.findOneAndDelete({ userid: new ObjectId(userid) });

    return res.status(201).json({ message: "User's items removed" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getLatestCountAfterUpdate,
  getLatestCountAfterAuthorized,
  getShoppingBagItemDetails,
  deleteShoppingBagItem,
  deductItemQuantity,
  clearUserShoppingBagItem,
};
