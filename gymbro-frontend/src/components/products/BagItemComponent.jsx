import React, { useContext, useEffect } from "react";
import { Trash } from "react-bootstrap-icons";

// components
import QuantityArrowControlComponent from "./QuantityArrowControlComponent";

// utils
import { handleCalculateClearanceAmount } from "../../utils/calculateClearance";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// custom hooks
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

const BagItemComponent = ({ item, outOfStockError }) => {
  const shoppingbagContext = useContext(ShoppingBagContext);
  const { handleRemoveShoppingBagItem } = shoppingbagContext;

  const { isUserLoggedIn, handleCurrentAuthStatus } =
    useHandleCurrentAuthStatus();

  const handleRemoveItemSessionStorage = () =>
    sessionStorage.removeItem(`bag-item-${item.unitid}`);

  useEffect(() => {
    handleCurrentAuthStatus();
    handleRemoveItemSessionStorage();
  }, []);

  return (
    <>
      {outOfStockError}

      <div className="card mb-3 pb-3 border-0 border-bottom">
        <div className="row g-0">
          <div className="col-lg-4 text-center">
            <img
              src={item.thumbnail}
              alt={item.thumbnail}
              height={250}
              className="sb-item-thumbnail rounded-2"
            />
          </div>

          <div className="position-relative col-lg-8">
            <div className="sb-item-dets-container card-body custom-font-family-inconsolata">
              <p className="sb-item-name card-text mb-0 custom-font-family-jersey">
                {item.name}
              </p>

              <p className="sb-item-dets card-text mb-0">
                {item.fitType}
              </p>

              <p className="sb-item-dets card-text">
                {item.color} | {item.size}
              </p>

              <p className="sb-item-dets card-text fw-semibold">
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
                <div className="sb-price-container d-flex align-items-center custom-color-green fw-bolder fs-6">
                  <span className="sb-item-price">
                    US$
                    {handleCalculateClearanceAmount(
                      item.clearancePercent,
                      item.originalPrice,
                      item.discountPrice
                    )}
                  </span>
                  <div className="custom-background-color-red custom-color-antiquewhite custom-font-family-jersey d-inline ms-2 ps-2 pe-2 pt-1 pb-1 rounded-3">
                    After extra {item.clearancePercent}% off
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div>
                <div className="sb-qty-control-container d-flex align-items-center mt-3 mb-3">
                  <QuantityArrowControlComponent
                    item={item}
                    maxQuantity={item.maxQuantity}
                    totalRequestedQuantity={item.totalRequestedQuantity}
                  />
                </div>

                <div className="custom-background-color-orange custom-color-antiquewhite d-inline rounded-2 ps-2 pe-2 pt-1 pb-1 fs-7">
                  {item.maxQuantity} items available
                </div>

                <div className="float-end">
                  <Trash
                    size={18}
                    onClick={() => {
                      handleRemoveShoppingBagItem(
                        isUserLoggedIn.userid,
                        item.productid,
                        item.unitid
                      );

                      handleRemoveItemSessionStorage();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BagItemComponent);
