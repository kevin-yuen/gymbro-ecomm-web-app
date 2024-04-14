import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// components
import BrandComponent from "../../../components/common/BrandComponent";

export default function ExpiredVerificationLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSystemError, setIsSystemError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResendVerificationLink = async () => {
    setIsLoading(true);

    const { pathname } = location;
    const userid = pathname.substring(pathname.lastIndexOf("/") + 1);

    const resendResponse = await fetch("/users/resend-verification-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userid,
        email: null
      }),
    });

    switch (resendResponse.status) {
      case 201:
        navigate("/verification-email-sent");
        break;
      case 500:
      case 502:
        setIsSystemError(true);
        break;
      default:
        return;
    }
  };

  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>

      {isSystemError ? (
        <p className="custom-background-color-red custom-color-antiquewhite fs-7 rounded pt-1 pb-1">
          Server is currently down. Please try again later.
        </p>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center align-items-center">
        <ExclamationCircle size={55} color="#f80000" />
        <h3 className="ps-3 custom-color-red fw-bolder fs-5">
          Email verification link expired
        </h3>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <p>No worries, we can send the link again.</p>
      </div>
      <button
        className="rounded ps-4 pe-4 pt-2 pb-2 custom-background-color-darkpurple custom-color-antiquewhite fs-7"
        onClick={handleResendVerificationLink}
      >
        {isLoading ? (
          <div
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></div>
        ) : (
          <></>
        )}
        Resend verification link
      </button>
    </div>
  );
}
