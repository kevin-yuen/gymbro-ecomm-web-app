import React, { useState, useContext, useEffect } from "react";
import { ExclamationOctagonFill, XLg } from "react-bootstrap-icons";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

// config
import Messages from "../../config/messages.json";

// components
import ErrorComponent from "./ErrorComponent";

const serverError = Messages.server.generic;
const insufficientError = Messages["shopping-bag"].insufficient;

const ErrorWrapperComponent = ({ children }) => {
  const shoppingBagContext = useContext(ShoppingBagContext);
  const { countResError } = shoppingBagContext;

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (countResError !== undefined) setShowError(true);
  }, [countResError])

  const handleGenerateError = () => {
    switch (countResError.errorCode) {
      case 409:
        return (
          <div className="position-sticky fixed-bottom custom-width-60 start-100 rounded-3 ps-2 pt-2 pb-2 mt-2 mb-2 custom-background-color-red custom-color-antiquewhite custom-font-family-inconsolata fs-7">
            <div className="d-flex justify-content-center">
              <div>
                <ExclamationOctagonFill size={24} className="me-2" />
                <span className="custom-color-lightgreen fw-bold">
                  {countResError.productName +
                    " (" +
                    countResError.productSize +
                    "): "}
                </span>
                {<ErrorComponent error={insufficientError} />}
              </div>
              <XLg
                size={24}
                className="ms-4"
                onClick={() => setShowError(false)}
              />
            </div>
          </div>
        )
      case 500:
        return (
          <div className="position-sticky fixed-bottom custom-width-50 start-100 rounded-3 pt-2 pb-2 mt-2 mb-2 text-center custom-background-color-red custom-color-antiquewhite custom-font-family-inconsolata fs-7">
            {<ErrorComponent error={serverError} />}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <div>
      {children}
      {showError && handleGenerateError()}
    </div>
  );
};

export default ErrorWrapperComponent;
