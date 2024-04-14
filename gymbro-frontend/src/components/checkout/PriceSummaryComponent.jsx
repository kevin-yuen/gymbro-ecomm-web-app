import React from "react";

const PriceSummaryComponent = ({ currentStep }) => {
  return (
    <>
      <h1 className="custom-font-family-teko fs-3 fw-bolder">SUMMARY</h1>
      <div className="border-0 border-top ps-2 pe-2 fs-6">
        <div className="d-flex justify-content-between mt-2">
          <p>Sub Total</p>
          <p>US$55</p>
        </div>

        {currentStep === "Complete" ? (
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p>US$9.50</p>
          </div>
        ) : (
          <></>
        )}

        <div className="d-flex justify-content-between">
          <p className="fw-bold">Total</p>
          <p className="fw-bold">US$64.50</p>
        </div>
      </div>
    </>
  );
};

export default PriceSummaryComponent;
