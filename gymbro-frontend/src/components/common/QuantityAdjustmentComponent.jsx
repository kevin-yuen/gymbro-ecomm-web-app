import React, { useContext, useState, useEffect } from "react";
import {
  DashCircleFill,
  PlusCircleFill,
  BagPlusFill,
} from "react-bootstrap-icons";

// context
import { ProductContext } from "../../context/ProductContextProvider";
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// utils
import { handleSizeMapping } from "../../utils/sizeMapping";

const QuantityAdjustmentComponent = ({ quantity, sizeShortForm }) => {
  console.log("Quantity Adjustment Component re-renders");

  const productContext = useContext(ProductContext);
  const shoppingBagContext = useContext(ShoppingBagContext);

  const { selectedProduct, dispatchSelectProduct } = productContext;
  const {shoppingBag} = shoppingBagContext;

  const [qty, setQty] = useState(quantity);
  const [enableAddToBag, setEnableAddToBag] = useState(false);

  useEffect(() => {
    setQty(quantity);
    setEnableAddToBag(quantity > 0 ? true : false);
  }, [quantity]);

  return (
    <div className="d-flex justify-content-between align-items-center mt-2 ps-1 pe-1 pb-2">
      <div className="input-group align-items-center">
        <DashCircleFill
          size={15}
          color={qty > 1 ? "#3E0957" : "#75737398"}
          onClick={() => {
            if (qty > 1) setQty((prevQty) => prevQty - 1);
          }}
        />

        <div className="ms-1 me-1">
          <input
            type="text"
            className="form-control custom-background-color-lightgrey custom-color-grey rounded-5 fs-7 ps-2 pt-1 pb-1"
            placeholder={qty}
            readOnly
          />
        </div>

        <PlusCircleFill
          size={15}
          color={qty !== 0 ? "#3E0957" : "#75737398"}
          onClick={() => {
            if (qty !== 0) setQty((prevQty) => prevQty + 1);
          }}
        />
      </div>
      <BagPlusFill
        size={20}
        color={qty > 0 ? "#3E0957" : "#75737398"}
        disabled={enableAddToBag}
        onClick={() => {
          const size = handleSizeMapping(sizeShortForm);

          if (enableAddToBag) {
            dispatchSelectProduct({
              type: "ADD TO BAG",
              payload: { qty, size },
            });
          }
        }}
      />
    </div>
  );
};

export default React.memo(QuantityAdjustmentComponent);
