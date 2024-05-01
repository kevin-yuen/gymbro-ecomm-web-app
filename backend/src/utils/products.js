const Product = require("../models/product");

const getEligibleProducts = async (
  limit = undefined,
  criteria = {},
  returnFields,
  res
) => {
  try {
    let eligibleItems;

    eligibleItems =
      limit !== undefined
        ? await Product.find(criteria, returnFields).limit(limit)
        : await Product.find(criteria, returnFields);

    if (eligibleItems.length === 0)
      return res.status(404).json({ message: "No Eligible Items found" });

    return res
      .status(201)
      .json({ message: "Eligible Items found", eligibleItems });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
};

module.exports = { getEligibleProducts };
