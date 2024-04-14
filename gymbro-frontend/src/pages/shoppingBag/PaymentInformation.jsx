import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircle, ChevronDoubleRight } from "react-bootstrap-icons";

// config
import statesConfig from "../../config/states.json";

// components
import NextStepComponent from "../../components/checkout/NextStepComponent";

const PaymentInformation = () => {
  return (
    <form>
      <div className="mb-3">
        <h1 className="form-label custom-font-family-teko fs-3 fw-bolder">
          PAYMENT
        </h1>

        <div className="mb-3">
          <input
            type="password"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            id="card-number"
            placeholder="Card Number"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2 mb-3"
            id="name-on-card"
            placeholder="Name on Card"
          />
        </div>

        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8 me-2"
            id="expiration-date"
            placeholder="Expiration date (MM / YY)"
          />
          <input
            type="password"
            className="form-control pt-1 pb-1 ps-2 pe-2 fs-8"
            id="security-code"
            placeholder="Security code"
          />
        </div>
      </div>
    </form>
  );
};

export default PaymentInformation;
