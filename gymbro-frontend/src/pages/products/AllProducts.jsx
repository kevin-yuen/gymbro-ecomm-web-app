import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// components
import PaginationComponent from "../../components/common/PaginationComponent";

// utils
import { apiResultLoader } from "../../utils/apiResultLoader";

// custom hooks
import useGetEligibleItems from "../../hooks/useGetEligibleItems";

// config
import Messages from "../../config/messages.json";

const endpoint = "/all/";

const noProdErr = Messages["server-result"]["no-products"];

export default function AllProducts({ sideBarFilterComponent }) {
  const {
    getEligibleItems: getAllItems,
    eligibleItems: allItems,
    isFetchSuccess: isAllItemsFetchSuccess,
  } = useGetEligibleItems(endpoint);

  // display first 10 products at initial load
  const [products, setProducts] = useState({
    count: 10,
    items: [],
  });

  const handleDisplayItems = () => {
    setProducts({
      count: products.count + 10,
      items: allItems.slice(0, products.count),
    });
  };

  useEffect(() => {
    getAllItems();

    if (isAllItemsFetchSuccess !== undefined) handleDisplayItems();
  }, [isAllItemsFetchSuccess]);

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
            apiResultLoader(isAllItemsFetchSuccess, products.items, noProdErr)}

          {isAllItemsFetchSuccess !== undefined && (
            <div className="row text-center">
              <div className="mt-5">
                <button
                  className="custom-background-color-darkpurple custom-font-family-teko custom-color-antiquewhite fw-bolder rounded-5 text-decoration-none ps-4 pe-4 pt-2 pb-2"
                  onClick={() => handleDisplayItems()}
                >
                  LOAD MORE
                </button>
                <p className="fs-7 mt-3">Viewing 1 - {products.items.length} of {allItems.length} products</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
