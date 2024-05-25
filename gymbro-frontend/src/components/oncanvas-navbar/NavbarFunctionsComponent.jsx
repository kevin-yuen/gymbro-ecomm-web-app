import React, { useContext, useState, useEffect } from "react";
import { BoxArrowInRight, BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// config
import Messages from "../../config/messages.json";

// custom hooks
import useLogout from "../../hooks/useLogout";

// components
import ShoppingBagIconComponent from "./ShoppingBagIconComponent";

const shopBagTooltip = Messages.tooltip["shopping-bag"];

export default function NavbarFunctionsComponent({ searchComponent }) {
  console.log("Navbar Functions Component re-renders");

  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const { handleLogout } = useLogout();

  const [enableBagAuthIcon, setEnableBagAuthIcon] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [authorizedUserName, setAuthorizedUserName] = useState(null);

  useEffect(() => {
    setEnableBagAuthIcon(authState.isAuthorized ? true : false);

    if (authState.isAuthorized) {
      const customerName = authState.name;

      setAuthorizedUserName(
        customerName.length <= 5
          ? customerName
          : customerName.substring(0, 6) + "..."
      );
    }
  });

  return (
    <div className="navbar-functions me-5 d-flex align-items-center">
      {searchComponent}

      {authState.isAuthorized ? (
        <div className="me-2 w-50">
          <p className="fs-7 fw-bold custom-color-darkpurple">
            Hello, {authorizedUserName}
          </p>
        </div>
      ) : (
        <></>
      )}

      <Link to={enableBagAuthIcon ? "/bag" : "#"}>
        <span
          className="d-inline-block"
          tabindex="0"
          data-toggle="tooltip"
          title={!authState.isAuthorized && showToolTip ? shopBagTooltip : ""}
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
