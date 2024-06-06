import React, { useContext, useState, useEffect } from "react";

// context
import { ShoppingBagContext } from "../context/ShoppingBagContextProvider";

// utils
import { handleShoppingBagAPI } from "../utils/shoppingBagAPI";

// custom hooks
import useHandleCurrentAuthStatus from "./useHandleCurrentAuthStatus";

const useAddItemToBag = () => {
  const shoppingBagContext = useContext(ShoppingBagContext);

  const { setTotalItemCount, setCountResError } = shoppingBagContext;

  const {isUserLoggedIn, handleCurrentAuthStatus} = useHandleCurrentAuthStatus();

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    handleCurrentAuthStatus();
  }, [])

  const handleAddToBag = async (
    productid,
    productName,
    productColor,
    productSize,
    unitId,
    requestedQuantity
  ) => {
    // remove previous error
    setCountResError({
      productName: undefined,
      productSize: undefined,
      errorCode: undefined,
    });

    // prevent user from double-clicking "Quick Buy" or "Add to Bag", which causes duplicate records in shoppingbags collection
    setIsAdding(true);

    const buyRes = await handleShoppingBagAPI(
      `/shoppingbag/items/${isUserLoggedIn.userid}/${productid}/${unitId}`,
      "POST",
      JSON.stringify({
        requestedColor: productColor,
        requestedSize: productSize,
        requestedQuantity,
      })
    );

    switch (buyRes.status) {
      case 201:
        const totalCount = await buyRes
          .json()
          .then((res) => ({ ...res.totalCount }));

        setTotalItemCount(totalCount[0].total);
        break;
      case 409:
      case 500:
        setCountResError({
          productName,
          productSize,
          errorCode: buyRes.status,
        });

        break;
      default:
        break;
    }
    setIsAdding(false);
  };

  return { handleAddToBag, isAdding };
};

export default useAddItemToBag;
