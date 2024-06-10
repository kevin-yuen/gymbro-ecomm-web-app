import React from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/images/logo.jpeg";

export default function BrandComponent({ customWidth, customHeight }) {
  return (
    <>
      <NavLink to="/" className="custom-color-darkpurple text-decoration-none">
        Gym
        <img
          src={logoSrc}
          alt="gym-bro-logo"
          className={`navbar-logo custom-width-${customWidth} custom-height-${customHeight}`}
        />
        Bro
      </NavLink>
    </>
  );
}
