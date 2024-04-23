import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// utils
import { handleAuthAPI } from "../../utils/authAPI";

// config
import FormFieldErrMessage from "../../config/messages.json";
import FormFieldStyle from "../../config/styles.json";

// components
import AuthErrorComponent from "../../components/auth/AuthErrorComponent";
import RedirectingComponent from "../../components/common/RedirectingComponent";

const valid = FormFieldStyle["input-box"]["valid-style"];
const invalid = FormFieldStyle["input-box"]["invalid-style"];

const emailNotMatchErr = FormFieldErrMessage.auth["not-match-forgot-password"];
const emailErr = FormFieldErrMessage.auth.email;

const serverErr = FormFieldErrMessage.server.generic;

// ForgotPassword component starts here
const ForgotPassword = ({ formButton }) => {
  const navigate = useNavigate();

  const emailRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [resetErrEncountered, setResetErrEncountered] = useState(null);
  const [emailInput, setEmailInput] = useState({
    style: valid,
    errMessage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value) {
      setIsLoading(true);

      // all form field validations complete
      // remove all previous error messages
      setEmailInput({
        style: valid,
        errMessage: null,
      });
      setResetErrEncountered(null);

      const pwdResetRequest = JSON.stringify({ email: emailRef.current.value });
      const pwdResetServerResponse = await handleAuthAPI(
        "/users/sendTemporaryPassword",
        "POST",
        pwdResetRequest
      );

      const serverResUserEmail = await pwdResetServerResponse
        .json()
        .then((result) => result.isUserExist)
        .catch((err) => err);

      switch (pwdResetServerResponse.status) {
        case 201:
          navigate(
            `/auth/temporary_password_sent_success/${serverResUserEmail._id}`,
            {
              state: serverResUserEmail.email,
            }
          );
          break;
        case 404:
          setResetErrEncountered(emailNotMatchErr);
          break;
        case 400:
        case 500:
        case 502:
          setResetErrEncountered(serverErr);
          break;
        default:
          break;
      }

      setIsLoading(false);
    } else {
      setResetErrEncountered(null); // remove previous error message server returns

      setEmailInput({
        style: invalid,
        errMessage: emailErr,
      });
    }
  };

  return (
    <>
      {resetErrEncountered ? (
        <AuthErrorComponent authErrEncountered={resetErrEncountered} />
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
          <h2 className="ms-5 fw-bolder">Password assistance</h2>
          <p className="ms-5 fs-7">
            Enter the email address associated with your GymBro account. An
            email will be sent to your email address for resetting the password
            shortly.
          </p>

          <div className="ps-5 pe-5 mt-2">
            <label htmlFor="email" className="form-label fw-medium fs-13">
              Email
            </label>
            <input
              type="email"
              className={emailInput.style}
              id="email"
              ref={emailRef}
            />

            {emailInput.errMessage ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {emailInput.errMessage}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-3 text-center">
            {isLoading ? <RedirectingComponent /> : formButton}
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
