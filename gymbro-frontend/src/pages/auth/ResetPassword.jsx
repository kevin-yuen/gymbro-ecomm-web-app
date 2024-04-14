import React from "react";

// components
import BrandComponent from "../../components/common/BrandComponent";
import AuthButtonComponent from "../../components/common/AuthButtonComponent";
import TrademarkComponent from "../../components/common/TrademarkComponent";

export default function ResetPassword() {
  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>
      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Reset Password</h2>
        <form>
          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="new-password"
              className="form-label fw-medium fs-13"
            >
              New Password
            </label>
            <input
              type="password"
              className="form-control fs-13"
              id="new-password"
            />
          </div>
          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="reenter-password"
              className="form-label fw-medium fs-13"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              className="form-control fs-13"
              id="reenter-password"
            />
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
