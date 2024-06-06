import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExclamationCircle,
  Asterisk,
} from "react-bootstrap-icons";

// config
import statesConfig from "../../config/states.json";

// components
import CheckoutButtonsComponent from "../../components/checkout/CheckoutButtonsComponent";

// messages
import Messages from "../../config/messages.json";


const formInputError = Messages.checkout["delivery-input-error"];

const BuyerInformation = () => {
  console.log("Buyer Information page re-renders");

  const navigate = useNavigate();

  const [info, setInfo] = useState({
    email: "",
    country: "USA",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    postalCode: "",
    consent: false,
  });
  const [isFormError, setIsFormError] = useState(undefined);

  const handleFormInputChange = (e) => {
    if (e.target.name === "consent") {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setInfo((prevInfo) => ({ ...prevInfo, [e.target.name]: e.target.value }));
    }
  };

  const handlePreserveFormInputs = () => {
    sessionStorage.setItem("buyerDeliveryInfo", JSON.stringify(info));
    navigate("/your-bag/shipping");
  }
    

  const handleFormVerification = () => {
    for (const [key, value] of Object.entries(info)) {
      if (
        (key !== "address2" && value === "") ||
        (key === "consent" && value === false)
      ) {
        setIsFormError(true);
        break;
      } else {
        setIsFormError(false);
      }
    }
  };

  useEffect(() => {
    if (isFormError !== undefined && !isFormError) handlePreserveFormInputs();

    const infoFromSessionStorage = sessionStorage.getItem("buyerDeliveryInfo");

    if (infoFromSessionStorage !== null) setInfo(JSON.parse(infoFromSessionStorage));
  }, [isFormError]);

  return (
    <form>
      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          CONTACT
        </h1>

        <div className="d-flex">
          <Asterisk size={8} color="#f80000" className="me-1" />

          <input
            type="email"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            name="email"
            placeholder="Email"
            value={info.email}
            onChange={(e) => handleFormInputChange(e)}
          />
        </div>
      </div>

      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          SHIPPING ADDRESS
        </h1>

        <div>
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            name="country"
            placeholder="USA"
            value="USA"
            disabled={true}
          />

          <p className="mt-1 fs-8">
            <ExclamationCircle size={20} className="me-2 ms-1" />
            We only ship to the U.S. at this moment.
          </p>
        </div>

        <div className="d-flex mb-3">
          <Asterisk size={15} color="#f80000" className="me-1" />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2"
            name="firstName"
            placeholder="First Name"
            value={info.firstName}
            onChange={(e) => handleFormInputChange(e)}
          />

          <Asterisk size={15} color="#f80000" className="me-1" />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            name="lastName"
            placeholder="Last Name"
            value={info.lastName}
            onChange={(e) => handleFormInputChange(e)}
          />
        </div>

        <div className="d-flex">
          <Asterisk size={7} color="#f80000" className="me-1" />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-0 mb-3"
            name="address1"
            placeholder="Address Line 1"
            value={info.address1}
            onChange={(e) => handleFormInputChange(e)}
          />
        </div>

        <div className="d-flex">
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-0 mb-3 ms-2"
            name="address2"
            placeholder="Address Line 2"
            value={info.address2}
            onChange={(e) => handleFormInputChange(e)}
          />
        </div>

        <div className="d-flex">
          <div className="form-control-sm custom-width-20 custom-height-10 ps-0 pt-0 me-2 fs-8">
            <div className="d-flex">
              <Asterisk size={7} color="#f80000" className="me-1" />

              <select
                className="pt-1 pb-1 ps-1 rounded-2 border-dark-subtle"
                name="state"
                value={info.state}
                onChange={(e) => {
                  e.preventDefault();
                  handleFormInputChange(e);
                }}
              >
                <option value={"State"}>--- State ---</option>
                {statesConfig.state.map((state, i) => (
                  <option key={i} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <Asterisk size={17} color="#f80000" className="me-1" />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2 mb-3"
            name="city"
            placeholder="City"
            value={info.city}
            onChange={(e) => handleFormInputChange(e)}
          />

          <Asterisk size={17} color="#f80000" className="me-1" />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 mb-3"
            name="postalCode"
            placeholder="Postal Code"
            value={info.postalCode}
            onChange={(e) => handleFormInputChange(e)}
          />
        </div>

        <div className="fs-8 d-flex">
          <Asterisk size={7} color="#f80000" className="me-1" />
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={info.checked}
            onChange={(e) => handleFormInputChange(e)}
          />
          <label htmlFor="consent" className="ps-2">
            I confirmed that the shipping information is correct.
          </label>
        </div>
      </div>

      {isFormError ? (
        <p className="text-danger fs-7">{formInputError}</p>
      ) : (
        <></>
      )}

      <CheckoutButtonsComponent
        prevButton={"Your Bag"}
        prevPath={"/your-bag"}
        nextButton={"Save & Shipping"}
        handleFormVerification={handleFormVerification}
      />
    </form>
  );
};

export default BuyerInformation;
