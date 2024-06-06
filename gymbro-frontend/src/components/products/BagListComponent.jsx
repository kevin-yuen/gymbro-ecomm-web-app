import React from "react";
import { useLocation } from "react-router-dom";
import { ExclamationDiamondFill } from "react-bootstrap-icons";

// components
import BagItemComponent from "./BagItemComponent";

// config
import Messages from "../../config/messages.json";

const outOfStockErrorMessage = Messages.checkout["out-of-stock-error"];

const BagListComponent = ({ items }) => {
  const location = useLocation();

  const handleItemOutOfStock = (item) => {
    if (location.state !== null) {
      for (const itemWithQtySufficiencyCheck of location.state
        .sbWithQtySufficiencyCheck) {
        if (
          itemWithQtySufficiencyCheck.productid === item.productid &&
          itemWithQtySufficiencyCheck.unitid === item.unitid &&
          !itemWithQtySufficiencyCheck.isSufficientQuantityInStock
        ) {
          return (
            <div className="ms-1 mt-2 mb-1 fs-8 text-danger">
              <ExclamationDiamondFill size={20} className="me-2" />
              {outOfStockErrorMessage}
            </div>
          );
        }
      }
    } else {
      return "";
    }
  };

  return (
    <ul>
      {items.map((item, i) => (
        <div key={i}>
          <BagItemComponent
            item={item}
            outOfStockError={handleItemOutOfStock(item)}
          />
        </div>
      ))}
    </ul>
  );
};

export default BagListComponent;
