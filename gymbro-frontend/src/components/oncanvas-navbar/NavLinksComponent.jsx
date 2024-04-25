import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinksComponent() {
  return (
    <>
      <ul className="d-flex flex-direction-row custom-color-antiquewhite custom-font-family-montserrat list-unstyled fs-7 fw-bold ms-4 p-2">
        <li className="pe-5">
          <NavLink to="/allProducts" className="oncanvas-nav-link text-decoration-none">ALL PRODUCTS</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/womenActivewear" className="oncanvas-nav-link text-decoration-none">WOMEN ACTIVEWEAR</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/menActivewear" className="oncanvas-nav-link text-decoration-none">MEN ACTIVEWEAR</NavLink>
        </li>
        <li className="pe-5">
          <NavLink to="/supplements" className="oncanvas-nav-link text-decoration-none">SUPPLEMENTS</NavLink>
        </li>
      </ul>
    </>
  );
}
