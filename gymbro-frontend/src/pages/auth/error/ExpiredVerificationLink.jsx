import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// components
import AuthErrorComponent from "../../../components/auth/AuthErrorComponent";

// config
import Message from "../../../config/messages.json";

// utils
import { handleAuthAPI } from "../../../utils/auth";

const serverErr = Message.server.generic;

export default function ExpiredVerificationLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [sysErrEncountered, setSysErrEncountered] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResendVerificationLink = async () => {
    setIsLoading(true);

    const { pathname } = location;
    const userid = pathname.substring(pathname.lastIndexOf("/") + 1);

    const resendRequest = JSON.stringify({
      id: userid,
    });
    const resendResponse = await handleAuthAPI(
      "/users/resendVerificationLink",
      "POST",
      resendRequest
    );

    const serverResend = await resendResponse
      .json()
      .then((result) => result.isUserExist)
      .catch((err) => err);

    switch (resendResponse.status) {
      case 201:
        navigate("/auth/verification_email_sent_success", {
          state: serverResend.email,
        });
        break;
      case 500:
      case 502:
        setSysErrEncountered(serverErr);
        break;
      default:
        return;
    }
  };

  return (
    <>
      {sysErrEncountered ? (
        <AuthErrorComponent authErrEncountered={sysErrEncountered} />
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center align-items-center">
        <ExclamationCircle size={55} color="#f80000" />
        <h3 className="ps-3 custom-color-red fw-bolder">
          Email verification link expired
        </h3>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <p className="fs-7">No worries, we can send the link again.</p>
      </div>
      <button
        className="rounded ps-4 pe-4 pt-2 pb-2 custom-background-color-darkpurple custom-color-antiquewhite fs-7"
        onClick={handleResendVerificationLink}
      >
        {isLoading ? (
          <div
            className="spinner-border spinner-border-sm me-2"
            role="status"
          ></div>
        ) : (
          <></>
        )}
        Resend verification link
      </button>
    </>
  );
}
