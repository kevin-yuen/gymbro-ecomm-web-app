import React, { useState, useEffect, useContext } from "react";

// context
import { AuthContext } from "../../context/AuthContextProvider";
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// components
import ErrorComponent from "./ErrorComponent";

// utils
import { handleSizeMapping } from "../../utils/sizeMapping";

// custom hooks
import useAddItemToBag from "../../hooks/useAddItemToBag";

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
      return <ErrorComponent error={insufficientError} />;
    case 500:
      return (<div className="text-center"><ErrorComponent error={serverError} /></div>);
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

  const authContext = useContext(AuthContext);
  const shoppingBagContext = useContext(ShoppingBagContext);

  const { authState } = authContext;
  const { countResError } = shoppingBagContext;

  const handlePopulateSelectedQuantity = () => {
    const { options, size, color } = tempProductAddToBag;

    // find out the quantity per selected color and size
    const { quantity } = options
      .filter((option) => option.color === color)[0]
      .unit.filter((ut) => ut.size === size)[0];
    return quantity;
  };

  const [selectedQuantity, setSelectedQuantity] = useState(
    handlePopulateSelectedQuantity()
  );

  const { handleAddToBag } = useAddItemToBag(
    tempProductAddToBag._id,
    tempProductAddToBag.name,
    handleSizeMapping(tempProductAddToBag.size),
    unitId,
    selectedQuantity
  );

  useEffect(() => {
    const qty = handlePopulateSelectedQuantity();
    setSelectedQuantity(qty);
  }, [tempProductAddToBag.size]);

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
            (qtyAmount) => (
              <li>
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
            authState.isAuthorized
              ? "custom-background-color-darkpurple custom-color-antiquewhite"
              : "notAuthorizedAddBag custom-background-color-grey custom-color-antiquewhite"
          }`}
          disabled={authState.isAuthorized ? false : true}
          onClick={() => handleAddToBag()}
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
