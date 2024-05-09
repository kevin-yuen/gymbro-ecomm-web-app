import React from "react";
import { StarFill } from "react-bootstrap-icons";

// utils
import {
  handleConvertCamelCase,
  handleConvertUpperCase,
} from "../../utils/card";

const ItemDetailsComponent = ({ item }) => {
  console.log("Item Details Component re-renders");

  const camelProductName = handleConvertCamelCase(item.shortName);
  const uppercaseGender = handleConvertUpperCase(item.gender);

  return (
    <div className="card-body mt-2 ps-1 pe-1">
      <div className="d-flex justify-content-between">
        <h5 className="card-title fs-7 custom-color-darknavyblue fw-light">
          {camelProductName}
        </h5>

        <div className="mt-n1">
          <StarFill size={13} color="#000000" />
          <span className="fs-7">&nbsp;{item.rating}</span>
        </div>
      </div>

      <div className="card-text fs-8">
        {uppercaseGender}
        <br />

        {item.brand}
        <br />

        <div className="fw-bold">
          {item.discountPrice > 0 ? (
            <>
              US${item.discountPrice}&nbsp;
              <span className="text-decoration-line-through text-danger">
                US${item.originalPrice}
              </span>
            </>
          ) : (
            <>US${item.originalPrice}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsComponent;
