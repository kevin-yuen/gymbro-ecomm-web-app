import React, {useState} from "react";

// components
import CardComponent from "../common/CardComponent";
import ColorPickerComponent from "../common/ColorPickerComponent";
import SizePickerComponent from "../common/SizePickerComponent";
import ItemDetailsComponent from "../common/ItemDetailsComponent";
// import QuantityAdjustmentComponent from "../common/QuantityAdjustmentComponent";

// context
import ProductContextProvider from "../../context/ProductContextProvider";

export default function PromotionComponent({ eligibleItems }) {
  console.log("Promotion Component re-renders");

  return (
    <div className="row pt-3">
      {eligibleItems?.map((item) => {
        return (
          <div className="col-sm-12 col-lg-6 col-xl-4 col-xxl-3 d-flex justify-content-center">
            <ProductContextProvider item={item}>
              <div className="position-relative">
                <CardComponent itemDetailsComponent={<ItemDetailsComponent item={item}/>}/>
                <ColorPickerComponent />
                <SizePickerComponent />
                {/* <QuantityAdjustmentComponent /> */}
              </div>
            </ProductContextProvider>
          </div>
        );
      })}
    </div>
  );
}
