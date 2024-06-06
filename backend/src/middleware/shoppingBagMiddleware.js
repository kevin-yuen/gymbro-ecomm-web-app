const ShoppingBag = require("../models/shoppingBag");
const Product = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

// This middleware function checks if the customer has the specific item in the shopping bag
const validateItemExistInShoppingBagMiddleware = async (req, res, next) => {
  const { userid, unitid } = req.params;
  const { requestedColor } = req.body;

  try {
    ShoppingBag.findOne({ userid: new ObjectId(userid) }).then((haveAnyItemInBag) => {
      if (haveAnyItemInBag) {
        ShoppingBag.aggregate([
          {
            $unwind: "$products",
          },
          {
            $match: {
              "products.unit.unitid": {
                $eq: new ObjectId(unitid),
              },
              "products.unit.color": {
                $eq: requestedColor,
              },
            },
          },
        ]).then((itemInBag) => {
          req.haveAnyItemInBag = true;
          req.itemInBag = itemInBag[0];

          next();
        });
      } else {
        req.haveAnyItemInBag = false;

        next();
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// This middleware function validates requested quantity against quantity in stock and updates the shopping bag
const validateQuantitySufficientMiddleware = async (req, res, next) => {
  const { haveAnyItemInBag, itemInBag } = req;
  const { productid, unitid, userid } = req.params;
  const { requestedColor, requestedSize, requestedQuantity } = req.body;

  const reqQty = Number(requestedQuantity);

  // find how many quantities in stock
  let unitInStock;

  try {
    const product = await Product.aggregate([
      {
        $unwind: "$options",
      },
      {
        $match: {
          "options.color": {
            $eq: requestedColor,
          },
          "options.unit._id": {
            $eq: new ObjectId(unitid),
          },
        },
      },
    ]);

    product[0].options.unit.forEach((ut) => {
      if (ut._id.toString() === unitid) {
        unitInStock = ut;
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

  if (haveAnyItemInBag) {
    if (itemInBag) {
      const quantityInBag = itemInBag.products.unit.quantityInBag;

      if (
        // reqQty <= unitInStock.quantity &&
        reqQty + quantityInBag <=
        unitInStock.quantity
      ) {
        try {
          await ShoppingBag.findOneAndUpdate(
            {
              "products.unit.unitid": new ObjectId(unitid),
              "products.unit.color": requestedColor,
            },
            {
              $inc: { "products.$.unit.quantityInBag": reqQty },
            }
          );
        } catch (e) {
          return res.status(500).json({ error: e.message });
        }

        next();
      } else {
        return res
          .status(409)
          .json({ message: "Insufficent quantity in stock" });
      }
    } else {
      if (reqQty <= unitInStock.quantity) {
        try {
          await ShoppingBag.findOneAndUpdate(
            { userid },
            {
              $push: {
                products: {
                  productid,
                  unit: {
                    unitid,
                    color: requestedColor,
                    size: requestedSize,
                    quantityInBag: reqQty,
                  },
                },
              },
            },
            { new: true }
          );
        } catch (e) {
          return res.status(500).json({ error: e.message });
        }

        next();
      } else {
        return res
          .status(409)
          .json({ message: "Insufficent quantity in stock" });
      }
    }
  } else {
    try {
      await ShoppingBag.insertMany({
        userid,
        products: [
          {
            productid,
            unit: {
              unitid,
              color: requestedColor,
              size: requestedSize,
              quantityInBag: reqQty,
            },
          },
        ],
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }

    next();
  }
};

// This middleware function validates requested quantity against quantity in stock
const validateQuantitySufficiencyForCheckoutMiddleware = async (
  req,
  res,
  next
) => {
  const { shoppingBagItems } = req.body;

  let shoppingBagItemsWithQtySufficiencyCheck = [];

  for await (const shoppingBagItem of shoppingBagItems) {
    try {
      const product = await Product.aggregate([
        {
          $unwind: "$options",
        },
        {
          $match: {
            "options.color": {
              $eq: shoppingBagItem.color,
            },
            "options.unit._id": {
              $eq: new ObjectId(shoppingBagItem.unitid),
            },
          },
        },
      ]);

      product[0].options.unit.forEach((ut) => {
        if (ut._id.toString() === shoppingBagItem.unitid) {
          shoppingBagItem.isSufficientQuantityInStock =
            shoppingBagItem.totalRequestedQuantity <= ut.quantity
              ? true
              : false;
        }
      });

      shoppingBagItemsWithQtySufficiencyCheck.push(shoppingBagItem);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  for (const item of shoppingBagItemsWithQtySufficiencyCheck) {
    if (!item.isSufficientQuantityInStock) {
      return res.status(400).json({ shoppingBagItemsWithQtySufficiencyCheck });
    }
  }
  next();
};

module.exports = {
  validateItemExistInShoppingBagMiddleware,
  validateQuantitySufficientMiddleware,
  validateQuantitySufficiencyForCheckoutMiddleware,
};
