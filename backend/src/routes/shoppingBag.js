const express = require("express");
const router = express.Router();

const { getLatestCountAfterUpdate, getLatestCountAfterAuthorized, getShoppingBagItemDetails } = require("../controllers/shoppingBag");

const {
  validateItemExistInShoppingBagMiddleware,
  validateQuantitySufficientMiddleware,
} = require("../middleware/shoppingBagMiddleware");

router.post(
  `/items/:userid/:productid/:unitid`,
  validateItemExistInShoppingBagMiddleware,
  validateQuantitySufficientMiddleware,
  getLatestCountAfterUpdate
);
router.get("/itemCount", getLatestCountAfterAuthorized);
router.get("/itemDetails", getShoppingBagItemDetails);

module.exports = router;
