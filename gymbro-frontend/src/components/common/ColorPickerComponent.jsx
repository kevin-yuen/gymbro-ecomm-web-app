import React, { useContext, useState } from "react";
import { CircleFill } from "react-bootstrap-icons";

// config
import colorCodeConfig from "../../config/colorCodeMapping.json";

// context
import { ProductContext } from "../../context/ProductContextProvider";

const handleColorCodeMapping = (colorOption) => {
  for (const colorCode in colorCodeConfig) {
    if (colorCode === colorOption) {
      return colorCodeConfig[colorCode]
    }
  }
};

const ColorPickerComponent = ({
  productDetails,
  pathname,
  setSelectedOption,
  setImg,
  setSelColor,
}) => {
  console.log("Color picker re-renders");

  const productContext = useContext(ProductContext);

  const handleSetSource = () => {
    if (pathname === "/aboutProduct/product") {
      return {
        product: productDetails,
        setSelectedOptionHandler: setSelectedOption,
        setImgHandler: setImg,
        setSelColorHandler: setSelColor,
      };
    } else {
      const { selectedProduct, dispatchSelectProduct } = productContext;
      return {
        product: selectedProduct,
        setSelectedOptionHandler: dispatchSelectProduct,
      };
    }
  };

  const [source, setSource] = useState(handleSetSource());

  return (
    <div className="d-flex mt-1 ps-1 pb-2">
      {source.product.options?.map((option, i) => {
        const code = handleColorCodeMapping(option.color.toLowerCase());

        return (
          <div key={i}>
            <CircleFill
              className="me-2"
              color={code}
              size={pathname === "/aboutProduct/product" ? 25 : 17}
              onClick={() => {
                if (pathname === "/aboutProduct/product") {
                  source.setSelectedOptionHandler(option);
                  source.setImgHandler(option.imgSrc[0]);
                  source.setSelColorHandler(option.color);
                } else {
                  source.setSelectedOptionHandler({
                    type: "SELECT COLOR",
                    payload: option,
                  });
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPickerComponent;
