import React, { useEffect, useState } from "react";

// stripe module
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// components
import CheckoutForm from "./CheckoutForm";

const PaymentInformation = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function getStripePublishableKey() {
      const stripePublishableKeyPromise = await fetch("/stripe/config");
      const { publishableKey } = await stripePublishableKeyPromise.json();

      setStripePromise(loadStripe(publishableKey));
    }

    getStripePublishableKey();
  }, []);

  useEffect(() => {
    async function createPaymentIntent() {
      const outstandingTotal = Number(
        sessionStorage.getItem("outstandingTotal")
      );

      const paymentIntentPromise = await fetch(
        `/stripe/create-payment-intent/${outstandingTotal}`,
        {
          method: "POST",
        }
      );
      const { clientSecret } = await paymentIntentPromise.json();

      setClientSecret(clientSecret);
    }

    createPaymentIntent();
  }, []);

  return (
    <>
      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          PAYMENT
        </h1>

        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default PaymentInformation;
