import React, {useState} from "react";

// config
import productBuyConfig from "../../config/productBuy.json";

const createQuantityOptions = (quantity) => {
  let qtyInStock = [];

  for (let i = 2; i <= quantity; i++) {
    qtyInStock.push(i);
  }
  return qtyInStock;
};

export default function QuantityDropdownComponent() {
  const [selectedQtyAmount, setSelectedQtyAmount] = useState(1);

  return (
    <div className="dropdown">
      <button
        className="btn custom-background-color-antiquewhite dropdown-toggle pt-1 pb-1 fs-8"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Quantity: {selectedQtyAmount}
      </button>
      <ul className="dropdown-menu">
        {createQuantityOptions(productBuyConfig.quantity).map((qtyAmount) => (
          <li>
            <button className="dropdown-item pt-1 pb-1 fs-8" type="button">
              Quantity: {qtyAmount}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
