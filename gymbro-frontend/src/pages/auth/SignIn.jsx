import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CaretRightFill, CaretDownFill } from "react-bootstrap-icons";

// components
import BrandComponent from "../../components/common/BrandComponent";
import AuthButtonComponent from "../../components/common/AuthButtonComponent";
import TrademarkComponent from "../../components/common/TrademarkComponent";

export default function SignIn() {
  const [showHelp, setShowHelp] = useState(false);

  const handleShowHideHelp = () => {
    showHelp ? setShowHelp(false) : setShowHelp(true);
  };

  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>
      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Sign in</h2>
        <form>
          <div className="ps-5 pe-5">
            <label htmlFor="email" className="form-label fw-medium fs-13">
              Email
            </label>
            <input type="email" className="form-control fs-13" id="email" />
          </div>
          <div className="ps-5 pe-5 mt-2">
            <label htmlFor="password" className="form-label fw-medium fs-13">
              Password
            </label>
            <input
              type="password"
              className="form-control fs-13"
              id="password"
              placeholder="At least any 6 characters"
            />
          </div>
          <div className="ps-5 mt-3">
            {showHelp ? (
              <CaretDownFill size={15} color="#3E0957" />
            ) : (
              <CaretRightFill size={15} color="#3E0957" />
            )}
            &nbsp;
            <a href="#" className="fs-11" onClick={handleShowHideHelp}>
              Need help?
            </a>
            {showHelp ? (
              <div>
                <NavLink className="fs-11 ps-4" to="/forgotpassword">
                  Forgot your password
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="ps-5 pe-5 mt-3 text-center">
            <AuthButtonComponent buttonName={"Continue"} />
          </div>
        </form>
        <div className="text-center mt-3">
          <p>---------- New to GymBro? ----------</p>
          <div className="mt-3">
            <NavLink to="/register">
              <button className="custom-background-color-antiquewhite fw-medium fs-7 p-1 ps-3 pe-3 border border-light rounded-1">
                Create your GymBro account
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <TrademarkComponent />
    </div>
  );
}
