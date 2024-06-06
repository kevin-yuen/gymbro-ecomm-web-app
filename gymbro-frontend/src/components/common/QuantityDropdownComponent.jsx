import React, { useState, useEffect, useContext } from "react";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// components
import ErrorComponent from "./ErrorComponent";

// utils
import { handleSizeMapping } from "../../utils/sizeMapping";

// custom hooks
import useAddItemToBag from "../../hooks/useAddItemToBag";
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

// config
import Messages from "../../config/messages.json";

const serverError = Messages.server.generic;
const insufficientError = Messages["shopping-bag"].insufficient;

const createQuantityOptions = (quantity) => {
  let qtyInStock = [];

  for (let i = 1; i <= quantity; i++) {
    qtyInStock.push(i);
  }
  return qtyInStock;
};

const handleAddToBagError = (addToBagError) => {
  switch (addToBagError) {
    case 409:
      return (
        <div className="fs-7">
          <ErrorComponent error={insufficientError} />
        </div>
      );
    case 500:
      return (
        <div className="text-center fs-7">
          <ErrorComponent error={serverError} />
        </div>
      );
    default:
      return;
  }
};

// Quantity Dropdown Component starts here...
export default function QuantityDropdownComponent({
  tempProductAddToBag,
  unitId,
}) {
  console.log("Quantity Dropdown Component re-renders");

  const shoppingBagContext = useContext(ShoppingBagContext);

  const { countResError } = shoppingBagContext;

  const { _id, name, options, size, color } = tempProductAddToBag;

  const handlePopulateSelectedQuantity = () => {
    // find out the quantity per selected color and size
    const { quantity } = options
      .filter((option) => option.color === color)[0]
      .unit.filter((ut) => ut.size === size)[0];
    return quantity;
  };

  const [selectedQuantity, setSelectedQuantity] = useState(
    handlePopulateSelectedQuantity()
  );

  const { isAdding, handleAddToBag } = useAddItemToBag();
  const {isUserLoggedIn, handleCurrentAuthStatus} = useHandleCurrentAuthStatus();

  useEffect(() => {
    const qty = handlePopulateSelectedQuantity();
    setSelectedQuantity(qty);
  }, [size]);

  useEffect(() => {
    handleCurrentAuthStatus();
  }, [])

  return (
    <>
      <div className="dropdown">
        <button
          className="btn custom-background-color-lightpurple dropdown-toggle pt-1 pb-1 mb-3 fs-8"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={selectedQuantity === 0 ? true : false}
        >
          QUANTITY: {selectedQuantity}
        </button>

        <ul className="dropdown-menu">
          {createQuantityOptions(handlePopulateSelectedQuantity()).map(
            (qtyAmount, i) => (
              <li key={i}>
                <button
                  className="dropdown-item pt-1 pb-1 fs-8"
                  type="button"
                  value={qtyAmount}
                  onClick={(e) => setSelectedQuantity(Number(e.target.value))}
                >
                  QUANTITY: {qtyAmount}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="text-center mb-3">
        <button
          className={`ps-5 pe-5 pt-2 pb-2 rounded-5 border-0 custom-font-family-inconsolata fs-6 fw-bold ${
            isUserLoggedIn.isLoggedIn && !isAdding
              ? "custom-background-color-darkpurple custom-color-antiquewhite"
              : "notAuthorizedAddBag custom-background-color-grey custom-color-antiquewhite"
          }`}
          disabled={
            isUserLoggedIn.isLoggedIn && !isAdding
              ? false
              : true
          }
          onClick={() =>
            handleAddToBag(
              _id,
              name,
              color,
              handleSizeMapping(size),
              unitId,
              selectedQuantity
            )
          }
        >
          Add to Bag
        </button>
      </div>

      <div className="text-danger">
        {handleAddToBagError(countResError.errorCode)}
      </div>
    </>
  );
}
