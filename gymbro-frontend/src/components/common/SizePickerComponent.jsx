import React, { useContext, useState, useEffect } from "react";

// context
import { ProductContext } from "../../context/ProductContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

// components
import QuickBuyComponent from "../products/QuickBuyComponent";
import QuantityDropdownComponent from "./QuantityDropdownComponent";
import ErrorComponent from "../common/ErrorComponent";

// utils
import { handleSizeMapping } from "../../utils/sizeMapping";

// config
import Messages from "../../config/messages.json";

const handleFilterOption_CB = (selProduct, selColor = undefined) => {
  return selProduct.options.filter(
    (option) =>
      option.color === (selColor === undefined ? selProduct.color : selColor)
  );
};

const handleGenerateQuantity = (pathname, productDetails, size, unitId) => {
  if (pathname === "/aboutProduct/product") {
    const tempProductAddToBag = {
      ...productDetails,
      size: handleSizeMapping(size),
    };

    return (
      <QuantityDropdownComponent
        tempProductAddToBag={tempProductAddToBag}
        unitId={unitId}
      />
    );
  }
};

// Size Picker Component starts here
const SizePickerComponent = ({
  productDetails,
  pathname,
  selColor,
  selOption,
}) => {
  // all props are stricted to "/aboutProduct/product"
  console.log("Size Picker Component re-renders");

  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const productContext = useContext(ProductContext);

  const handleSetSource = () => {
    if (pathname === "/aboutProduct/product") {
      const selUnit = productDetails.options
        .filter((option) => option.color === selOption.color)[0]
        .unit.find((ut) => ut.quantity > 0);

      productDetails.size = selUnit !== undefined ? selUnit.size : "N/A";
      productDetails.unitID = selUnit._id;

      return productDetails;
    } else {
      const { selectedProduct: selProduct } = productContext;

      return selProduct;
    }
  };

  const handleGetUnits = (selProduct) => {
    return pathname === "/aboutProduct/product"
      ? handleFilterOption_CB(selProduct, selColor)[0].unit
      : handleFilterOption_CB(selProduct)[0].unit;
  };

  const [source, setSource] = useState(handleSetSource());

  const [size, setSize] = useState(handleSizeMapping(source.size));
  const [units, setUnits] = useState(handleGetUnits(source));

  const [unitId, setUnitId] = useState(source.unitID);

  useEffect(() => setSource(handleSetSource()));

  useEffect(() => {
    setSize(handleSizeMapping(source.size));
    setUnits(handleGetUnits(source));
    setUnitId(source.unitID);
  }, [source]);

  return (
    <>
      <div className="d-flex fs-8 text-danger mb-n2">
        <p className="fw-bolder">
          {size !== "NOT IN STOCK" ? "Selected Size:" : ""}&nbsp;
        </p>
        <span>{size}</span>
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
                    setSize(sizeOpt);
                    setUnitId(unit._id);
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

      {size !== "NOT IN STOCK" &&
        handleGenerateQuantity(pathname, productDetails, size, unitId)}

      {authState.isAuthorized && pathname !== "/aboutProduct/product" ? (
        <QuickBuyComponent source={source} unitId={unitId} size={size} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SizePickerComponent;
