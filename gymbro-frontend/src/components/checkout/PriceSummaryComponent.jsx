import React from "react";
import { InfoCircleFill } from "react-bootstrap-icons";

const PriceSummaryComponent = ({shoppingBagItem, handleCalculatePricePerItem}) => {
  console.log("Price Summary Component re-renders");

  return (
        <ul className="list-unstyled mb-2">
          <li className="fs-9 ms-1 border-bottom pb-2 pt-2">
            <div className="row">
              <div className="col-1">
                <InfoCircleFill
                  size={19}
                  className="me-2 ms-1"
                  color="#ea9000"
                />
              </div>

              <div className="col-9 ps-0 pe-0">
                {shoppingBagItem.name}
                <span className="fw-bolder ms-1">
                  ({shoppingBagItem.totalRequestedQuantity} item
                  {shoppingBagItem.totalRequestedQuantity > 1 ? "s" : ""})
                </span>
              </div>

              <div className="col custom-font-family-inconsolata fs-7">
                US$
                {handleCalculatePricePerItem(
                  shoppingBagItem.clearancePercent,
                  shoppingBagItem.originalPrice,
                  shoppingBagItem.discountPrice,
                  shoppingBagItem.totalRequestedQuantity
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-1"></div>

              <div className="col-9 ps-0">
                <p className="mt-1 mb-0">
                  <span className="fw-bold fst-italic me-1">Color:</span>
                  {shoppingBagItem.color}
                </p>

                <p className="mt-1 mb-0">
                  <span className="fw-bold fst-italic me-1">Size:</span>
                  {shoppingBagItem.size}
                </p>
              </div>

              <div className="col"></div>
            </div>
          </li>
        </ul>
  );
};

export default React.memo(PriceSummaryComponent);
