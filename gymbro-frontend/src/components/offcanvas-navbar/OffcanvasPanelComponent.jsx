import React, { useContext } from "react";
import { Link } from "react-router-dom";

// components
import ImageLinkComponent from "./ImageLinkComponent";
import BrandComponent from "../common/BrandComponent";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// images
import offcanvasAllProductsImage from "../../assets/images/offcanvas-all-products.jpeg";
import offcanvasMenActivewearImage from "../../assets/images/offcanvas-men-activewear.jpeg";
import offcanvasWomenActivewearImage from "../../assets/images/offcanvas-women-activewear.jpeg";
import offcanvasSupplementsImage from "../../assets/images/offcanvas-supplements.jpeg";

// custom hooks
import useLogout from "../../hooks/useLogout";

export default function OffcanvasPanelComponent() {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const { handleLogout } = useLogout();

  return (
    <>
      <button
        className="navbar-toggler me-5"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas-Navbar"
        aria-controls="offcanvas-Navbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvas-Navbar"
        aria-labelledby="offcanvas-NavbarLabel"
      >
        <div className="offcanvas-header custom-background-color-antiquewhite">
          <h5 className="offcanvas-title" id="offcanvas-NavbarLabel">
            <div className="logo d-flex flex-direction-row custom-width-sm-30 custom-width-md-40 ms-5">
              <h1 className="navbar-brand fs-2 custom-font-family-teko custom-color-darkpurple">
                <BrandComponent customWidth={60} customHeight={90} />
              </h1>
            </div>
          </h5>
          <button
            type="button"
            className="btn-close me-2"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link to="/allProducts" className="nav-link">
                <ImageLinkComponent
                  imageSource={offcanvasAllProductsImage}
                  imageLabel={"all-products"}
                  imageLinkName={"All products"}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/womenActivewear" className="nav-link">
                <ImageLinkComponent
                  imageSource={offcanvasWomenActivewearImage}
                  imageLabel={"women-activewear"}
                  imageLinkName={"Women Activewear"}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menActivewear" className="nav-link">
                <ImageLinkComponent
                  imageSource={offcanvasMenActivewearImage}
                  imageLabel={"men-activewear"}
                  imageLinkName={"Men Activewear"}
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/supplements" className="nav-link">
                <ImageLinkComponent
                  imageSource={offcanvasSupplementsImage}
                  imageLabel={"supplements"}
                  imageLinkName={"Supplements"}
                />
              </Link>
            </li>
          </ul>
        </div>

        <div className="offcanvas-footer border-top custom-background-color-antiquewhite p-3">
          <Link to="/auth/signin">
            <button
              className="btn custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-teko fw-bolder custom-width-92"
              onClick={handleLogout}
            >
              {!authState.isAuthorized ? "Sign In" : "Sign Out"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
