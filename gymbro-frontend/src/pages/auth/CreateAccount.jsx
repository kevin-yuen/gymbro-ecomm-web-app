import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// config
import FormFieldErrMessage from "../../config/messages.json";
import FormFieldStyle from "../../config/styles.json";

// components
import RedirectingComponent from "../../components/common/RedirectingComponent";
import AuthErrorComponent from "../../components/auth/AuthErrorComponent";

// utils
import { handleAuthAPI } from "../../utils/auth";

const nameErr = FormFieldErrMessage.auth.name;
const emailErr = FormFieldErrMessage.auth.email;
const emailInUseErr = FormFieldErrMessage.auth["email-already-in-use"];
const passwordErr = FormFieldErrMessage.auth.password;
const pwdTooShortErr = FormFieldErrMessage.auth["pwd-too-short"];
const confirmPwdErr = FormFieldErrMessage.auth["confirm-password"];
const confirmPwdNotMatchErr =
  FormFieldErrMessage.auth["confirm-password-not-match"];

const passwordNotMatchAuthError =
  FormFieldErrMessage.auth["confirm-password-not-match-auth-error"];

const serverError = FormFieldErrMessage.server.generic;

const valid = FormFieldStyle["input-box"]["valid-style"];
const invalid = FormFieldStyle["input-box"]["invalid-style"];

// CreateAccount component starts here
export default function CreateAccount({ formButton }) {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formFieldState, setFormFieldState] = useState({
    name: {
      style: valid,
      error: null,
    },
    email: {
      style: valid,
      error: null,
    },
    password: {
      style: valid,
      error: null,
    },
    confirmPwd: {
      style: valid,
      error: null,
    },
  });

  const [reenteredPassword, setReenteredPassword] = useState("");

  const [signUpErrEncountered, setSignUpErrEncountered] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // verify re-entered password matches the password as soon as user re-enters the password
  const handleValidatePasswordMatch = (reenteredPassword) => {
    setFormFieldState((prevFormFieldState) => ({
      name: { ...prevFormFieldState.name },
      email: { ...prevFormFieldState.email },
      password: { ...prevFormFieldState.password },
      confirmPwd: {
        style:
          passwordRef.current.value !== "" &&
          passwordRef.current.value !== reenteredPassword
            ? invalid
            : valid,
        error:
          passwordRef.current.value !== "" &&
          passwordRef.current.value !== reenteredPassword
            ? confirmPwdNotMatchErr
            : null,
      },
    }));

    setReenteredPassword(reenteredPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value
    ) {
      if (passwordRef.current.value.length >= 6) {
        if (reenteredPassword === "") {
          // remove previous error message server returns
          setSignUpErrEncountered(null);

          setFormFieldState({
            name: { style: valid, error: null },
            email: { style: valid, error: null },
            password: { style: valid, error: null },
            confirmPwd: { style: invalid, error: confirmPwdErr },
          });
        } else if (
          reenteredPassword !== "" &&
          passwordRef.current.value !== reenteredPassword
        ) {
          setFormFieldState({
            name: { style: valid, error: null },
            email: { style: valid, error: null },
            password: { style: valid, error: null },
            confirmPwd: { ...formFieldState.confirmPwd },
          });

          setSignUpErrEncountered(passwordNotMatchAuthError);
        } else {
          // all form field validations complete
          // remove all previous error messages
          setFormFieldState({
            name: { style: valid, error: null },
            email: { style: valid, error: null },
            password: { style: valid, error: null },
            confirmPwd: { style: valid, error: null },
          });
          setSignUpErrEncountered(null);

          setIsLoading(true);

          const createAcctRequest = JSON.stringify({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          });
          const signUpServerRes = await handleAuthAPI(
            "/users/signUp",
            "POST",
            createAcctRequest
          );
          setIsLoading(false);

          const serverResNewUserEmailNoti = await signUpServerRes
            .json()
            .then((result) => result.newUser)
            .catch((err) => err);

          switch (signUpServerRes.status) {
            case 201:
              navigate("/auth/verification_email_sent_success", {
                state: serverResNewUserEmailNoti.email,
              });
              break;
            case 400:
              setSignUpErrEncountered(emailInUseErr);
              break;
            case 500:
            case 502:
              setSignUpErrEncountered(serverError);
              break;
            default:
              break;
          }
        }
      } else {
        setFormFieldState({
          name: { style: valid, error: null },
          email: { style: valid, error: null },
          password: { style: invalid, error: pwdTooShortErr },
          confirmPwd: { style: valid, error: null },
        });
      }
    } else {
      // remove previous error message server returns
      setSignUpErrEncountered(null);

      // manipulate background color and prompt error message for each form field
      const inputRefs = [nameRef, emailRef, passwordRef];

      inputRefs.forEach((inputRef) => {
        switch (inputRef.current.id) {
          case "create-account-your-name":
            inputRef.current.value === ""
              ? setFormFieldState((prevFormFieldState) => ({
                  name: { style: invalid, error: nameErr },
                  email: { ...prevFormFieldState.email },
                  password: { ...prevFormFieldState.password },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }))
              : setFormFieldState((prevFormFieldState) => ({
                  name: { style: valid, error: null },
                  email: { ...prevFormFieldState.email },
                  password: { ...prevFormFieldState.password },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }));

            break;
          case "create-account-email":
            inputRef.current.value === ""
              ? setFormFieldState((prevFormFieldState) => ({
                  name: { ...prevFormFieldState.name },
                  email: { style: invalid, error: emailErr },
                  password: { ...prevFormFieldState.password },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }))
              : setFormFieldState((prevFormFieldState) => ({
                  name: { ...prevFormFieldState.name },
                  email: { style: valid, error: null },
                  password: { ...prevFormFieldState.password },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }));

            break;
          case "create-account-password":
            inputRef.current.value === ""
              ? setFormFieldState((prevFormFieldState) => ({
                  name: { ...prevFormFieldState.name },
                  email: { ...prevFormFieldState.email },
                  password: { style: invalid, error: passwordErr },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }))
              : setFormFieldState((prevFormFieldState) => ({
                  name: { ...prevFormFieldState.name },
                  email: { ...prevFormFieldState.email },
                  password: {
                    style: inputRef.current.value.length >= 6 ? valid : invalid,
                    error:
                      inputRef.current.value.length >= 6
                        ? null
                        : pwdTooShortErr,
                  },
                  confirmPwd: { ...prevFormFieldState.confirmPwd },
                }));

            break;
          default:
            break;
        }
      });
    }
  };

  return (
    <>
      {signUpErrEncountered ? (
        <AuthErrorComponent authErrEncountered={signUpErrEncountered} />
      ) : (
        <></>
      )}

      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Create account</h2>

        <form onSubmit={handleSubmit}>
          <div className="ps-5 pe-5">
            <label
              htmlFor="create-account-your-name"
              className="form-label fw-medium fs-13"
            >
              Your name
            </label>

            <input
              type="text"
              className={formFieldState.name.style}
              id="create-account-your-name"
              name="create-account-your-name"
              placeholder="First and Last name"
              ref={nameRef}
            />

            {formFieldState.name.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.name.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="create-account-email"
              className="form-label fw-medium fs-13"
            >
              Email
            </label>

            <input
              type="email"
              className={formFieldState.email.style}
              id="create-account-email"
              name="create-account-email"
              ref={emailRef}
            />

            {formFieldState.email.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.email.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-2">
            <div className="d-flex align-items-center">
              <label
                id="password-label"
                htmlFor="create-account-password"
                className="form-label fw-medium fs-13"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              className={formFieldState.password.style}
              id="create-account-password"
              name="create-account-password"
              placeholder="At least any 6 characters"
              ref={passwordRef}
            />

            {formFieldState.password.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.password.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-2">
            <div className="d-flex align-items-center">
              <label
                htmlFor="re-enter password"
                className="form-label fw-medium fs-13"
              >
                Re-enter password
              </label>
            </div>

            <input
              type="password"
              className={formFieldState.confirmPwd.style}
              id="re-enter-password"
              name="re-enter-password"
              onChange={(e) => handleValidatePasswordMatch(e.target.value)}
            />

            {formFieldState.confirmPwd.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.confirmPwd.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-3 text-center">
            {isLoading ? <RedirectingComponent /> : formButton}
          </div>
        </form>

        <div className="text-center mt-2 fs-7">
          <p>
            <span className="fw-semibold">Already have an account?</span>
            &nbsp;&nbsp;<NavLink to="/auth/signin">Sign in here.</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
