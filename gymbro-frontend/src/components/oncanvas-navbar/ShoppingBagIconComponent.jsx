import React, { useContext, useEffect } from "react";
import { Bag } from "react-bootstrap-icons";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// utils
import { handleShoppingBagAPI } from "../../utils/shoppingBagAPI";

// custom hooks
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

const ShoppingBagIconComponent = ({ enableBagAuthIcon, setShowToolTip }) => {
  const shoppingBagContext = useContext(ShoppingBagContext);

  const {
    totalItemCount,
    setTotalItemCount,
    setCountResError,
    shoppingBagItems,
  } = shoppingBagContext;

  const { isUserLoggedIn, handleCurrentAuthStatus } =
    useHandleCurrentAuthStatus();

  useEffect(() => {
    handleCurrentAuthStatus();
  }, []);

  useEffect(() => {
    setTotalItemCount(0);

    const getShoppingBagItemTotalCount = async () => {
      if (isUserLoggedIn.isLoggedIn) {
        const totalCountRes = await handleShoppingBagAPI(
          `/shoppingbag/itemCount?userid=${isUserLoggedIn.userid}`,
          "GET"
        );

        switch (totalCountRes.status) {
          case 201:
            const totalCount = await totalCountRes
            .json()
            .then((res) => ({ ...res.totalCount }));

            setTotalItemCount(totalCount[0].total);
            break;
          case 404:
            setTotalItemCount(0);
            break;
          case 500:
            setCountResError(totalCountRes.status);
            break;
          default:
            break;
        }
      }
    };

    getShoppingBagItemTotalCount();
  }, [isUserLoggedIn.isLoggedIn, shoppingBagItems]);

  return (
    <>
      <div className="z-0 position-relative">
        <button
          className="border-0 p-0 me-0 custom-background-color-antiquewhite"
          disabled={enableBagAuthIcon ? false : true}
        >
          <Bag
            className="me-2"
            size={25}
            color={enableBagAuthIcon ? "#3E0957" : "#C2C1C1"}
            onMouseOver={() => setShowToolTip(true)}
            onMouseOut={() => setShowToolTip(false)}
          />
        </button>

        <div className="z-1 position-absolute top-45 end-50">
          {isUserLoggedIn.isLoggedIn && totalItemCount >= 1 ? (
            <div className="custom-color-antiquewhite custom-background-color-orange rounded-circle ps-3 pe-3 pt-2 pb-2">
              {totalItemCount}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingBagIconComponent;
