import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import AuthErrorComponent from "../../components/auth/AuthErrorComponent";

// config
import FormFieldErrMessage from "../../config/messages.json";
import FormFieldStyle from "../../config/styles.json";

// utils
import { handleAuthAPI } from "../../utils/authAPI";

// form field styles config
const valid = FormFieldStyle["input-box"]["valid-style"];
const invalid = FormFieldStyle["input-box"]["invalid-style"];

// form field error message config
const tempPasswordErr = FormFieldErrMessage.auth["temp-password"];
const newPasswordErr = FormFieldErrMessage.auth["new-password"];
const pwdTooShortErr = FormFieldErrMessage.auth["pwd-too-short"];
const confirmPasswordErr = FormFieldErrMessage.auth["confirm-password"];
const passwordNotMatchError =
  FormFieldErrMessage.auth["confirm-password-not-match"];

const passwordNotMatchAuthError =
  FormFieldErrMessage.auth["confirm-password-not-match-auth-error"];
const tempPasswordNotMatchAuthError =
  FormFieldErrMessage.auth["not-match-temp-password"];

const serverError = FormFieldErrMessage.server.generic;

// Password Reset Form Component starts here
const ResetPassword = ({ formButton }) => {
  const tempPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [formFieldState, setFormFieldState] = useState({
    tempPassword: {
      style: valid,
      error: null,
    },
    newPassword: {
      style: valid,
      error: null,
    },
    confirmPassword: {
      style: valid,
      error: null,
    },
  });

  const [resetPwdErrEncountered, setResetPwdErrEncountered] = useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnChangeMatchPassword = (enteredPassword) => {
    if (newPasswordRef.current.value) {
      newPasswordRef.current.value !== enteredPassword
        ? setFormFieldState((prevFormFieldState) => ({
            tempPassword: { ...prevFormFieldState.tempPassword },
            newPassword: { ...prevFormFieldState.newPassword },
            confirmPassword: { style: invalid, error: passwordNotMatchError },
          }))
        : setFormFieldState((prevFormFieldState) => ({
            tempPassword: { ...prevFormFieldState.tempPassword },
            newPassword: { ...prevFormFieldState.newPassword },
            confirmPassword: { style: valid, error: null },
          }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetPwdErrEncountered(null); // remove error message due to server response

    if (
      tempPasswordRef.current.value &&
      newPasswordRef.current.value &&
      confirmPasswordRef.current.value
    ) {
      if (newPasswordRef.current.value.length >= 6) {
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
          setResetPwdErrEncountered(passwordNotMatchAuthError);
        } else {
          // all form field validations complete
          // remove all previous error messages
          setFormFieldState({
            tempPassword: {style: valid, error: null},
            newPassword: {style: valid, error: null},
            confirmPassword: {style: valid, error: null},
          })
          setResetPwdErrEncountered(null); // remove "passwords not match" error
  
          const userId = pathname.substring(pathname.lastIndexOf("/") + 1);
  
          const resetPwdServerRes = await handleAuthAPI(
            "/users/resetPassword",
            "POST",
            JSON.stringify({
              id: userId,
              tempPassword: tempPasswordRef.current.value,
              newPassword: newPasswordRef.current.value,
            })
          );
  
          switch (resetPwdServerRes.status) {
            case 201:
              navigate("/auth/password_reset_success");
              break;
            case 401:
              setResetPwdErrEncountered(tempPasswordNotMatchAuthError);
              break;
            case 400:
            case 500:
              setResetPwdErrEncountered(serverError);
              break;
            default:
              break;
          }
        }
      } else {
        setFormFieldState({
          tempPassword: {style: valid, error: null},
          newPassword: {style: invalid, error: pwdTooShortErr},
          confirmPassword: {style: valid, error: null}
        })
      }
    } else if (
      tempPasswordRef.current.value !== "" &&
      newPasswordRef.current.value !== "" &&
      confirmPasswordRef.current.value === ""
    ) {
      setFormFieldState({
        tempPassword: { style: valid, error: null },
        newPassword: {
          style: newPasswordRef.current.value.length >= 6 ? valid : invalid,
          error:
            newPasswordRef.current.value.length >= 6 ? null : pwdTooShortErr,
        },
        confirmPassword: { style: invalid, error: confirmPasswordErr },
      });
    } else {
      const inputRefs = [tempPasswordRef, newPasswordRef];

      inputRefs.forEach((inputRef) => {
        switch (inputRef.current.id) {
          case "reset-pwd-temp-password":
            inputRef.current.value === ""
              ? setFormFieldState((prevFormFieldState) => ({
                  tempPassword: { style: invalid, error: tempPasswordErr },
                  newPassword: { ...prevFormFieldState.newPassword },
                  confirmPassword: { style: valid, error: null },
                }))
              : setFormFieldState((prevFormFieldState) => ({
                  tempPassword: { style: valid, error: null },
                  newPassword: { ...prevFormFieldState.newPassword },
                  confirmPassword: { style: valid, error: null },
                }));

            break;
          case "reset-pwd-new-password":
            inputRef.current.value === ""
              ? setFormFieldState((prevFormFieldState) => ({
                  tempPassword: { ...prevFormFieldState.tempPassword },
                  newPassword: { style: invalid, error: newPasswordErr },
                  confirmPassword: { style: valid, error: null },
                }))
              : setFormFieldState((prevFormFieldState) => ({
                  tempPassword: { ...prevFormFieldState.tempPassword },
                  newPassword: {
                    style:
                      newPasswordRef.current.value.length >= 6
                        ? valid
                        : invalid,
                    error:
                      newPasswordRef.current.value.length >= 6
                        ? null
                        : pwdTooShortErr,
                  },
                  confirmPassword: { style: valid, error: null },
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
      {resetPwdErrEncountered ? (
        <AuthErrorComponent authErrEncountered={resetPwdErrEncountered} />
      ) : (
        <></>
      )}
      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="reset-pwd-temp-password"
              className="form-label fw-medium fs-13"
            >
              Temporary Password
            </label>
            <input
              type="text"
              className={formFieldState.tempPassword.style}
              id="reset-pwd-temp-password"
              ref={tempPasswordRef}
            />

            {formFieldState.tempPassword.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.tempPassword.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="reset-pwd-new-password"
              className="form-label fw-medium fs-13"
            >
              New Password
            </label>
            <input
              type="password"
              className={formFieldState.newPassword.style}
              id="reset-pwd-new-password"
              ref={newPasswordRef}
            />

            {formFieldState.newPassword.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.newPassword.error}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-2">
            <label
              htmlFor="confirm-password"
              className="form-label fw-medium fs-13"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className={formFieldState.confirmPassword.style}
              id="confirm-password"
              ref={confirmPasswordRef}
              onChange={(e) => handleOnChangeMatchPassword(e.target.value)}
            />

            {formFieldState.confirmPassword.error ? (
              <p className="fs-9 ms-1 mt-1 text-danger">
                {formFieldState.confirmPassword.error}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="ps-5 pe-5 mt-3 text-center">{formButton}</div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
