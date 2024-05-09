import React, { useContext } from "react";
import { CircleFill } from "react-bootstrap-icons";

// config
import colorCode from "../../config/colorCodeMapping.json";

// context
import { ProductContext } from "../../context/ProductContextProvider";

const handleColorCodeMapping = (colorOption) => {
  let code;

  switch (colorOption) {
    case "black":
    case "black marl":
    case "black/white":
      code = colorCode.black;
      break;
    case "brown marl":
      code = colorCode["brown marl"];
      break;
    case "base green marl":
      code = colorCode["base green"];
      break;
    case "core olive":
      code = colorCode["core olive"];
      break;
    case "blue":
      code = colorCode["navy blue"];
      break;
    case "grey":
    case "light grey marl/dark grey marl/smokey grey":
      code = colorCode["light grey"];
      break;
    case "light blue marl/light grey marl/turkish teal":
      code = colorCode["light blue"];
      break;
    case "white":
      code = colorCode.white;
      break;
    case "desert beige":
      code = colorCode["desert beige"];
      break;
    case "nomad":
      code = colorCode.nomad;
      break;
    default:
      break;
  }

  return code;
};

const ColorPickerComponent = () => {
  console.log("Color Picker Component re-renders");

  const productContext = useContext(ProductContext);
  const { selectedProduct, dispatchSelectProduct } = productContext;

  return (
    <div className="d-flex mt-1 ps-1 pb-2">
      {selectedProduct.options?.map((option) => {
        const code = handleColorCodeMapping(option.color.toLowerCase());

        return (
          <>
            <CircleFill
              className="me-2"
              color={code}
              size={17}
              onClick={() =>
                dispatchSelectProduct({ type: "SELECT COLOR", payload: option })
              }
            />
          </>
        );
      })}
    </div>
  );
};

export default ColorPickerComponent;
