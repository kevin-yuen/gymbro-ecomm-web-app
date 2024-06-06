import React, { useState, useEffect } from "react";
import { BoxArrowInRight, BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// config
import Messages from "../../config/messages.json";

// custom hooks
import useLogout from "../../hooks/useLogout";
import useHandleCurrentAuthStatus from "../../hooks/useHandleCurrentAuthStatus";

// components
import ShoppingBagIconComponent from "./ShoppingBagIconComponent";

const shopBagTooltip = Messages.tooltip["shopping-bag"];

const handleShowCustomerName = (customerName) => {
  return customerName.substring(0, customerName.indexOf(" "));
}

export default function NavbarFunctionsComponent({ searchComponent }) {
  console.log("Navbar Functions Component re-renders");

  const { handleLogout } = useLogout();

  const [enableBagAuthIcon, setEnableBagAuthIcon] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);

  const { isUserLoggedIn, handleCurrentAuthStatus } =
    useHandleCurrentAuthStatus();

  useEffect(() => {
    handleCurrentAuthStatus();
  }, []);

  useEffect(() => {
    setEnableBagAuthIcon(isUserLoggedIn.isLoggedIn ? true : false);
  });
  return (
    <div className="navbar-functions me-5 d-flex align-items-center">
      {searchComponent}

      {isUserLoggedIn.isLoggedIn ? (
        <div className="me-5 w-50">
          <p className="fs-7 fw-bold custom-color-darkpurple">
            Hello, {handleShowCustomerName(isUserLoggedIn.name)}
          </p>
        </div>
      ) : (
        <></>
      )}

      <Link to={enableBagAuthIcon ? "/your-bag" : "#"}>
        <span
          className="d-inline-block"
          tabIndex="0"
          data-toggle="tooltip"
          title={
            !isUserLoggedIn.isLoggedIn && showToolTip ? shopBagTooltip : ""
          }
        >
          <ShoppingBagIconComponent
            enableBagAuthIcon={enableBagAuthIcon}
            setShowToolTip={setShowToolTip}
          />
        </span>
      </Link>

      <Link to="/auth/signin">
        {enableBagAuthIcon ? (
          <BoxArrowRight
            className="authcart-icon"
            size={25}
            color="#3E0957"
            onClick={handleLogout}
          />
        ) : (
          <BoxArrowInRight
            className="authcart-icon"
            size={25}
            color="#3E0957"
          />
        )}
      </Link>
    </div>
  );
}
