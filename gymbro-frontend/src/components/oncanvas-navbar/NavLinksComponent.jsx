import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinksComponent() {
  return (
    <>
      <ul className="d-flex flex-direction-row custom-color-antiquewhite list-unstyled ms-4 p-2">
        <li className="pe-5">
          <NavLink to="/all-products" className="oncanvas-nav-link text-decoration-none fw-bold">ALL PRODUCTS</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/women-activewear" className="oncanvas-nav-link text-decoration-none fw-bold">WOMEN ACTIVEWEAR</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/men-activewear" className="oncanvas-nav-link text-decoration-none fw-bold">MEN ACTIVEWEAR</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/supplements" className="oncanvas-nav-link text-decoration-none fw-bold">SUPPLEMENTS</NavLink>
        </li>
      </ul>
    </>
  );
}
