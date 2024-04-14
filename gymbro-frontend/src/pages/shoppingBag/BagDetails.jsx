import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// images
import imageOne from "../../assets/testing/image1.jpeg";

// components
import ProductInBagComponent from "../../components/products/ProductInBagComponent";
import NextStepComponent from "../../components/checkout/NextStepComponent";

const BagDetails = () => {
  return (
    <div className="pt-1">
      <h1 className="custom-font-family-teko fs-3 fw-bolder">YOUR BAG</h1>
      <div>
        <p className="fs-7">
          <ExclamationCircle size={20} />
          <span className="fw-semibold ps-2">Your items aren’t reserved, </span>
          checkout quickly to make sure you don’t miss out.
        </p>
      </div>

      <div className="row">
        <ProductInBagComponent imgSrc={imageOne} />
        <ProductInBagComponent imgSrc={imageOne} />
        <ProductInBagComponent imgSrc={imageOne} />
      </div>
    </div>
  );
};

export default BagDetails;
