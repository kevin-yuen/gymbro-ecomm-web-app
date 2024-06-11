import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftCircleFill, WalletFill } from "react-bootstrap-icons";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// messages
import Messages from "../../config/messages.json";

// utils
import { handleShoppingBagAPI } from "../../utils/shoppingBagAPI";

const formErrorMessage = Messages.checkout["form-error"];
const serverErrorMessage = Messages.server.generic;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shoppingBagContext = useContext(ShoppingBagContext);

  const [finalShoppingBagItems, setFinalShoppingBagItems] = useState(
    shoppingBagContext.shoppingBagItems
  );

  useEffect(() => {
    setFinalShoppingBagItems(shoppingBagContext.shoppingBagItems); // capture adjusted quantity of each item in the shopping bag
  }, [shoppingBagContext.shoppingBagItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    // check whether delivery info and shipping method are filled in
    const deliveryInfo = sessionStorage.getItem("buyerDeliveryInfo");
    const { shippingMethod } = shoppingBagContext;

    if (
      deliveryInfo === null ||
      shippingMethod.type === "" ||
      shippingMethod.fee === 0
    ) {
      setErrorMessage(formErrorMessage);
      return;
    }

    setIsProcessing(true);

    // check whether there are sufficient quantities to fulfill the request
    const shoppingBagItemsWithQtySufficiencyCheckRes =
      await handleShoppingBagAPI(
        "/shoppingbag/itemQuantityChecking",
        "POST",
        JSON.stringify({
          shoppingBagItems: finalShoppingBagItems,
        })
      );

    switch (shoppingBagItemsWithQtySufficiencyCheckRes.status) {
      case 201:
        const authorizedUserLocalStorage = JSON.parse(
          localStorage.getItem("authorizedUser")
        );

        const clearUserShoppingBagItemRes = await handleShoppingBagAPI(
          `/shoppingBag/clearUserShoppingBagItem/${authorizedUserLocalStorage.userid}`,
          "DELETE"
        );

        switch (clearUserShoppingBagItemRes.status) {
          case 201:
            break;
          case 500:
            setErrorMessage(serverErrorMessage);
            return;
          default:
            break;
        }

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: process.env.REACT_APP_BASE_URL + "/checkout/complete"
            // return_url: "http://localhost:3000/checkout/complete",
          },
        });

        if (error) {
          setErrorMessage(error.message);
        }
        setIsProcessing(false);
        break;
      case 400:
        shoppingBagItemsWithQtySufficiencyCheckRes.json().then((res) => {
          for (const item of res.shoppingBagItemsWithQtySufficiencyCheck) {
            if (!item.isSufficientQuantityInStock) {
              navigate("/your-bag", {
                state: {
                  sbWithQtySufficiencyCheck:
                    res.shoppingBagItemsWithQtySufficiencyCheck,
                },
              });
              return;
            }
          }
        });

        break;
      case 500:
        setErrorMessage(serverErrorMessage);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />

        <div className="d-flex justify-content-between">
          <div className="mt-2">
            <Link to={"/your-bag/shipping"}>
              <button className="border-0 rounded-2 ps-4 pe-4 pt-3 pb-3 custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata fw-bolder fs-7">
                <span className="me-1">
                  <ArrowLeftCircleFill size={15} />
                </span>
                Shipping
              </button>
            </Link>
          </div>

          <button
            type="submit"
            className={`${
              isProcessing
                ? "custom-background-color-grey"
                : "custom-background-color-darkpurple"
            } mt-2 float-end rounded-2 border-0 pt-3 pb-3 ps-4 pe-4 custom-color-antiquewhite fw-bolder custom-font-family-inconsolata fs-7`}
            disabled={isProcessing ? true : false}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                Pay Now
                <WalletFill className="ms-2" size={20} />
              </>
            )}
          </button>
        </div>
      </form>

      <p className="ms-2 text-danger fs-7">
        {errorMessage ? errorMessage : ""}
      </p>
    </>
  );
};

export default CheckoutForm;
