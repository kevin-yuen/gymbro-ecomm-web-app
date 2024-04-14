import React from "react";

// components
import BrandComponent from "../../components/common/BrandComponent";
import AuthButtonComponent from "../../components/common/AuthButtonComponent";
import TrademarkComponent from "../../components/common/TrademarkComponent";

export default function ForgotPasword() {
  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>
      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Password assistance</h2>
        <p className="ms-5 fs-7">
          Enter the email address associated with your GymBro account. An email
          will be sent to your email address for resetting the password shortly.
        </p>
        <form>
          <div className="ps-5 pe-5 mt-2">
            <label htmlFor="email" className="form-label fw-medium fs-13">
              Email
            </label>
            <input type="email" className="form-control fs-13" id="email" />
          </div>
          <div className="ps-5 pe-5 mt-3 text-center">
            <AuthButtonComponent buttonName={"Continue"} />
          </div>
        </form>
      </div>
      <TrademarkComponent />
    </div>
  );
}
