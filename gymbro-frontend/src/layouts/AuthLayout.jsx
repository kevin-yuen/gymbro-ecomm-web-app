import React from "react";
import { Outlet } from "react-router-dom";

// components
import BrandComponent from "../components/common/BrandComponent";
import TrademarkComponent from "../components/common/TrademarkComponent";

export default function AuthLayout() {
  return (
    <div className="container auth-container text-center ps-sm-7 pe-sm-7 ps-xl-15 pe-xl-15">
      <h1 className="fs-2 custom-font-family-teko custom-color-darkpurple">
        <BrandComponent customWidth={10} customHeight={10} />
      </h1>

      <main className="main">
        <Outlet />
        <TrademarkComponent />
      </main>
    </div>
  );
}
