import React, { useState, useRef, useEffect } from "react";
import { NavLink, Form, redirect, useActionData, useNavigation } from "react-router-dom";

// components
import BrandComponent from "../../components/common/BrandComponent";
import AuthButtonComponent from "../../components/common/AuthButtonComponent";
import TrademarkComponent from "../../components/common/TrademarkComponent";
import LoadingSpinnerComponent from "../../components/common/LoadingSpinnerComponent";

// This function does the followings as soon as Form Submission button is clicked:
// 1. send form data to backend server to create user account
// 2. receive server response
// ** Possible returns:
//    a. status 201 (create successfully)
//    b. status 400 (unable to create due to email address conflict)
//    c. status 500 (unable to create due to server error)
export const createAccountAction = async ({ request }) => {
  const userInfo = await request.formData();

  let formSubmissionData = {
    name: userInfo.get("your-name"),
    email: userInfo.get("email"),
    password: userInfo.get("password"),
    reenteredPassword: userInfo.get("re-enter-password"),
  };
  
  if (
    formSubmissionData.name !== "" &&
    formSubmissionData.email !== "" &&
    formSubmissionData.password !== "" &&
    formSubmissionData.password.length >= 6 &&
    formSubmissionData.reenteredPassword !== "" &&
    formSubmissionData.reenteredPassword === formSubmissionData.password
  ) {
    const response = await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formSubmissionData.name,
        email: formSubmissionData.email,
        password: formSubmissionData.password,
      }),
    });

    switch (response.status) {
      case 201:
        return redirect("/verification-email-sent");
      case 400:
        return { error: "The email is already in use." };
      case 500:
        return { error: "Server error. Please try again later." };
      default:
        return;
    }
  }
  return null;
};

export default function CreateAccount() {
  const serverResponse = useActionData();
  const {state: loadingState} = useNavigation();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const generateSignUpErrorMessage = (refElement) => {
    switch (refElement.id) {
      case "your-name":
        return "Enter your name";
      case "email":
        return "Enter your email";
      case "password":
        return "Minimum 6 characters required";
      default:
        return;
    }
  };

  // Create node for error message
  const generateSignUpErrorNode = (
    cb_generateSignUpErrorMessage,
    inputElement
  ) => {
    const errorNode = document.createElement("p");
    errorNode.setAttribute("id", "sign-up-error");
    errorNode.innerText = cb_generateSignUpErrorMessage(inputElement);
    errorNode.style.color = "#f80000";
    errorNode.style.fontSize = "12px";
    errorNode.style.paddingLeft = "3px";
    errorNode.style.paddingTop = "2px";

    inputElement.style.backgroundColor = "#F7DEDE";

    inputElement.after(errorNode);
  };

  const removeSignUpErrorMessage = (signUpErrorElementToRemove) => {
    document.getElementById(signUpErrorElementToRemove.nextSibling.id).remove();
    signUpErrorElementToRemove.style.backgroundColor = ""; // remove background color in the input box
  };

  // This function is to verify the user inputs for the following form fields:
  // * name
  // * email
  // * password
  //
  // For name and email form fields, relevant error message will be prompted if it is blank
  // For password form field, relevant error message will be prompted if it is blank or the given value is less than 6 characters
  const handleUseRefElements = () => {
    const refElements = [nameRef, emailRef, passwordRef];

    for (const refElement of refElements) {
      if (refElement.current.value === "") {
        if (refElement.current.id === "your-name") {
          if (refElement.current.nextSibling === null) {
            generateSignUpErrorNode(
              generateSignUpErrorMessage,
              refElement.current
            );
          }
        } else if (refElement.current.id === "email") {
          if (refElement.current.nextSibling === null) {
            generateSignUpErrorNode(
              generateSignUpErrorMessage,
              refElement.current
            );
          }
        } else if (refElement.current.id === "password") {
          if (refElement.current.nextSibling === null) {
            generateSignUpErrorNode(
              generateSignUpErrorMessage,
              refElement.current
            );
          }
        }
      } else {
        if (refElement.current.id === "your-name") {
          if (
            refElement.current.nextSibling !== null &&
            refElement.current.nextSibling.id === "sign-up-error"
          ) {
            removeSignUpErrorMessage(refElement.current);
          }
        } else if (refElement.current.id === "email") {
          if (
            refElement.current.nextSibling !== null &&
            refElement.current.nextSibling.id === "sign-up-error"
          ) {
            removeSignUpErrorMessage(refElement.current);
          }
        } else if (refElement.current.id === "password") {
          if (refElement.current.value.length >= 6) {
            if (
              refElement.current.nextSibling !== null &&
              refElement.current.nextSibling.id === "sign-up-error"
            ) {
              removeSignUpErrorMessage(refElement.current);
            }
          } else {
            if (refElement.current.nextSibling === null) {
              generateSignUpErrorNode(
                generateSignUpErrorMessage,
                refElement.current
              );
            }
          }
        }
      }
    }
  };

  const [reenteredPassword, setReenteredPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  const handleValidatePasswordMatch = (reenteredPassword) => {
    setReenteredPassword(reenteredPassword);
  };

  // Verify the re-entered password against the actual password
  useEffect(() => {
    setIsPasswordMatch(
      reenteredPassword === passwordRef.current.value ? true : false
    );
  }, [reenteredPassword]);

  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>
      {serverResponse && serverResponse.error ? (
        <p className="custom-background-color-red custom-color-antiquewhite fs-7 rounded pt-1 pb-1">
          {serverResponse.error}
        </p>
      ) : (
        <></>
      )}
      <div className="border border-secondary-subtle border-1 rounded-2 text-start pt-3 pb-3">
        <h2 className="ms-5 fw-bolder">Create account</h2>

        <Form method="post" action="/register">
          <div className="ps-5 pe-5">
            <label htmlFor="your-name" className="form-label fw-medium fs-13">
              Your name
            </label>

            <input
              type="text"
              className="form-control fs-13"
              id="your-name"
              name="your-name"
              placeholder="First and Last name"
              ref={nameRef}
            />
          </div>

          <div className="ps-5 pe-5 mt-2">
            <label htmlFor="email" className="form-label fw-medium fs-13">
              Email
            </label>

            <input
              type="email"
              className="form-control fs-13"
              id="email"
              name="email"
              ref={emailRef}
            />
          </div>

          <div className="ps-5 pe-5 mt-2">
            <div className="d-flex align-items-center">
              <label
                id="password-label"
                htmlFor="password"
                className="form-label fw-medium fs-13"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              className="form-control fs-13"
              id="password"
              name="password"
              placeholder="At least any 6 characters"
              ref={passwordRef}
            />
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
              className="form-control fs-13"
              id="re-enter-password"
              name="re-enter-password"
              onChange={(e) => handleValidatePasswordMatch(e.target.value)}
            />
            {!isPasswordMatch && reenteredPassword.length > 0 ? (
              <p className="fs-9 ms-1 mt-1 text-danger">Passwords must match</p>
            ) : (
              <></>
            )}
          </div>

          <div className="ps-5 pe-5 mt-3 text-center">
            {loadingState === "submitting" ? (
              <LoadingSpinnerComponent />
            ) : (
              <AuthButtonComponent
                buttonName={"Continue"}
                handleUseRefElements={handleUseRefElements}
              />
            )}
          </div>
        </Form>

        <div className="text-center mt-2 fs-7">
          <p>
            <span className="fw-semibold">Already have an account?</span>
            &nbsp;&nbsp;<NavLink to="/signin">Sign in here.</NavLink>
          </p>
        </div>
      </div>
      <TrademarkComponent />
    </div>
  );
}
