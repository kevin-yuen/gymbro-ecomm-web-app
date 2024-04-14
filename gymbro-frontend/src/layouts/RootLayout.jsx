import React from "react";

// components
import BrandComponent from "../components/common/BrandComponent";
import NavbarFunctionsComponent from "../components/oncanvas-navbar/NavbarFunctionsComponent";
import OffcanvasPanelComponent from "../components/offcanvas-navbar/OffcanvasPanelComponent";
import NavLinksComponent from "../components/oncanvas-navbar/NavLinksComponent";

import { Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout() {
  return (
    <>
      <div className="fixed-top">
        <nav className="navbar custom-background-color-antiquewhite">
          <div className="container-fluid">
            <div className="logo d-flex flex-direction-row custom-width-sm-30 custom-width-md-40 ms-5">
              <h1 className="navbar-brand fs-2 custom-font-family-teko custom-color-darkpurple">
                <BrandComponent customWidth={15} customHeight={85} />
              </h1>
            </div>
            <NavbarFunctionsComponent />
            <OffcanvasPanelComponent />
          </div>
        </nav>

        <div className="oncanvas-nav-link-group container-fluid custom-background-color-darkpurple">
          <NavLinksComponent />
        </div>
      </div>

      <main className="main">
        {/* This is a placeholder for whatever pages inside .createBrowserRouter() that the user is navigating to */}
        <Outlet />
      </main>
    </>
  );
}
