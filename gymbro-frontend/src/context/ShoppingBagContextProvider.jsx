import React, {useState, createContext} from "react";

export const ShoppingBagContext = createContext();

export default function ShoppingBagContextProvider({children}) {
    const [shoppingBag, setShoppingBag] = useState([]);

    console.log("SHOPPING BAG:", shoppingBag)

    return (
        <ShoppingBagContext.Provider value={{shoppingBag, setShoppingBag}}>
            {children}
        </ShoppingBagContext.Provider>
    )
}