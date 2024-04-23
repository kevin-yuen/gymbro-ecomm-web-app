import React from "react";

export default function RedirectingComponent() {
  return (
    <button className="btn custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-bolder custom-width-92" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      &nbsp;&nbsp;Redirecting...
    </button>
  );
}
