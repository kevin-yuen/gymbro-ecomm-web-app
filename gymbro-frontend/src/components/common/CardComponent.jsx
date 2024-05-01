import React, { useContext, useState, useReducer, useEffect } from "react";
import {
  StarFill,
  BagPlusFill,
  CircleFill,
  PlusCircleFill,
  DashCircleFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// config
import colorCode from "../../config/colorCodeMapping.json";
import brandsConfig from "../../config/brands.json";

const styles = {
  width: "18rem",
};

const brandNameUA = brandsConfig.underarmour;

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

// make product name camelcase
const handleConvertCamelCase = (productName) => {
  let camelProductName = "";

  productName.split(" ").forEach((name) => {
    switch (name) {
      case brandNameUA:
        camelProductName += name + " ";
        break;
      default:
        camelProductName +=
          name.substring(0, 1).toUpperCase() +
          name.substring(1).toLowerCase() +
          " ";

        break;
    }
  });

  return camelProductName;
};

// make gender uppercase
const handleConvertUpperCase = (gender) =>
  gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();

// Card Component starts here...
export default function CardComponent({ discountItem }) {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const camelProductShortName = handleConvertCamelCase(discountItem.shortName);
  const uppercaseGender = handleConvertUpperCase(discountItem.gender);

  const handleThumbnailAndQty = (state, action) => {
    switch (action.type) {
      case "SELECT COLOR OPTION":
        const { imgSrc, quantity } = action.payload;

        return {
          thumbnailSrc: imgSrc[0],
          quantity,
        };
      case "INCREMENT":
        return {
          thumbnailSrc: state.thumbnailSrc,
          quantity: state.quantity + 1,
        };
      case "DECREMENT":
        return {
          thumbnailSrc: state.thumbnailSrc,
          quantity: state.quantity - 1,
        };
      default:
        break;
    }
  };

  const [thumbnailAndQty, dispatch] = useReducer(handleThumbnailAndQty, {
    thumbnailSrc: discountItem.options[0].imgSrc[0],
    quantity: discountItem.options[0].quantity,
  });

  // this is used to keep track of max. quantity of the selected color option
  const [latestOption, setLatestOption] = useState(discountItem.options[0]);

  // enable and disable increment/decrement button
  const [qtyAdjustmentBtnState, setQtyAdjustmentBtnState] = useState({
    increment: undefined,
    decrement: undefined,
  });

  useEffect(() => {
    // thumbnail.quantity = adjustable
    // latestOption.quantity = fixed (as per quantity from MongoDB)

    if (thumbnailAndQty.quantity < latestOption.quantity) {
      if (thumbnailAndQty.quantity > 1) {
        setQtyAdjustmentBtnState({
          increment: true,
          decrement: true,
        });
      } else {
        setQtyAdjustmentBtnState({
          increment: true,
          decrement: false,
        });
      }
    } else if (thumbnailAndQty.quantity === latestOption.quantity) {
      if (thumbnailAndQty.quantity === 1 && latestOption.quantity === 1) {
        setQtyAdjustmentBtnState({
          increment: false,
          decrement: false,
        });
      } else {
        setQtyAdjustmentBtnState({
          increment: false,
          decrement: true,
        });
      }
    }
  }, [thumbnailAndQty.quantity]);

  return (
    <div className="position-relative">
      <Link to="/aboutProduct" className="text-decoration-none">
        <div className="card border-0 position-relative" style={styles}>
          <img
            src={thumbnailAndQty.thumbnailSrc}
            className="card-img-top"
            height="343.48"
          />

          {discountItem.isOnClearance ? (
            <div className="position-absolute top-70 start-40 custom-width-60 custom-background-color-red custom-color-antiquewhite fs-7 fw-bold ps-2 rounded-2">
              Extra {discountItem.clearancePercent}% off Clearance
            </div>
          ) : (
            <></>
          )}

          <div className="card-body ps-1 pe-1">
            <div className="d-flex justify-content-between">
              <h5 className="card-title fs-7 custom-color-darknavyblue fw-light">
                {camelProductShortName}
              </h5>

              <div className="mt-n1">
                <StarFill size={13} color="#000000" />
                <span className="fs-7">&nbsp;{discountItem.rating}</span>
              </div>
            </div>

            <div className="card-text fs-8">
              {uppercaseGender}
              <br />

              {discountItem.brand}
              <br />

              <div className="fw-bold">
                {discountItem.discountPrice > 0 ? (
                  <>
                    US${discountItem.discountPrice}&nbsp;
                    <span className="text-decoration-line-through text-danger">
                      US${discountItem.originalPrice}
                    </span>
                  </>
                ) : (
                  <>US${discountItem.originalPrice}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="d-flex ps-1 pb-2">
        {discountItem.options?.map((option) => {
          const code = handleColorCodeMapping(option.color.toLowerCase());

          return (
            <>
              <CircleFill
                className="me-2"
                color={code}
                size={17}
                onClick={() => {
                  setLatestOption(option);
                  dispatch({ type: "SELECT COLOR OPTION", payload: option });
                }}
              />
            </>
          );
        })}
      </div>

      {authState.isAuthorized ? (
        <div className="d-flex justify-content-between align-items-center mt-2 ps-1 pe-1 pb-2">
          <div className="input-group align-items-center">
            <DashCircleFill
              size={15}
              color={qtyAdjustmentBtnState.decrement ? "#3E0957" : "#75737398"}
              onClick={() => {
                if (thumbnailAndQty.quantity > 1)
                  dispatch({ type: "DECREMENT" });
              }}
            />

            <div className="w-10 ms-1 me-1">
              <input
                type="text"
                className="form-control custom-background-color-lightgrey custom-color-grey rounded-5 fs-7 ps-2 pt-1 pb-1"
                placeholder={thumbnailAndQty.quantity}
                readOnly
              />
            </div>

            <PlusCircleFill
              size={15}
              color={qtyAdjustmentBtnState.increment ? "#3E0957" : "#75737398"}
              onClick={() => {
                if (thumbnailAndQty.quantity < latestOption.quantity)
                  dispatch({ type: "INCREMENT" });
              }}
            />
          </div>
          <BagPlusFill size={20} color="#3E0957" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
