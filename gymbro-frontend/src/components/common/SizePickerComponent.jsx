import React, { useContext, useState, useEffect } from "react";

// context
import { ProductContext } from "../../context/ProductContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

// components
import QuantityAdjustmentComponent from "./QuantityAdjustmentComponent";

// utils
import { handleSizeMapping } from "../../utils/sizeMapping";

const handleFilterOption_CB = (selProduct) =>
  selProduct.options.filter((option) => option.color === selProduct.color);

// Size Picker Component starts here
const SizePickerComponent = () => {
  console.log("Size Picker Component re-renders");

  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { authState } = authContext;
  const { selectedProduct, dispatchSelectProduct } = productContext;

  const handleGetUnits = (selProduct) =>
    handleFilterOption_CB(selProduct)[0].unit;

  const [size, setSize] = useState(handleSizeMapping(selectedProduct.size));
  const [units, setUnits] = useState(handleGetUnits(selectedProduct));
  const [quantity, setQuantity] = useState(selectedProduct.quantity);

  useEffect(() => {
    setSize(handleSizeMapping(selectedProduct.size));
    setUnits(handleGetUnits(selectedProduct));
    setQuantity(selectedProduct.quantity);
  }, [selectedProduct]);

  return (
    <>
      <div className="d-flex fs-8 text-danger mb-n2">
          <p className="fw-bolder">Selected Size:&nbsp;</p>
          <span>
            {/* {handleSizeMapping(selectedProduct.size)} */}
            {size}
          </span>
      </div>

      <ul className="list-group list-group-horizontal mb-3">
        {units?.map((unit) => {
          const sizeOpt = handleSizeMapping(unit.size);

          return (
            <li className="list-group-item ps-2 pe-2 custom-background-color-whitepurple w-100 d-flex justify-content-center">
              {unit.quantity > 0 ? (
                <button
                  className="rounded-2 fs-9 border-0"
                  value={sizeOpt}
                  onClick={() => {
                    // dispatchSelectProduct({
                    //   type: "SELECT SIZE",
                    //   payload: {
                    //     size: handleSizeMapping(sizeOpt),
                    //     quantity: unit.quantity,
                    //   },
                    // });

                    setSize(sizeOpt);
                    setQuantity(unit.quantity);
                  }}
                >
                  {sizeOpt}
                </button>
              ) : (
                <button
                  className="unavailableSizeOption rounded-2 fs-9 border-0 custom-background-color-whitepurple text-decoration-line-through"
                  value={sizeOpt}
                  disabled
                >
                  {sizeOpt}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {!authState.isAuthorized ? (
        <QuantityAdjustmentComponent quantity={quantity} sizeShortForm={size} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SizePickerComponent;
