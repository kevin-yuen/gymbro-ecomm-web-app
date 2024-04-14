import React from "react";
import {Check2Circle} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// components
import BrandComponent from "../../components/common/BrandComponent";

export default function EmailSentNotification() {
  return (
    <>
      <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
        <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
          <BrandComponent customWidth={10} customHeight={10} />
        </h1>
        <div className="d-flex justify-content-center align-items-center">
        <Check2Circle size={55} color="#3EC40C"/><h3 className="ps-3 custom-color-lightgreen fw-bolder">Verification email sent</h3>
        </div>
        <p className="mt-3">A verification email has been sent to your email address. After verifying your email address, you can sign in and start
          <Link to="/"> shopping.</Link></p>
      </div>
    </>
  );
}
