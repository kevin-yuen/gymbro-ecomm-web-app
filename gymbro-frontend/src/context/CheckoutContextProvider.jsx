import React, { createContext, useState } from "react";

export const CheckoutContext = createContext();

export default function CheckoutContextProvider({ children }) {
  const [step, setStep] = useState({
    currentStep: null,
    previous: {
      prevDestination: null,
      prevStepName: null,
    },
    next: {
      nextDestination: "information",
      nextStepName: "Information",
    },
  });

  const handleShowHideRouteSteps = (progressStepClicked) => {
    console.log("FROM PROGERSS BAR: ", progressStepClicked.id);

    switch (progressStepClicked.id) {
      // compare using stepName
      case "Your bag":
        setStep({
          currentStep: progressStepClicked.id,
          previous: {
            prevDestination: null,
            prevStepName: null,
          },
          next: {
            nextDestination: "information",
            nextStepName: "Information",
          },
        });
        break;
      case "Information":
        setStep({
          currentStep: progressStepClicked.id,
          previous: {
            prevDestination: "", // BagDetails path = ShoppingBagLayout path
            prevStepName: "Your Bag",
          },
          next: {
            nextDestination: "shipping",
            nextStepName: "Shipping",
          },
        });
        break;
      case "Shipping":
        setStep({
          currentStep: progressStepClicked.id,
          previous: {
            prevDestination: "information",
            prevStepName: "Information",
          },
          next: {
            nextDestination: "payment",
            nextStepName: "Payment",
          },
        });
        break;
      case "Payment":
        setStep({
          currentStep: progressStepClicked.id,
          previous: {
            prevDestination: "shipping",
            prevStepName: "Shipping",
          },
          next: {
            nextDestination: "checkout-complete",
            nextStepName: "Complete",
          },
        });
        break;
      case "Complete":
        setStep({
          currentStep: progressStepClicked.id,
          previous: {
            prevDestination: "payment",
            prevStepName: "Payment",
          },
          next: {
            nextDestination: null,
            nextStepName: null,
          },
        });
        break;
      default:
        break;
    }
  };

  return <CheckoutContext.Provider value={{step, handleShowHideRouteSteps}}>{children}</CheckoutContext.Provider>;
}
