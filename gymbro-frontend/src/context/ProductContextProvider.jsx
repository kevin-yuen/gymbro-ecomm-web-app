import React, {
  createContext,
  useReducer,
  useContext,
} from "react";

// context
import { ShoppingBagContext } from "./ShoppingBagContextProvider";

export const ProductContext = createContext();

// Default quantity is per the first available size option (available size option is determined by quantity)
const handleFindDefaultQty = (units) => {
  const quantity = units.find((ut) => ut.quantity > 0);
  return quantity === undefined ? 0 : quantity.quantity;
};

// Default size is per the first available size option (available size option is determined by quantity)
const handleFindDefaultSize = (units) => {
  const size = units.find((ut) => ut.quantity > 0);
  return size === undefined ? "N/A" : size.size;
};

export default function ProductContextProvider({ children, item }) {
  const { setShoppingBag } = useContext(ShoppingBagContext);

  const productSelected = {
    productID: item._id,
    brand: item.brand,
    name: item.shortName,
    rating: item.rating,
    gender: item.gender,
    isOnClearance: item.isOnClearance,
    originalPrice: item.originalPrice,
    discountPrice: item.discountPrice,
    clearancePercent: item.clearancePercent,
    thumbnail: item.options[0].imgSrc[0],
    color: item.options[0].color,
    size: handleFindDefaultSize(item.options[0].unit),
    quantity: handleFindDefaultQty(item.options[0].unit),
    options: item.options,
  };

  const selectedProductReducer = (state, action) => {
    switch (action.type) {
      case "SELECT COLOR":
        return {
          productID: state.productID,
          brand: state.brand,
          name: state.name,
          rating: state.rating,
          gender: state.gender,
          isOnClearance: state.isOnClearance,
          originalPrice: state.originalPrice,
          discountPrice: state.discountPrice,
          clearancePercent: state.clearancePercent,
          thumbnail: action.payload.imgSrc[0],
          color: action.payload.color,
          size: handleFindDefaultSize(action.payload.unit),
          quantity: handleFindDefaultQty(action.payload.unit),
          options: state.options,
        };
    //   case "SELECT SIZE":
    //     return {
    //       productID: state.productID,
    //       brand: state.brand,
    //       name: state.name,
    //       rating: state.rating,
    //       gender: state.gender,
    //       isOnClearance: state.isOnClearance,
    //       originalPrice: state.originalPrice,
    //       discountPrice: state.discountPrice,
    //       clearancePercent: state.clearancePercent,
    //       thumbnail: state.thumbnail,
    //       color: state.color,
    //       size: action.payload.size,
    //       quantity: action.payload.quantity,
    //       options: state.options,
    //     };
      case "ADD TO BAG":
        let productDets = {
            productID: state.productID,
            brand: state.brand,
            name: state.name,
            gender: state.gender,
            isOnClearance: state.isOnClearance,
            originalPrice: state.originalPrice,
            discountPrice: state.discountPrice,
            clearancePercent: state.clearancePercent,
            thumbnail: state.thumbnail,
            color: state.color,
            size: action.payload.size,
            quantity: action.payload.qty,
        }

        setShoppingBag((prevItems) => [
          ...prevItems, productDets
        ]);

        productDets.rating = state.rating;
        productDets.options = state.options;

        return productDets;
      default:
        break;
    }
  };

  const [selectedProduct, dispatchSelectProduct] = useReducer(
    selectedProductReducer,
    productSelected
  );

  return (
    <ProductContext.Provider
      value={{ selectedProduct, dispatchSelectProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
