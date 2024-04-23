import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaretRightFill, CaretDownFill } from "react-bootstrap-icons";

const NeedHelpComponent = () => {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div className="ps-5 pt-3">
        {showHelp ? (
          <CaretDownFill size={15} color="#3E0957" />
        ) : (
          <CaretRightFill size={15} color="#3E0957" />
        )}
        &nbsp;
        <Link className="fs-11" onClick={() => setShowHelp((prevState) => !prevState)}>
          Need help?
        </Link>
        {showHelp ? (
          <div>
            <Link className="fs-11 ps-4" to="/auth/forgotPassword">
              Forgot your password
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
}

export default NeedHelpComponent;


