import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check2Circle } from "react-bootstrap-icons";

// components
import BrandComponent from "../../components/common/BrandComponent";

export default function EmailVerified() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 8000);
  });

  return (
    <>
      <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
        <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
          <BrandComponent customWidth={10} customHeight={10} />
        </h1>

        <div className="d-flex justify-content-center align-items-center">
          <Check2Circle size={55} color="#3EC40C" />
          <h3 className="ps-3 custom-color-lightgreen fw-bolder">
            Email verified!
          </h3>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <p className="ps-2">
            You can now sign in and start shopping.
            <span className="fw-bolder ps-2">Redirecting...</span>
            <div
              className="spinner-border spinner-border-sm custom-color-darkpurple ps-2"
              role="status"
              size={7}
            ></div>
          </p>
        </div>
      </div>
    </>
  );
}
