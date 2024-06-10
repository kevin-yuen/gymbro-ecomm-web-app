import React, { useEffect, useRef } from "react";
import { Dash, Plus } from "react-bootstrap-icons";

const QuantityArrowControlComponent = ({
  item,
  maxQuantity,
  totalRequestedQuantity,
}) => {
  const qtyRef = useRef(totalRequestedQuantity);
  const decrementRef = useRef();
  const incrementRef = useRef();

  const handleButtonsState = () => {
    const qtyVal = Number(qtyRef.current.value);

    switch (true) {
      case qtyVal <= 1 && qtyVal < maxQuantity:
        decrementRef.current.disabled = true;
        incrementRef.current.disabled = false;
        break;
      case qtyVal > 1 && qtyVal < maxQuantity:
        decrementRef.current.disabled = false;
        incrementRef.current.disabled = false;
        break;
      case qtyVal > 1 && qtyVal >= maxQuantity:
        decrementRef.current.disabled = false;
        incrementRef.current.disabled = true;
        break;
      default:
        decrementRef.current.disabled = true;
        incrementRef.current.disabled = true;
        break;
    }
  };

  const handleCaptureUpdatedQuantity = () => {
    const bagItemSessionStorage = sessionStorage.getItem(
      `bag-item-${item.unitid}`
    );
    let bagItem;

    if (bagItemSessionStorage === null) {
      bagItem = {
        ...item,
        totalRequestedQuantity: Number(qtyRef.current.value),
      };
    } else {
      bagItem = JSON.parse(bagItemSessionStorage);
      bagItem = {
        ...bagItem,
        totalRequestedQuantity: Number(qtyRef.current.value),
      };
    }

    sessionStorage.setItem(`bag-item-${item.unitid}`, JSON.stringify(bagItem));
  };

  const handleDecrementQtyAndButtonState = () => {
    qtyRef.current.value = Number(qtyRef.current.value) - 1;
    handleButtonsState();

    handleCaptureUpdatedQuantity();
  };

  const handleIncrementQtyAndButtonState = () => {
    qtyRef.current.value = Number(qtyRef.current.value) + 1;
    handleButtonsState();

    handleCaptureUpdatedQuantity();
  };

  useEffect(() => {
    handleButtonsState();
  });

  return (
    <div className="d-flex align-items-center">
      {/* <span className="shopping-bag-qty fw-bolder">Qty:</span> */}

      {/* quantity input group for resolution of 576px or above */}
      <div className="input-group ms-2 custom-width-75">
        <span className="input-group-text bg-transparent border-0">
          <button
            className="rounded-circle"
            ref={decrementRef}
            onClick={() => handleDecrementQtyAndButtonState()}
          >
            <Dash size={16} />
          </button>
        </span>

        <input
          type="text"
          className="sb-qty-input form-control fs-10 text-center custom-font-family-montserrat"
          value={totalRequestedQuantity}
          ref={qtyRef}
          readOnly
        />

        <span className="input-group-text bg-transparent border-0">
          <button
            className="rounded-circle"
            ref={incrementRef}
            onClick={() => handleIncrementQtyAndButtonState()}
          >
            <Plus size={16} />
          </button>
        </span>
      </div>
    </div>
  );
};

export default QuantityArrowControlComponent;
