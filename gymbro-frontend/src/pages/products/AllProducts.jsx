import React, { useEffect, useState, useContext } from "react";
import { ArrowDown } from "react-bootstrap-icons";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// utils
import { apiResultLoader } from "../../utils/apiResultLoader";

// custom hooks
import useGetEligibleItems from "../../hooks/useGetEligibleItems";

// config
import Messages from "../../config/messages.json";

const endpoint = "/all/";

const noProdErr = Messages["server-result"]["no-products"];

export default function AllProducts({ sideBarFilterComponent }) {
  const shoppingBagContext = useContext(ShoppingBagContext);
  const { setCountResError } = shoppingBagContext;

  useEffect(() => {
    // remove previous error
    setCountResError({
      productName: undefined,
      productSize: undefined,
      errorCode: undefined,
    });
  }, []);

  const {
    getEligibleItems: getAllItems,
    eligibleItems: allItems,
    isFetchSuccess: isAllItemsFetchSuccess,
  } = useGetEligibleItems(endpoint);

  const [countOfProducts, setCountOfProducts] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  useEffect(() => {
    if (isAllItemsFetchSuccess !== undefined) {
      setCountOfProducts((prevCount) => prevCount + 10);
    }
  }, [isAllItemsFetchSuccess]);

  useEffect(() => {
    setItems(allItems.slice(0, countOfProducts));
  }, [countOfProducts]);

  return (
    <>
      <div className="ps-8 pt-5 d-flex">
        <section>{sideBarFilterComponent}</section>

        <section className="content-container">
          {isAllItemsFetchSuccess === undefined ? (
            <div className="d-flex justify-content-center align-items-center fs-3 custom-font-family-jersey">
              PLEASE WAIT
              <div
                className="spinner-grow spinner-grow-sm ms-1 me-1 custom-color-darkpurple"
                role="status"
              ></div>
              <div
                className="spinner-grow spinner-grow-sm ms-1 me-1 custom-color-darkpurple"
                role="status"
              ></div>
              <div
                className="spinner-grow spinner-grow-sm ms-1 me-1 custom-color-darkpurple"
                role="status"
              ></div>
            </div>
          ) : (
            <></>
          )}

          {isAllItemsFetchSuccess !== undefined &&
            apiResultLoader(isAllItemsFetchSuccess, items, noProdErr)}

          {isAllItemsFetchSuccess !== undefined && (
            <div className="row text-center">
              <div className="mt-5">
                {countOfProducts < allItems.length - 1 ? (
                  <button
                    className="custom-background-color-darkpurple custom-font-family-teko custom-color-antiquewhite fw-bold rounded-4 text-decoration-none ps-7 pe-7 pt-2 pb-2"
                    onClick={() =>
                      setCountOfProducts((prevCount) => prevCount + 10)
                    }
                  >
                    Load More
                    <ArrowDown size={20} className="ms-2" />
                  </button>
                ) : (
                  <></>
                )}

                <p className="fs-7 mt-3">
                  Viewing 1 - {items.length} of {allItems.length} products
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
