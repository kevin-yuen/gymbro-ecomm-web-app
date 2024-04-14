import React from "react";
import { Bag, BoxArrowInRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// components
import SearchComponent from "./SearchComponent";

export default function NavbarFunctionsComponent() {
  return (
    <div className="navbar-functions me-5 d-flex align-items-center">
      <SearchComponent />
      <Link to="/bag">
        <Bag className="me-2" size={25} color="#3E0957" />
      </Link>
      <Link to="/signin">
        <BoxArrowInRight className="authcart-icon" size={25} color="#3E0957" />
      </Link>
    </div>
  );
}
