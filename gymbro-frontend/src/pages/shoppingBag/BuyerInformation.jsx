import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircle, ChevronDoubleRight } from "react-bootstrap-icons";

// config
import statesConfig from "../../config/states.json";

// components
import NextStepComponent from "../../components/checkout/NextStepComponent";

const BuyerInformation = () => {
  return (
    <form>
      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          CONTACT
        </h1>
        <input
          type="email"
          className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
          id="contact-email"
          placeholder="Email"
        />
      </div>
      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          SHIPPING ADDRESS
        </h1>

        <div>
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            id="country"
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
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2"
            id="first-name"
            placeholder="First Name"
          />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            id="last-name"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2 mb-3"
            id="address-line-1"
            placeholder="Address Line 1"
          />
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2 mb-3"
            id="address-line-2"
            placeholder="Address Line 2"
          />
        </div>

        <div className="d-flex">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle border border-black pt-1 pb-1 ps-2 pe-2 me-2 fs-8"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              -- State --
            </button>
            <ul className="dropdown-menu">
              {statesConfig.state.map((state) => (
                <li>
                  <a
                    className="dropdown-item pt-1 pb-1 ps-2 pe-2 fs-8"
                    href="#"
                  >
                    {state}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2 mb-3"
            id="city"
            placeholder="City"
          />

          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 mb-3"
            id="address-line-2"
            placeholder="Postal Code"
          />
        </div>

        <div className="fs-8 d-flex">
          <input
            type="checkbox"
            id="verification"
            name="verification"
            value="Shipping Verification"
          />
          <label htmlFor="verification" className="ps-2">
            I confirmed that the shipping information is correct.
          </label>
        </div>
      </div>
    </form>
  );
};

export default BuyerInformation;
