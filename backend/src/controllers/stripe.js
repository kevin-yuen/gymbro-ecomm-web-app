const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {apiVersion: "2022-08-01"});

const getStripePublishableKey = async (req, res) => {
  return res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

const createPaymentIntent = async (req, res) => {
  const { totalAmount } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: Math.round(Number(totalAmount) * 100),
        automatic_payment_methods: {
            enabled: true
        }
    })

    return res.send({clientSecret: paymentIntent.client_secret})
  } catch (e) {
    return res.status(400).send({error: e.message});
  }
};

module.exports = { getStripePublishableKey, createPaymentIntent };
