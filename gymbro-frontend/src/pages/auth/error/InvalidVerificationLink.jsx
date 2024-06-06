import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// components
import AuthErrorComponent from "../../../components/auth/AuthErrorComponent";

// config
import Message from "../../../config/messages.json";
import FormFieldStyle from "../../../config/styles.json";

// utils
import { handleAuthAPI } from "../../../utils/auth";

const emailErr = Message.auth.email;
const emailNotMatchErr = Message.auth["not-match-forgot-password"];
const serverErr = Message.server.generic;

const valid = FormFieldStyle["input-box"]["valid-style"];
const invalid = FormFieldStyle["input-box"]["invalid-style"];

export default function InvalidVerificationLink() {
  const emailRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resendErrEncountered, setResendErrEncountered] = useState(null);
  const [email, setEmail] = useState({
    style: valid,
    err: null,
  });

  const navigate = useNavigate();
  const {pathname} = useLocation();

  const userId = pathname.substring(pathname.lastIndexOf("/")+1);

  const handleResend = async (e) => {
    e.preventDefault();

    if (emailRef.current.value !== "") {
      setIsLoading(true);

      // remove previous errors encountered
      setEmail({
        style: valid,
        err: null,
      });

      const resendRequest = JSON.stringify({
        id: userId
      });
      const resendResponse = await handleAuthAPI(
        "/users/resendVerificationLink",
        "POST",
        resendRequest
      );

      setIsLoading(false);

      switch (resendResponse.status) {
        case 201:
          navigate("/auth/verification_email_sent_success");
          break;
        case 404:
          setResendErrEncountered(emailNotMatchErr);
          break;
        case 500:
        case 502:
          setResendErrEncountered(serverErr);
          break;
        default:
          return;
      }
    } else {
      setEmail({
        style: invalid,
        err: emailErr,
      });

      setResendErrEncountered(null);
    }
  };

  return (
    <>
      {resendErrEncountered ? (
        <AuthErrorComponent authErrEncountered={resendErrEncountered} />
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center align-items-center">
        <ExclamationCircle size={55} color="#f80000" />
        <h3 className="ps-3 custom-color-red fw-bolder">
          Email verification link invalid
        </h3>
      </div>

      <form onSubmit={handleResend}>
        <div className="container mt-3">
          <p className="fs-7">
            Please provide the email address associated with your account, and
            we can send the link again.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-6">
            <input
              type="email"
              className={email.style}
              id="account-email"
              name="account-email"
              placeholder="Email address associated with your account"
              ref={emailRef}
            />
          </div>
          <div className="d-grid col-2">
            <button className="rounded ps-4 pe-4 pt-2 pb-2 custom-background-color-darkpurple custom-color-antiquewhite fs-7">
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
              ) : (
                <></>
              )}
              Resend
            </button>
          </div>
        </div>
        {email.err ? (
          <p className="fs-9 ms-1 mt-1 text-danger">{email.err}</p>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
