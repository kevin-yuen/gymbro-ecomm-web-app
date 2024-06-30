import React, { useEffect, useState } from "react";

// custom hooks
import useGetEligibleItems from "../../hooks/useGetEligibleItems";

// message
import Message from "../../config/messages.json";

// utils
import { apiResultLoader } from "../../utils/apiResultLoader";

const endpoint = "/gender/men/";
const noMenActiveWearError = Message["server-result"]["no-men-activewear"];

export default function MenActivewear() {
  const [menActivewear, setMenActivewear] = useState([]);

  const {
    getEligibleItems: getMenItems,
    eligibleItems: menItems,
    isFetchSuccess: isFetchMenItemsSuccess,
  } = useGetEligibleItems(endpoint);

  useEffect(() => {
    getMenItems();
  }, []);

  useEffect(() => {
    if (isFetchMenItemsSuccess) {
      setMenActivewear(menItems);
    }
  }, [isFetchMenItemsSuccess]);

  return (
    <>
      <div className="text-center mt-5 mb-5">
        {isFetchMenItemsSuccess === undefined ? (
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

      {isFetchMenItemsSuccess !== undefined && apiResultLoader(isFetchMenItemsSuccess, menActivewear, noMenActiveWearError)}
    </>
  );
}
