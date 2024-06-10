import React from "react";
import { InfoCircleFill } from "react-bootstrap-icons";

const PriceSummaryComponent = ({
  shoppingBagItem,
  handleCalculatePricePerItem,
}) => {
  return (
    <ul className="list-unstyled mb-2">
      <li className="fs-9 ms-1 border-bottom pb-2 pt-2">
        <div className="row">
          <div className="col-1 ps-0 pe-0">
            <InfoCircleFill size={19} className="me-2 ms-1" color="#ea9000" />
          </div>

          <div className="col-sm-8 col-md-9 col-xl-10 ps-0 pe-0">
            <span className="ps-item-name ps-item-dets">
              {shoppingBagItem.name}
            </span>

            <span className="fw-bolder ms-1">
              <span className="ps-item-dets">
                ({shoppingBagItem.totalRequestedQuantity} item
                {shoppingBagItem.totalRequestedQuantity > 1 ? "s" : ""})
              </span>
            </span>
          </div>

          <div className="col-sm-3 col-md-2 col-xl-1 custom-font-family-inconsolata fs-7">
            <span className="ps-item-dets">
              US$
              {handleCalculatePricePerItem(
                shoppingBagItem.clearancePercent,
                shoppingBagItem.originalPrice,
                shoppingBagItem.discountPrice,
                shoppingBagItem.totalRequestedQuantity
              )}
            </span>
          </div>
        </div>

        <div className="row">
          <div className="col-1"></div>

          <div className="col-9 ps-0">
            <p className="mt-1 mb-0">
              <span className="ps-item-dets">
                <span className="fw-bold fst-italic me-1">Color:</span>
                {shoppingBagItem.color}
              </span>
            </p>

            <p className="mt-1 mb-0">
              <span className="ps-item-dets">
                <span className="fw-bold fst-italic me-1">Size:</span>
                {shoppingBagItem.size}
              </span>
            </p>
          </div>

          <div className="col"></div>
        </div>
      </li>
    </ul>
  );
};

export default React.memo(PriceSummaryComponent);
