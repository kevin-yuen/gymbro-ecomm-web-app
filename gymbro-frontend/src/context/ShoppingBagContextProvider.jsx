import React, { useState, createContext } from "react";

// utils
import { handleShoppingBagAPI } from "../utils/shoppingBagAPI";

export const ShoppingBagContext = createContext();

export default function ShoppingBagContextProvider({ children }) {
  const [countResError, setCountResError] = useState({
    productName: undefined,
    productSize: undefined,
    errorCode: undefined,
  });

  const [shoppingBagItems, setShoppingBagItems] = useState([]);

  const [totalItemCount, setTotalItemCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [getBagItemsServerError, setGetBagItemsServerError] = useState(false);

  const [shippingMethod, setShippingMethod] = useState({
    type: "",
    fee: 0,
  });

  const handleGetThumbnail = (options, bagItemColor) =>
    options.filter((option) => option.color === bagItemColor)[0].imgSrc[0];

  const handleGetMaxQuantity = (options, bagItemColor, unitid) =>
    options
      .filter((option) => option.color === bagItemColor)[0]
      .unit.filter((ut) => ut._id === unitid)[0].quantity;

  const handleGetShoppingBagItems = async (userid) => {
    setShoppingBagItems([]);
    setIsLoading(true);

    const serverResItemDetails = await handleShoppingBagAPI(
      `/shoppingbag/itemDetails?userid=${userid}`,
      "GET"
    );

    switch (serverResItemDetails.status) {
      case 201:
        const srBagItems = await serverResItemDetails
          .json()
          .then((serverRes) => serverRes.bagItems);

        srBagItems.forEach((bagItem) => {
          ({
            ...bagItem.productInBag,
          })[0].products.forEach((product) => {
            if (product.productid === bagItem._id) {
              setShoppingBagItems((prevShoppingBagItem) => [
                ...prevShoppingBagItem,
                {
                  productid: product.productid,
                  unitid: product.unit.unitid,
                  brand: bagItem.brand,
                  name: bagItem.name,
                  thumbnail: handleGetThumbnail(
                    bagItem.options,
                    product.unit.color
                  ),
                  fitType: bagItem.fitType,
                  color: product.unit.color,
                  size: product.unit.size,
                  originalPrice: bagItem.originalPrice,
                  discountPrice: bagItem.discountPrice,
                  clearancePercent: bagItem.clearancePercent,
                  totalRequestedQuantity: product.unit.quantityInBag,
                  maxQuantity: handleGetMaxQuantity(
                    bagItem.options,
                    product.unit.color,
                    product.unit.unitid
                  ),
                },
              ]);
            }
          });
        });

        setGetBagItemsServerError(false);
        break;
      case 404:
        setGetBagItemsServerError(false);
        break;
      case 500:
        setGetBagItemsServerError(true);
        break;
      default:
        break;
    }

    setIsLoading(false);
  };

  const handleRemoveShoppingBagItem = async (userid, productid, unitid) => {
    const remainItemsServerRes = await handleShoppingBagAPI(
      `/shoppingbag/removeItem/${userid}/${productid}/${unitid}`,
      "DELETE"
    );

    switch (remainItemsServerRes.status) {
      case 201:
        let tempShoppingBagItems = [];
        const remainProducts = await remainItemsServerRes
          .json()
          .then((remainItemRes) => remainItemRes.remainItems.products);

        shoppingBagItems.filter((shoppingBagItem) => {
          remainProducts.forEach((remainProduct) => {
            if (
              remainProduct.productid === shoppingBagItem.productid &&
              remainProduct.unit.unitid === shoppingBagItem.unitid
            ) {
              tempShoppingBagItems.push(shoppingBagItem);
            }
          });
        });

        setShoppingBagItems(tempShoppingBagItems);

        break;
      case 500:
        break;
      default:
        break;
    }
  };

  const handleUpdateItemQuantity = (latestItems) => {
    setShoppingBagItems(latestItems);
  };

  return (
    <ShoppingBagContext.Provider
      value={{
        isLoading,
        shoppingBagItems,
        totalItemCount,
        setTotalItemCount,
        countResError,
        setCountResError,
        handleGetShoppingBagItems,
        handleRemoveShoppingBagItem,
        handleUpdateItemQuantity,
        getBagItemsServerError,
        shippingMethod,
        setShippingMethod,
        setShoppingBagItems,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
}
