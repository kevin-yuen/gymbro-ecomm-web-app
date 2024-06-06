import React, { useContext, useEffect } from "react";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// components
import PriceSummaryComponent from "./PriceSummaryComponent";

// utils
import { handleCalculateClearanceAmount } from "../../utils/calculateClearance";

const PriceWrapperComponent = () => {
  console.log("Price Wrapper Component re-renders");

  const shoppingbagContext = useContext(ShoppingBagContext);
  const { shoppingBagItems, shippingMethod } = shoppingbagContext;

  // This function calculates for the actual price per item per requested quantity
  const handleCalculatePricePerItem = (
    clearancePercent,
    originalPrice,
    discountPrice,
    totalRequestedQuantity
  ) => {
    // calculate for the clearance price
    const finalPricePerItemPerTotalQty = handleCalculateClearanceAmount(
      clearancePercent,
      originalPrice,
      discountPrice
    );

    return (finalPricePerItemPerTotalQty * totalRequestedQuantity).toFixed(2);
  };

  const handleCalculateSubtotal = () => {
    return shoppingBagItems
      .map((item) =>
        Number(
          handleCalculatePricePerItem(
            item.clearancePercent,
            item.originalPrice,
            item.discountPrice,
            item.totalRequestedQuantity
          )
        )
      )
      .reduce((accumlator, element) => {
        return accumlator + element;
      }, 0)
      .toFixed(2);
  };

  const handleCalculateTotal = () => {
    const subtotal = Number(handleCalculateSubtotal());
    const shippingFee = Number(shippingMethod.fee);

    const total = Number(subtotal + shippingFee).toFixed(2);

    sessionStorage.setItem("outstandingTotal", total);

    return total;
  };

  return (
    <>
      <h1 className="custom-font-family-teko fs-3 fw-bolder">SUMMARY</h1>

      {shoppingBagItems.map((shoppingBagItem, i) => (
        <div key={i}>
          <PriceSummaryComponent
            shoppingBagItem={shoppingBagItem}
            handleCalculatePricePerItem={handleCalculatePricePerItem}
          />
        </div>
      ))}

      <div className="ps-2 pe-2 fs-6 custom-font-family-inconsolata">
        <div className="d-flex justify-content-between mt-2">
          <p>Sub Total</p>

          <p>
            US$
            {shoppingBagItems.length > 0 ? handleCalculateSubtotal() : "0.00"}
          </p>
        </div>

        <div className="d-flex justify-content-between fs-7">
          <p className="ms-2">
            Shipping Fee{" "}
            {shippingMethod.type !== "" ? "(" + shippingMethod.type + ")" : ""}
          </p>

          <p>US${Number(shippingMethod.fee).toFixed(2)}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="fw-bold">Total</p>

          <p className="fw-bold">US${handleCalculateTotal()}</p>
        </div>
      </div>
    </>
  );
};

export default PriceWrapperComponent;
