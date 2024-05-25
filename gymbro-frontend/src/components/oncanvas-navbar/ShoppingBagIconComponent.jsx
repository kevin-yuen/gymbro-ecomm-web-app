import React, { useContext, useEffect } from "react";
import { Bag } from "react-bootstrap-icons";

// context
import { AuthContext } from "../../context/AuthContextProvider";
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// utils
import { handleShoppingBagAPI } from "../../utils/shoppingBagAPI";

const ShoppingBagIconComponent = ({ enableBagAuthIcon, setShowToolTip }) => {
  console.log("Shopping Bag Icon Component re-renders");

  const authContext = useContext(AuthContext);
  const shoppingBagContext = useContext(ShoppingBagContext);

  const { authState } = authContext;
  const { totalItemCount, setTotalItemCount, countResError, setCountResError } =
    shoppingBagContext;

  useEffect(() => {
    const getShoppingBagItemTotalCount = async () => {
      if (authState.isAuthorized) {
        const totalCountRes = await handleShoppingBagAPI(
          `/shoppingbag/itemCount?userid=${authState.userid}`,
          "GET"
        );

        switch (totalCountRes.status) {
          case 201:
            const totalCount = await totalCountRes
              .json()
              .then((res) => ({ ...res.totalCount }));

            if (Object.keys(totalCount).length >= 1)
              setTotalItemCount(totalCount[0].total);
            if (countResError === 500) setCountResError();
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
  }, [authState.isAuthorized]);

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
          {authContext.authState.isAuthorized && totalItemCount >= 1 ? (
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
