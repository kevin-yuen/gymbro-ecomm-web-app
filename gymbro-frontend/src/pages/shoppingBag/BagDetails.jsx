import React, { useContext, useEffect, useState } from "react";
import { ExclamationCircle, BagXFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

// components
import BagListComponent from "../../components/products/BagListComponent";
import CheckoutButtonsComponent from "../../components/checkout/CheckoutButtonsComponent";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// config
import Messages from "../../config/messages.json";

// custom hooks
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

const serverError = Messages.server.generic;

const BagDetails = () => {
  const navigate = useNavigate();

  const shoppingbagContext = useContext(ShoppingBagContext);

  const { isUserLoggedIn, handleCurrentAuthStatus } =
    useHandleCurrentAuthStatus();

  const [isSetShoppingBagItems, setIsSetShoppingBagItems] = useState(false);

  const {
    isLoading,
    handleGetShoppingBagItems,
    shoppingBagItems,
    getBagItemsServerError,
    setShoppingBagItems,
  } = shoppingbagContext;

  useEffect(() => {
    handleCurrentAuthStatus();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn !== false) {
      handleGetShoppingBagItems(isUserLoggedIn.userid);
    }
  }, [isUserLoggedIn.isLoggedIn]);

  const handleFetchBagItemsSessionStorage = () => {
    let bagItemsStorage = [];

    Object.keys(sessionStorage).forEach((key) => {
      const keyPrefix = key.substring(0, key.lastIndexOf("-") + 1);

      if (keyPrefix === "bag-item-") {
        bagItemsStorage.push(JSON.parse(sessionStorage.getItem(key)));
      }
    });

    return bagItemsStorage;
  };

  const handleUpdateTotalReqQtyState = () => {
    setIsSetShoppingBagItems(true);

    const itemsStorage = handleFetchBagItemsSessionStorage();

    // from Shopping Bag Context
    const notInItemsStorage = shoppingBagItems.filter(
      (shoppingBagItem) =>
        !itemsStorage.find(
          ({ productid, unitid }) =>
            shoppingBagItem.productid === productid &&
            shoppingBagItem.unitid === unitid
        )
    );

    for (const item of notInItemsStorage) {
      itemsStorage.push(item);
    }

    setShoppingBagItems(itemsStorage);

    setTimeout(() => navigate("/your-bag/information"), 3000);
  };

  const handleGenerateBagItemDetails = () => {
    return (
      <>
        <div>
          <p className="fs-7">
            <ExclamationCircle size={20} />
            <span className="fw-semibold ps-2">
              Your items aren’t reserved,&nbsp;
            </span>
            checkout quickly to make sure you don’t miss out.
          </p>
        </div>

        <BagListComponent items={shoppingBagItems} />

        <div className="d-flex float-end">
          {!isSetShoppingBagItems ? (
            <CheckoutButtonsComponent
              prevButton={undefined}
              nextButton={"Information"}
              handleUpdateTotalReqQtyState={handleUpdateTotalReqQtyState}
            />
          ) : (
            <button
              className="border-0 rounded-2 ps-4 pe-4 pt-3 pb-3 custom-background-color-grey custom-color-antiquewhite custom-font-family-inconsolata fw-bolder fs-7"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
              <span role="status">Moving on...</span>
            </button>
          )}
        </div>
      </>
    );
  };

  const handleGenerateBagDetailsContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mb-0 fs-7">Searching for your bag...</p>
        </div>
      );
    } else {
      if (getBagItemsServerError) {
        return <p className="fs-7 text-danger">{serverError}</p>;
      } else {
        if (shoppingBagItems.length >= 1) {
          return handleGenerateBagItemDetails();
        } else {
          return (
            <div className="text-center mb-4">
              <BagXFill color="#3e0957" size={250} className="mt-2" />
              <p className="mt-2 custom-font-family-jersey fs-4">
                Your GymBro Bag is empty.
              </p>
            </div>
          );
        }
      }
    }
  };

  return (
    <div className="pt-1">
      <h1 className="custom-font-family-teko fs-3 fw-bolder">YOUR BAG</h1>

      {handleGenerateBagDetailsContent()}
    </div>
  );
};

export default BagDetails;
