import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LogoContext } from "../../context/LogoContextProvider";

export default function BrandComponent({ customWidth, customHeight }) {
  const logoContext = useContext(LogoContext);

  return (
    <>
      <NavLink to="/" className="custom-color-darkpurple text-decoration-none">
        Gym
        <img
          src={logoContext}
          alt="gym-bro-logo"
          className={`custom-width-${customWidth} custom-height-${customHeight}`}
        />
        Bro
      </NavLink>
    </>
  );
}
