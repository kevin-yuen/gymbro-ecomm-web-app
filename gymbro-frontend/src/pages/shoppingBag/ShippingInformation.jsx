import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import CheckoutButtonsComponent from "../../components/checkout/CheckoutButtonsComponent";

// messages
import Messages from "../../config/messages.json";

// config
import ShippingFeeConfig from "../../config/checkout.json";

// context
import { ShoppingBagContext } from "../../context/ShoppingBagContextProvider";

const shippingMethodError = Messages.checkout["shipping-method-error"];

const standardShippingFee = ShippingFeeConfig["shipping-fee"].standard;
const expressShippingFee = ShippingFeeConfig["shipping-fee"].express;

const ShippingInformation = () => {
  const navigate = useNavigate();

  const shoppingBagContext = useContext(ShoppingBagContext);
  const { shippingMethod, setShippingMethod } = shoppingBagContext;

  const initialTempShippingMethod =
    shippingMethod.fee === 0
      ? { type: "", fee: 0 }
      : { type: shippingMethod.type, fee: shippingMethod.fee };

  const [formError, setFormError] = useState(undefined);
  const [tempShippingMethod, setTempShippingMethod] = useState(
    initialTempShippingMethod
  );

  const handleChangeShippingMethod = (e) => {
    setTempShippingMethod({ type: e.target.id, fee: e.target.value });
  };

  const handleFormVerification = () => {
    setFormError(
      Number(shippingMethod.fee) === 0
        ? tempShippingMethod.fee > 0
          ? false
          : true
        : false
    );
  };

  useEffect(() => {
    if (formError !== undefined && !formError) {
      setShippingMethod(tempShippingMethod);
      navigate("/your-bag/payment");
    }
  }, [formError]);

  return (
    <>
      <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
        SHIPPING METHOD
      </h1>

      <table className="table">
        <tbody>
          <tr>
            <td>
              <div className="form-check fs-7">
                <input
                  type="radio"
                  className="form-check-input"
                  name="shipping-method"
                  id="standard"
                  value={standardShippingFee}
                  onChange={(e) => handleChangeShippingMethod(e)}
                  checked={shippingMethod.type === "standard"}
                />

                <label className="form-check-label" htmlFor="standard">
                  <p>Standard (7-14 Working Days)</p>
                  <p className="mt-n3">
                    Fee:{" "}
                    <span className="fw-semibold">
                      USD${standardShippingFee}
                    </span>
                  </p>
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div className="form-check fs-7">
                <input
                  type="radio"
                  className="form-check-input"
                  name="shipping-method"
                  id="express"
                  value={expressShippingFee}
                  onChange={(e) => handleChangeShippingMethod(e)}
                  checked={shippingMethod.type === "express"}
                />

                <label className="form-check-label" htmlFor="express">
                  <p>Express (2-4 Working Days)</p>
                  <p className="mt-n3">
                    Fee:{" "}
                    <span className="fw-semibold">
                      USD${expressShippingFee}
                    </span>
                  </p>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {formError ? (
        <p className="fs-7 text-danger">{shippingMethodError}</p>
      ) : (
        <></>
      )}

      <CheckoutButtonsComponent
        prevButton={"Information"}
        prevPath={"/your-bag/information"}
        nextButton={"Payment"}
        handleFormVerification={handleFormVerification}
      />
    </>
  );
};

export default ShippingInformation;
