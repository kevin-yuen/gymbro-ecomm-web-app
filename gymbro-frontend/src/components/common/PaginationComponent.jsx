import React from "react";
import { Link } from "react-router-dom";

export default function PaginationComponent() {
  return (
    <div className="mt-5">
      <Link className="custom-background-color-darkpurple custom-font-family-teko custom-color-antiquewhite fw-bolder rounded-5 text-decoration-none ps-4 pe-4 pt-2 pb-2">LOAD MORE</Link>
      <p className="fs-7 mt-3">Viewing 1 - 60 of 1500 products</p>
    </div>
  );
}
