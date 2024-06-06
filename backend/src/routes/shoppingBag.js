const express = require("express");
const router = express.Router();

const {
  getLatestCountAfterUpdate,
  getLatestCountAfterAuthorized,
  getShoppingBagItemDetails,
  deleteShoppingBagItem,
  deductItemQuantity,
  clearUserShoppingBagItem,
} = require("../controllers/shoppingBag");

const {
  validateItemExistInShoppingBagMiddleware,
  validateQuantitySufficientMiddleware,
  validateQuantitySufficiencyForCheckoutMiddleware,
} = require("../middleware/shoppingBagMiddleware");

router.post(
  `/items/:userid/:productid/:unitid`,
  validateItemExistInShoppingBagMiddleware,
  validateQuantitySufficientMiddleware,
  getLatestCountAfterUpdate
);
router.get("/itemCount", getLatestCountAfterAuthorized);
router.get("/itemDetails", getShoppingBagItemDetails);
router.delete("/removeItem/:userid/:productid/:unitid", deleteShoppingBagItem);
router.post(
  "/itemQuantityChecking",
  validateQuantitySufficiencyForCheckoutMiddleware,
  deductItemQuantity
);
router.delete("/clearUserShoppingBagItem/:userid", clearUserShoppingBagItem);

module.exports = router;
