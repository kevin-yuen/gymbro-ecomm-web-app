import React from "react";
import { StarFill } from "react-bootstrap-icons";

const handleShowPrice = (productDetails) => {
  const { originalPrice, discountPrice } = productDetails;

  if (originalPrice > 0 && discountPrice > 0) {
    return (
      <>
        US${discountPrice}&nbsp;
        <span className="text-decoration-line-through text-danger">
          US${originalPrice}
        </span>
      </>
    );
  } else {
    return <>US${originalPrice}</>;
  }
};

const handleShowClearance = (clearancePercent) => {
  return clearancePercent > 0 ? (
    <div className="custom-background-color-red custom-color-antiquewhite fs-7 fw-bold pt-2 pb-2 ms-7 me-7 mb-3 rounded-2">
      Extra {clearancePercent}% off Clearance
    </div>
  ) : (
    <></>
  );
};

const AboutProductDetailsComponent = ({ productDetails }) => {
  console.log("About Product Details Component re-renders");

  return (
    <>
      <div className="text-center">
        <h5 className="fs-1 fw-bolder custom-font-family-jersey mb-0">
          {productDetails.name}
        </h5>
        <p className="fs-7 mb-1">{productDetails.fitType}</p>
        <p className="fs-7 fw-bold">{handleShowPrice(productDetails)}</p>

        {handleShowClearance(productDetails.clearancePercent)}
      </div>

      <div className="d-flex justify-content-between ps-5 pe-5 fs-7">
        <p>{productDetails.numOfReviews} reviews</p>
        <p className="fw-bold text-uppercase">{productDetails.brand}</p>
        <div>
          <StarFill size={17} color="#3e0957" className="pe-1" />
          4.6
        </div>
      </div>

      <div className="mt-2 ps-2">
        <p className="custom-font-family-jersey custom-color-darknavyblue fs-4">
          FREE delivery to <span className="fw-bold custom-color-orange">anywhere</span> in the U.S.
          on eligible orders over $49.
        </p>
      </div>
    </>
  );
};

export default React.memo(AboutProductDetailsComponent);
