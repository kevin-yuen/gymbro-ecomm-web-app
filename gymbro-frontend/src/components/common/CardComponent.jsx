import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// context
import { ProductContext } from "../../context/ProductContextProvider";

// components
import ProductImageComponent from "./ProductImageComponent";

const CardComponent = ({ itemDetailsComponent }) => {
  console.log("Card Component re-renders");

  const productContext = useContext(ProductContext);
  const { selectedProduct } = productContext;

  return (
    <>
      <Link to="/aboutProduct" className="text-decoration-none">
        <div className="card-product card border-0 position-relative">
          <ProductImageComponent src={selectedProduct.thumbnail} height={"343.48"} />

          {selectedProduct.isOnClearance ? (
            <div className="position-absolute start-40 custom-width-60 custom-background-color-red custom-color-antiquewhite fs-7 fw-bold ps-2 rounded-2">
              Extra {selectedProduct.clearancePercent}% off Clearance
            </div>
          ) : (
            <></>
          )}
        </div>
      </Link>

      {itemDetailsComponent}
    </>
  );
};

export default CardComponent;
