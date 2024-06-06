import React, { useState, useEffect } from "react";
import { BagPlusFill } from "react-bootstrap-icons";

// custom hooks
import useAddItemToBag from "../../hooks/useAddItemToBag";

const quickBuyQuantity = 1;

// Quantity Buy Component starts here...
const QuickBuyComponent = ({ source, unitId, size }) => {
  console.log("Quantity Buy Component re-renders");

  const [disableQuickBuy, setDisableQuickBuy] = useState(false);

  const { isAdding, handleAddToBag } = useAddItemToBag();

  useEffect(() => {
    size !== "NOT IN STOCK" && !isAdding
      ? setDisableQuickBuy(false)
      : setDisableQuickBuy(true);
  }, [isAdding]);

  return (
    <div className="text-center">
      <button
        type="button"
        className={`border-0 ${
          !disableQuickBuy
            ? "custom-background-color-darkpurple"
            : "custom-background-color-grey"
        } custom-color-antiquewhite custom-font-family-inconsolata fw-bold ps-8 pe-8 pt-2 pb-2 mb-4 mt-n2 rounded-pill`}
        disabled={disableQuickBuy}
        onClick={() =>
          handleAddToBag(
            source.productID,
            source.name,
            source.color,
            size,
            unitId,
            quickBuyQuantity
          )
        }
      >
        {isAdding ? (
          <div className="spinner-border spinner-border-sm text-secondary me-2" role="status"></div>
        ) : (
          <BagPlusFill size={15} color="#f8faf9" className="me-2" />
        )}
        Quick Buy
      </button>
    </div>
  );
};

export default React.memo(QuickBuyComponent);
