import { useState } from "react";

// utils
import { handleProductsAPI } from "../utils/productAPI";

const useGetEligibleItems = (
  endpoint,
  limit = undefined,
  rating = undefined
) => {
  const [eligibleItems, setEligibleItems] = useState([]); // eligible = discount or top rating items
  const [isFetchSuccess, setIsFetchSuccess] = useState(undefined);

  const getEligibleItems = async () => {
    const limitRequest = limit !== undefined ? limit : undefined;

    // if rating undefined, return discount items
    // if rating not undefined, return top rating items
    const ratingRequest = rating !== undefined ? rating : undefined;

    let serverResponse =
      ratingRequest !== undefined
        ? await handleProductsAPI(
            `/products${endpoint}${ratingRequest}/${limitRequest}`,
            "GET"
          )
        : await handleProductsAPI(`/products${endpoint}${limitRequest}`, "GET");

    switch (serverResponse.status) {
      case 201:
      case 404:
        switch (endpoint) {
          case "/discounts/":
          case "/topRatings/":
          case "/clearance/":
            serverResponse = await serverResponse
              .json()
              .then((res) => res.eligibleItems)
              .catch((e) => e);

            break;
          default:
            break;
        }

        setEligibleItems(serverResponse);
        setIsFetchSuccess(true);
        break;
      case 500:
        setIsFetchSuccess(false);
        break;
      default:
        break;
    }
  };

  return { getEligibleItems, eligibleItems, isFetchSuccess };
};

export default useGetEligibleItems;
