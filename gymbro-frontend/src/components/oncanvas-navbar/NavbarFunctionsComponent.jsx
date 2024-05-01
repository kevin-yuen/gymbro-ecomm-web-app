import React, { useContext, useState, useEffect } from "react";
import { Bag, BoxArrowInRight, BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// context
import { AuthContext } from "../../context/AuthContextProvider";

// config
import Messages from "../../config/messages.json";

// custom hooks
import useLogout from "../../hooks/useLogout";

const shopBagTooltip = Messages.tooltip["shopping-bag"];

export default function NavbarFunctionsComponent({ searchComponent }) {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  const { handleLogout } = useLogout();

  const [enableBagBoxArrow, setEnableBagBoxArrow] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [authorizedUserName, setAuthorizedUserName] = useState(null);

  useEffect(() => {
    setEnableBagBoxArrow(authState.isAuthorized ? true : false);

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

      <Link to={enableBagBoxArrow ? "/bag" : "#"}>
        <span
          className="d-inline-block"
          tabindex="0"
          data-toggle="tooltip"
          title={!authState.isAuthorized && showToolTip ? shopBagTooltip : ""}
        >
          <Bag
            className="me-2"
            size={25}
            color={enableBagBoxArrow ? "#3E0957" : "#C2C1C1"}
            onMouseOver={() => setShowToolTip(true)}
            onMouseOut={() => setShowToolTip(false)}
          />
        </span>
      </Link>

      <Link to="/auth/signin">
        {enableBagBoxArrow ? (
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
