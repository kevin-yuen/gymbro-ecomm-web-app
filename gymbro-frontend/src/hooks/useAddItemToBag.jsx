import React, { useContext, useEffect } from "react";

// context
import { AuthContext } from "../context/AuthContextProvider";
import { ShoppingBagContext } from "../context/ShoppingBagContextProvider";

// utils
import { handleShoppingBagAPI } from "../utils/shoppingBagAPI";

const useAddItemToBag = () => {
  const authContext = useContext(AuthContext);
  const shoppingBagContext = useContext(ShoppingBagContext);

  const { authState } = authContext;
  const { setTotalItemCount, setCountResError } = shoppingBagContext;

  const handleAddToBag = async (
    productid,
    productName,
    productColor,
    productSize,
    unitId,
    requestedQuantity
  ) => {
    console.log(productSize);

    // remove previous error
    setCountResError({
      productName: undefined,
      productSize: undefined,
      errorCode: undefined,
    });

    const buyRes = await handleShoppingBagAPI(
      `/shoppingbag/items/${authState.userid}/${productid}/${unitId}`,
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
  };

  return { handleAddToBag };
};

export default useAddItemToBag;
