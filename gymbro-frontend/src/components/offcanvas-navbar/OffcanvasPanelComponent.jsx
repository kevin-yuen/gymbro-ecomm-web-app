import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BagFill, DoorOpenFill, DoorClosedFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

// components
import ImageLinkComponent from "./ImageLinkComponent";
import BrandComponent from "../common/BrandComponent";

// images
import offcanvasAllProductsImage from "../../assets/images/offcanvas-all-products.jpeg";
import offcanvasMenActivewearImage from "../../assets/images/offcanvas-men-activewear.jpeg";
import offcanvasWomenActivewearImage from "../../assets/images/offcanvas-women-activewear.jpeg";
import offcanvasSupplementsImage from "../../assets/images/offcanvas-supplements.jpeg";

// custom hooks
import useLogout from "../../hooks/useLogout";
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

export default function OffcanvasPanelComponent() {
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  const { isUserLoggedIn, handleCurrentAuthStatus } =
    useHandleCurrentAuthStatus();

  useEffect(() => {
    handleCurrentAuthStatus();
  }, []);

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
        tabIndex="-1"
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
              className="btn custom-background-color-darkpurple custom-color-antiquewhite custom-font-family-jersey fw-bold custom-width-92"
              onClick={handleLogout}
            >
              {!isUserLoggedIn.isLoggedIn ? <><DoorOpenFill size={20} className="me-2 "/>SIGN IN</> : <><DoorClosedFill size={20} className="me-2 "/>SIGN OUT</>}
            </button>
          </Link>

          <div className="mt-3">
              <button
                className={`btn ${!isUserLoggedIn.isLoggedIn ? "custom-background-color-grey" : "custom-background-color-darkpurple"} custom-color-antiquewhite custom-font-family-jersey fw-bold custom-width-92`}
                onClick={() => navigate("/your-bag")}
                disabled={!isUserLoggedIn.isLoggedIn ? true: false}
              >
                <BagFill size={20} className="me-2" />
                SHOPPING BAG
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
