import React, { createContext } from "react";
import logo from "../assets/logo.jpeg";

export const LogoContext = createContext();

export default function LogoContextProvider({ children }) {
  return (
    <>
      <LogoContext.Provider value={logo}>{children}</LogoContext.Provider>
    </>
  );
}
