const express = require("express");
const router = express.Router();

const {getStripePublishableKey, createPaymentIntent} = require("../controllers/stripe");

router.get("/config", getStripePublishableKey);
router.post("/create-payment-intent/:totalAmount", createPaymentIntent)

module.exports = router;
