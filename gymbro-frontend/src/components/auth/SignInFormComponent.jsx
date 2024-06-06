import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// config
import FormFieldErrMessage from "../../config/messages.json";
import FormFieldStyle from "../../config/styles.json";

// utils
import { handleAuthAPI } from "../../utils/auth";

// components
import AuthErrorComponent from "./AuthErrorComponent";

const valid = FormFieldStyle["input-box"]["valid-style"];
const invalid = FormFieldStyle["input-box"]["invalid-style"];

const emailErr = FormFieldErrMessage.auth.email;
const pwdErr = FormFieldErrMessage.auth.password;
const emailNotMatchErr = FormFieldErrMessage.auth["not-match"];
const emailNotVerifyErr = FormFieldErrMessage.auth["not-verify"];

const serverErr = FormFieldErrMessage.server.generic;

const SignInFormComponent = ({ formButton }) => {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailInput, setEmailInput] = useState({
    style: valid,
    errMessage: null,
  });
  const [passwordInput, setPasswordInput] = useState({
    style: valid,
    errMessage: null,
  });

  const [loginErrEncountered, setLoginErrEncountered] = useState(null);

  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSigningIn(true);

    if (emailRef.current.value && passwordRef.current.value) {
      // all form field validations complete
      // remove all previous error messages
      setEmailInput({
        style: valid,
        errMessage: null,
      });
      setPasswordInput({
        style: valid,
        errMessage: null,
      });
      setLoginErrEncountered(null);

      const signInRequest = JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const signInServerResponse = await handleAuthAPI(
        "/users/signIn",
        "POST",
        signInRequest
      );

      const signInServerResDets = await signInServerResponse
        .json()
        .then((res) => res.isUserExist)
        .catch((err) => err);

      switch (signInServerResponse.status) {
        case 201:
          const userid = signInServerResDets._id;

          const authorizedUser = JSON.stringify({
            userid,
            name: signInServerResDets.name,
            isLoggedIn: true,
          });
          localStorage.setItem("authorizedUser", authorizedUser);

          setTimeout(() => navigate("/"), 3000);
          return;
        case 400:
          setLoginErrEncountered(emailNotVerifyErr);
          break;
        case 401:
        case 404:
          setLoginErrEncountered(emailNotMatchErr);
          break;
        case 500:
          setLoginErrEncountered(serverErr);
          break;
        default:
          return;
      }
    } else {
      setLoginErrEncountered(null); // remove login error message

      // manipulate styling of each input box for better user experience
      const inputRefs = [emailRef, passwordRef];

      for (const inputRef of inputRefs) {
        switch (inputRef.current.id) {
          case "email":
            if (inputRef.current.value === "") {
              setEmailInput({
                style: invalid,
                errMessage: emailErr,
              });
            } else {
              if (emailInput.style === invalid) {
                setEmailInput({
                  style: valid,
                  errMessage: null,
                });
              }
            }

            break;
          case "password":
            if (inputRef.current.value === "") {
              setPasswordInput({
                style: invalid,
                errMessage: pwdErr,
              });
            } else {
              if (passwordInput.style === invalid) {
                setPasswordInput({
                  style: valid,
                  errMessage: null,
                });
              }
            }

            break;
          default:
            break;
        }
      }
    }

    setIsSigningIn(false);
  };

  return (
    <>
      {loginErrEncountered ? (
        <AuthErrorComponent authErrEncountered={loginErrEncountered} />
      ) : (
        <></>
      )}
      <div className="border border-secondary-subtle border-bottom-0 border-1 rounded-top text-start pt-3">
        <form onSubmit={handleSubmit}>
          <h2 className="ms-5 fw-bolder">Sign in</h2>
          <div className="ps-5 pe-5">
            <label htmlFor="email" className="form-label fw-medium fs-13">
              Email
            </label>

            <input
              type="email"
              className={emailInput.style}
              id="email"
              name="email"
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

          <div className="ps-5 pe-5 mt-2">
            <label htmlFor="password" className="form-label fw-medium fs-13">
              Password
            </label>

            <input
              type="password"
              className={passwordInput.style}
              id="password"
              name="password"
              ref={passwordRef}
            />

            {passwordInput.errMessage ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {passwordInput.errMessage}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-3 text-center">
            {!isSigningIn ? (
              formButton
            ) : (
              <div className="spinner-border ms-2" role="status"></div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInFormComponent;
