import React, { useRef } from "react";
import { Trash, Dash, Plus } from "react-bootstrap-icons";

// components
import QuantityArrowControlComponent from "./QuantityArrowControlComponent";

// utils
import { handleCalculateClearanceAmount } from "../../utils/calculateClearance";

const BagItemComponent = ({ item, handleRemoveShoppingBagItem, userid }) => {
  console.log("Bag Item Component re-renders");

  return (
    <div className="card mb-3 pb-3 border-0 border-bottom">
      <div className="row g-0">
        <div className="col-md-4 text-center">
          <img
            src={item.thumbnail}
            alt={item.thumbnail}
            height={250}
            className="rounded-2"
          />
        </div>
        <div className="position-relative col-md-8">
          <div className="card-body fs-7 custom-font-family-inconsolata">
            <p className="card-text mb-0 fs-5 custom-font-family-jersey">
              {item.name}
            </p>

            <p className="card-text mb-0">{item.fitType}</p>

            <p className="card-text">
              {item.color} | {item.size}
            </p>

            <p className="card-text fw-semibold">
              {item.discountPrice > 0 ? (
                <>
                  <span
                    className={`${
                      item.clearancePercent > 0
                        ? "text-decoration-line-through"
                        : ""
                    }`}
                  >
                    US${item.discountPrice}
                  </span>
                  &nbsp;
                  <span className="text-decoration-line-through text-danger">
                    US${item.originalPrice}
                  </span>
                </>
              ) : (
                <>US${item.originalPrice}</>
              )}
            </p>

            {item.clearancePercent > 0 ? (
              <div className="d-flex align-items-center custom-color-green fw-bolder fs-6">
                US$
                {handleCalculateClearanceAmount(
                  item.clearancePercent,
                  item.originalPrice,
                  item.discountPrice
                )}
                <div className="custom-background-color-red custom-color-antiquewhite custom-font-family-jersey fs-6 d-inline ms-2 ps-2 pe-2 pt-1 pb-1 rounded-3">
                  After extra {item.clearancePercent}% off
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="position-absolute bottom-0">
              <div className="d-flex align-items-center mt-5">
                <QuantityArrowControlComponent
                  maxQuantity={item.maxQuantity}
                  totalRequestedQuantity={item.totalRequestedQuantity}
                />
              </div>

              <div className="d-flex align-items-center position-relative">
                <div className="text-danger mt-2">
                  {item.maxQuantity} items available
                </div>

                <div className="position-absolute start-100">
                  <Trash
                    size={18}
                    onClick={() =>
                      handleRemoveShoppingBagItem(
                        userid,
                        item.productid,
                        item.unitid
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItemComponent;
