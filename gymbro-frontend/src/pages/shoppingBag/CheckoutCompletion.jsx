import React from "react";

// images
import imageOne from "../../assets/testing/image1.jpeg"

// components
import ProductInBagComponent from "../../components/products/ProductInBagComponent";

const CheckoutCompletion = () => {
  return (
    <>
      <h1 className="form-label custom-font-family-teko custom-color-green fs-3 fw-bolder">
        PAYMENT SUCCESSFUL
      </h1>
      <ProductInBagComponent imgSrc={imageOne} />
      <ProductInBagComponent imgSrc={imageOne} />
    </>
  );
};

export default CheckoutCompletion;
