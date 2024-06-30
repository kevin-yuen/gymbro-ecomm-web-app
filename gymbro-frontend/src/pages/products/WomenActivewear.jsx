import React, { useEffect, useState } from "react";

// custom hooks
import useGetEligibleItems from "../../hooks/useGetEligibleItems";

// message
import Message from "../../config/messages.json";

// utils
import { apiResultLoader } from "../../utils/apiResultLoader";

const endpoint = "/gender/women/";
const noWomenActiveWearError = Message["server-result"]["no-women-activewear"];

export default function WomenActivewear() {
  const [womenActivewear, setWomenActivewear] = useState([]);

  const {
    getEligibleItems: getWomenItems,
    eligibleItems: womenItems,
    isFetchSuccess: isFetchWomenItemsSuccess,
  } = useGetEligibleItems(endpoint);

  useEffect(() => {
    getWomenItems();
  }, []);

  useEffect(() => {
    if (isFetchWomenItemsSuccess) {
      setWomenActivewear(womenItems);
    }
  }, [isFetchWomenItemsSuccess]);

  return (
    <>
      <div className="text-center mt-5 mb-5">
        {isFetchWomenItemsSuccess === undefined ? (
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
      </div>

      {isFetchWomenItemsSuccess !== undefined && apiResultLoader(isFetchWomenItemsSuccess, womenActivewear, noWomenActiveWearError)}
    </>
  );
}
