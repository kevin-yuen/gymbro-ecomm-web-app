import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";

const CheckoutButtonsComponent = ({
  prevButton,
  prevPath,
  nextButton,
  handleFormVerification = undefined,
  handleMakePayment = undefined,
  handleUpdateTotalReqQtyState = undefined,
}) => {
  const handleGenerateCheckoutNavButtons = () => {
    if (prevButton === undefined && nextButton !== undefined) {
      return (
        <button
          className="border-0 rounded-2 ps-4 pe-4 pt-3 pb-3 custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata fw-bolder fs-7"
          onClick={(e) => {
            e.preventDefault();

            handleUpdateTotalReqQtyState();
          }}
        >
          {nextButton}
          <span className="ms-1">
            <ArrowRightCircleFill size={15} />
          </span>
        </button>
      );
    } else {
      return (
        <div className="d-flex justify-content-between">
          <Link to={prevPath}>
            <button
              className="border-0 rounded-2 ps-4 pe-4 pt-3 pb-3 custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata fw-bolder fs-7"
              onClick={() => {
                if (handleFormVerification !== undefined)
                  handleFormVerification();
              }}
            >
              <span className="me-1">
                <ArrowLeftCircleFill size={15} />
              </span>
              {prevButton}
            </button>
          </Link>

          <button
            className="border-0 rounded-2 ps-4 pe-4 pt-3 pb-3 custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-inconsolata fw-bolder fs-7"
            onClick={(e) => {
              e.preventDefault();

              if (handleFormVerification !== undefined) {
                handleFormVerification();
              }

              if (handleMakePayment !== undefined) {
                handleMakePayment();
              }

              if (handleMakePayment !== undefined) {
                handleUpdateTotalReqQtyState();
              }
            }}
          >
            {nextButton}
            <span className="ms-1">
              <ArrowRightCircleFill size={15} />
            </span>
          </button>
        </div>
      );
    }
  };

  return <>{handleGenerateCheckoutNavButtons()}</>;
};

export default CheckoutButtonsComponent;
