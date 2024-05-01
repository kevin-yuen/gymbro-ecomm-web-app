import React from "react";

export default function ErrorComponent({ error }) {
  return (
    <div className="position-absolute start-40 mt-n4">
      <p className="text-danger fs-7">{error}</p>
    </div>
  );
}
