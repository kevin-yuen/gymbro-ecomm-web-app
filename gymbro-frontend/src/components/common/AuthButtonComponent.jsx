import React from "react";

export default function AuthButtonComponent({ buttonName, handleUseRefElements }) {
  return (
    <button className="btn custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-bolder custom-width-92" onClick={handleUseRefElements}>
      {buttonName}
    </button>
  );
}
