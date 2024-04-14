import React from "react";
import { StarFill } from "react-bootstrap-icons";

const CustomerReviewsComponent = ({
  authorAvatar,
  authorName,
  rating,
  reviewTitle,
  reviewDate,
  verifiedPurchase,
  reviewComment,
}) => {
  return (
    <div className="ps-3">
      <div className="d-flex">
        <img className="rounded-5" src={authorAvatar} height={23} />
        <span className="ms-3 fs-7 fw-semibold">{authorName}</span>
      </div>
      <div className="d-flex mt-2 fs-7">
        <StarFill size={20} color="#3E0957" />
        <span className="ms-1">{rating}</span>
        <span className="ms-4 fw-bold">{reviewTitle}</span>
      </div>
      <div className="d-flex mt-2 fs-7">
        <p>{reviewDate}</p>
        <span className="ms-2 me-2 custom-color-grey">|</span>
        <span className="fw-bold custom-color-green">
          {verifiedPurchase ? "Verified Purchase" : ""}
        </span>
      </div>
      <div className="d-flex fs-7">
        <p>{reviewComment}</p>
      </div>
    </div>
  );
};

export default CustomerReviewsComponent;
