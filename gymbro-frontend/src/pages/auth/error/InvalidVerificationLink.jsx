import React from "react";
import { useNavigation, redirect, Form, useActionData } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

// components
import BrandComponent from "../../../components/common/BrandComponent";

export const resendVerificationLinkAction = async ({ request }) => {
  const emailInfo = await request.formData();

  const resendResponse = await fetch("/users/resend-verification-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: null,
      email: emailInfo.get("account-email"),
    }),
  });

  switch (resendResponse.status) {
    case 201:
      return redirect("/verification-email-sent");
    case 404:
      return { statusCode: 404, error: "User not exist" };
    case 500:
    case 502:
      return {
        statusCode: resendResponse.status,
        error: "Server is currently down. Please try again later.",
      };
    default:
      return;
  }
};

export default function InvalidVerificationLink() {
  const { state: loadingState } = useNavigation();
  const serverResponse = useActionData();

  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>

      {serverResponse &&
      serverResponse.error &&
      serverResponse.statusCode === 404 ? (
        <p className="custom-background-color-red custom-color-antiquewhite fs-7 rounded pt-1 pb-1">
          This email address is not within our record.
        </p>
      ) : serverResponse &&
        serverResponse.error &&
        (serverResponse.statusCode === 500 ||
          serverResponse.statusCode === 502) ? (
        <p className="custom-background-color-red custom-color-antiquewhite fs-7 rounded pt-1 pb-1">
          {serverResponse.error}
        </p>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center align-items-center">
        <ExclamationCircle size={55} color="#f80000" />
        <h3 className="ps-3 custom-color-red fw-bolder fs-5">
          Email verification link invalid
        </h3>
      </div>

      <Form method="post" action="/invalid-verification-link/:id">
        <div className="container mt-3">
          <p>
            Please provide the email address associated with your account, and
            we can send the link again.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-6">
            <input
              type="email"
              className="form-control fs-13"
              id="account-email"
              name="account-email"
              placeholder="Email address associated with your account"
            />
          </div>
          <div className="d-grid col-2">
            <button className="rounded ps-4 pe-4 pt-2 pb-2 custom-background-color-darkpurple custom-color-antiquewhite fs-7">
              {loadingState === "submitting" ? (
                <div
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
              ) : (
                <></>
              )}
              Resend
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
