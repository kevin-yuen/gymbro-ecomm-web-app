import React, { useState } from "react";
import { StarFill } from "react-bootstrap-icons";

// config
import productBuyConfig from "../../config/productBuy.json";

// components
import QuantityDropdownComponent from "../common/QuantityDropdownComponent";

const BuyComponent = () => {
  return (
    <div className="border rounded-3 mt-3 pt-2">
      <div className="text-center">
        <h5 className="fs-5 fw-bolder">ADAPT SAFARI SEAMLESS LEGGING</h5>
        <p className="fs-7">Body Fit</p>
        <p className="fs-7 fw-bold">US$70</p>
      </div>

      <div className="d-flex justify-content-between ps-5 pe-5 fs-7">
        <p>
          <StarFill size={20} color="#3e0957" />
          4.6
        </p>
        <p>
          <span className="fw-bold custom-color-darkpurple">200+ bought</span>{" "}
          in past month
        </p>
        <p>36 ratings</p>
      </div>

      <div className="mt-4 ps-2">
        <p>
          FREE delivery to <span className="fw-bold">anywhere</span> in the U.S.
          on eligible orders over $49.
        </p>
      </div>

      <div className="mt-4 ps-2">
        <div className="custom-color-green fw-bold">IN STOCK</div>

        <div className="mt-4">
          <h3 className="fs-6 fw-semibold">Select a size</h3>
          {productBuyConfig.size.map((size) => (
            <button className="btn-size custom-width-10 border me-2 fs-8">
              {size}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <QuantityDropdownComponent />
        </div>

        <div className="mt-4 text-center">
          <button className="border border-0 rounded-5 fw-semibold fs-7 ps-5 pe-5 pt-2 pb-2 custom-background-color-darkpurple custom-color-antiquewhite">
            Add to Cart
          </button>
        </div>

        <div className="mt-5 fs-7">
          <div className="row">
            <div className="col-4 fw-semibold">
              <p>Ships from</p>
            </div>
            <div className="col-8">
              <p>GymBro</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4 fw-semibold">
              <p>Sold by</p>
            </div>
            <div className="col-8">
              <p>WARN SEASON</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4 fw-semibold">
              <p>Returns</p>
            </div>
            <div className="col-8">
              <p>Eligible for Return, Refund or Replacement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyComponent;
