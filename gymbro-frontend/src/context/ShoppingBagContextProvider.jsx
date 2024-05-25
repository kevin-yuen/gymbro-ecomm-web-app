import React, { useState, createContext } from "react";

export const ShoppingBagContext = createContext();

export default function ShoppingBagContextProvider({ children }) {
  const [countResError, setCountResError] = useState({
    productName: undefined,
    productSize: undefined,
    errorCode: undefined
  });

  const [shoppingBagItems, setShoppingBagItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);

  return (
    <ShoppingBagContext.Provider
      value={{
        shoppingBagItems,
        setShoppingBagItems,
        totalItemCount,
        setTotalItemCount,
        countResError,
        setCountResError,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
}
