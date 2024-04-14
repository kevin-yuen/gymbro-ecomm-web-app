import React from "react";

const ShippingInformation = () => {
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
                />
                <label className="form-check-label" for="standard">
                    <p>Standard (7-14 Working Days)</p>
                    <p className="mt-n3">Fee: <span className="fw-semibold">$9.50</span></p>
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
                />
                <label className="form-check-label" for="express">
                    <p>Express (2-4 Working Days)</p>
                    <p className="mt-n3">Fee: <span className="fw-semibold">$17.50</span></p>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShippingInformation;
